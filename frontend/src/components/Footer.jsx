import styles from '../styles/Footer.module.css';

function Footer() {
    return (
        <>
            <footer id="footer" className={styles.footer}>
                <div className={styles.orange_line}> </div>
                <nav>
                    <div className={styles.firstLineFooter}>
                        <a className={`${styles.navItem} ${styles.logo} ${styles.footerHeader}`} href="/#doyoulikefishsticks?"><img src="/images/logo.png" alt="Trade Me Logo" title="Trade Me" /></a>
                        <a className={`${styles.navItem} ${styles.footerHeader}`} href="/#doyoulikefishsticks?">List an item</a>
                        <a className={`${styles.navItem} ${styles.footerHeader}`} href="/#doyoulikefishsticks?">Watchlist</a>
                        <a className={`${styles.navItem} ${styles.footerHeader}`} href="/#doyoulikefishsticks?">Favourites</a>
                        <a className={`${styles.navItem} ${styles.footerHeader}`} href="/#doyoulikefishsticks?">My Trade Me</a>
                        <a className={`${styles.navItem} ${styles.footerHeader}`} href="/#doyoulikefishsticks?">Log out</a>
                    </div>
                </nav>

                <div className={styles.secGrid}>
                <nav className={styles.gridRow} id={styles["box1"]}>
                    <div className={styles.gridCol}>
                        <a className={`${styles.navItem} ${styles.firstNavItem} ${styles.nav1}`} href="/#doyoulikefishsticks?">Marketplace</a>
                        <a className={styles.navItem} href="/#doyoulikefishsticks?">Latest deals</a>
                        <a className={styles.navItem} href="/#doyoulikefishsticks?">Stores</a>
                        <a className={styles.navItem} href="/#doyoulikefishsticks?">Closing soon</a>
                        <a className={styles.navItem} href="/#doyoulikefishsticks?">$1 reserve</a>
                    </div>
                </nav>


                <nav className={styles.gridRow} id={styles["box2"]}>
                    <div className={styles.gridCol}>
                        <a className={`${styles.navItem} ${styles.firstNavItem} ${styles.nav2}`} href="/#">Jobs</a>
                        <a className={styles.navItem} href="/#">Browse categories</a>
                        <a className={styles.navItem} href="/#">Careers advice</a>
                        <a className={styles.navItem} href="/#">JobSmart</a>
                        <a className={styles.navItem} href="/#">Advertisers advice</a>
                    </div>
                </nav>


                <nav className={styles.gridRow} id={styles["box3"]}>
                    <div className={styles.gridCol}>
                        <a className={`${styles.navItem} ${styles.firstNavItem} ${styles.nav3}`} href="/#">Motors</a>
                        <a className={styles.navItem} href="/#">Browse all cars</a>
                        <a className={styles.navItem} href="/#">Other vehicles</a>
                        <a className={styles.navItem} href="/#">Buying & Selling</a>
                        <a className={styles.navItem} href="/#">Dealer news & info</a>
                    </div>
                </nav>

                <nav className={styles.gridRow} id={styles["box4"]}>
                    <div className={styles.gridCol}>
                        <a className={`${styles.navItem} ${styles.firstNavItem} ${styles.nav4}`} href="/#">Property</a>
                        <a className={styles.navItem} href="/#">International property</a>
                        <a className={styles.navItem} href="/#">News & guides</a>
                        <a className={styles.navItem} href="/#">Sold Properties</a>
                        <a className={styles.navItem} href="/#">OneHub for agents</a>
                    </div>
                </nav>

                <nav className={styles.gridRow} id={styles["box5"]}>
                    <div className={styles.gridCol}>
                        <a className={`${styles.navItem} ${styles.firstNavItem} ${styles.nav5}`} href="/#">Services</a>
                        <a className={styles.navItem} href="/#">Trades</a>
                        <a className={styles.navItem} href="/#">Domestic services</a>
                        <a className={styles.navItem} href="/#">Events & entertainment</a>
                        <a className={styles.navItem} href="/#">Health & wellbeing</a>
                    </div>
                </nav>

                <nav className={styles.gridRow} id={styles["box6"]}>
                    <div className={styles.gridCol}>
                        <a className={`${styles.navItem} ${styles.firstNavItem} ${styles.nav6}`} href="/#">Community</a>
                        <a className={styles.navItem} href="/#">Help</a>
                        <a className={styles.navItem} href="/#">Announcements</a>
                        <a className={styles.navItem} href="/#">Trust & safety</a>
                        <a className={styles.navItem} href="/#">Seller information</a>
                    </div>
                </nav>
                </div> 

                <div className={styles.mobileFooter}>
                        <a className={styles.navItem} href="/#doyoulikefishsticks?">Desktop site</a>
                        <a className={styles.navItem} href="/#doyoulikefishsticks?">Help</a>
                        <a className={styles.navItem} href="/#doyoulikefishsticks?">Contact us</a>
                        <a className={styles.navItem} href="/#doyoulikefishsticks?">Terms & Conditions</a>
                </div>

                <div className={styles.finalGridRow}>
                    <div className={styles.gridCol}>
                        <p>© 2025 Trade Me Limited </p>
                    </div>
                </div>
            </footer >
        </>
    );
}
export default Footer;