import styles from '../styles/GameLike.module.css';
import Header from './Header';
import Footer from './Footer';

function GameLike() {
    return (
        <>
        <Header/>
        <div className={styles.container}>
            <div className={styles.middleContainer}>
                <h2 className={styles.sectionTitle}>"gameName" like</h2>
            </div>
        </div>
        <Footer/>
        </>
    )
}
export default GameLike;