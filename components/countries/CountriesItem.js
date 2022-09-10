import Image from 'next/image'
import Link from 'next/link'
import slugify from 'slugify'
import styles from './Countries.module.scss'

const CountriesItem = ({ data }) => {
    return (
        <div className={styles.item}>
            <Link href={`${slugify(data.name.common, '-').toLowerCase()}-${data.cca2.toLowerCase()}`}>
                <a>

                    <div className={styles.flag}>
                        <Image
                            src={data.flags.svg}
                            alt={data.name.common}
                            width={512}
                            height={341}
                            objectFit={'contain'}
                        />
                    </div>

                    <div className={styles.info}>
                        <h4>{data.name.common}</h4>
                        {data.capital && data.capital.length > 0 && <p>{data.capital.map((item, i) => <span key={i}>{item}</span>)}</p>}
                    </div>

                </a>
            </Link>
        </div>
    )
}

export default CountriesItem