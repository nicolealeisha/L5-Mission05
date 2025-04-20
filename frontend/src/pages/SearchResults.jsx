import styles from '../styles/Results.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import ResultsBreadcrumb from '../components/ResultsBreadcrumb';
// import ResultsHeader from '../components/ResultsHeader';

function Results() {
    const { kw } = useParams(); // Extract keywkord params from the URL
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const keyword = kw;
    console.log(kw, keyword); // Log the keyword to check if it's being passed correctly

    // Fetch results data from the backend using the keyword
    useEffect(() => {
        const fetchResults = async () => {
            console.log(keyword)
            try {
                const response = await fetch(`http://localhost:3000/search/${keyword}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',  // Ensure the Content-Type header is set
                    },
                });

                if (!response.ok) {
                    throw new Error(`Results not found for '${keyword}' or API request failed`);
                }

                const data = await response.json();
                setResults(data);  // Set the results data in state
            } catch (err) {
                setError(err.message);  // Set error if the API call fails
            } finally {
                setLoading(false);  // Set loading to false when the request is complete
            }
        };

        fetchResults();
    }, [keyword]);  // Fetch results when keyword changes

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            {/* <ResultsHeader /> */}
            {/* <ResultsBreadcrumb /> */}
            {/* Render results details here */}
            <div className={styles.resultsContainer}>
                {results ? (
                    <div>
                        <h1>{results[0].title}</h1>
                        <p>{results[0].title}</p>
                        <p>{results.description}</p>
                        <div>Results data is funky. {results.length} results.</div>
                    </div>
                ) : (
                    <div>No results data available</div>
                )}
            </div>
        </>
    );
}

export default Results;
