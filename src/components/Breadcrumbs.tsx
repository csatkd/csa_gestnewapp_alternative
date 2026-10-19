import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  view?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-4">
      <button
        onClick={() => items[0]?.onClick?.()}
        className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Accueil</span>
      </button>
      
      {items.slice(1).map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-slate-600" />
          {index === items.length - 2 ? (
            <span className="text-white font-medium">{item.label}</span>
          ) : (
            <button
              onClick={item.onClick}
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              {item.label}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
}
