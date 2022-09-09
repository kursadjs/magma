import { SavedAddIcon } from '@/helper/Icon'
import Link from 'next/link'
import styles from './NullBox.module.scss'

const NullBox = ({ data }) => {
    return (
        <div className={styles.nullBox}>

            <SavedAddIcon />

            <div className={styles.info}>

                <h2>{data.title}</h2>
                <p>{data.desc}</p>
                <Link href={data.src.href}>
                    <a>{data.src.title}</a>
                </Link>
            </div>

        </div>
    )
}

export default NullBox