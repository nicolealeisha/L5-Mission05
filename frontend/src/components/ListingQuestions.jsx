import styles from '../styles/ListingQuestions.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

function ListingQuestions () {
    return ( 
        <div className={styles.questionsContainer}>
            <h2>Questions & Answers (1)</h2>
            <div className={styles.questionBox}>
                <div className={styles.avatar}>
                    <FontAwesomeIcon icon={faCircleUser} className={`${styles.faIcon}`} />
                </div>
            
                <div className={styles.questionDetails}>
                    <p className={styles.question}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p><b>Seller comment</b> Monday, 16 December 2024</p>
                </div>
            </div>    
            
            <button className={styles.questionBtn}>Ask a question</button>
        </div>
     );

    }

export default ListingQuestions ;