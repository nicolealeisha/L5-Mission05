import styles from '../styles/ListingOtherListings.module.css';

function ListingOtherListings (props) {
    return (  
        <>
        <h2 className={styles.header}>Seller's other listings</h2>
        <div className={styles.otherListingsContainer}>
        {props.otherListings
                // filter then return all listings that aren't the current one
                .filter(otherListing => otherListing.title !== props.listing.title)
                .map((otherListing) => (
                <div key={otherListing._id} className={styles.otherListingItem}>
                    <div className={styles.imgContainer}>
                        <img src={otherListing.image} alt={otherListing.title} className={styles.otherListingImage} />
                        <img src='/images/watchlist-btn.png' alt='Watchlist' className={styles.watchlist} />
                    </div>
                    <p>{otherListing.title}</p>
                    <p>${otherListing.start_price}</p>
                </div>
            ))}
        </div>
        </>
    );
}

export default ListingOtherListings
 ;