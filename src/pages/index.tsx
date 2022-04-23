// import { ReactElement } from 'react'

import dynamic from 'next/dynamic'
import Head from 'next/head'

import styles from '@styles/Home.module.css'

const ReactBeautifulDnd = dynamic(() => import('@components/ReactBeautifulDnd'), {
  ssr: false,
})

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <ReactQuery /> */}
        <ReactBeautifulDnd />
      </main>
    </div>
  )
}

// Home.getLayout = function getLayout(page: ReactElement) {
//   return <Layout>{page}</Layout>
// }
