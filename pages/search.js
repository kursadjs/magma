import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import Layout from '@/components/Layout'
import Loader from '@/components/Loader'
import Title from '@/components/more/Title'
import CountriesBox from '@/components/countries/CountriesBox'
import CountriesFlow from '@/components/countries/CountriesFlow'
import CountriesItem from '@/components/countries/CountriesItem'
import styles from '@/styles/Search.module.scss'
import { NotBordersIcon, SearchIcon } from '@/helper/Icon'

export default function Search() {

    const { allCountries } = useSelector((state) => state.countries)

    const [searchData, setSearchData] = useState({
        inputValue: '',
        resultList: false,
        loader: true
    })
    const isTyping = searchData.inputValue.replace(/\s+/, '').length > 0

    useEffect(() => {
        if (isTyping) {

            setSearchData(data => ({
                ...data,
                loader: true
            }))

            const getData = setTimeout(() => {
                const filter = allCountries.filter(item => item.name.common.toLowerCase().includes(searchData.inputValue.toLowerCase()))
                setSearchData(data => ({
                    ...data,
                    resultList: filter.length > 0 ? filter : false,
                    loader: false,
                }))
            }, 500)

            return () => {
                clearTimeout(getData)
            }

        } else {
            setSearchData(data => ({
                ...data,
                resultList: false,
                loader: true
            }))
        }

    }, [searchData.inputValue])

    const handleSearch = (e) => {
        setSearchData(data => ({
            ...data,
            inputValue: e.target.value
        }))
    }

    return (
        <Layout>
            <Head>
                <title>
                    {isTyping ? `Search results for '${searchData.inputValue}' • Magma` : `Magma • Search Countries`}
                </title>
                <meta name="description" content="Ülkeler ve detayları" />
                <link rel="icon" href="/favicon.svg" />
            </Head>

            <div className={styles.searchBox}>
                <form>
                    <input
                        value={searchData.inputValue}
                        onChange={handleSearch}
                        type="text"
                        placeholder='Search countries' />
                    <SearchIcon />
                </form>
            </div>

            {/* <CountriesBox>
                <Title title={'Search History'} />
            </CountriesBox> */}

            {/* <CountriesBox>
                <Title title={'Recommended Countries'} />
            </CountriesBox> */}

            {isTyping &&
                <CountriesBox>

                    {searchData.resultList && !searchData.loader &&
                        <CountriesFlow>
                            {searchData.resultList.map((item, index) =>
                                <CountriesItem data={item} key={index} />
                            )}
                        </CountriesFlow>
                    }

                    {searchData.loader &&
                        <Loader />
                    }

                    {!searchData.resultList && !searchData.loader &&
                        <div className={styles.notFound}>
                            <NotBordersIcon />
                            <p>{`No results found for '${searchData.inputValue}'`}</p>
                        </div>
                    }

                </CountriesBox>
            }

        </Layout>
    )
}