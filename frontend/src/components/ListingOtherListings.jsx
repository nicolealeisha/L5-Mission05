import styles from '../styles/ListingOtherListings.module.css';
import { Link } from 'react-router-dom';

function ListingOtherListings (props) {


    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);

        return date.toLocaleString('en-NZ', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        });
    };


    return (  
        <>
        <h2 className={styles.header}>Seller's other listings</h2>
        <div className={styles.otherListingsContainer}>
        {props.otherListings
                // filter listings that aren't the current one
                .filter(otherListing => otherListing.title !== props.listing.title)
                // filter out listings that have ended
                .filter(otherListing => new Date (otherListing.auction_end_date) > new Date())
                // then return all the other listings
                .map((otherListing) => (
                <Link 
                    key={otherListing._id}
                    to={`/marketplace/${otherListing.category}/${otherListing.subcategory}/listing/${otherListing._id}`}
                    className={styles.otherListingLink}
                >    
                    <div key={otherListing._id} className={styles.otherListingItem}>
                        <div className={styles.imgContainer}>
                            <img src={otherListing.image} alt={otherListing.title} className={styles.otherListingImage} />
                            <img src='/images/watchlist-btn.png' alt='Watchlist' className={styles.watchlist} />
                        </div>
                        <div className={styles.otherListingHeader}>
                            <p>{otherListing.location}</p>
                            <span className={styles.otherListingTime}>Closes: {formatDate(otherListing.auction_end_date)}</span>
                        </div>
                        <div className={styles.otherListingInfo}>
                            <h3>{otherListing.title}</h3>
                            <p>$18 shipping to Auckland</p>
                            <p>Expected delivery 3-5 business days</p>
                        </div>
                        <div className={styles.otherListingPrice}>
                            {(otherListing.current_bid.length === 0 || otherListing.current_bid[otherListing.current_bid.length - 1] < otherListing.reserve_price)
                            ?
                            <>
                            <p className={styles.buyHeader}>Buy now</p>
                            <h2 className={styles.buyPrice}>${otherListing.buy_now_price} </h2>
                            </>
                            :
                            <> 
                            <p className={styles.buyHeader}>Bid now</p>
                            <h2 className={styles.buyPrice}>${otherListing.current_bid[otherListing.current_bid.length - 1]}</h2>
                            </>
                            }
                        </div>
                    </div>
                </Link>
            ))}
        </div>
        </>
    );
}

export default ListingOtherListings
 ;