import Categories from '@/components/countries/Categories'
import CountriesBox from '@/components/countries/CountriesBox'
import CountriesFlow from '@/components/countries/CountriesFlow'
import CountriesItem from '@/components/countries/CountriesItem'
import Layout from '@/components/Layout'
import Title from '@/components/more/Title'
import { useSelector } from 'react-redux'
import slugify from 'slugify';
import Head from 'next/head'
import React from 'react'

export default function Continents() {

    const { allContinents } = useSelector((state) => state.countries)
    const continentsTitle = Object.keys(allContinents);

    const slugFormat = (allContinents) => {
        return slugify(allContinents, '-').toLowerCase()
    }

    return (
        <Layout>
            <Head>
                <title>Magma • Continents</title>
                <meta name="description" content="Ülkeler ve detayları" />
                <link rel="icon" href="/favicon.svg" />
            </Head>

            <Categories data={allContinents} />

            {continentsTitle.map(group =>
                <CountriesBox key={group} id={slugFormat(group)}>
                    <Title title={group} length={allContinents[group].length} />

                    <CountriesFlow>
                        {allContinents[group].map((item, index) =>
                            <CountriesItem data={item} key={index} />
                        )}
                    </CountriesFlow>
                </CountriesBox>
            )}



        </Layout>
    )
}