import styles from '../styles/ListingPayment.module.css';

function ListingPayment () {
    return ( 
        <div className={styles.payment}>
            <h2>Payment Options</h2>
                <div className={styles.paymentOptions}>
                    <div className={styles.lhPaymentOptions}>
                        <img src='/images/payment-ping.png' alt='Payment Options' className={styles.paymentImage} />
                        <p>Pay instantly by card, Ping balance or saved bank account.</p>
                        <a href='/404' className={styles.link}>What's Ping?</a>
                    </div>
                    <div className={styles.rhPaymentOptions}>
                        <img src='/images/payment-afterpay.png' alt='Payment Options' className={styles.paymentImage} />
                            <p>Four fortnightly interest-free payments.</p>
                            <a href='/404' className={styles.link}>What's Afterpay?</a>
                    </div>
                </div>
                <div className={styles.otherPaymentOptions}>
                    <h3>Other Options</h3>
                    <p>Cash, NZ Bank Deposit</p>
                </div>  
            </div>
     );
}

export default ListingPayment ;