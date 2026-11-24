import { createContext, useContext } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // Aquí irá la lógica del modo oscuro (useState + useEffect)
  return (
    <ThemeContext.Provider value={{}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)