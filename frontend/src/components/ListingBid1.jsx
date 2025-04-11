import styles from '../styles/ListingBid.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function ListingBid1(props) {
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


    const closeBox = () => {
        props.setBidOverlay(false); // Toggle the handleClose state
    }

    return (
        <div className={`${props.bidOverlay ? styles.inActive : styles.listingBidOverlay}`}>
            {listing ? (
                <form className={styles.listingBidForm}>
                    <div className={styles.bidHeader}>
                        <h2>Place a bid</h2>
                        <span className={styles.closeBid} onClick={closeBox}><FontAwesomeIcon icon={faPlus} /></span>
                    </div>
                    <div className={styles.auctionDetails}>
                        <img src={listing.image} alt={listing.title} className={styles.listingImage} />
                        <div className={styles.auctionInfo}>
                            <p>{listing.location} | Closes {props.timeRemaining}</p> 
                            <h3>{listing.title}</h3>
                            <p>Current Price: ${listing.current_bid}.00</p>
                            <p>Time Remaining: {listing.time_remaining}</p>
                        </div>                             
                    
                    </div>
                    <div className={styles.bidDetails}>
                        <h3>Your bid</h3>
                        <input type="number" name="bidAmount" placeholder="Enter your bid" required />
                    </div>
                </form>
            ) : (
                <div>No listing data available</div>
            )}
        </div>
    );
}


export default ListingBid1;
