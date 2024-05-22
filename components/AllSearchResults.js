import styles from '../styles/AllSearchResults.module.css';
import Header from './Header';
import Footer from './Footer';

function AllSearchResults() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.middleContainer}>
                <h2 className={styles.sectionTitle}>All search results</h2>
            </div>
            <Footer />
        </div>
    )
}
export default AllSearchResults;