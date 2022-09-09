import Link from 'next/link'
import { useRouter } from 'next/router';
import styles from './Header.module.scss'

const Button = ({ data }) => {

    const router = useRouter();
    const active = router.asPath;

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

export default Button