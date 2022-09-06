import Layout from '@/components/Layout';
import Head from 'next/head'
import Image from 'next/image';
import styles from '../styles/Home.module.scss'

export default function Home() {

  return (
    <Layout>
      <Head>
        <title>Magma - Ülkeler</title>
        <meta name="description" content="Ülkeler ve detayları" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

    </Layout>
  )
}