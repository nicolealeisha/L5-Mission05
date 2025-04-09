import styles from '../styles/ListingRHSide.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import ListingDetails from './ListingRHDetails';
import Listing from '../pages/Listing';

function ListingRHSide() {
    const { listingId } = useParams(); // Extract dynamic params from the URL
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        <div className={styles.listingRHside}>
            {listing ? (
                <>
                    <h1>{listing.title}</h1>

                    <div className={styles.listingInfo}>
                        <p className={styles.listDate}>
                        Closes: <br />
                        {listing.auction_end_date} <br />
                        </p>
                        <button className={styles.watchlistBtn}>
                        <FontAwesomeIcon icon={faBinoculars} className={`${styles.faIcon} ${styles.watchlistIcon}`} />
                        Add to Watchlist
                        </button>
                        <p className={styles.watchlistCount}>5 others watchlisted</p>
                    </div>

                    <div className={styles.priceContainer}>
                        <p>Starting price</p>
                        <h2 className={styles.price}>${listing.start_price}.00</h2>
                        <button className={`${styles.bidBtn} ${styles.blueBtn}`}>Place bid</button>
                        <button className={`${styles.buyBtn} ${styles.blueBtn}`}>Buy Now</button>
                        <button className={`${styles.offerBtn} ${styles.greyBtn}`}>Make offer</button>
                        <p className={styles.reserveTxt}>
                            No reserve
                            <br />
                            No bids
                        </p>
                    </div>

                    <div className={styles.buyerProtectionContainer}>
                        <span className={styles.buyerProtectionHeader}>
                            <img src='/images/buyer-protection.png' alt='Buyer Protection' className={styles.buyerProtectionImg} />
                            <span className={styles.buyerProtectionHeader}>Buyers Protection</span> 
                            <span className={styles.buyerProtectionText}>covers you up to $2,500 on this item when you pay with Ping or Afterpay if your item doesn't show up or isn't as described.</span>
                        </span>
                        <a>Learn more about Buyer Protection</a>
                    </div>

                    <div className={styles.sellerDetailsContainer}>
                        <div className={styles.sellerImg}>
                            <img src={listing.seller_image} alt='Seller' className={styles.sellerAvatar} />
                        </div>
                        <div className={styles.sellerInfo}>
                            <p className={styles.sellerName}>{listing.seller_name} name</p>
                            <span className={styles.sellerRatingPercentage}>{listing.seller_rating} %</span> <span className={styles.sellerRating}>positive feedback</span>
                            <p className={styles.sellerLocation}>Seller located in {listing.seller_location}</p>
                        </div>
                    </div>

                    <ListingDetails />    
                </>
            ) : (
                <div>No listing data available</div>
            )}
        </div>
    );
}


export default ListingRHSide;
