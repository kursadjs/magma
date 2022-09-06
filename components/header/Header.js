import { ContinentsFillIcon, ContinentsIcon, CountriesIcon, CountriesFillIcon, LogoIcon, LamguageIcon, LamguageFillIcon, CurrenciesIcon, CurrenciesFillIcon } from '@/helper/Icon'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Header.module.scss'

const Header = () => {

    const router = useRouter();
    const active = router.asPath;

    const menuList = [
        {
            ID: 1,
            Name: 'Tüm Ülkeler',
            Src: '/',
            Icon: <CountriesIcon />,
            IconFill: <CountriesFillIcon />,
        },
        {
            ID: 2,
            Name: 'Kıtalar',
            Src: '/continents',
            Icon: <ContinentsIcon />,
            IconFill: <ContinentsFillIcon />,
        },
        {
            ID: 3,
            Name: 'Diller',
            Src: '/b',
            Icon: <LamguageIcon />,
            IconFill: <LamguageFillIcon />,
        },
        {
            ID: 4,
            Name: 'Para Birimleri',
            Src: '/c',
            Icon: <CurrenciesIcon />,
            IconFill: <CurrenciesFillIcon />,
        },
    ]

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

                <button className={styles.itemRandom}>
                    {'Rastgele Getir'}
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