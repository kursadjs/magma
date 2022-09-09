import { LogoIcon } from '@/helper/Icon'
import Link from 'next/link'
import styles from './Header.module.scss'
import { useSelector } from 'react-redux'
import RandomButton from './RandomButton'
import Button from './Button'

const Header = () => {

    const menuList = useSelector((state) => state.header.menuList)

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Button data={{ Type: 'logo', Icon: <LogoIcon />, Src: '/' }} />
            </div>

            <div className={styles.menu}>
                {menuList.map(item =>
                    <Button data={item} key={item.ID} />
                )}
                <RandomButton />
            </div>

            <div className={styles.more}>
                <p>© 2022 KursadJS</p>
                <p>Created by <Link href="https://kursadsimsek.com/"><a>@KursadJS</a></Link> with NextJS.</p>
            </div>
        </div>
    )
}

export default Header