import styles from '../styles/AllReleases.module.css';
import Header from './Header';
import Footer from './Footer';

function AllReleases() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.middleContainer}>
                <h2 className={styles.sectionTitle}>All releases</h2>
            </div>
            <Footer />
        </div>
    )
}
export default AllReleases;