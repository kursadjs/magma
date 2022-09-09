import CountriesBox from '@/components/countries/CountriesBox';
import CountriesFlow from '@/components/countries/CountriesFlow';
import CountriesItem from '@/components/countries/CountriesItem';
import Layout from '@/components/Layout';
import Title from '@/components/more/Title';
import NullBox from '@/components/null/NullBox';
import { getCountries } from '@/lib/restcountries';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import slugify from 'slugify';

export default function Saved({ data }) {

    const [savedList, setSavedList] = useState()
    const [filterData, setFilterData] = useState([])

    useEffect(() => {
        const saved = localStorage.getItem('saved')

        if (!saved) {
            const data = []
            localStorage.setItem('saved', JSON.stringify(data))
        } else {
            setSavedList(JSON.parse(localStorage.getItem('saved')))
        }
    }, [])

    useEffect(() => {
        if (savedList) {
            console.log('yenilendi');
            for (let i = 0; i < savedList.length; i++) {

                const checkList = filterData.find(item => `${slugify(item.name.common, '-').toLowerCase()}-${item.cca2.toLowerCase()}` === savedList[i])

                if (!checkList) {
                    const filterItem = data.filter(item => `${slugify(item.name.common, '-').toLowerCase()}-${item.cca2.toLowerCase()}` === savedList[i])
                    setFilterData(data => [...data, filterItem[0]])
                }
            }
        }
    }, [data, filterData, savedList])

    return (
        <Layout>
            <Head>
                <title>Magma • Saved Countries</title>
                <meta name="description" content="Ülkeler ve detayları" />
                <link rel="icon" href="/favicon.svg" />
            </Head>

            {filterData.length === 0 &&
                <NullBox data={{ title: 'Saved country not found!', desc: 'Tap the button to register your first country', src: { title: 'Save now', href: '/' } }} />
            }

            {filterData.length > 0 &&
                <CountriesBox>
                    <Title title={'Saved Countries'} length={filterData.length} />

                    <CountriesFlow>
                        {filterData.map((item, index) =>
                            <CountriesItem data={item} key={index} />
                        )}
                    </CountriesFlow>
                </CountriesBox>
            }

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