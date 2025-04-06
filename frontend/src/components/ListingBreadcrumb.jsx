import styles from '../styles/ListingBreadcrumb.module.css';
import { useLocation } from 'react-router-dom';

function ListingBreadcrumb () {
    const location = useLocation(); // Get current path from the URL

    // Split the pathname by '/' to get individual path segments
    const paths = location.pathname.split('/').filter(Boolean);

    // If there are no paths, we can assume it's the home page
    if (paths.length === 0) {
        return <div className={styles.breadcrumb}><span>Home</span></div>;
    }

    // Start the breadcrumb with "Home"
    let breadcrumbLinks = [
        <span key="home"><a href="/">Home</a></span>
    ];

    // Add each segment as a breadcrumb link
    paths.forEach((path, index) => {
        const pathName = decodeURIComponent(path.replace(/-/g, ' ')); // Decode and replace hyphens
        const url = `/${paths.slice(0, index + 1).join('/')}`; // Build URL for the current segment

        breadcrumbLinks.push(
            <span key={url}>
                {' / '}
                <a href={url}>{pathName}</a>
            </span>
        );
    });

    return (
    <div className={styles.breadcrumb}>
        {breadcrumbLinks}
    </div>
    );
};

export default ListingBreadcrumb ;