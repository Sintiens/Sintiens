import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class AppErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[Sintiens ErrorBoundary] Captured uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#09090b] text-[#fafafa] flex flex-col items-center justify-center p-6 text-center font-sans select-text">
          <div className="max-w-lg w-full bg-zinc-900/80 border border-red-500/30 rounded-3xl p-8 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="inline-flex p-3 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-zinc-100">
                {this.props.fallbackTitle || "Se produjo un problema al cargar esta seccion"}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Ocurrio un error inesperado al renderizar el contenido. Puedes intentar recargar la pagina o volver al inicio.
              </p>
            </div>

            {this.state.error && (
              <div className="text-left bg-zinc-950/90 border border-zinc-800 rounded-xl p-4 text-[11px] font-mono text-red-300/90 overflow-x-auto max-h-48 leading-relaxed select-text">
                <p className="font-bold text-red-400 mb-1">{this.state.error.name}: {this.state.error.message}</p>
                {this.state.error.stack && (
                  <pre className="text-[10px] text-zinc-500 font-mono whitespace-pre-wrap">
                    {this.state.error.stack.split("\n").slice(0, 5).join("\n")}
                  </pre>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-950/50"
              >
                <RotateCcw className="w-4 h-4" />
                Recargar pagina
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer border border-zinc-700"
              >
                <Home className="w-4 h-4" />
                Ir al Inicio
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
