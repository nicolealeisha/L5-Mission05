import styles from '../styles/ListingRHSide.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import ListingDetails from './ListingRHDetails';
import ListingBid from './ListingBid';

function ListingRHSide() {
    const { listingId } = useParams(); // Extract dynamic params from the URL
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState('');
    const [bidOverlay, setBidOverlay] = useState(false); // State to manage the bid input value

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
                setLoading(false); // Set loading to false when the request is complete
            }
        };

        fetchListing();
    }, [listingId]);  // Fetch listing when listingId changes

    // Run countdown after listing loads to calculate time remaining
    useEffect(() => {
        if (!listing) return;
    
        const interval = setInterval(() => {
        const now = new Date();
        const auctionEndDate = new Date(listing.auction_end_date);
        const diff = auctionEndDate - now;
    
        if (diff <= 0) {
            setTimeRemaining('Auction ended');
            clearInterval(interval);
            return;
        }
    
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
    
        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }, 1000);
    
        return () => clearInterval(interval); // Cleanup
    }, [listing]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
      
        return date.toLocaleString('en-NZ', {
          weekday: 'short',      
          day: 'numeric',       
          month: 'short',         
          hour: 'numeric',       
          minute: '2-digit',     
          hour12: true           
        }).replace(',', '');
      };

    const formattedDate = formatDate(listing.auction_end_date);

    return (
        <>
        {bidOverlay && <ListingBid setBidOverlay={setBidOverlay} timeRemaining={timeRemaining} listing={listing}/> }

        <div className={styles.listingRHside}>
            {listing ? (
                <>
                    <h1>{listing.title}</h1>
                    <div className={styles.listingInfo}>
                        <p className={styles.listDate}>
                        Closes: {timeRemaining} <br />
                        {formattedDate} <br />
                        </p>
                        {(timeRemaining != 'Auction ended') &&
                        <>
                        <button className={styles.watchlistBtn}>
                        <FontAwesomeIcon icon={faBinoculars} className={`${styles.faIcon} ${styles.watchlistIcon}`} />
                        Add to Watchlist
                        </button>
                        <p className={styles.watchlistCount}>5 others watchlisted</p>
                        </>
                        }
                    </div>

                    <div className={styles.priceContainer}>
                        {(listing.current_bid.length === 0 ) ?
                        <><p>Starting price</p>
                        <h2 className={styles.price}>${listing.start_price}</h2>
                        </> :
                        <>
                        <p>{(timeRemaining == 'Auction ended') ? 'Final bid' : `Current bid`}</p>
                        <h2 className={styles.price}>${listing.current_bid[listing.current_bid.length - 1]}</h2>
                        </>}

                        {(timeRemaining == 'Auction ended') 
                            ? <button className={`${styles.bidBtnUnavailable}`} onClick={(()=> alert('Auction ended'))}>Place bid</button>
                            : <button className={`${styles.bidBtn} ${styles.blueBtn}`} onClick={(()=> setBidOverlay(true))}>Place bid</button>
                        }
                        {/* buy now unavailable if auction ended or reserve price met */}
                        <button className={`${(timeRemaining == 'Auction ended' || (listing.reserve_price > 0 && listing.reserve_price < listing.current_bid[listing.current_bid.length - 1])) ?  `${styles.bidBtnUnavailable}` : `${styles.blueBtn}`} ${styles.buyBtn}`}>Buy Now</button>
                        <button className={`${(timeRemaining == 'Auction ended' || (listing.reserve_price > 0 && listing.reserve_price < listing.current_bid[listing.current_bid.length -1])) ? `${styles.bidBtnUnavailable}` : `${styles.greyBtn}`}`}> Make offer</button>
                        <p className={styles.reserveTxt}>
                            {(listing.reserve_price === 0 ) && 'No reserve' }
                            {(listing.reserve_price > 0 && listing.reserve_price < listing.current_bid[listing.current_bid.length - 1]) && `Reserve met`}
                            {(listing.reserve_price > 0 && listing.reserve_price > listing.current_bid[listing.current_bid.length - 1] || 
                            listing.current_bid.length === 0 && listing.reserve_price > 0
                            ) && `Reserve not met`}
                        </p>
                        <p className={styles.bidTxt}>
                            {(listing.current_bid.length === 0) && 'No bids'}
                            {(listing.current_bid && listing.current_bid.length === 1) && `1 bid`}
                            {(listing.current_bid && listing.current_bid.length > 1) && `${listing.current_bid.length} bids`}
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
                            <p className={styles.sellerName}>{listing.seller_name}</p>
                            <span className={styles.sellerRatingPercentage}>{listing.seller_rating}%</span> <span className={styles.sellerRating}>positive feedback</span>
                            <p className={styles.sellerLocation}>Seller located in {listing.seller_location}</p>
                        </div>
                    </div>
                    <div className={styles.listingRHDetails}>
                        <ListingDetails />    
                    </div>
                </>
            ) : (
                <div>No listing data available</div>
            )}
        </div>
    </>
    ); 
}


export default ListingRHSide;
