import styles from '../styles/ListingBid.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function ListingBid(props) {

    const [bidAmount, setBidAmount] = useState(''); 
    const [secondaryBidScreen, setSecondaryBidScreen] = useState(false);

    const closeBox = () => {
        props.setBidOverlay(false); // Toggle the handleClose state
    }

    const placeBid = () => {
        if (!bidAmount) {
            alert("Please enter a bid amount.");
            return;
        }
        if (bidAmount <= props.listing.current_bid) {
            alert("Your bid must be higher than the current bid.");
            return;
        }
        setSecondaryBidScreen(true);
    }

    return (
        <div className={`${props.bidOverlay ? styles.inActive : styles.listingBidOverlay}`}>    
                <form className={styles.listingBidForm}>
                    <div className={styles.bidHeader}>
                        <h2>Place a bid</h2>
                        <span className={styles.closeBid} onClick={closeBox}><FontAwesomeIcon icon={faPlus} /></span>
                    </div>
                    <div className={styles.auctionDetails}>
                        <img src={props.listing.image} alt={props.listing.title} className={styles.listingImage} />
                        <div className={styles.auctionInfo}>
                            <div className={styles.auctionInfoTop}>
                                <p>{props.listing.location} | Closes {props.timeRemaining}</p> 
                                <h3>{props.listing.title}</h3>
                            </div>  
                            <div className={styles.auctionInfoBtm}>
                                <p>No reserve, no bid</p>
                                <h2>${props.listing.current_bid}</h2>
                            </div>
                        </div>                               
                    </div>

                {secondaryBidScreen ? (
                    <div className={styles.bidConfirm}>
                        <h2>Do you want to make a bid for <b>${bidAmount}?</b></h2>
                        <div className={styles.secondaryBidBtns}>
                            <button type="button" className={`${styles.bidBtn} ${styles.blueBtn}`} onClick={closeBox}>Yes, place bid</button>
                            <button type="button" className={`${styles.cancelBtn} ${styles.inverseBtn}`} onClick={() => setSecondaryBidScreen(false)}>Go back</button>
                        </div>
                    </div>
                )
                : (
                <>
                    <div className={styles.bidDetails}>
                        <h2>Your bid</h2>
                        <input type="number" className={styles.bidBox} name="bidAmount" placeholder="Enter your bid" required onChange={(e) => setBidAmount(e.target.value)}/>
                    </div>
                    <div className={styles.bidBtns}>
                        <button type="submit" className={`${bidAmount ? styles.bidBtn : styles.invalidBtn} ${styles.blueBtn}`} onClick={placeBid}>Place bid</button>
                        <button type="button" className={`${styles.cancelBtn} ${styles.inverseBtn}`} onClick={closeBox}>Go back to listing</button>
                    </div>
                </>
                )}
                </form>
        </div>
    );
}


export default ListingBid;
