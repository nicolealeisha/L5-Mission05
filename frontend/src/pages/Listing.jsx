import styles from '../styles/Listing.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ListingBreadcrumb from '../components/ListingBreadcrumb';
import ListingHeader from '../components/ListingHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import ListingQuestions from '../components/ListingQuestions';


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
                        'Content-Type': 'application/json', 
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

    return (
        <>
            <ListingHeader />
            <ListingBreadcrumb />

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
                            <h2>Full Description</h2>
                            <p>{listing.description}</p>
                            <div className={styles.payment}>
                                <h2>Payment Options</h2>
                                <div className={styles.paymentOptions}>
                                    <div className={styles.lhPaymentOptions}>
                                        <img src='/images/payment-ping.png' alt='Payment Options' className={styles.paymentImage} />
                                        <p>Pay instantly by card, Ping balance or saved bank account.</p>
                                        <a href='/404' className={styles.link}>What's Ping?</a>
                                    </div>
                                    <div className={styles.rhPaymentOptions}>
                                        <img src='/images/payment-afterpay.png' alt='Payment Options' className={styles.paymentImage} />
                                        <p>Four fortnightly interest-free payments.</p>
                                        <a href='/404' className={styles.link}>What's Afterpay?</a>
                                    </div>
                                </div>
                                <div className={styles.otherPaymentOptions}>
                                        <h3>Other Options</h3>
                                        <p>Cash, NZ Bank Deposit</p>
                                </div>  
                            </div>
                            <ListingQuestions />

                            <div className={styles.sellerDetails}>
                                <h2>About the seller</h2>
                                <div className={styles.sellerAvatar}>
                                    <FontAwesomeIcon icon={faCircleUser} className={`${styles.faIcon} ${styles.sellerAvatarIcon}`} />
                                </div>
                                <p>Seller name {listing.seller_name}</p>
                                <p>{listing.seller_rating} positive feedback (123)</p>
                                <p>Location</p> 
                                <p>Seller's other listings</p>
                                <p>See all listings</p>
                            </div>   
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
