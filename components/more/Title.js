import styles from './More.module.scss'

const Title = ({ title, length }) => {
    return (
        <div className={styles.pageTitle}>
            <h2>{title} {length && <span>{length} adet</span>}</h2>
        </div>
    )
}

export default Title