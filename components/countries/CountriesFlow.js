import styles from './Countries.module.scss'

const CountriesFlow = ({ children }) => {
    return (
        <div className={styles.countriesFlow}>
            {children}
        </div>
    )
}

export default CountriesFlow