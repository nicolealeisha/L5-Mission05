import styles from '../styles/Listing.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ListingBreadcrumb from '../components/ListingBreadcrumb';
import ListingHeader from '../components/ListingHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
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

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
      
        return date.toLocaleString('en-NZ', {
          weekday: 'long',      
          day: 'numeric',       
          month: 'long', 
          year: 'numeric',            
        });
      };

    return (
        <>
            <ListingHeader />
            <ListingBreadcrumb />


            <div className={styles.listingContainer}>
                {listing ? (
                    <>
                        <div className={styles.listingLHside}>
                            <div className={styles.imgs}>
                                <img src={listing.image} alt={listing.title} className={styles.listingImage} />
                                <img src='/images/watchlist-btn.png' alt='Watchlist' className={styles.watchlist} />
                            </div>

                            <div className={styles.listingRHsideMobile}>
                                <ListingRHside />
                            </div>
                        
                            <div className={styles.listingDetails}>
                                <h2>Details</h2>
                                <p className={styles.description}>Condition: {listing.condition}</p>
                                <h2>Full Description</h2>
                                <p className={styles.description}>{listing.description}</p>
                            </div>
                            
                            <div className={styles.listingPayment}>
                                <ListingPayment />
                            </div>

                            <div className={styles.listingQuestions}>
                                <ListingQuestions />
                            </div>

                            <div className={styles.sellerDetails}>
                                <h2>About the seller</h2>
                                <div className={styles.sellerDetailsCentre}>
                                    <div className={styles.sellerAvatarBox}>
                                        <img src={listing.seller_image} alt='Seller' className={styles.sellerAvatar} />
                                    </div>
                                    <p><b>{listing.seller_name}</b></p>
                                    <p>{listing.seller_rating}% positive feedback (123)</p>
                                </div>
                                <div className={styles.sellerDetailDivider}><p>Location</p><p className={styles.rhDetails}>{listing.seller_location}</p></div>
                                <div className={styles.sellerDetailDivider}><p>Member since</p><p className={styles.rhDetails}>{formatDate(listing.seller_member_since)}</p></div>
                                <div className={styles.sellerDetailDivider}><a href='/404' className={styles.sellerLink}>Seller's other listings</a><p className={styles.rhDetails}><FontAwesomeIcon icon={faAngleDown} className={`${styles.faIcon} ${styles.angleDown}`}/></p></div>
                                <div className={styles.sellerDetailsCentre}>
                                    <button className={`${styles.blueBtn} ${styles.sellerBtn}`}><FontAwesomeIcon icon={faHeartCirclePlus} className={styles.favouritesIcon}/>Add to Favourite Sellers</button>
                                    <a href='/404'>Read our safe buying guide</a>
                                </div>
                            </div> 

                            <div className={styles.shareListing}>
                                <a className={styles.share} ><FontAwesomeIcon icon={faShareNodes} className={styles.shareIcon}/> Share this listing</a>
                                <span className={styles.shareDot}>•</span>
                                <span className={styles.shareInfo}>Listing #{listing._id}</span>
                                <span className={styles.shareDot}>•</span>
                                <span className={styles.shareInfo}>Page views: 40</span>
                            </div>  
                            <div className={styles.communityWatchInfo}>
                                <span className={styles.communityWatch}><FontAwesomeIcon icon={faStar} className={styles.commWatchIcon} /> Community Watch:</span>
                                <a className={styles.commWatchReport}>Report this listing</a>
                            </div>
                            
                        </div>

                        <div className={styles.listingRHsideDesktop}>
                            <ListingRHside />
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
