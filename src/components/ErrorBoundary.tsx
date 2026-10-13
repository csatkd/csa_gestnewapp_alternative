// Error Boundary Component
import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-white font-bold text-xl mb-2">Oups ! Une erreur est survenue</h2>
            <p className="text-slate-400 text-sm mb-6">
              L'application a rencontré un problème inattendu. Veuillez rafraîchir la page ou réessayer.
            </p>
            {this.state.error && (
              <div className="bg-slate-900/50 rounded-lg p-3 mb-6 text-left">
                <p className="text-red-400 text-xs font-mono break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              Réessayer
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Component
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizes[size]} border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin`}></div>
    </div>
  );
}

// Empty State Component
export function EmptyState({ icon: Icon, title, description, action }: {
  icon: any;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-slate-500" />
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm mb-6 max-w-md">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// Confirmation Modal
export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  type = 'warning',
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: 'warning' | 'danger' | 'info';
}) {
  if (!isOpen) return null;

  const colors = {
    warning: { bg: 'bg-amber-500/20', text: 'text-amber-400', button: 'bg-amber-600 hover:bg-amber-700' },
    danger: { bg: 'bg-red-500/20', text: 'text-red-400', button: 'bg-red-600 hover:bg-red-700' },
    info: { bg: 'bg-blue-500/20', text: 'text-blue-400', button: 'bg-blue-600 hover:bg-blue-700' },
  };

  const color = colors[type];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 ${color.bg} rounded-full flex items-center justify-center`}>
            <AlertCircle className={`w-6 h-6 ${color.text}`} />
          </div>
          <h3 className="text-white font-semibold text-lg">{title}</h3>
        </div>
        <p className="text-slate-300 mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className={`flex-1 ${color.button} text-white py-2 rounded-lg font-medium transition-colors`}
          >
            {confirmLabel}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-medium transition-colors"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
