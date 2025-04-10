// import styles from '../styles/Results.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import ResultsBreadcrumb from '../components/ResultsBreadcrumb';
// import ResultsHeader from '../components/ResultsHeader';

function Results() {
    const [keyword, setKeyword] = useState(null);
    const [listing, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(keyword); // Log the listingId to check if it's being passed correctly

    // Fetch listing data from the backend using the listingId
    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(`http://localhost:3000/search/${keyword}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',  // Ensure the Content-Type header is set
                    },
                });

                if (!response.ok) {
                    throw new Error(`Results not found for ${keyword} or API request failed`);
                }

                const data = await response.json();
                setResults(data);  // Set the listing data in state
            } catch (err) {
                setError(err.message);  // Set error if the API call fails
            } finally {
                setLoading(false);  // Set loading to false when the request is complete
            }
        };

        fetchResults();
    }, [keyword]);  // Fetch listing when listingId changes

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            {/* <ResultsHeader /> */}
            {/* <ResultsBreadcrumb /> */}
            {/* Render listing details here */}
            <div className={styles.listingContainer}>
                {listing ? (
                    <div>
                        <h1>{listing.title}</h1>
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

export default Results;
