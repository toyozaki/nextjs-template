import { ReactElement, ReactNode } from 'react'

import { NextPage } from 'next'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import type { AppProps } from 'next/app'

type NextPageWithLayout = NextPage & {
  getLayout?: (_page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
    </>
  )
}

export default MyApp
