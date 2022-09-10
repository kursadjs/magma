import Head from 'next/head'
import { useSelector } from 'react-redux'
import Layout from '@/components/Layout';
import Title from '@/components/more/Title';
import CountriesBox from '@/components/countries/CountriesBox';
import CountriesFlow from '@/components/countries/CountriesFlow';
import CountriesItem from '@/components/countries/CountriesItem';
import NullBox from '@/components/null/NullBox';
import { useEffect, useState } from 'react';

export default function Saved() {

    const { allCountries, savedList } = useSelector((state) => state.countries)

    const [data, setData] = useState([])

    useEffect(() => {
        if (data.length > 0) {
            setData([])
        }

        if (savedList.length > 0 && allCountries.length > 0) {
            for (let i = 0; i < savedList.length; i++) {

                const item = allCountries.filter(item => item.cca2.toLowerCase() === savedList[i])
                const check = data.find(a => a === item[0])
                if (!check) {
                    setData(d => [...d, item[0]])
                }
            }
        }
    }, [savedList, allCountries])


    return (
        <Layout>
            <Head>
                <title>Magma • Saved Countries</title>
                <meta name="description" content="Ülkeler ve detayları" />
                <link rel="icon" href="/favicon.svg" />
            </Head>

            {data.length === 0 &&
                <NullBox data={{ title: 'Saved country not found!', desc: 'Tap the button to register your first country', src: { title: 'Save now', href: '/' } }} />
            }

            {data.length > 0 &&
                <CountriesBox>
                    <Title title={'Saved Countries'} length={data.length} />

                    <CountriesFlow>
                        {data.reverse().map((item, index) =>
                            <CountriesItem data={item} key={index} />
                        )}
                    </CountriesFlow>
                </CountriesBox>
            }

        </Layout>
    )
}