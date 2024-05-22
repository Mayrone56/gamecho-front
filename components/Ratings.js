import styles from '../styles/Rating.module.css';
import Header from './Header';
import Footer from './Footer';

function Ratings() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.middleContainer}>
                <h2 className={styles.sectionTitle}>Rating like</h2>
            </div>
            <Footer />
        </div>
    )
}
export default Ratings;