import CountriesBox from '@/components/countries/CountriesBox';
import CountriesFlow from '@/components/countries/CountriesFlow';
import CountriesItem from '@/components/countries/CountriesItem';
import Layout from '@/components/Layout';
import Title from '@/components/more/Title';
import { useSelector } from 'react-redux'
import Head from 'next/head'

export default function Home() {

  const { allCountries } = useSelector((state) => state.countries)

  return (
    <Layout>
      <Head>
        <title>Magma • All Countries</title>
        <meta name="description" content="Ülkeler ve detayları" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <CountriesBox>

        <Title title={'All Countries'} length={allCountries.length} />

        <CountriesFlow>
          {allCountries.map((item, index) =>
            <CountriesItem data={item} key={index} />
          )}
        </CountriesFlow>

      </CountriesBox>

    </Layout>
  )
}