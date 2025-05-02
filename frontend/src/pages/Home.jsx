import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import ListingOtherListings from '../components/ListingOtherListings';

function Home () {

    const [allListings, setAllListings] = useState([]);
    const [dollarReserve, setDollarReserve] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    
        const fetchAllListings = async () => {

            try {
                const response = await fetch(`http://localhost:3000/allListings`);
                const allListings = await response.json();
                setAllListings(allListings);

            } catch (err) {
                console.error('Error fetching listings:', err);
                setError(err.message);
            }
        };
    
        const fetchDollarReserve = async () => {
            try {
                const response = await fetch(`http://localhost:3000/1dollarreserve`);
                const dollarReserve = await response.json();
                setDollarReserve(dollarReserve);

            } catch (err) {
                console.error('Error fetching listings:', err);
                setError(err.message);
            }
        };
    
        const runAll = async () => {
            setLoading(true);
            await fetchAllListings();
            await fetchDollarReserve();    
            setLoading(false);
        };
    
        runAll();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return ( 
     <>
        <header className={styles.headerSearch}>
            <h1 className={styles.headerTitle}>KIA ORA! READY TO FIND YOUR NEW?</h1>
            <form className={styles.headerSearchForm} action="/search" name="search" method="get">
                <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.faSearch} />
                <input name="kw" type='text' placeholder='Search all of Trade Me' className={styles.headerSearchInput}></input>
                <button type="submit" className={styles.headerSearchBtn}><span className={styles.mobHide}>Search</span><FontAwesomeIcon icon={faMagnifyingGlass} className={styles.deskHide} /></button>
            </form>
        </header>

        <div className={styles.mainContent}>
            <nav className={styles.mainNav}>
                <ul className={styles.mainNavList}>
                    <li className={`${styles.navItem} ${styles.marketplace}`}><FontAwesomeIcon icon={faBagShopping} className={`${styles.navlistIcon} ${styles.marketplaceIcon}`}/><a href="/marketplace/">Marketplace</a></li>
                    <li className={`${styles.navItem} ${styles.jobs}`}><FontAwesomeIcon icon={faBriefcase} className={`${styles.navlistIcon} ${styles.jobsIcon}`}/><a href="/404">Jobs</a></li>
                    <li className={`${styles.navItem} ${styles.motors}`}><FontAwesomeIcon icon={faCarSide} className={`${styles.navlistIcon} ${styles.motorsIcon}`}/><a href="/404">Motors</a></li>
                    <li className={`${styles.navItem} ${styles.property}`}><FontAwesomeIcon icon={faHouse} className={`${styles.navlistIcon} ${styles.propertyIcon}`}/><a href="/404">Property</a></li>
                    <li className={`${styles.navItem} ${styles.services}`}><FontAwesomeIcon icon={faWrench} className={`${styles.navlistIcon} ${styles.servicesIcon}`}/><a href="/404">Services</a></li>
                    <li className={`${styles.navItemMob} ${styles.navItem} ${styles.browse}`}><a href="/404">Browse All</a><FontAwesomeIcon icon={faChevronRight} className={`${styles.navlistIcon} ${styles.browseIcon}`}/></li>
                </ul>
            </nav>

            <div className={styles.headerBoxes}>
                <div className={`${styles.box} ${styles.box1}`}>
                    <h3 className={styles.boxTitle}>Trending</h3>
                    <p className={styles.boxLargeText}>Shop last minute Xmas gifts!</p>
                    <button className={`${styles.boxBtn} ${styles.colorBtn}`}>Shop now</button>
                </div>

                <div className={`${styles.box} ${styles.box2}`}>
                    <h3 className={styles.boxTitle}>Property</h3>
                    <p className={styles.boxLargeText}>You choose, we celebrate</p>
                    <button className={`${styles.boxBtn} ${styles.inverseBtn}`}>Nominate now</button>
                </div>

                <div className={`${styles.box} ${styles.box3}`}>
                    <h3 className={styles.boxTitle}>Property</h3>
                    <p className={styles.boxLargeText}>Sold data is here</p>
                    <button className={`${styles.boxBtn} ${styles.inverseBtn}`}>Search now</button>
                </div>
            </div>

            <section className={styles.auctions}>
                <h2 className={styles.sectionTitle}>Cool Auctions</h2>
                <div className={styles.auctionList}>
                    <ListingOtherListings otherListings={allListings} />
                </div>
            </section>

            <section className={styles.categories}>
                <h3 className={styles.sectionSubTitle}>Trending</h3>
                <h2 className={styles.sectionTitle}>Categories</h2>
                <div className={styles.categoriesList}>
                    <div className={`${styles.category} ${styles.category1}`}>
                        <h3 className={styles.categoryTitle}>55,519+ Dresses</h3>
                        <p className={styles.categoryText}>Marketplace / Clothing & Fashion / Women / Dresses</p>
                    </div>
                    <div className={`${styles.category} ${styles.category2}`}>
                        <h3 className={styles.categoryTitle}>355,519+ Cars</h3>
                        <p className={styles.categoryText}>Motors / Cars</p>
                    </div>
                    <div className={`${styles.category} ${styles.category3}`}>
                        <h3 className={styles.categoryTitle}>18,967+ Shoes</h3>
                        <p className={styles.categoryText}>Marketplace / Clothing & Fashion / Men / Shoes</p>
                    </div>
                </div>
            </section>

            <section className={`${styles.auctions} ${styles.dollarReserve}`}>
                <h2 className={styles.sectionTitle}>$1 reserve</h2>
                <div className={styles.auctionList}>
                    <ListingOtherListings otherListings={dollarReserve} />
                </div>
            </section>

        </div>
     </>   
     );
}

export default Home ;