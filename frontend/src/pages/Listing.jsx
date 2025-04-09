import styles from '../styles/Listing.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ListingBreadcrumb from '../components/ListingBreadcrumb';
import ListingHeader from '../components/ListingHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';
import ListingPayment from '../components/ListingPayment';
import ListingQuestions from '../components/ListingQuestions';
import ListingRHside from '../components/ListingRHSide';


function Listing() {
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
        <>
            <ListingHeader />
            <ListingBreadcrumb />

            <div className={styles.listingContainer}>
                {listing ? (
                    <>
                    <div className={styles.topListingDetails}>
   
                        <div className={styles.listingLHside}>
                            <div className={styles.imgs}>
                                <img src={listing.image} alt={listing.title} className={styles.listingImage} />
                                <img src='/images/watchlist-btn.png' alt='Watchlist' className={styles.watchlist} />
                            </div>
                        </div>

                        <div className={styles.listingRHside}>
                            <ListingRHside />
                        </div>
                    </div>
                    <div className={styles.btmListingDetails}>
                        
                        <div className={styles.listingLHside}>
                            <h2>Details</h2>
                            <p className={styles.description}>Condition: {listing.condition}</p>
                            <h2>Full Description</h2>
                            <p className={styles.description}>{listing.description}</p>
                            
                            <ListingPayment />

                            <ListingQuestions />

                            <div className={styles.sellerDetails}>
                                <div className={styles.sellerDetailsCentre}>
                                    <h2>About the seller</h2>
                                    <div className={styles.sellerAvatar}>
                                        <FontAwesomeIcon icon={faCircleUser} className={`${styles.faIcon} ${styles.sellerAvatarIcon}`} />
                                    </div>
                                    <p><b>Seller name {listing.seller_name}</b></p>
                                    <p>99% positive feedback (123)</p>
                                </div>
                                <div className={styles.sellerDetailDivider}><p>Location</p><p className={styles.rhDetails}>Auckland</p></div>
                                <div className={styles.sellerDetailDivider}><p>Member since</p><p className={styles.rhDetails}>Tue 05 Aug 2024</p></div>
                                <div className={styles.sellerDetailDivider}><a href='/404' className={styles.sellerLink}>Seller's other listings</a><p className={styles.rhDetails}><FontAwesomeIcon icon={faAngleDown} className={`${styles.faIcon} ${styles.angleDown}`}/></p></div>
                                <div className={styles.sellerDetailsCentre}>
                                    <button className={`${styles.blueBtn} ${styles.sellerBtn}`}><FontAwesomeIcon icon={faHeartCirclePlus} className={styles.favouritesIcon}/>Add to Favourite Sellers</button>
                                    <a href='/404'>Read our safe buying guide</a>
                                </div>
                            </div>   
                        </div>

                    </div>
                    </>
                ) : (
                    <div>No listing data available</div>
                )}
            </div>
        </>
    );
}

export default Listing;
