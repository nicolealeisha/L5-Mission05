import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';


function Header () {
    return ( 
        <>
            <header className={styles.topHeader}>
                <nav className={styles.topNavbar}>
                    <ul className={styles.topLeftNavList}>
                        <li className={styles.navItem}><a href="/">Trade Me</a></li>
                        <li className={styles.navItem}><a href="/404">Trade Me Insurance</a></li>
                        <li className={styles.navItem}><a href="/404">Holiday Houses</a></li>
                        <li className={styles.navItem}><a href="/404">Find Someone</a></li>
                        <li className={styles.navItem}><a href="/404">MotorWeb</a></li>
                        <li className={styles.navItem}><a href="/404">homes.co.nz</a></li>
                    </ul>
                    <ul className={styles.topRightNavList}>
                        <li className={styles.navItem}><a href="/404">Register</a></li>
                        <li className={styles.navItem}><a href="/404">Log in</a></li>
                    </ul>
                </nav>
            </header>
            <header className={styles.secHeader}>
                <nav className={styles.secNavbar}>
                    <img className={styles.logo} src="/images/logo.png" alt="Trade Me Logo" />
                    <ul className={styles.secLeftNavList}>
                        <li className={styles.navItem}><a href="/browse">Browse <FontAwesomeIcon icon={faCaretDown} className={`${styles.faIcon} ${styles.browseBorder}`} /></a></li>
                        <li className={styles.navItem}><FontAwesomeIcon icon={faMagnifyingGlass}  className={styles.faIcon} /><input className={styles.navSearch} type='text' placeholder='Search'></input></li>
                    </ul>
                    <ul className={styles.secRightNavList}>
                        <li className={styles.navItem}><a href="/404"><FontAwesomeIcon icon={faBinoculars} className={styles.faIcon}/> Watchlist</a></li>
                        <li className={styles.navItem}><a href="/404"><FontAwesomeIcon icon={faHeart} className={styles.faIcon} />Favourites</a></li>
                        <li className={styles.navItem}><a href="/404"><FontAwesomeIcon icon={faPencil} className={styles.faIcon}/>Start a listing</a></li>
                        <li className={styles.navItem}><a href="/404">My Trade Me <FontAwesomeIcon icon={faCircleUser} className={styles.faIcon}/></a></li>
                    </ul>
                </nav>
            </header>        
        </>

     );
}

export default Header ;