import { createContext, ReactNode } from 'react'

interface PreferenceContext {
  toggleTheme: () => void
  isDark: boolean
}

export const PreferenceContext = createContext<null | PreferenceContext>(null)

export const PreferenceProvider = ({
  value,
  children,
}: {
  value: PreferenceContext
  children: ReactNode
}) => <PreferenceContext.Provider value={value}>{children}</PreferenceContext.Provider>
