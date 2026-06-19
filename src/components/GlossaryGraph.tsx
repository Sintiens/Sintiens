import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GLOSSARY_UNIFIED,
  GlossaryEntry,
  GlossaryCategory,
  GlossaryType,
  GLOSSARY_CATEGORIES,
  GLOSSARY_TYPES
} from "../data/glossaryUnified";
import { getGlossaryIndex, getCoOccurrences } from "../utils/buildGlossaryIndex";
import {
  Search,
  X,
  Plus,
  Minus,
  Maximize2,
  Eye,
  EyeOff,
  Crosshair,
  SlidersHorizontal,
  ArrowRight,
  Network,
  History,
  Home,
  ChevronRight
} from "lucide-react";

interface GraphNode {
  id: string;
  category: GlossaryCategory;
  type: GlossaryType;
  title: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  entry: GlossaryEntry;
  centrality: number;
}

interface GraphLink {
  source: string;
  target: string;
  weight: number;
}

interface GlossaryGraphProps {
  onSelectEntry: (entry: GlossaryEntry) => void;
  selectedEntryId?: string;
}

type GroupMode = "categoria" | "tipo" | "libre";

const CATEGORY_RGBA: Record<GlossaryCategory, (opacity: number) => string> = {
  sintiencia: (o) => `rgba(239, 68, 68, ${o})`,
  etica: (o) => `rgba(59, 130, 246, ${o})`,
  psicologia: (o) => `rgba(168, 85, 247, ${o})`,
  sistemas_uso: (o) => `rgba(234, 179, 8, ${o})`,
  ecologia: (o) => `rgba(217, 119, 6, ${o})`,
  legal: (o) => `rgba(16, 185, 129, ${o})`
};

const CATEGORY_CENTER_BY_CATEGORY: Record<GlossaryCategory, { xMul: number; yMul: number }> = {
  sintiencia: { xMul: 0.2, yMul: 0.3 },
  etica: { xMul: 0.5, yMul: 0.3 },
  psicologia: { xMul: 0.8, yMul: 0.3 },
  sistemas_uso: { xMul: 0.2, yMul: 0.7 },
  ecologia: { xMul: 0.5, yMul: 0.7 },
  legal: { xMul: 0.8, yMul: 0.7 }
};

const TYPE_CENTER: Record<GlossaryType, { xMul: number; yMul: number }> = {
  concepto: { xMul: 0.2, yMul: 0.3 },
  autor: { xMul: 0.5, yMul: 0.3 },
  obra: { xMul: 0.8, yMul: 0.3 },
  declaracion: { xMul: 0.2, yMul: 0.7 },
  cita: { xMul: 0.5, yMul: 0.7 },
  tecnico: { xMul: 0.8, yMul: 0.7 }
};

const FREE_CENTER = { xMul: 0.5, yMul: 0.5 };

const MIN_ZOOM = 0.4;
const MAX_ZOOM = 3.0;
const ZOOM_STEP = 0.2;
const MAX_HISTORY = 8;

function stringHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function fuzzyScore(query: string, target: string): number {
  if (!query) return 0;
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (t === q) return 1000;
  if (t.startsWith(q)) return 500 - (t.length - q.length);
  const idx = t.indexOf(q);
  if (idx >= 0) return 300 - idx;
  let qi = 0;
  let score = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      score += 10;
      qi++;
    }
  }
  if (qi === q.length) return score - t.length;
  return 0;
}

