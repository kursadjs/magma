import styles from './Countries.module.scss'

const CountriesBox = ({ children, ...props }) => {
    return (
        <div className={styles.countriesBox} {...props}>
            {children}
        </div>
    )
}

export default CountriesBox