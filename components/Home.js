import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Header from './Header';
import Footer from './Footer';

function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
        <Header />
          <h1 className={styles.title}>Latest releases</h1>
          <div className={styles.contentCard}>
            {/* CARDS */}
            <div className={styles.card}>
              <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
            </div>
            <div className={styles.card}>
              <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
            </div>
            <div className={styles.card}>
              <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
            </div>
          </div>
          {/* BUTTON*/}
          <button className={styles.secondaryButton} onClick={() => handleSubmit()}>See all releases</button>
          <h1 className={styles.title}>Zelda like</h1>
          <div className={styles.contentCard}>
            {/* CARDS */}
            <div className={styles.card}>
              <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
            </div>
            <div className={styles.card}>
              <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
            </div>
            <div className={styles.card}>
              <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
            </div>
          </div>
          {/* BUTTON*/}
          <button className={styles.secondaryButton} onClick={() => handleSubmit()}>See all Zelda like</button>
         <Footer />
      </div>
    </main>
  );
}

export default Home;
