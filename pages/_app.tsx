import { useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import { PreferenceProvider } from '../contexts/PreferenceContext'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isDark, setIsDark] = useState(false)
  const toggleTheme = useCallback(() => setIsDark(!isDark), [isDark])
  const preference = useMemo(() => ({ isDark, toggleTheme }), [isDark, toggleTheme])

  const theme = createMuiTheme({
    palette: {
      type: isDark ? 'dark' : 'light',
    },
  })

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <PreferenceProvider value={preference}>
          <CssBaseline />
          <Component {...pageProps} />
        </PreferenceProvider>
      </ThemeProvider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
