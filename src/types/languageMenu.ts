export interface LanguageMenuProps {
  /** Se il submenu è espanso o no */
  isExpanded: boolean;
  /** Callback quando si clicca il menu principale */
  onToggle: () => void;
  /** Callback quando si cambia lingua (per chiudere la sidebar) */
  onLanguageChange?: () => void;
}