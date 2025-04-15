import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { Form } from "react-router-dom";


function Header() {
    const submitForm = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const searchTerm = formData.get('kw');
        window.location.href = `/search/${searchTerm}`;
    }

    // State to manage the search bar visibility in mobile view
    const [searchActive, setSearchActive] = useState(false);

    const handleSearchClick = () => {
        setSearchActive(prev => !prev);
    };

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
                    <div className={styles.leftGroup}>
                    <img className={styles.logo} src="/images/logo.png" alt="Trade Me Logo" />
                        <ul className={styles.secLeftNavList}>
                            <li className={`${styles.navItem} ${styles.mobHide} ${styles.navItemBrowse}`}><a href="/browse">Browse <FontAwesomeIcon icon={faCaretDown} className={`${styles.faIcon} ${styles.browseBorder}`} /></a></li>
                            <li className={styles.navItem}>
                                <form className={`${styles.navItem} ${styles.navExtendedSearch}`} action="/search" name="search" method="get" onSubmit={submitForm} onClick={submitForm} >
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className={`${styles.faIcon} ${styles.faBtn}`} onClick={(()=> submitForm, handleSearchClick)} />
                                        {/* hey tom i've put both of our functions into the onClick for the search button. i couldn't get yours to work though...  */}
                                        {/* mine is for mobile view functionality, to fix up the search bar displaying properly on mobile */}
                                    <input name="kw" type='text' placeholder='Search' className={`${styles.navSearch} ${searchActive ? styles.searchActive : styles.searchHidden}`} ></input>
                                </form>
                            </li>
                        </ul>
                    </div>
                    <ul className={styles.secRightNavList}>
                        <li className={`${styles.navItem}  ${searchActive && styles.searchHide}`}><a href="/404"><FontAwesomeIcon icon={faBinoculars} className={styles.faIcon}/> Watchlist</a></li>
                        <li className={`${styles.navItem} ${styles.mobHide}`}><a href="/404"><FontAwesomeIcon icon={faHeart} className={styles.faIcon} />Favourites</a></li>
                        <li className={`${styles.navItem} ${styles.mobHide}`}><a href="/404"><FontAwesomeIcon icon={faPencil} className={styles.faIcon}/>Start a listing</a></li>
                        <li className={`${styles.navItem}  ${searchActive && styles.searchHide}`}><a href="/404"><FontAwesomeIcon icon={faCircleUser} className={`${styles.faIcon} ${styles.deskHide}`}/>My Trade Me <FontAwesomeIcon icon={faCircleUser} className={`${styles.faIcon} ${styles.mobHide}`}/></a></li>
                    </ul>
                </nav>
            </header>
        </>

    );
}

export default Header;