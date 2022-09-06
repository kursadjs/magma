import Header from "./header/Header"

const Layout = ({ children }) => {
    return (
        <div className='container'>
            <Header />
            <div className='main'>{children}</div>
        </div>
    )
}

export default Layout