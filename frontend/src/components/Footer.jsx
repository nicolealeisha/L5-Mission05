import styles from '../styles/Footer.module.css';

function Footer() {
    return (
        <>
            <footer id="footer" className={styles.footer}>
                <div className={styles.orange_line}> </div>
                <nav>
                    <div className={styles.firstLineFooter}>
                        <a href="/#doyoulikefishsticks?" className={styles.logo}><img src="/images/logo.png" alt="Trade Me Logo" title="Trade Me" /></a>
                        <a href="/#doyoulikefishsticks?">List an item</a>
                        <a href="/#doyoulikefishsticks?">Watchlist</a>
                        <a href="/#doyoulikefishsticks?">Favourites</a>
                        <a href="/#doyoulikefishsticks?">My Trade Me</a>
                        <a href="/#doyoulikefishsticks?">Log out</a>
                    </div>
                </nav>{/* *******  THE FIRST BLOCK IS HORIZONTAL. THE NEXT 6 MAKE UP THE 6 COLUMNS */}


                <nav className={styles.gridRow} id={styles["box1"]}>
                    <div className={styles.gridCol}>
                        <a href="/#doyoulikefishsticks?">Marketplace</a>
                        <a href="/#doyoulikefishsticks?">Latest deals</a>
                        <a href="/#doyoulikefishsticks?">Stores</a>
                        <a href="/#doyoulikefishsticks?">Closing soon</a>
                        <a href="/#doyoulikefishsticks?">$1 reserve</a>
                    </div>
                </nav>


                <nav className={styles.gridRow} id={styles["box2"]}>
                    <div className={styles.gridCol}>
                        <a href="/#">Jobs</a>
                        <a href="/#">Browse categories</a>
                        <a href="/#">Careers advice</a>
                        <a href="/#">JobSmart</a>
                        <a href="/#">Advertisers advice</a>
                    </div>
                </nav>


                <nav className={styles.gridRow} id={styles["box3"]}>
                    <div className={styles.gridCol}>
                        <a href="/#">Motors</a>
                        <a href="/#">Browse all cars</a>
                        <a href="/#">Other vehicles</a>
                        <a href="/#">Buying & Selling</a>
                        <a href="/#">Dealer news & info</a>
                    </div>
                </nav>

                <nav className={styles.gridRow} id={styles["box4"]}>
                    <div className={styles.gridCol}>
                        <a href="/#">Property</a>
                        <a href="/#">International property</a>
                        <a href="/#">News & guides</a>
                        <a href="/#">Sold Properties</a>
                        <a href="/#">OneHub for agents</a>
                    </div>
                </nav>

                <nav className={styles.gridRow} id={styles["box5"]}>
                    <div className={styles.gridCol}>
                        <a href="/#">Services</a>
                        <a href="/#">Trades</a>
                        <a href="/#">Domestic services</a>
                        <a href="/#">Events & entertainment</a>
                        <a href="/#">Health & wellbeing</a>
                    </div>
                </nav>

                <nav className={styles.gridRow} id={styles["box6"]}>
                    <div className="grid-col navItem">
                        <a href="/#">Community</a>
                        <a href="/#">Help</a>
                        <a href="/#">Announcements</a>
                        <a href="/#">Trust & safety</a>
                        <a href="/#">Seller information</a>
                    </div>
                </nav>

                <nav className={styles.gridRow}>
                    <div className={styles.gridCol}>
                        <p>                            © 2025 Trade Me Limited </p>
                    </div>
                    <div className={styles.gridCol}>
                        <p>
                            Desktop site About Us Careers Advertise Privacy policy Terms & conditions Contact Us
                        </p>
                    </div>
                </nav>
            </footer >
        </>
    );
}
export default Footer;