export default function GlossaryGraph({ onSelectEntry, selectedEntryId }: GlossaryGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [links, setLinks] = useState<GraphLink[]>([]);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [draggedNode, setDraggedNode] = useState<GraphNode | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const panLastRef = useRef<{ x: number; y: number } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 500 });
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  // New: zoom & pan
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);

  // New: search
  const [searchQuery, setSearchQuery] = useState("");

  // New: view options
  const [showAllLabels, setShowAllLabels] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  // New: filters
  const [categoryFilters, setCategoryFilters] = useState<Set<GlossaryCategory>>(new Set());
  const [typeFilters, setTypeFilters] = useState<Set<GlossaryType>>(new Set());
  const [groupBy, setGroupBy] = useState<GroupMode>("categoria");
  const [filtersDrawerOpen, setFiltersDrawerOpen] = useState(false);

  // New: side detail panel
  const [detailNodeId, setDetailNodeId] = useState<string | null>(null);
  const [selectedNodeInternal, setSelectedNodeInternal] = useState<string | null>(selectedEntryId || null);

  const isMobileDevice = dimensions.width < 768;

  // Search matches (Set of node ids) with fuzzy scoring
  const searchMatches = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return null;
    const matches = new Set<string>();
    GLOSSARY_UNIFIED.forEach((e) => {
      const terms = [e.term, ...(e.altTerms || [])];
      for (const term of terms) {
        if (fuzzyScore(q, term) > 0) {
          matches.add(e.id);
          break;
        }
      }
    });
    return matches;
  }, [searchQuery]);

  // Navigation history (breadcrumb stack)
  const [history, setHistory] = useState<string[]>([]);

  const navigateToNode = (nodeId: string) => {
    setDetailNodeId(nodeId);
    setSelectedNodeInternal(nodeId);
    setHistory((prev) => {
      if (prev[prev.length - 1] === nodeId) return prev;
      const next = [...prev, nodeId];
      return next.slice(-MAX_HISTORY);
    });
  };

  const goBackInHistory = () => {
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const next = prev.slice(0, -1);
      const lastId = next[next.length - 1];
      if (lastId) {
        setDetailNodeId(lastId);
        setSelectedNodeInternal(lastId);
      } else {
        setDetailNodeId(null);
        setSelectedNodeInternal(null);
      }
      return next;
    });
  };

  // Connected node ids (for focus mode)
  const focusedNeighborIds = useMemo(() => {
    if (!focusMode || !selectedNodeInternal) return null;
    const neighbors = new Set<string>([selectedNodeInternal]);
    links.forEach((l) => {
      if (l.source === selectedNodeInternal) neighbors.add(l.target);
      if (l.target === selectedNodeInternal) neighbors.add(l.source);
    });
    return neighbors;
  }, [focusMode, selectedNodeInternal, links]);

  // Glossary index (for stats in detail panel)
  const index = useMemo(() => getGlossaryIndex(), []);

  // Current detail node
  const detailNode = useMemo(() => {
    if (!detailNodeId) return null;
    return nodes.find((n) => n.id === detailNodeId) || null;
  }, [detailNodeId, nodes]);

  // Connections of the detail node
  const detailConnections = useMemo(() => {
    if (!detailNodeId) return [] as { id: string; term: string; category: GlossaryCategory; weight: number }[];
    const result: { id: string; term: string; category: GlossaryCategory; weight: number }[] = [];
    links.forEach((l) => {
      const otherId = l.source === detailNodeId ? l.target : l.target === detailNodeId ? l.source : null;
      if (!otherId) return;
      const other = nodes.find((n) => n.id === otherId);
      if (!other) return;
      const existing = result.find((r) => r.id === otherId);
      if (existing) {
        existing.weight = Math.max(existing.weight, l.weight);
      } else {
        result.push({ id: otherId, term: other.title, category: other.category, weight: l.weight });
      }
    });
    return result.sort((a, b) => b.weight - a.weight);
  }, [detailNodeId, links, nodes]);

  // Theme observer
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Sync external selectedEntryId
  useEffect(() => {
    setSelectedNodeInternal(selectedEntryId || null);
    if (selectedEntryId) {
      setDetailNodeId(selectedEntryId);
    }
  }, [selectedEntryId]);

  // Build nodes and links
  useEffect(() => {
    const centralities = GLOSSARY_UNIFIED.map((e) => index[e.id]?.centrality || 0);
    const maxCentrality = Math.max(...centralities, 1);

    const initialNodes: GraphNode[] = GLOSSARY_UNIFIED.map((entry, i) => {
      const angle = (i * 0.5) % (Math.PI * 2);
      const dist = 30 + ((i * 17) % 60);
      const centrality = index[entry.id]?.centrality || 0;
      const radius = 4 + (centrality / maxCentrality) * 10;
      return {
        id: entry.id,
        category: entry.category,
        type: entry.type,
        title: entry.term,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius,
        entry,
        centrality
      };
    });

    // Place nodes by group at start
    initialNodes.forEach((n, i) => {
      const center =
        groupBy === "categoria"
          ? CATEGORY_CENTER_BY_CATEGORY[n.category]
          : groupBy === "tipo"
          ? TYPE_CENTER[n.type]
          : FREE_CENTER;
      const cx = dimensions.width * center.xMul;
      const cy = dimensions.height * center.yMul;
      const angle = (i * 0.5) % (Math.PI * 2);
      const dist = 30 + ((i * 17) % 60);
      n.x = cx + Math.cos(angle) * dist;
      n.y = cy + Math.sin(angle) * dist;
    });

    const linkMap: Map<string, GraphLink> = new Map();
    const addLink = (a: string, b: string, weight: number) => {
      if (a === b) return;
      const key = a < b ? `${a}|${b}` : `${b}|${a}`;
      const existing = linkMap.get(key);
      if (existing) {
        existing.weight = Math.max(existing.weight, weight);
      } else {
        linkMap.set(key, { source: a, target: b, weight });
      }
    };

    GLOSSARY_UNIFIED.forEach((entry) => {
      (entry.relatedEntries || []).forEach((relId) => {
        if (GLOSSARY_UNIFIED.some((e) => e.id === relId)) {
          addLink(entry.id, relId, 3);
        }
      });
      const coOccs = getCoOccurrences(entry.id);
      coOccs.forEach((co) => {
        if (co.count >= 2) addLink(entry.id, co.id, Math.min(co.count, 5));
      });
    });

    setNodes(initialNodes);
    setLinks(Array.from(linkMap.values()));
    // We intentionally don't depend on groupBy/dimensions here so the network
    // structure doesn't rebuild when toggling layout. The physics loop uses
    // current group centers on every frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      window.requestAnimationFrame(() => {
        setDimensions({
          width: Math.max(width, 300),
          height: Math.max(height, 420)
        });
      });
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Physics simulation
  useEffect(() => {
    if (nodes.length === 0) return;

    let animationFrameId: number;

    const step = () => {
      setNodes((currentNodes) => {
        const nextNodes = currentNodes.map((n) => ({ ...n }));
        const isMobile = dimensions.width < 768;

        const repulsionRadius = isMobile ? 80 : 110;
        for (let i = 0; i < nextNodes.length; i++) {
          const nodeA = nextNodes[i];
          for (let j = i + 1; j < nextNodes.length; j++) {
            const nodeB = nextNodes[j];
            const dx = nodeB.x - nodeA.x;
            const dy = nodeB.y - nodeA.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const minDist = nodeA.radius + nodeB.radius + 8;
            if (dist < repulsionRadius) {
              const force = (repulsionRadius - dist) * 0.02;
              const fx = (dx / dist) * force;
              const fy = (dy / dist) * force;
              if (draggedNode?.id !== nodeA.id) {
                nodeA.vx -= fx;
                nodeA.vy -= fy;
              }
              if (draggedNode?.id !== nodeB.id) {
                nodeB.vx += fx;
                nodeB.vy += fy;
              }
            }
            if (dist < minDist) {
              const overlap = minDist - dist;
              const px = (dx / dist) * overlap * 0.5;
              const py = (dy / dist) * overlap * 0.5;
              if (draggedNode?.id === nodeA.id) {
                nodeB.x += px * 2;
                nodeB.y += py * 2;
              } else if (draggedNode?.id === nodeB.id) {
                nodeA.x -= px * 2;
                nodeA.y -= py * 2;
              } else {
                nodeA.x -= px;
                nodeA.y -= py;
                nodeB.x += px;
                nodeB.y += py;
              }
            }
          }
        }

        links.forEach((link) => {
          const sourceNode = nextNodes.find((n) => n.id === link.source);
          const targetNode = nextNodes.find((n) => n.id === link.target);
          if (sourceNode && targetNode) {
            const dx = targetNode.x - sourceNode.x;
            const dy = targetNode.y - sourceNode.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const targetDist = isMobile ? 70 : 110;
            const force = (dist - targetDist) * 0.015 * link.weight * 0.3;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            if (draggedNode?.id !== sourceNode.id) {
              sourceNode.vx += fx;
              sourceNode.vy += fy;
            }
            if (draggedNode?.id !== targetNode.id) {
              targetNode.vx -= fx;
              targetNode.vy -= fy;
            }
          }
        });

        nextNodes.forEach((node) => {
          const center =
            groupBy === "categoria"
              ? CATEGORY_CENTER_BY_CATEGORY[node.category]
              : groupBy === "tipo"
              ? TYPE_CENTER[node.type]
              : FREE_CENTER;
          const cx = dimensions.width * center.xMul;
          const cy = dimensions.height * center.yMul;
          const dx = cx - node.x;
          const dy = cy - node.y;
          node.vx += dx * 0.006;
          node.vy += dy * 0.006;
          node.vx *= 0.78;
          node.vy *= 0.78;
          if (draggedNode?.id !== node.id) {
            node.x += node.vx;
            node.y += node.vy;
          }
        });

        const marginX = isMobile ? 40 : 60;
        const marginY = isMobile ? 25 : 40;
        nextNodes.forEach((node) => {
          node.x = Math.max(marginX, Math.min(dimensions.width - marginX, node.x));
          node.y = Math.max(marginY, Math.min(dimensions.height - marginY, node.y));
        });

        return nextNodes;
      });

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [links, draggedNode, dimensions, groupBy]);

  // Canvas render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    ctx.lineCap = "round";

    // Apply pan/zoom transform
    ctx.save();
    ctx.translate(panX, panY);
    ctx.scale(zoom, zoom);

    const isNodeVisible = (node: GraphNode) => {
      if (categoryFilters.size > 0 && !categoryFilters.has(node.category)) return false;
      if (typeFilters.size > 0 && !typeFilters.has(node.type)) return false;
      if (focusedNeighborIds && !focusedNeighborIds.has(node.id)) return false;
      return true;
    };

    const isSearching = searchMatches !== null;
    const isMatch = (id: string) => !searchMatches || searchMatches.has(id);

    // Draw links with curves
    links.forEach((link) => {
      const source = nodes.find((n) => n.id === link.source);
      const target = nodes.find((n) => n.id === link.target);
      if (!source || !target) return;
      if (!isNodeVisible(source) && !isNodeVisible(target)) return;

      const isSelectedLink =
        selectedNodeInternal && (source.id === selectedNodeInternal || target.id === selectedNodeInternal);
      const isHoverLink = hoveredNode && (source.id === hoveredNode.id || target.id === hoveredNode.id);
      const isHighlight = isSelectedLink || isHoverLink;
      const isMatchLink = isMatch(source.id) && isMatch(target.id);

      const grad = ctx.createLinearGradient(source.x, source.y, target.x, target.y);
      let opacity = isDark ? 0.18 : 0.1;
      if (isHighlight) {
        opacity = isSelectedLink ? 0.75 : 0.55;
      } else if (selectedNodeInternal || hoveredNode) {
        opacity = isDark ? 0.05 : 0.03;
      }
      if (isSearching && !isMatchLink) {
        opacity *= 0.2;
      }
      grad.addColorStop(0, CATEGORY_RGBA[source.category](opacity));
      grad.addColorStop(1, CATEGORY_RGBA[target.category](opacity));
      ctx.strokeStyle = grad;
      ctx.lineWidth = isHighlight ? 1.8 : 0.5 * link.weight * 0.4;

      // Curve: control point perpendicular to midpoint, alternating direction
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const curveStrength = Math.min(dist * 0.12, 28) * (stringHash(link.source + "|" + link.target) % 2 === 0 ? 1 : -1);
      const cpX = (source.x + target.x) / 2 + (-dy / dist) * curveStrength;
      const cpY = (source.y + target.y) / 2 + (dx / dist) * curveStrength;

      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.quadraticCurveTo(cpX, cpY, target.x, target.y);
      ctx.stroke();

      if (isHighlight) {
        const time = Date.now() * 0.0015;
        const count = 2;
        for (let p = 0; p < count; p++) {
          const ratio = (time + p / count) % 1;
          const flowRatio = source.id === selectedNodeInternal || source.id === hoveredNode?.id ? ratio : 1 - ratio;
          const px = source.x + (target.x - source.x) * flowRatio;
          const py = source.y + (target.y - source.y) * flowRatio;
          ctx.fillStyle = CATEGORY_RGBA[source.category](0.9);
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });

    // Animated path between selected and hovered (drawn after links, before nodes)
    if (selectedNodeInternal && hoveredNode && selectedNodeInternal !== hoveredNode.id) {
      const source = nodes.find((n) => n.id === selectedNodeInternal);
      const target = nodes.find((n) => n.id === hoveredNode.id);
      if (source && target && isNodeVisible(source) && isNodeVisible(target)) {
        const directLink = links.some(
          (l) =>
            (l.source === selectedNodeInternal && l.target === hoveredNode!.id) ||
            (l.target === selectedNodeInternal && l.source === hoveredNode!.id)
        );
        ctx.save();
        if (directLink) {
          ctx.strokeStyle = CATEGORY_RGBA[source.category](isDark ? 0.95 : 0.9);
          ctx.lineWidth = 2.2;
          ctx.setLineDash([]);
        } else {
          ctx.strokeStyle = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)";
          ctx.lineWidth = 1.2;
          ctx.setLineDash([5, 4]);
          ctx.lineDashOffset = -Date.now() * 0.03;
        }
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }
    }

    // Draw nodes
    nodes.forEach((node) => {
      const isSelected = selectedNodeInternal === node.id;
      const isHovered = hoveredNode?.id === node.id;
      const isDimmed = (selectedNodeInternal || hoveredNode || isSearching) && !isSelected && !isHovered;
      const isFilteredOut = !isNodeVisible(node);
      const matchesSearch = isMatch(node.id);

      // Direct neighbor of selected (one hop)
      const isDirectNeighbor =
        selectedNodeInternal &&
        !isSelected &&
        links.some(
          (l) =>
            (l.source === selectedNodeInternal && l.target === node.id) ||
            (l.target === selectedNodeInternal && l.source === node.id)
        );

      let alpha = 1;
      if (isFilteredOut) alpha = 0.08;
      else if (isSearching && !matchesSearch) alpha = 0.15;
      else if (isDimmed) alpha = 0.3;

      const r = node.radius * (isHovered || isSelected ? 1.25 : 1);

      // Outer glow for selected and direct neighbors
      if (!isFilteredOut && (isSelected || isDirectNeighbor)) {
        const glowR = r + (isSelected ? 14 : 8);
        const glowAlpha = isSelected ? 0.28 : 0.18;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = CATEGORY_RGBA[node.category](glowAlpha);
        ctx.fill();
      }

      if ((isHovered || isSelected) && !isFilteredOut) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, r + 6, 0, Math.PI * 2);
        ctx.fillStyle = CATEGORY_RGBA[node.category](isDark ? 0.22 : 0.15);
        ctx.fill();
      }

      if (isSelected && !isFilteredOut) {
        const time = Date.now() * 0.002;
        const pulse = 0.5 + Math.sin(time) * 0.3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r + 10 + pulse * 2, 0, Math.PI * 2);
        ctx.strokeStyle = CATEGORY_RGBA[node.category](isDark ? 0.6 * pulse : 0.5 * pulse);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx.fillStyle = CATEGORY_RGBA[node.category](alpha * (isSelected ? 1 : 0.85));
      ctx.fill();

      if (isSelected || isHovered) {
        ctx.strokeStyle = isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Labels: also auto-show when zoomed in
      const shouldDrawLabel =
        !isFilteredOut &&
        (showAllLabels ||
          isHovered ||
          isSelected ||
          node.radius > 8 ||
          (isSearching && matchesSearch) ||
          zoom > 1.5);
      if (shouldDrawLabel) {
        const fontSize = (isHovered || isSelected ? 11 : 10) / Math.max(zoom, 0.7);
        ctx.font = `${isHovered || isSelected ? "bold " : ""}${fontSize}px ui-monospace, monospace`;
        const label = node.title.length > 22 ? `${node.title.slice(0, 20)}…` : node.title;
        const textWidth = ctx.measureText(label).width;
        const paddingX = 4;
        const paddingY = 2;
        const pillX = node.x - textWidth / 2 - paddingX;
        const pillY = node.y + r + 4;
        const pillW = textWidth + paddingX * 2;
        const pillH = fontSize + paddingY * 2;

        // Background pill for legibility
        ctx.fillStyle = isDark
          ? `rgba(15, 20, 20, ${alpha * 0.78})`
          : `rgba(255, 255, 255, ${alpha * 0.82})`;
        ctx.beginPath();
        if (typeof (ctx as any).roundRect === "function") {
          (ctx as any).roundRect(pillX, pillY, pillW, pillH, 3);
        } else {
          ctx.rect(pillX, pillY, pillW, pillH);
        }
        ctx.fill();

        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = isDark ? `rgba(243, 240, 240, ${alpha})` : `rgba(27, 28, 28, ${alpha})`;
        ctx.fillText(label, node.x, pillY + paddingY);
      }
    });

    ctx.restore();
  }, [
    nodes,
    links,
    hoveredNode,
    selectedNodeInternal,
    dimensions,
    isDark,
    categoryFilters,
    typeFilters,
    focusedNeighborIds,
    searchMatches,
    showAllLabels,
    zoom,
    panX,
    panY
  ]);

  // Coordinate helpers (inverse of pan/zoom)
  const toCanvasCoords = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const screenX = clientX - rect.left;
    const screenY = clientY - rect.top;
    return {
      x: (screenX - panX) / zoom,
      y: (screenY - panY) / zoom
    };
  };

  const getNodeAt = (logicalX: number, logicalY: number): GraphNode | null => {
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      const dx = logicalX - n.x;
      const dy = logicalY - n.y;
      const hitRadius = (n.radius + 4) / Math.max(zoom, 0.5);
      if (Math.sqrt(dx * dx + dy * dy) < hitRadius) {
        return n;
      }
    }
    return null;
  };

  // Mouse handlers
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Only treat as click if no drag happened
    const { x, y } = toCanvasCoords(e.clientX, e.clientY);
    const clicked = getNodeAt(x, y);
    if (clicked) {
      navigateToNode(clicked.id);
    } else {
      setDetailNodeId(null);
      setSelectedNodeInternal(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = toCanvasCoords(e.clientX, e.clientY);
    const target = getNodeAt(x, y);
    if (target) {
      setDraggedNode(target);
      setIsPanning(false);
    } else {
      setIsPanning(true);
      panLastRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (draggedNode) {
      const { x, y } = toCanvasCoords(e.clientX, e.clientY);
      setNodes((current) =>
        current.map((n) => (n.id === draggedNode.id ? { ...n, x, y, vx: 0, vy: 0 } : n))
      );
      return;
    }
    if (isPanning && panLastRef.current) {
      const dx = e.clientX - panLastRef.current.x;
      const dy = e.clientY - panLastRef.current.y;
      panLastRef.current = { x: e.clientX, y: e.clientY };
      setPanX((p) => p + dx);
      setPanY((p) => p + dy);
      return;
    }
    const { x, y } = toCanvasCoords(e.clientX, e.clientY);
    setHoveredNode(getNodeAt(x, y));
  };

  const handleMouseUpOrLeave = () => {
    setDraggedNode(null);
    setIsPanning(false);
    panLastRef.current = null;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const delta = -e.deltaY * 0.001;
    const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom * (1 + delta)));
    const ratio = newZoom / zoom;
    setPanX((p) => mouseX - (mouseX - p) * ratio);
    setPanY((p) => mouseY - (mouseY - p) * ratio);
    setZoom(newZoom);
  };

  // Zoom controls
  const zoomIn = () => {
    const newZoom = Math.min(MAX_ZOOM, zoom + ZOOM_STEP);
    const cx = dimensions.width / 2;
    const cy = dimensions.height / 2;
    const ratio = newZoom / zoom;
    setPanX((p) => cx - (cx - p) * ratio);
    setPanY((p) => cy - (cy - p) * ratio);
    setZoom(newZoom);
  };
  const zoomOut = () => {
    const newZoom = Math.max(MIN_ZOOM, zoom - ZOOM_STEP);
    const cx = dimensions.width / 2;
    const cy = dimensions.height / 2;
    const ratio = newZoom / zoom;
    setPanX((p) => cx - (cx - p) * ratio);
    setPanY((p) => cy - (cy - p) * ratio);
    setZoom(newZoom);
  };
  const resetView = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        if (e.key === "Escape") {
          (target as HTMLInputElement).blur();
        }
        return;
      }
      if (e.key === "/") {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "Escape") {
        setSearchQuery("");
        setDetailNodeId(null);
        setSelectedNodeInternal(null);
        setHistory([]);
        setFiltersDrawerOpen(false);
      } else if (e.key === "f" || e.key === "F") {
        setFocusMode((prev) => !prev);
      } else if (e.key === "l" || e.key === "L") {
        setShowAllLabels((prev) => !prev);
      } else if ((e.key === "z" || e.key === "Z") && (e.metaKey || e.ctrlKey)) {
        // Cmd/Ctrl+Z = back in history
        e.preventDefault();
        goBackInHistory();
      } else if (e.key === "Backspace" && history.length > 0) {
        e.preventDefault();
        goBackInHistory();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const activeFilterCount = categoryFilters.size + typeFilters.size;
  const visibleNodesCount = nodes.filter(
    (n) =>
      (categoryFilters.size === 0 || categoryFilters.has(n.category)) &&
      (typeFilters.size === 0 || typeFilters.has(n.type)) &&
      (!focusedNeighborIds || focusedNeighborIds.has(n.id))
  ).length;

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* ============== TOP CONTROL BAR ============== */}
      <div className="absolute top-0 left-0 right-0 z-30 p-3 pointer-events-none">
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
          {/* Title */}
          <div className="glass-enhance rounded-md px-3 py-1.5 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase whitespace-nowrap">
              Red · {visibleNodesCount}/{nodes.length}
            </span>
          </div>

          {/* Search */}
          <div className="glass-enhance rounded-md relative before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-on-surface-variant/50 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar… (/ para enfocar)"
              className="bg-transparent outline-none pl-8 pr-8 py-1.5 text-[11px] w-44 placeholder:text-on-surface-variant/40 text-on-surface"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-surface-dim text-on-surface-variant hover:text-on-surface"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Zoom controls */}
          <div className="glass-enhance rounded-md flex items-center before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative">
            <button
              onClick={zoomOut}
              className="p-1.5 hover:text-primary text-on-surface-variant transition-colors"
              aria-label="Zoom out"
              title="Zoom -"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-on-surface-variant px-1.5 min-w-[36px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={zoomIn}
              className="p-1.5 hover:text-primary text-on-surface-variant transition-colors"
              aria-label="Zoom in"
              title="Zoom +"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-4 bg-outline-variant/30 mx-0.5" />
            <button
              onClick={resetView}
              className="p-1.5 hover:text-primary text-on-surface-variant transition-colors"
              aria-label="Reset view"
              title="Reset"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Toggle labels */}
          <button
            onClick={() => setShowAllLabels((p) => !p)}
            className={`glass-enhance rounded-md p-1.5 transition-colors before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative ${
              showAllLabels ? "text-primary" : "text-on-surface-variant hover:text-primary"
            }`}
            aria-label="Mostrar etiquetas"
            title="Etiquetas (L)"
          >
            {showAllLabels ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>

          {/* Focus mode */}
          <button
            onClick={() => setFocusMode((p) => !p)}
            className={`glass-enhance rounded-md p-1.5 transition-colors before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative ${
              focusMode ? "text-primary" : "text-on-surface-variant hover:text-primary"
            }`}
            aria-label="Modo foco"
            title="Modo foco (F)"
          >
            <Crosshair className="w-3.5 h-3.5" />
          </button>

          {/* Filters drawer toggle */}
          <button
            onClick={() => setFiltersDrawerOpen(true)}
            className="glass-enhance rounded-md px-2.5 py-1.5 flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative"
            aria-label="Abrir filtros"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono uppercase tracking-widest">Filtros</span>
            {activeFilterCount > 0 && (
              <span className="text-[9px] font-mono bg-primary text-on-primary rounded-full w-4 h-4 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Category dots legend (always visible) */}
          <div className="glass-enhance rounded-md px-2.5 py-1.5 flex items-center gap-2 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative">
            {GLOSSARY_CATEGORIES.map((cat) => (
              <span
                key={cat.id}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: `var(--${cat.color})` }}
                title={cat.label}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ============== BREADCRUMB (NAVIGATION HISTORY) ============== */}
      <AnimatePresence>
        {history.length > 0 && (
          <motion.div
            key="breadcrumb"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-[68px] left-3 z-30 pointer-events-auto"
          >
            <div className="glass-enhance rounded-md px-2.5 py-1.5 flex items-center gap-1.5 max-w-[calc(100vw-1.5rem)] overflow-x-auto custom-scrollbar before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
              <Home className="w-3 h-3 text-on-surface-variant shrink-0" />
              {history.map((id, i) => {
                const entry = GLOSSARY_UNIFIED.find((e) => e.id === id);
                if (!entry) return null;
                const isLast = i === history.length - 1;
                const isCurrent = i === history.length - 1;
                return (
                  <React.Fragment key={`${id}-${i}`}>
                    <button
                      onClick={() => {
                        setHistory((prev) => prev.slice(0, i + 1));
                        setDetailNodeId(id);
                        setSelectedNodeInternal(id);
                      }}
                      className={`text-[10px] font-mono uppercase tracking-widest whitespace-nowrap transition-colors ${
                        isCurrent
                          ? "text-primary font-bold"
                          : "text-on-surface-variant hover:text-primary"
                      }`}
                      title={entry.term}
                    >
                      {entry.term.length > 20 ? entry.term.slice(0, 18) + "…" : entry.term}
                    </button>
                    {!isLast && <ChevronRight className="w-3 h-3 text-on-surface-variant/40 shrink-0" />}
                  </React.Fragment>
                );
              })}
              {history.length > 1 && (
                <>
                  <div className="w-px h-3 bg-outline-variant/30 mx-1 shrink-0" />
                  <button
                    onClick={goBackInHistory}
                    className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant hover:text-primary shrink-0"
                    title="Atrás (Backspace)"
                  >
                    ← Atrás
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============== FILTERS DRAWER ============== */}
      <AnimatePresence>
        {filtersDrawerOpen && (
          <>
            <motion.div
              key="filters-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFiltersDrawerOpen(false)}
              className="absolute inset-0 z-40 bg-black/30 backdrop-blur-sm"
            />
            <motion.div
              key="filters-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] glass-enhance border-l border-outline-variant/30 p-5 overflow-y-auto custom-scrollbar before:content-[''] before:absolute before:inset-0 before:bg-surface-dim/40 dark:before:bg-surface-dim/20 before:backdrop-blur-xl before:z-[-1] before:pointer-events-none"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold">
                  Filtros
                </h3>
                <button
                  onClick={() => setFiltersDrawerOpen(false)}
                  className="p-1.5 rounded-md hover:bg-surface-dim text-on-surface-variant hover:text-on-surface"
                  aria-label="Cerrar filtros"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Categorías */}
              <div className="mb-6">
                <div className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant/60 mb-2">
                  Categoría
                </div>
                <div className="space-y-1.5">
                  {GLOSSARY_CATEGORIES.map((cat) => {
                    const checked = categoryFilters.has(cat.id);
                    return (
                      <label
                        key={cat.id}
                        className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-md hover:bg-surface-dim/40 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            setCategoryFilters((prev) => {
                              const next = new Set(prev);
                              if (next.has(cat.id)) next.delete(cat.id);
                              else next.add(cat.id);
                              return next;
                            })
                          }
                          className="accent-primary w-3.5 h-3.5"
                        />
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: `var(--${cat.color})` }}
                        />
                        <span className="text-[12px] text-on-surface">{cat.label}</span>
                      </label>
                    );
                  })}
                </div>
                <p className="text-[10px] text-on-surface-variant/50 mt-2 italic">
                  Vacío = todas las categorías
                </p>
              </div>

              {/* Tipos */}
              <div className="mb-6">
                <div className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant/60 mb-2">
                  Tipo
                </div>
                <div className="space-y-1.5">
                  {GLOSSARY_TYPES.map((t) => {
                    const checked = typeFilters.has(t.id);
                    return (
                      <label
                        key={t.id}
                        className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-md hover:bg-surface-dim/40 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            setTypeFilters((prev) => {
                              const next = new Set(prev);
                              if (next.has(t.id)) next.delete(t.id);
                              else next.add(t.id);
                              return next;
                            })
                          }
                          className="accent-primary w-3.5 h-3.5"
                        />
                        <span className="text-[12px] text-on-surface">{t.label}</span>
                      </label>
                    );
                  })}
                </div>
                <p className="text-[10px] text-on-surface-variant/50 mt-2 italic">
                  Vacío = todos los tipos
                </p>
              </div>

              {/* Agrupar */}
              <div className="mb-6">
                <div className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant/60 mb-2">
                  Agrupar por
                </div>
                <div className="flex flex-col gap-1.5">
                  {([
                    { id: "categoria", label: "Categoría" },
                    { id: "tipo", label: "Tipo" },
                    { id: "libre", label: "Libre" }
                  ] as { id: GroupMode; label: string }[]).map((g) => (
                    <label
                      key={g.id}
                      className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-md hover:bg-surface-dim/40 transition-colors"
                    >
                      <input
                        type="radio"
                        name="groupBy"
                        checked={groupBy === g.id}
                        onChange={() => setGroupBy(g.id)}
                        className="accent-primary w-3.5 h-3.5"
                      />
                      <span className="text-[12px] text-on-surface">{g.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setCategoryFilters(new Set());
                  setTypeFilters(new Set());
                }}
                className="w-full text-[10px] font-mono uppercase tracking-widest py-2 rounded-md border border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
              >
                Limpiar filtros
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============== SIDE DETAIL PANEL ============== */}
      <AnimatePresence>
        {detailNode && (
          <motion.div
            key="detail-panel"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 right-0 bottom-0 z-40 w-80 max-w-[85vw] glass-enhance border-l border-outline-variant/30 p-5 overflow-y-auto custom-scrollbar flex flex-col before:content-[''] before:absolute before:inset-0 before:bg-surface-dim/40 dark:before:bg-surface-dim/20 before:backdrop-blur-xl before:z-[-1] before:pointer-events-none"
          >
            <div className="flex items-start justify-between gap-2 mb-4">
              <div className="flex flex-col gap-2 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: CATEGORY_RGBA[detailNode.category](1) }}
                  />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant/70">
                    {GLOSSARY_CATEGORIES.find((c) => c.id === detailNode.category)?.label}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-primary/70 px-1.5 py-0.5 border border-primary/30 rounded-sm">
                    {detailNode.type}
                  </span>
                </div>
                <h3 className="text-body-md font-medium text-on-surface leading-tight">
                  {detailNode.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  setDetailNodeId(null);
                  setSelectedNodeInternal(null);
                  setHistory([]);
                }}
                className="p-1.5 rounded-md hover:bg-surface-dim text-on-surface-variant hover:text-on-surface shrink-0"
                aria-label="Cerrar detalle"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {detailNode.entry.shortDef && (
              <p className="text-[12px] text-on-surface-variant/80 leading-relaxed mb-4">
                {detailNode.entry.shortDef}
              </p>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center p-2 rounded-md border border-outline-variant/20 bg-surface-dim/30">
                <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/60 mb-0.5">
                  Apariciones
                </div>
                <div className="text-[14px] font-mono text-primary font-bold">
                  {index[detailNode.id]?.count || 0}
                </div>
              </div>
              <div className="text-center p-2 rounded-md border border-outline-variant/20 bg-surface-dim/30">
                <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/60 mb-0.5">
                  Centralidad
                </div>
                <div className="text-[14px] font-mono text-primary font-bold">
                  {detailNode.centrality}
                </div>
              </div>
              <div className="text-center p-2 rounded-md border border-outline-variant/20 bg-surface-dim/30">
                <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/60 mb-0.5">
                  Conexiones
                </div>
                <div className="text-[14px] font-mono text-primary font-bold">
                  {detailConnections.length}
                </div>
              </div>
            </div>

            {/* Connections */}
            {detailConnections.length > 0 && (
              <div className="mb-4">
                <div className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant/60 mb-2">
                  Conectado con
                </div>
                <div className="space-y-1 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                  {detailConnections.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => navigateToNode(c.id)}
                      className="w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-md border border-outline-variant/15 hover:border-primary/40 hover:bg-surface-dim/40 transition-all group"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: CATEGORY_RGBA[c.category](1) }}
                      />
                      <span className="text-[12px] text-on-surface flex-1 truncate">{c.term}</span>
                      <span className="text-[9px] font-mono text-on-surface-variant/50 group-hover:text-primary">
                        ×{c.weight}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => onSelectEntry(detailNode.entry)}
              className="mt-auto w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-primary text-on-primary text-[11px] font-mono uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Ver entrada completa
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============== CANVAS ============== */}
      <div ref={containerRef} className="flex-1 w-full relative min-h-[400px] overflow-hidden">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onWheel={handleWheel}
          className={`absolute inset-0 w-full h-full ${
            isPanning ? "cursor-grabbing" : draggedNode ? "cursor-grabbing" : hoveredNode ? "cursor-pointer" : "cursor-grab"
          }`}
        />

        {/* Hover tooltip */}
        <AnimatePresence>
          {hoveredNode && !detailNodeId && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="absolute top-4 left-4 max-w-[280px] p-3 glass-enhance rounded-md border border-outline-variant/30 z-20 pointer-events-none before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/30 dark:before:bg-surface-dim/15 before:backdrop-blur-md before:z-[-1] before:pointer-events-none"
            >
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CATEGORY_RGBA[hoveredNode.category](1) }} />
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">
                  {GLOSSARY_CATEGORIES.find((c) => c.id === hoveredNode.category)?.label}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-primary/70 px-1.5 py-0.5 border border-primary/30 rounded-sm">
                  {GLOSSARY_TYPES.find((t) => t.id === hoveredNode.type)?.label || hoveredNode.type}
                </span>
              </div>
              <p className="text-[12px] font-medium text-on-surface leading-snug">{hoveredNode.title}</p>
              {hoveredNode.entry.shortDef && (
                <p className="text-[11px] text-on-surface-variant/70 leading-relaxed mt-1 line-clamp-2">
                  {hoveredNode.entry.shortDef}
                </p>
              )}
              <div className="flex items-center gap-3 mt-2 pt-2 border-t border-outline-variant/15">
                <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant/60">
                  Centralidad <span className="text-primary font-bold">{hoveredNode.centrality}</span>
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant/60">
                  Conexiones <span className="text-primary font-bold">
                    {links.filter(
                      (l) => l.source === hoveredNode.id || l.target === hoveredNode.id
                    ).length}
                  </span>
                </span>
              </div>
              <p className="text-[9px] font-mono uppercase tracking-widest text-primary/60 mt-2">Click para detalle →</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help hint (only first time, can be localStorage-gated) */}
        {nodes.length > 0 && !hoveredNode && !detailNodeId && (
          <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
            <div className="glass-enhance rounded-md px-2.5 py-1.5 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-sm before:z-[-1] before:pointer-events-none">
              <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant/60">
                <Network className="w-3 h-3 inline mr-1 -mt-0.5" />
                Arrastra · Rueda = zoom · / = buscar · F = foco · L = etiquetas · Backspace = atrás
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
