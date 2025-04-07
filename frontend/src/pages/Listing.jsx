import styles from '../styles/Listing.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ListingBreadcrumb from '../components/ListingBreadcrumb';
import ListingHeader from '../components/ListingHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';


function Listing() {
    const { category, subcategory, listingId } = useParams(); // Extract dynamic params from the URL
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(listingId); // Log the listingId to check if it's being passed correctly

    // Fetch listing data from the backend using the listingId
    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetch(`http://localhost:3000/listing/${listingId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',  // Ensure the Content-Type header is set
                    },
                });

                if (!response.ok) {
                    throw new Error('Listing not found or API request failed');
                }

                const data = await response.json();
                setListing(data[0]);  // Set specific listing data in state
            } catch (err) {
                setError(err.message);  // Set error if the API call fails
            } finally {
                setLoading(false);  // Set loading to false when the request is complete
            }
        };

        fetchListing();
    }, [listingId]);  // Fetch listing when listingId changes

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    console.log(listing); // Log the listing data to check if it's being fetched correctly

    return (
        <>
            <ListingHeader />
            <ListingBreadcrumb />
            {/* Render listing details here */}
            <div className={styles.listingContainer}>
                {listing ? (
                    <div className={styles.listingDetails}>
   
                        <div className={styles.listingLHside}>
                            <div className={styles.imgs}>
                                <img src={listing.image} alt={listing.title} className={styles.listingImage} />
                                <img src='/images/watchlist-btn.png' alt='Watchlist' className={styles.watchlist} />
                            </div>
                            <h2>Details:</h2>
                            <p>Condition: {listing.condition}</p>
                            <p>{listing.description}</p>
                        </div>

                        
                        <div className={styles.listingRHside}>
                            <h1>{listing.title}</h1>
                            <p className={styles.listDate}>
                                Closes: <br /> 
                                {listing.auction_end_date} <br />
                            </p>
                            <button className={styles.watchlistBtn}><FontAwesomeIcon icon={faBinoculars} className={`${styles.faIcon} ${styles.watchlistIcon}`}/>Add to Watchlist</button>
                            <p className={styles.watchlistCount}>
                                5 others watchlisted
                            </p>

                            <div className={styles.priceContainer}>
                                <p>Starting price</p>
                                <h2 className={styles.price}>${listing.start_price}.00</h2>
                                <button className={`${styles.bidBtn} ${styles.blueBtn}`}>Place bid</button>
                                <button className={`${styles.buyBtn} ${styles.blueBtn}`}>Buy Now</button>
                                <button className={`${styles.offerBtn} ${styles.greyBtn}`}>Make offer</button>
                                <p className={styles.reserveTxt}>No reserve<br/>
                                No bids</p>
                            </div>
                        </div>

                        
                    </div>
                ) : (
                    <div>No listing data available</div>
                )}
            </div>
        </>
    );
}

export default Listing;
