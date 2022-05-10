import Head from 'next/head'

import { Sample01, Sample02 } from '@components/StyledComponentsSamples'

export default function Home() {
  return (
    <>
      <Head>
        <title>Styled components sample</title>
        <meta name="description" content="Styled components sample" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Sample01 />
        <Sample02 />
      </main>
    </>
  )
}
