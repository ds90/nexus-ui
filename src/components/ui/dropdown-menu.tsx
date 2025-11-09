"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

interface DropdownMenuLabelProps {
  children: React.ReactNode;
  className?: string;
}

interface DropdownMenuSeparatorProps {
  className?: string;
}

const DropdownMenuContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative"> {children}</div>
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({ children, asChild }: DropdownMenuTriggerProps) {
  const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext);

  const handleClick = () => setIsOpen(!isOpen);

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: handleClick,
    });
  }
  return (
    <button onClick={handleClick} className="outline-none">
      {children}
    </button>
  );
}

export function DropdownMenuContent({
  children,
  align = "end",
  className = "",
}: DropdownMenuContentProps) {
  const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  const alignmentClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  return (
    <div
      ref={contentRef}
      className={`absolute top-full z-50 mt-2 min-w-[200px] rounded-lg border border-border bg-card py-1 shadow-lg ${alignmentClasses[align]} ${className}`}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  onClick,
  className = "",
  disabled = false,
}: DropdownMenuItemProps) {
  const { setIsOpen } = React.useContext(DropdownMenuContext);

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
      setIsOpen(false);
    }
  };
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export function DropdownMenuLabel({ children, className = "" }: DropdownMenuLabelProps) {
  return (
    <div className={`px-3 py-2 text-sm font-semibold text-muted-foreground ${className}`}>
      {children}
    </div>
  );
}

export function DropdownMenuSeparator({ className = "" }: DropdownMenuSeparatorProps) {
  return <div className={`my-1 h-px bg-border ${className}`} />;
}

export function DropdownMenuSubTrigger({ children, className = "" }: DropdownMenuItemProps) {
  return (
    <div
      className={`flex w-full items-center justify-center px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted ${className}`}
    >
      {children}
    </div>
  );
}
