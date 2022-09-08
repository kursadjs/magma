import Categories from '@/components/countries/Categories'
import CountriesBox from '@/components/countries/CountriesBox'
import CountriesFlow from '@/components/countries/CountriesFlow'
import CountriesItem from '@/components/countries/CountriesItem'
import Layout from '@/components/Layout'
import Title from '@/components/more/Title'
import { getCountries } from '@/lib/restcountries'
import groupBy from 'lodash.groupby'
import slugify from 'slugify';
import Head from 'next/head'
import React from 'react'

export default function Continents({ data }) {

    const slugFormat = (data) => {
        return slugify(data, '-').toLowerCase()
    }


    const continentsData = Object.keys(data);

    return (
        <Layout>
            <Head>
                <title>Magma • Continents</title>
                <meta name="description" content="Ülkeler ve detayları" />
                <link rel="icon" href="/favicon.svg" />
            </Head>

            <Categories data={data} />

            {continentsData.map(group =>
                <CountriesBox key={group} id={slugFormat(group)}>
                    <Title title={group} length={data[group].length} />

                    <CountriesFlow>
                        {data[group].map((item, index) =>
                            <CountriesItem data={item} key={index} />
                        )}
                    </CountriesFlow>
                </CountriesBox>
            )}



        </Layout>
    )
}

export async function getStaticProps() {

    const data = await getCountries('all')

    return {
        props: {
            data: groupBy(data, item => item.continents)
        },
        // revalidate: 60
    };
}