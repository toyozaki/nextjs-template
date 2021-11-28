import { ReactElement, ReactNode } from 'react'

import { ChakraProvider } from '@chakra-ui/provider'
import { NextPage } from 'next'

import type { AppProps } from 'next/app'

type NextPageWithLayout = NextPage & {
  getLayout?: (_page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  return <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
}

export default MyApp
