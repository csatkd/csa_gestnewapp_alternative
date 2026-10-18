import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  description: string;
  action: () => void;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      shortcuts.forEach(shortcut => {
        const ctrlMatch = shortcut.ctrl ? (e.ctrlKey || e.metaKey) : !(e.ctrlKey || e.metaKey);
        const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;
        const altMatch = shortcut.alt ? e.altKey : !e.altKey;
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();

        if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
          e.preventDefault();
          shortcut.action();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

export function useGlobalShortcuts(actions: {
  onSearch?: () => void;
  onDashboard?: () => void;
  onLogout?: () => void;
  onHelp?: () => void;
}) {
  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'k',
      ctrl: true,
      description: 'Ouvrir la recherche',
      action: actions.onSearch || (() => {})
    },
    {
      key: 'd',
      ctrl: true,
      shift: true,
      description: 'Aller au tableau de bord',
      action: actions.onDashboard || (() => {})
    },
    {
      key: 'q',
      ctrl: true,
      shift: true,
      description: 'Déconnexion',
      action: actions.onLogout || (() => {})
    },
    {
      key: '?',
      shift: true,
      description: 'Aide',
      action: actions.onHelp || (() => {})
    }
  ];

  useKeyboardShortcuts(shortcuts);
}
