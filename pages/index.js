import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.home}>
      <Head>
        <title>Magma - Ülkeler</title>
        <meta name="description" content="Ülkeler ve detayları" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
    </div>
  )
}
