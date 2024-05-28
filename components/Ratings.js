import styles from '../styles/Rating.module.css';
import Header from './Header';
import Footer from './Footer';

function Ratings() {
    return (
        <div className={styles.container}>
            <div className={styles.middleContainer}>
                <h2 className={styles.sectionTitle}>Rating like</h2>
            </div>
        </div>
    )
}
export default Ratings;