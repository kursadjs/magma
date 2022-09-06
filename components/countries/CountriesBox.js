import styles from './Countries.module.scss'

const CountriesBox = ({ children }) => {
    return (
        <div className={styles.countriesBox}>
            {children}
        </div>
    )
}

export default CountriesBox