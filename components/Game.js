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
                            <p>Average rating - <span className={styles.caption}>Based on 634 ratings</span></p>
                        </div>
                    </div>
                </div>
                <div className={styles.bottomContainer}>
                    <div className={styles.tagContainer}>
                        <div className={styles.tag}>Tag</div>
                        <div className={styles.tag}>Tag</div>
                        <div className={styles.tag}>Tag</div>
                    </div>

                    <div className={styles.descriptionContainer}>
                        <h3>Synopsis</h3> 
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non vulputate eros. Nunc suscipit nunc vitae sapien vehicula auctor. Curabitur lacus enim, porta sit amet malesuada vel, rutrum vitae odio. Pellentesque luctus hendrerit augue, ac tempus urna condimentum quis. In tellus nisi.</p>
                    </div>
                    <div className={styles.trailerContainer}>
                        <h3>Trailer</h3> 
                        <div className={styles.videoContainer}>
                        </div>
        
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}
export default Game;