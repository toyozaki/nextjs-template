import styles from '@styles/Home.module.css'
import Head from 'next/head'

import { Sample01 } from '@components/StyledComponentsSamples'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Styled components sample</title>
        <meta name="description" content="Styled components sample" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Sample01 />
      </main>
    </div>
  )
}
