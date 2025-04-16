import styles from '../styles/ListingBreadcrumb.module.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ListingBreadcrumb() {
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 320);
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fullPaths = location.pathname.split('/').filter(Boolean);
    const stopIndex = fullPaths.findIndex(path => path.toLowerCase() === 'listing');
    const paths = stopIndex !== -1 ? fullPaths.slice(0, stopIndex) : fullPaths;

    if (paths.length === 0) {
        return <div className={styles.breadcrumb}><span>Home</span></div>;
    }

    const capitalize = (str) =>
        str.replace(/(?:^|\s)\S/g, (match) => match.toUpperCase()).replace(/-/g, ' ');

    const breadcrumbLinks = [];

    // Always start with Home
    breadcrumbLinks.push(
        <span key="home">
            <a href="/">Home</a>
        </span>
    );

    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        const pathName = capitalize(decodeURIComponent(path));
        const url = `/${paths.slice(0, i + 1).join('/')}`;

        breadcrumbLinks.push(
            <span key={url}>
                {' / '}
                <a href={url}>{isMobile && i !== paths.length - 1 ? '...' : pathName}</a>
            </span>
        );
    }

    return <div className={styles.breadcrumb}>{breadcrumbLinks}</div>;
}

export default ListingBreadcrumb;
