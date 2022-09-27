import { ReactElement, ReactNode } from 'react'

import { CacheProvider, EmotionCache } from '@emotion/react'
import { NextPage } from 'next'
import Head from 'next/head'

import { MuiThemeProvider } from '@components'
import { theme } from '@styles'
import { createEmotionCache } from '@utils'

import type { AppProps } from 'next/app'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

type NextPageWithLayout = NextPage & {
  getLayout?: (_page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  emotionCache?: EmotionCache
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MuiThemeProvider theme={theme}>{getLayout(<Component {...pageProps} />)}</MuiThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
