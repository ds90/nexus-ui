'use client'

import { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react'

// ==========================================
// 1. TYPE DEFINITIONS
// ==========================================

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

// ==========================================
// 2. CONTEXT CREATION
// ==========================================

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// ==========================================
// 3. THEME PROVIDER COMPONENT
// ==========================================

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // ==========================================
  // STATE: Theme selezionato dall'utente
  // ==========================================
  const [theme, setTheme] = useState<Theme>(() => {
    // Controllo SSR
    if (typeof window === 'undefined') return 'light'
    
    // Legge da localStorage
    const savedTheme = localStorage.getItem('nexus-theme') as Theme | null
    
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      return savedTheme
    }
    
    localStorage.setItem('nexus-theme', 'light')
    return 'light'
  })

  // ==========================================
  // DERIVED VALUE: Theme effettivamente attivo
  // ==========================================
  const resolvedTheme = useMemo<ResolvedTheme>(() => {
    // Controllo SSR
    if (typeof window === 'undefined') return 'light'
    
    if (theme === 'system') {
      // Chiedi al browser la preferenza OS
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return prefersDark ? 'dark' : 'light'
    }
    
    return theme as ResolvedTheme
  }, [theme])

  // ==========================================
  // EFFECT: Applica classe 'dark' su <html>
  // ==========================================
  useEffect(() => {
    const root = document.documentElement

    if (resolvedTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [resolvedTheme])

  // ==========================================
  // EFFECT: Salva theme in localStorage
  // ==========================================
  useEffect(() => {
    localStorage.setItem('nexus-theme', theme)
  }, [theme])

  // ==========================================
  // EFFECT: Listener per cambio preferenza OS
  // ==========================================
  useEffect(() => {
    // Solo se theme è 'system'
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      // Quando preferenza OS cambia, useMemo ricalcolerà resolvedTheme
      // che triggererà l'effect per applicare la classe
      // Forziamo un re-render cambiando theme (stesso valore ma trigger update)
      setTheme('system')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  // ==========================================
  // PROVIDER
  // ==========================================
  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// ==========================================
// 4. CUSTOM HOOK
// ==========================================

export function useTheme() {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error('useTheme deve essere usato dentro ThemeProvider')
  }
  
  return context
}