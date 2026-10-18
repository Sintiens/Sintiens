import type { TabType } from "../types";
import CompactIndexNav from "./CompactIndexNav";

interface MiniTabNavProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  theme: "dark" | "light";
  onToggleTheme: (rect?: DOMRect) => void;
}

export default function MiniTabNav(props: MiniTabNavProps) {
  return <CompactIndexNav {...props} />;
}