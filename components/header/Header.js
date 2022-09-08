import { ContinentsFillIcon, ContinentsIcon, CountriesIcon, CountriesFillIcon, LogoIcon, LamguageIcon, LamguageFillIcon, CurrenciesIcon, CurrenciesFillIcon, SearchIcon, SearchFillIcon, BookmarksIcon, BookmarksFillIcon } from '@/helper/Icon'
import { getCountries } from '@/lib/restcountries'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import slugify from 'slugify'

const Header = () => {

    const router = useRouter();
    const active = router.asPath;

    const menuList = [
        {
            ID: 1,
            Name: 'All Countries',
            Src: '/',
            Icon: <CountriesIcon />,
            IconFill: <CountriesFillIcon />,
        },
        {
            ID: 2,
            Name: 'Continents',
            Src: '/continents',
            Icon: <ContinentsIcon />,
            IconFill: <ContinentsFillIcon />,
        },
        {
            ID: 3,
            Name: 'Search',
            Src: '/search',
            Icon: <SearchIcon />,
            IconFill: <SearchFillIcon />,
        },
        {
            ID: 4,
            Name: 'Saved',
            Src: '/saved',
            Icon: <BookmarksIcon />,
            IconFill: <BookmarksFillIcon />,
        },
    ]

    const [data, setData] = useState([])

    useEffect(() => {
        async function as() {
            const data = await getCountries('all')
            const filter = await data.map(i => `${slugify(i.name.common, '-').toLowerCase()}-${i.cca2.toLowerCase()}`)
            setData([...filter])
        } as()
    }, [])

    const getRandomCountry = () => {
        const random = Math.floor(Math.random() * 250)

        return data[random]
    }


    const Button = ({ data }) => {
        return (
            <div className={styles.buttonComponent}>
                <Link href={data.Src}>
                    <a className={active === data.Src ? styles.active : ''}>
                        <span>
                            <div className={`${styles.icon} ${data.Type === 'logo' && styles.logo}`}>
                                {active === data.Src && data.Type !== 'logo' ? data.IconFill : data.Icon}
                            </div>

                            {data.Type !== 'logo' && <p>{data.Name}</p>}
                        </span>
                    </a>
                </Link>
            </div>
        )
    }

    return (
        <div className={styles.header}>

            <div className={styles.logo}>
                <Button data={{ Type: 'logo', Icon: <LogoIcon />, Src: '/' }} />
            </div>

            <div className={styles.menu}>

                {menuList.map(item =>
                    <Button data={item} key={item.ID} />
                )}

                <button className={styles.itemRandom} onClick={() => router.push(getRandomCountry())}>
                    {'Random Country'}
                </button>

            </div>

            <div className={styles.more}>
                <p>© 2022 KursadJS</p>
                <p>Created by <Link href="https://kursadsimsek.com/"><a>@KursadJS</a></Link> with NextJS.</p>
            </div>

        </div>
    )
}

export default Header