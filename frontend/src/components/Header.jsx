import styles from '../styles/Header.module.css';

function Header () {
    return ( 
        <>
            <header className={styles.topHeader}>
                <nav className={styles.topNavbar}>
                    <ul className={styles.topLeftNavList}>
                        <li className={styles.navItem}><a href="/">Trade Me</a></li>
                        <li className={styles.navItem}><a href="/">Trade Me Insurance</a></li>
                        <li className={styles.navItem}><a href="/">Holiday Houses</a></li>
                        <li className={styles.navItem}><a href="/">Find Someone</a></li>
                        <li className={styles.navItem}><a href="/">MotorWeb</a></li>
                        <li className={styles.navItem}><a href="/contact">homes.co.nz</a></li>
                    </ul>
                    <ul className={styles.topRightNavList}>
                        <li className={styles.navItem}><a href="/">Register</a></li>
                        <li className={styles.navItem}><a href="/">Log in</a></li>
                    </ul>
                </nav>
            </header>
            <header className={styles.secHeader}>
                <nav className={styles.secNavbar}>
                    <img className={styles.logo} src="/images/logo.png" alt="Trade Me Logo" />
                    <ul className={styles.secLeftNavList}>
                        <li className={styles.navItem}><a href="/">Browse</a></li>
                        <li className={styles.navItem}><a href="/"><input type='text' placeholder='Search'></input></a></li>
                    </ul>
                    <ul className={styles.secRightNavList}>
                        <li className={styles.navItem}><a href="/">Watchlist</a></li>
                        <li className={styles.navItem}><a href="/">Favourites</a></li>
                        <li className={styles.navItem}><a href="/">Start a listing</a></li>
                        <li className={styles.navItem}><a href="/">My Trade Me</a></li>
                    </ul>
                </nav>   
            </header>        
        </>

     );
}

export default Header ;