import styles from '../styles/ListingRHDetails.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

function ListingDetails() {
    const { listingId } = useParams(); // Extract dynamic params from the URL
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandListing, setExpandListing] = useState(false);
    
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

    function getFirstSentence(description) {
        // Split the description by periods and take the first part
        const sentences = description.split('.');
        
        // Return the first sentence, removing any leading/trailing whitespace
        return sentences[0].trim() + (sentences.length > 1 ? '.' : '');  // Adds the period back if it's the first sentence
    }

    return (
        <div className={styles.listingRHDetails}>
            {listing ? (
                <>
                    <h2>Product at a glance</h2>

                    <button className={`${styles.listingDetailsBtn}`} onClick={() => setExpandListing(!expandListing)}>
                        <p className={styles.detailHeader}>About Product</p>
                        <p>{expandListing ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}</p>
                    </button>    
                    {expandListing && 
                    <div className={styles.listingDetails}>
                        <p>{getFirstSentence(listing.description)}</p>
                    </div> }

                    <button className={`${styles.listingDetailsBtn}`} >
                        <p>Instructions and maintenance</p>
                        <p><FontAwesomeIcon icon={faPlus} /></p>
                    </button>    

                    <button className={`${styles.listingDetailsBtn}`} >
                        <p>Warranty</p>
                        <p><FontAwesomeIcon icon={faPlus} /></p>
                    </button>    

                    <button className={`${styles.listingDetailsBtn}`} >
                        <p>Delivery</p>
                        <p><FontAwesomeIcon icon={faPlus} /></p>
                    </button>    


                </>
            ) : (
                <div>No listing data available</div>
            )}
        </div>
    );
}


export default ListingDetails;
