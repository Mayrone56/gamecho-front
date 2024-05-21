import styles from '../styles/GameLike.module.css';
import Header from './Header';
import Footer from './Footer';

function GameLike() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.middleContainer}>
                <h2 className={styles.sectionTitle}>"gameName" like</h2>
            </div>
            <Footer />
        </div>
    )
}
export default GameLike;