import { ThemeProvider } from './src/contexts/theme-context'

import Main from './Main'

export default function App() {
    return (
        <>
            <ThemeProvider>
                <Main />
            </ThemeProvider>
        </>
    )
}
