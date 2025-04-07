import styles from '../styles/ListingBreadcrumb.module.css';
import { useLocation } from 'react-router-dom';

function ListingBreadcrumb() {
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

    // Capitalize the first letter of each word in the string
    const capitalizeFirstLetter = (str) => {
        return str
            .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase()) // Capitalize the first letter of each word
            .replace(/-/g, ' '); // Replace hyphens with spaces
    };

    // Use a standard for loop to control when to stop
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];

        // Stop processing further if the path is "listing"
        if (path.toLowerCase() === 'listing') {
            break;
        }

        const pathName = capitalizeFirstLetter(decodeURIComponent(path)); // Capitalize and decode path segment
        const url = `/${paths.slice(0, i + 1).join('/')}`; // Build URL for the current segment

        breadcrumbLinks.push(
            <span key={url}>
                {' / '}
                <a href={url}>{pathName}</a>
            </span>
        );
    }

    return (
        <div className={styles.breadcrumb}>
            {breadcrumbLinks}
        </div>
    );
};

export default ListingBreadcrumb;
