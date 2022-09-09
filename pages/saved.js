import CountriesBox from '@/components/countries/CountriesBox';
import CountriesFlow from '@/components/countries/CountriesFlow';
import CountriesItem from '@/components/countries/CountriesItem';
import Layout from '@/components/Layout';
import Title from '@/components/more/Title';
import NullBox from '@/components/null/NullBox';
import { useSelector } from 'react-redux'
import Head from 'next/head'

export default function Saved() {

    const { savedList } = useSelector((state) => state.countries)


    return (
        <Layout>
            <Head>
                <title>Magma • Saved Countries</title>
                <meta name="description" content="Ülkeler ve detayları" />
                <link rel="icon" href="/favicon.svg" />
            </Head>

            {savedList.length === 0 &&
                <NullBox data={{ title: 'Saved country not found!', desc: 'Tap the button to register your first country', src: { title: 'Save now', href: '/' } }} />
            }

            {savedList.length > 0 &&
                <CountriesBox>
                    <Title title={'Saved Countries'} length={savedList.length} />

                    <CountriesFlow>
                        {savedList.map((item, index) =>
                            <CountriesItem data={item} key={index} />
                        )}
                    </CountriesFlow>
                </CountriesBox>
            }

        </Layout>
    )
}