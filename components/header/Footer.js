import { GithubIcon, InstagramIcon, LinkedInIcon } from '@/helper/Icon'
import Link from 'next/link'
import styles from './Header.module.scss'

const Footer = () => {

    const social = [
        {
            ID: 1,
            Title: 'LinkedIn',
            Icon: <LinkedInIcon />,
            Src: 'https://www.linkedin.com/in/kursadjs/',
        },
        {
            ID: 2,
            Title: 'Github',
            Icon: <GithubIcon />,
            Src: 'https://github.com/kursadjs',
        },
        {
            ID: 3,
            Title: 'Instagram',
            Icon: <InstagramIcon />,
            Src: 'https://www.instagram.com/kursadjs',
        },
    ]

    return (
        <div className={styles.more}>
            <ul>
                {social.map(i =>
                    <li key={i.ID} title={i.Title}>
                        <Link href={i.Src}>
                            <a target={'_blank'}>
                                {i.Icon}
                            </a>
                        </Link>
                    </li>
                )}
            </ul>

            <p>© 2022 KursadJS</p>
            <p>Created by <Link href="https://kursadsimsek.com/"><a>@KursadJS</a></Link> with NextJS.</p>
        </div>
    )
}

export default Footer