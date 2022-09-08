import Image from 'next/image'
import Link from 'next/link'
import styles from './Countries.module.scss'

const CountriesItem = ({ data }) => {
    return (
        <div className={styles.item}>
            <Link href={data.cca2}>
                <a>

                    <div className={styles.flag}>
                        <Image
                            src={data.flags.svg}
                            alt={data.name.common}
                            width={300}
                            height={200}
                            objectFit={'cover'}
                        />
                    </div>

                    <div className={styles.info}>
                        <h4>{data.name.common}</h4>
                        <p>{data.capital}</p>
                    </div>

                </a>
            </Link>
        </div>
    )
}

export default CountriesItem