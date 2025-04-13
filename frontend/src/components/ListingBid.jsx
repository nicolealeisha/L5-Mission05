import styles from '../styles/ListingBid.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function ListingBid(props) {

    const [bidAmount, setBidAmount] = useState(''); 
    const [secondaryBidScreen, setSecondaryBidScreen] = useState(false);
    const [shipping, setShipping] = useState('');

    const closeBox = () => {
        props.setBidOverlay(false); // Toggle the handleClose state
    }

    const placeBid = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        if (!bidAmount) {
            alert("Please enter a bid amount.");
            return;
        }
        if (bidAmount <= props.listing.current_bid[props.listing.current_bid.length - 1]) {
            alert("Your bid must be higher than the current bid.");
            return;
        }
        if (!shipping) {
            alert("Please select a shipping option.");
            return;
        }
        else {
            setSecondaryBidScreen(true);
        }
    }

    const confirmBid = async () => {
        if (!bidAmount) {
            alert("Please enter a bid amount.");
            return;
        }
        if (bidAmount <= props.listing.current_bid[props.listing.current_bid.length - 1]) {
            alert("Your bid must be higher than the current bid.");
            return;
        }

        const response = await fetch(`http://localhost:3000/bid/${props.listing._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "current_bid": Number(bidAmount) }),
        });
        console.log(response);
        if (!response.ok) {
            alert("Error placing bid. Please try again.");
            console.log(response.statusText);
            return;
        }
        const data = await response.json();
        if (data.success) {
            alert("Bid placed successfully!");
            props.setBidOverlay(false); // Close the overlay
            // refresh the page to pull new data
            // this is a bit of a hack, but it works for now. ideally we would update the state of the listing to reflect the new bid amount
            window.location.reload();
        }
        else {
            alert("Error placing bid. Please try again.");
        }
    }

    return (
        <div className={`${props.bidOverlay ? styles.inActive : styles.listingBidOverlay}`}>    
                <form className={styles.listingBidForm}>
                    <div className={styles.bidHeader}>
                        <h1>Place a bid</h1>
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
                                <p>
                                    {(props.listing.reserve_price === 0) && `No reserve, `}
                                    {(props.listing.reserve_price > 0 && props.listing.reserve_price > props.listing.current_bid[props.listing.current_bid.length - 1] || props.listing.current_bid.length === 0) && `Reserve not met, `}
                                    {(props.listing.reserve_price > 0 && props.listing.reserve_price < props.listing.current_bid[props.listing.current_bid.length - 1]) && `Reserve met, `}
                                    {(props.listing.current_bid.length === 0) && `no bids`}
                                    {(props.listing.current_bid.length === 1) && `1 bid`}
                                    {(props.listing.current_bid.length > 1) && `${props.listing.current_bid.length} bids`}
                                </p>
                                <h2 className={styles.auctionCurrentPrice}>
                                    {(props.listing.current_bid.length === 0) ? `$${props.listing.start_price}` : `$${props.listing.current_bid[props.listing.current_bid.length - 1]}` }
                                </h2>
                            </div>
                        </div>                               
                    </div>

                {secondaryBidScreen ? (
                    <div className={styles.bidConfirm}>
                        <h2>Do you want to make a bid for <b>${bidAmount}?</b></h2>
                        <div className={styles.secondaryBidBtns}>
                            <button type="button" className={`${styles.bidBtn} ${styles.blueBtn}`} onClick={confirmBid}>Yes, place bid</button>
                            <button type="button" className={`${styles.cancelBtn} ${styles.inverseBtn}`} onClick={() => setSecondaryBidScreen(false)}>Go back</button>
                        </div>
                    </div>
                )
                : (
                <>
                    <div className={styles.bidDetails}>
                        <h2>Your bid</h2>
                        <input type="number" className={styles.bidBox} name="bidAmount" placeholder="Enter your bid" required onChange={(e) => setBidAmount(e.target.value)}/>
                    
                    <div className={styles.shippingDetails}>
                        <h2 className={styles.shippingHeader}>Shipping</h2>
                            <form className={styles.shippingForm}>
                                <div className={styles.shippingOptions}>
                                    <label class={styles.shippingBtn}><input type="radio" name="radio" value="option1" checked={shipping === 'option1'} onChange={(e) => setShipping(e.target.value)}/>Nationwide (urban)</label>
                                    <span className={styles.shippingPrice}>$10.00</span>
                                </div>
                                <div className={styles.shippingOptions}>
                                    <label class={styles.shippingBtn}><input type="radio" name="radio" value="option2" checked={shipping === 'option2'} onChange={(e) => setShipping(e.target.value)}/>Nationwide (rural)</label>
                                    <span className={styles.shippingPrice}>$12.00</span>
                                </div>	
                                <div className={styles.shippingOptions}>
                                    <label class={styles.shippingBtn}><input type="radio" name="radio" value="option3" checked={shipping === 'option3'} onChange={(e) => setShipping(e.target.value)}/>Pick up from seller</label>
                                    <span className={styles.shippingPrice}>Free</span>
                                </div>
                            </form>
                        </div>
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
