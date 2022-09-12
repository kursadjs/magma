import Link from 'next/link'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux'
import styles from './Header.module.scss'
import RandomButton from './RandomButton';

const Navbar = () => {

    const router = useRouter();
    const active = router.asPath;

    const menuList = useSelector((state) => state.header.menuList)

    return (
        <div className={styles.navbar}>

            <div className={styles.mobileRandom}>
                <RandomButton />
            </div>

            {menuList.map(item =>
                <div key={item.ID} className={styles.button}>
                    <Link href={item.Src}>
                        <a className={active === item.Src ? styles.active : ''}>
                            <div className={`${styles.icon} ${item.Type === 'logo' && styles.logo}`}>
                                {active === item.Src && item.Type !== 'logo' ? item.IconFill : item.Icon}
                            </div>

                            {item.Type !== 'logo' && <p>{item.Name}</p>}
                        </a>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Navbar