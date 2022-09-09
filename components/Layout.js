import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import groupBy from "lodash.groupby"

import { getCountries } from "@/lib/restcountries"
import { getCountries as getCountriesRedux, getContinents as getContinentsRedux, getSaved } from "@/redux/features/countriesSlice"

import Header from "./header/Header"
import { changeLoader } from "@/redux/features/settingsSlice"
import Loader from "./Loader"
import Head from "next/head"

const Layout = ({ children }) => {

    const { loader } = useSelector((state) => state.settings)
    const { allCountries, savedList } = useSelector((state) => state.countries)
    const dispatch = useDispatch()

    const getAllData = async () => {
        // Loader aç
        dispatch(changeLoader(true))

        const allCountries = await getCountries('all')

        const allContinents = groupBy(allCountries, item => item.continents)

        // Tüm Ülkeler
        dispatch(getCountriesRedux(allCountries))
        // Tüm Kıtalar
        dispatch(getContinentsRedux(allContinents))

        // Loader kapat
        dispatch(changeLoader(false))
    }
    useEffect(() => { getAllData() }, [])

    const saveda = async () => {
        // Save local storage check and redux write
        const saved = localStorage.getItem('saved')

        if (!saved) {
            localStorage.setItem('saved', JSON.stringify([]))
        } else {
            const savedlocal = await JSON.parse(localStorage.getItem('saved'))

            if (allCountries.length > 0 && savedlocal.length > 0) {
                for (let i = 0; i < savedlocal.length; i++) {

                    const checkList = savedList.find(item => item.cca2.toLowerCase() === savedlocal[i])

                    if (!checkList) {
                        dispatch(getSaved(allCountries.filter(item => item.cca2.toLowerCase() === savedlocal[i])[0]))
                    }
                }
            }
        }
    }

    useEffect(() => { saveda() }, [allCountries])

    return (
        <div className='container'>
            <Head>
                <title>{loader && 'Loading...'}</title>
            </Head>
            <Header />
            <div className='main'>
                {loader ? <Loader /> : children}
            </div>
        </div>
    )
}

export default Layout