import { ThemeContext } from '../contexts/theme-context'
import { useContext } from 'react'

const useDarkMode = () => {
    const context = useContext(ThemeContext)

    context.toggleTheme()

    console.log(context.theme)
}

export default useDarkMode
