export interface ThemeMenuProps {
  /** Se il submenu è espanso o no */
  isExpanded: boolean;
  /** Callback quando si clicca il menu principale */
  onToggle: () => void;
}
