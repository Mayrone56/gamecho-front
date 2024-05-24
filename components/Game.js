import styles from '../styles/Game.module.css';
import Header from './Header';
import Footer from './Footer';
import Image from "next/image";

function Game() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.middleContainer}>
                <div className={styles.bannerContainer}>
                    <div className={styles.topBannerContainer}>

                        <button className={styles.iconButton} onClick={() => handleSubmit()} >
                            {" "}
                            <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} />
                        </button>
                        <button className={styles.iconButton} onClick={() => handleSubmit()} >
                            {" "}
                            <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} />
                        </button>
                        <p className={styles.textButton}>Rate it!</p>
                    </div>

                    <div className={styles.bottomBannerContainer}>
                        <h2 className={styles.sectionTitle}>Fortnite</h2>
                        <div className={styles.captionGameName} >
                            <div className={styles.iconRating}>
                                <Image src="/icons/emojiIcons/happy.svg" alt="Rating icon" width={24} height={24} className={styles.icon} />
                            </div>
                            <p >Average rating - <span className={styles.caption}>Based on 634 ratings</span></p>
                        </div>
                    </div>

                </div>




            </div>
            <Footer />
        </div>

    )
}
export default Game;