import CountriesBox from '@/components/countries/CountriesBox';
import CountriesFlow from '@/components/countries/CountriesFlow';
import CountriesItem from '@/components/countries/CountriesItem';
import Layout from '@/components/Layout';
import Title from '@/components/more/Title';
import { getCountries } from '@/lib/restcountries';
import Head from 'next/head'

export default function Home({ data }) {
  return (
    <Layout>
      <Head>
        <title>Magma • Ülkeler</title>
        <meta name="description" content="Ülkeler ve detayları" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <CountriesBox>

        <Title title={'Tüm Ülkeler'} length={data.length} />

        <CountriesFlow>
          {data.map((item, index) =>
            <CountriesItem data={item} key={index} />
          )}
        </CountriesFlow>

      </CountriesBox>

    </Layout>
  )
}

export async function getStaticProps() {

  const data = await getCountries('all')

  return {
    props: {
      data
    },
    // revalidate: 60
  };
}