import { LogoIcon } from '@/helper/Icon'
import Link from 'next/link'
import styles from './Header.module.scss'
import { useSelector } from 'react-redux'
import RandomButton from './RandomButton'
import Button from './Button'
import Footer from './Footer'

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

            <Footer />
        </div>
    )
}

export default Header