import { useEffect } from "react"
import Head from "next/head"
import { useSelector, useDispatch } from 'react-redux'
import groupBy from "lodash.groupby"

import { getCountries } from "@/lib/restcountries"
import { addContinents, addCountries, addSaved } from "stores/countries"
import { closeLoader, openLoader } from "stores/settings"

import Loader from "./Loader"
import Header from "./header/Header"
import Navbar from "./header/Navbar"

const Layout = ({ children }) => {

    const { loader } = useSelector((state) => state.settings)
    const dispatch = useDispatch()

    // Ülkeler ve kıtaların redux'a eklenmesi
    useEffect(() => {
        const getAllData = async () => {
            // Loader aç
            dispatch(openLoader())

            // Ülkeleri çek
            const allCountries = await getCountries('all')
            // Ülkeleri kıtalarına göre sınıflandır
            const allContinents = groupBy(allCountries, item => item.continents)

            // Tüm Ülkeler redux ekle
            dispatch(addCountries(allCountries))
            // Tüm Kıtalar redux ekle
            dispatch(addContinents(allContinents))

            // Loader kapat
            dispatch(closeLoader())
        }
        getAllData()
    }, [])

    // localstorage kaydedilenler kontrolü
    useEffect(() => {
        const saved = localStorage.getItem('saved')

        if (!saved) {
            localStorage.setItem('saved', JSON.stringify([]))
        } else {
            const savedlocal = JSON.parse(localStorage.getItem('saved'))
            dispatch(addSaved(savedlocal))
        }
    }, [])

    return (
        <div className='container'>
            <Head>
                <title>{loader && 'Loading...'}</title>
            </Head>


            <Header />
            <div className='main'>
                {loader ? <Loader /> : children}
            </div>
            <Navbar />


        </div>
    )
}

export default Layout