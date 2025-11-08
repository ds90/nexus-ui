import { ReactNode } from "react";

export interface SubmenuProps {
  /** Icona mostrata a sinistra del label */
  icon: ReactNode;
  /** Testo del menu principale */
  label: string;
  /** Se il submenu è espanso o no */
  isExpanded: boolean;
  /** Callback quando si clicca il menu principale */
  onToggle: () => void;
  /** Contenuto del submenu (opzioni) */
  children: ReactNode;
}
