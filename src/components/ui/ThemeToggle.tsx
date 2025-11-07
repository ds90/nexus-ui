'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { useEffect, useRef, useState } from 'react'

export default function ThemeToggle() {
  // ==========================================
  // HOOKS
  // ==========================================
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // ==========================================
  // CHIUDI DROPDOWN AL CLICK FUORI
  // ==========================================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Se clicco fuori dal dropdown, chiudi
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    // Aggiungi listener solo se dropdown è aperto
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    // Cleanup: rimuovi listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // ==========================================
  // HANDLER: Cambia theme
  // ==========================================
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    setIsOpen(false) // Chiudi dropdown dopo selezione
  }

  // ==========================================
  // ICONA DINAMICA - Mostra icona del theme attivo
  // ==========================================
  const getIcon = () => {
    // Se utente ha scelto 'system', mostra icona 💻
    if (theme === 'system') {
      return '💻'
    }
    // Altrimenti mostra icona del theme effettivo
    return resolvedTheme === 'dark' ? '🌙' : '☀️'
  }

  // ==========================================
  // LABEL - Testo leggibile del theme
  // ==========================================
  const getLabel = (themeOption: 'light' | 'dark' | 'system') => {
    switch (themeOption) {
      case 'light':
        return 'Chiaro'
      case 'dark':
        return 'Scuro'
      case 'system':
        return 'Sistema'
    }
  }

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bottone Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Cambia tema"
      >
        <span className="text-2xl">{getIcon()}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          {/* Opzione: Light */}
          <button
            onClick={() => handleThemeChange('light')}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="text-xl">☀️</span>
              <span className="text-gray-700 dark:text-gray-200">
                {getLabel('light')}
              </span>
            </span>
            {theme === 'light' && (
              <span className="text-secondary">✓</span>
            )}
          </button>

          {/* Opzione: Dark */}
          <button
            onClick={() => handleThemeChange('dark')}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="text-xl">🌙</span>
              <span className="text-gray-700 dark:text-gray-200">
                {getLabel('dark')}
              </span>
            </span>
            {theme === 'dark' && (
              <span className="text-secondary">✓</span>
            )}
          </button>

          {/* Opzione: System */}
          <button
            onClick={() => handleThemeChange('system')}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="text-xl">💻</span>
              <span className="text-gray-700 dark:text-gray-200">
                {getLabel('system')}
              </span>
            </span>
            {theme === 'system' && (
              <span className="text-secondary">✓</span>
            )}
          </button>
        </div>
      )}
    </div>
  )
}