import { RandomIcon } from '@/helper/Icon'
import { getCountries } from '@/lib/restcountries'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import slugify from 'slugify'
import styles from './Header.module.scss'


const RandomButton = () => {

    const router = useRouter();

    const [slugData, setSlugData] = useState([])

    useEffect(() => {
        async function as() {
            const data = await getCountries('all')
            const filterSlug = await data.map(i => `${slugify(i.name.common, '-').toLowerCase()}-${i.cca2.toLowerCase()}`)
            setSlugData([...filterSlug])
        } as()
    }, [])

    const getRandomCountry = () => {
        const random = Math.floor(Math.random() * 250)
        return slugData[random]
    }

    return (
        <button className={styles.itemRandom} disabled={!slugData.length > 0} onClick={() => slugData.length > 0 && router.push(getRandomCountry())}>
            <RandomIcon />
            <p>Random Country</p>
        </button>
    )
}

export default RandomButton