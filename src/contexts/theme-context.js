import { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Restart } from 'fiction-expo-restart'

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark')
    const [isFirstTime, setFirstTime] = useState(true)

    useEffect(() => {
        ;(async () => {
            try {
                const theme = await AsyncStorage.getItem('@theme')
                setTheme(theme || 'dark')
            } catch (e) {
                console.log(e)
            }
        })()
    }, [])

    const storeData = async (value, key) => {
        try {
            await AsyncStorage.setItem(`@${key}`, value)
        } catch (e) {
            console.log(e)
        }
    }

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        storeData(theme === 'dark' ? 'light' : 'dark', 'theme')

        // Restart app
        Restart()
    }

    const toggleFirstTime = () => {
        setFirstTime(0)
        storeData('false', 'isFirstTime')
    }

    const value = {
        theme,
        toggleTheme,
        isFirstTime,
        toggleFirstTime,
    }

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export { ThemeProvider, ThemeContext }
