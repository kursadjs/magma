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
        <button className={styles.itemRandom} onClick={() => router.push(getRandomCountry())}>
            {'Random Country'}
        </button>
    )
}

export default RandomButton