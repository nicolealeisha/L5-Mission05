import styles from '../styles/Browse.module.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useParams, Link } from 'react-router-dom';

import ListingBreadcrumb from '../components/ListingBreadcrumb';
import ListingOtherListings from '../components/ListingOtherListings';

function Browse() {
  const { categoryName, subcategoryName } = useParams();
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState('');
  const [sortedListings, setSortedListings] = useState([]);

  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        const response = await fetch(`http://localhost:3000/allListings`);
        const allListings = await response.json();
        setAllListings(allListings);
      } catch (err) {
        console.error('Error fetching listings:', err);
        setError(err.message);
      }
    };

    const runAll = async () => {
      setLoading(true);
      await fetchAllListings();
      setLoading(false);
    };

    runAll();
  }, []);

  useEffect(() => {
    let filtered = [...allListings];

    if (categoryName) {
      filtered = filtered.filter((listing) => listing.category === categoryName);
    }

    if (subcategoryName) {
      filtered = filtered.filter((listing) => listing.subcategory === subcategoryName);
    }

    if (!selected) {
      setSortedListings(filtered);
      return;
    }

    let sorted = [...filtered];

    if (selected === 'lowprice' || selected === 'highprice') {
      sorted.sort((a, b) => {
        const aBid = a.current_bid?.[a.current_bid.length - 1];
        const bBid = b.current_bid?.[b.current_bid.length - 1];

        const aPrice = aBid > a.reserve_price ? aBid : a.buy_now_price;
        const bPrice = bBid > b.reserve_price ? bBid : b.buy_now_price;

        return selected === 'lowprice' ? aPrice - bPrice : bPrice - aPrice;
      });
    } else if (selected === 'newestlisting') {
      sorted.sort((a, b) => new Date(b.auction_end_date) - new Date(a.auction_end_date));
    } else if (selected === 'oldestlisting') {
      sorted.sort((a, b) => new Date(a.auction_end_date) - new Date(b.auction_end_date));
    }

    setSortedListings(sorted);
  }, [selected, allListings, categoryName, subcategoryName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(sortedListings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedListings = sortedListings.slice(startIndex, endIndex);

  const categoryCounts = allListings.reduce((acc, listing) => {
    acc[listing.category] = (acc[listing.category] || 0) + 1;
    return acc;
  }, {});

  const subcategoryCounts = categoryName
    ? allListings.reduce((acc, listing) => {
        if (listing.category === categoryName) {
          acc[listing.subcategory] = (acc[listing.subcategory] || 0) + 1;
        }
        return acc;
      }, {})
    : null;

  return (
    <>
      <header className={styles.marketplaceHeader}>
        <ListingBreadcrumb />
        <h2 className={styles.sectionTitle}>
          {subcategoryName
            ? `${subcategoryName} Listings`
            : categoryName
            ? `${categoryName} Listings`
            : 'All Categories'}
        </h2>

        <div className={styles.catList}>
          {!categoryName &&
            Object.entries(categoryCounts).map(([cat, count]) => (
                <div key={cat} className={styles.catItems}>
                <Link key={cat} to={`/marketplace/${cat}`} className={styles.catLink}>
                    {cat} 
                </Link>
                <span className={styles.catCount}>({count})</span>
              </div>
            ))}

          {categoryName && subcategoryCounts &&
            Object.entries(subcategoryCounts).map(([sub, count]) => (
                <div key={sub} className={styles.catItems}>
                <Link
                    key={sub}
                    to={`/marketplace/${categoryName}/${sub}`}
                    className={styles.catLink}
                >
                    {sub}
                </Link>
            <span className={styles.catCount}>({count})</span>
            </div>
            ))}
        </div>
      </header>

      <section className={styles.content}>
        <span className={styles.resultsHeader}>
          <h2 className={styles.results}>Showing {sortedListings.length} results</h2>
          <select
            id="category"
            className={styles.sortFilter}
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Sort: Best Match</option>
            <option value="lowprice">Lowest Price</option>
            <option value="highprice">Highest Price</option>
            <option value="newestlisting">Latest Listing</option>
            <option value="oldestlisting">Closing Soon</option>
          </select>
        </span>

        <section className={styles.auctions}>
          <div className={styles.auctionList}>
            <ListingOtherListings otherListings={paginatedListings} />
          </div>
        </section>

        <div className={styles.paginationControls}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentPage(i + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={currentPage === i + 1 ? `${styles.active}` : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <p
          className={styles.toTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FontAwesomeIcon icon={faArrowUp} /> Back to top
        </p>
      </section>
    </>
  );
}

export default Browse;
