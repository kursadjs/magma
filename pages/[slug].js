import { useEffect, useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from "next/router"
import numberFormatter from 'number-formatter'
import Layout from "@/components/Layout";
import { getCountries } from "@/lib/restcountries";
import styles from "@/styles/CountriesDetail.module.scss";
import CountriesBox from "@/components/countries/CountriesBox";
import CountriesFlow from "@/components/countries/CountriesFlow";
import CountriesItem from "@/components/countries/CountriesItem";
import Title from "@/components/more/Title";
import { GoogleMapsIcon, NotBordersIcon, SavedAddedIcon, SavedAddIcon } from "@/helper/Icon";
import { closeLoader, openLoader } from "stores/settings";
import Loader from "@/components/Loader";
import { addSaved, removeSaved } from "stores/countries"

export default function CountriesDetail() {

    const router = useRouter()
    const { slug } = router.query

    const { savedList } = useSelector((state) => state.countries)
    const { loader } = useSelector((state) => state.settings)
    const dispatch = useDispatch()

    const [data, setData] = useState(false)
    const [borders, setBorders] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        const filter = async () => {
            // Loader aç
            dispatch(openLoader())

            if (slug) {
                // URL'den ülke kodunu kes
                const slugSplit = await slug.split('-')
                const code = await slugSplit[slugSplit.length - 1].toUpperCase()
                // ülke detayları ve sınır ülkelerini getir
                const data = await getCountries(`alpha/${code}`)
                const borders = await getCountries(`alpha?codes=${data.borders.length > 0 ? data.borders + ',' : data.borders}`)
                // ülke detayları ve sınır ülkelerini state de yaz
                setData(data)
                setBorders(borders)
                // ülke kaydedilenler listesinde var mı
                const savedCheck = await savedList.filter(item => item.cca2 === code)
                setSaved(savedCheck.length > 0)
                // Loader kapat
                dispatch(closeLoader())

                // Başlangıç ekleme butonu kontrolü
                // localstorage listesini al
                const a = JSON.parse(localStorage.getItem('saved'))
                // URL ülke kodunu düzenle
                const sluga = code.toLowerCase();
                // kaydedilenler listesinde var mı
                const check = a.find(item => item === sluga)

                if (!check) { setSaved(false) } else { setSaved(true) }
            }
        }
        filter()
    }, [slug])

    const toogleSaved = (code) => {
        // localstorage listesini al
        const a = JSON.parse(localStorage.getItem('saved'))
        // URL ülke kodunu düzenle
        const slug = code.toLowerCase();
        // kaydedilenler listesinde var mı
        const check = a.find(item => item === slug)

        if (!check) {
            // listede yoksa ekle
            a.push(slug)
            setSaved(true)
            dispatch(addSaved(a))
        } else {
            // listede varsa sil
            a = a.filter(item => item !== slug)
            setSaved(false)
            dispatch(removeSaved(a))
        }
        // yeni listeyi localstorage yaz
        localStorage.setItem('saved', JSON.stringify(a))
    }

    const NotBorders = () => {
        return (
            <div className={styles.notBorders}>
                <NotBordersIcon />
                <h3>Border country not found.</h3>
            </div>
        )
    }

    return (
        <Layout>
            {loader && !data && <Loader />}

            {!loader && data &&
                <>
                    <Head>
                        <title>{data.name.common} • Magma</title>
                        <meta name="description" content="Ülkeler ve detayları" />
                        <link rel="icon" href="/favicon.svg" />
                    </Head>

                    <div className={styles.CountriesDetail}>

                        <div className={styles.header}>

                            <div className={styles.flag}>
                                <Image
                                    src={data.flags.svg}
                                    alt={data.name.common}
                                    width={512}
                                    height={256}
                                    objectFit={'contain'}
                                    priority
                                />
                            </div>

                            <div className={styles.info}>
                                <div className={styles.item}>
                                    <span>Name</span>
                                    <h1>{data.name && data.name.common}</h1>
                                </div>
                                <div className={styles.item}>
                                    <span>Official Name</span>
                                    <h2>{data.name && data.name.official}</h2>
                                </div>

                                <div className={styles.bottom}>
                                    {data.maps.googleMaps &&
                                        <Link href={data.maps.googleMaps}>
                                            <a target={"_blank"}>
                                                <GoogleMapsIcon />
                                                <p>Show on map</p>
                                            </a>
                                        </Link>
                                    }
                                    <button onClick={() => toogleSaved(data.cca2)}>
                                        {saved ? <SavedAddedIcon /> : <SavedAddIcon />}
                                        <p>{saved ? 'Remove' : 'Add'}</p>
                                    </button>
                                </div>
                            </div>

                        </div>

                        <div className={styles.detail}>

                            <div className={styles.table}>

                                {data.capital.length > 0 &&
                                    <div className={styles.tableItem}>
                                        <div className={styles.key}>
                                            <h6>Capital</h6>
                                        </div>
                                        <div className={styles.value}>
                                            {data.capital.map((item, i) => <p key={i}>{item}</p>)}
                                        </div>
                                    </div>
                                }

                                {data.continents.length > 0 &&
                                    <div className={styles.tableItem}>
                                        <div className={styles.key}>
                                            <h6>Continents</h6>
                                        </div>
                                        <div className={styles.value}>
                                            {data.continents.map((item, i) => <p key={i}>{item}</p>)}
                                        </div>
                                    </div>
                                }

                                {data.subregion &&
                                    <div className={styles.tableItem}>
                                        <div className={styles.key}>
                                            <h6>Subregion</h6>
                                        </div>
                                        <div className={styles.value}>
                                            <p>{data.subregion}</p>
                                        </div>
                                    </div>
                                }

                                {Object.keys(data.currencies).length > 0 &&
                                    <div className={styles.tableItem}>
                                        <div className={styles.key}>
                                            <h6>Currencies</h6>
                                        </div>
                                        <div className={styles.value}>
                                            {Object.keys(data.currencies).map((item, i) => <p key={i}>{`${data.currencies[item].name} (${data.currencies[item].symbol})`}</p>)}
                                        </div>
                                    </div>
                                }

                                {Object.keys(data.languages).length > 0 &&
                                    <div className={styles.tableItem}>
                                        <div className={styles.key}>
                                            <h6>Languages</h6>
                                        </div>
                                        <div className={styles.value}>
                                            {Object.keys(data.languages).map((item, i) => <p key={i}>{data.languages[item]}</p>)}
                                        </div>
                                    </div>
                                }

                                {data.population > 0 &&
                                    <div className={styles.tableItem}>
                                        <div className={styles.key}>
                                            <h6>Population</h6>
                                        </div>
                                        <div className={styles.value}>
                                            <p>{numberFormatter("#,##0.####", data.population)}</p>
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>

                        <CountriesBox>

                            <Title title={'Border Countries'} length={borders.length} />

                            {!borders.status ?
                                <CountriesFlow>
                                    {borders.map((item, index) =>
                                        <CountriesItem data={item} key={index} />
                                    )}
                                </CountriesFlow>
                                :
                                <NotBorders />
                            }

                        </CountriesBox>

                    </div>
                </>
            }


        </Layout>
    )
}