import Layout from "@/components/Layout";
import { getCountries } from "@/lib/restcountries";
import Head from "next/head";
import styles from "@/styles/CountriesDetail.module.scss";
import Image from "next/image";
import CountriesBox from "@/components/countries/CountriesBox";
import CountriesFlow from "@/components/countries/CountriesFlow";
import CountriesItem from "@/components/countries/CountriesItem";
import Title from "@/components/more/Title";
import Link from "next/link";
import slugify from 'slugify';
import { GoogleMapsIcon, NotBordersIcon } from "@/helper/Icon";
import numberFormatter from 'number-formatter'

export default function CountriesDetail({ data, borders }) {

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
                            layout={"responsive"}
                            width={300}
                            height={200}
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

                        {data.maps.googleMaps &&
                            <Link href={data.maps.googleMaps}>
                                <a target={"_blank"}>
                                    <GoogleMapsIcon />
                                    <span>Show on map</span>
                                </a>
                            </Link>
                        }
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

        </Layout>
    )
}


export async function getStaticPaths() {

    const data = await getCountries('all')
    const paths = data.map(i => ({ params: { slug: `${slugify(i.name.common, '-').toLowerCase()}-${i.cca2.toLowerCase()}` } }))

    return {
        paths: [...paths],
        fallback: false
    };
}

export async function getStaticProps(context) {

    const { slug } = await context.params
    const slugSplit = await slug.split('-');
    const code = await slugSplit[slugSplit.length - 1].toUpperCase();

    const data = await getCountries(`alpha/${code}`)
    const borders = await getCountries(`alpha?codes=${data.borders.length > 0 ? data.borders + ',' : data.borders}`)

    return {
        props: {
            data,
            borders
        },
        // revalidate: 60
    };
}