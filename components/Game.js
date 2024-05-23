import styles from '../styles/Game.module.css';
import Header from './Header';
import Footer from './Footer';

function Game() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.middleContainer}>
                <h2 className={styles.sectionTitle}>"GameName"</h2>
            </div>
            <Footer />
        </div>
    )
}
export default Game;