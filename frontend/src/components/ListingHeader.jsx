import styles from '../styles/ListingHeader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

function ListingHeader () {
    return ( 
        <>
            <header className={styles.listingHeader}>
                <nav className={styles.listingNavbar}>
                    <ul className={styles.leftNavList}>
                        <li className={`${styles.navItem}`}><a href="/browse">Browse Marketplace <FontAwesomeIcon icon={faCaretDown} className={`${styles.faIcon}`} /></a></li>
                        <li className={`${styles.navItem} ${styles.mobHide}`}><a href='/404'>Stores</a></li>
                        <li className={`${styles.navItem} ${styles.mobHide}`}><a href='/404'>Detail</a></li>
                        <li className={`${styles.navItem} ${styles.mobHide}`}><a href='/404'>Book a courier</a></li>
                    </ul>
                    <ul className={styles.rightNavList}>
                        <li className={styles.navItem}><a href='/404'>List an item</a></li>
                    </ul>
                </nav>
            </header>        
        </>
     );
}

export default ListingHeader ;