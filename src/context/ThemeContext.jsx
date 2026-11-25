import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [esOscuro, setEsOscuro] = useState(() => {
    return localStorage.getItem('tema') === 'oscuro'
  })

  useEffect(() => {
    const pagina = document.documentElement
    if (esOscuro) {
      pagina.classList.add('modo-oscuro')
      localStorage.setItem('tema', 'oscuro')
    } else {
      pagina.classList.remove('modo-oscuro')
      localStorage.setItem('tema', 'claro')
    }
  }, [esOscuro])

  const alternarTema = () => setEsOscuro((prev) => !prev)

  return (
    <ThemeContext.Provider value={{ esOscuro, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)