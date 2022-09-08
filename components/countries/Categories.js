import Link from 'next/link';
import { useRouter } from 'next/router';
import slugify from 'slugify';
import styles from './Countries.module.scss'

const Categories = ({ data }) => {

    const router = useRouter();
    const slug = router.asPath.split('#')[1]

    const slugFormat = (data) => {
        return slugify(data, '-').toLowerCase()
    }

    const continentsData = Object.keys(data);

    return (
        <ul className={styles.category}>
            {continentsData.map(i =>
                <li key={i} className={slug === slugFormat(i) ? styles.active : ''}>
                    <Link href={`#${slugFormat(i)}`}>
                        <a>
                            {i}
                            <span>{data[i].length}</span>
                        </a>
                    </Link>
                </li>
            )}
        </ul>
    )
}

export default Categories