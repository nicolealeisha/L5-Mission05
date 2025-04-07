import styles from '../styles/Listing.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ListingBreadcrumb from '../components/ListingBreadcrumb';
import ListingHeader from '../components/ListingHeader';

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
                        <img src={listing.image} alt={listing.title} className={styles.listingImage} />
                        <div className={styles.listingRHside}>
                            <h1>{listing.title}</h1>
                        </div>
                        <p>{listing.description}</p>
                        {/* Add other listing details you want to display */}
                    </div>
                ) : (
                    <div>No listing data available</div>
                )}
            </div>
        </>
    );
}

export default Listing;
