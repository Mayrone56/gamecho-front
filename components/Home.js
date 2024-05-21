import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Header from './Header';
import Footer from './Footer';

function Home() {

  // const gamesCards = () => {
  //   for (let i = 0; i = 3; i++) {
  //     return (
  //       <div className={styles.card}>
  //       </div>
  //     )
  //   }
  // }

  return (

    <div className={styles.container}>
      <Header />
      <div className={styles.middleContainer}>

        {/*SECTION 1*/}
        <h2 className={styles.sectionTitle}>Latest releases</h2>
        <div className={styles.contentCard}>
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
        <Link href="/all-releases">
          <button className={styles.secondaryButton} >See all releases</button>
        </Link>

        {/*SECTION 2*/}
        <h2 className={styles.sectionTitle}>"Game name" like</h2>
        <div className={styles.contentCard}>
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
        <Link href="/games-like">
          <button className={styles.secondaryButton} >"gameName" like</button>
        </Link>
      </div>


      <Footer />
    </div>

  );
  // return (

  //     <div className={styles.container}>
  //       <Header />
  //         <h1 className={styles.title}>Latest releases</h1>
  //         <div className={styles.contentCard}>
  //           {/* CARDS */}
  //           <div className={styles.card}>
  //             <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
  //           </div>
  //           <div className={styles.card}>
  //             <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
  //           </div>
  //           <div className={styles.card}>
  //             <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
  //           </div>
  //         </div>
  //         {/* BUTTON*/}
  //         <button className={styles.secondaryButton} onClick={() => handleSubmit()}>See all releases</button>
  //         <h1 className={styles.title}>Zelda like</h1>
  //         <div className={styles.contentCard}>
  //           {/* CARDS */}
  //           <div className={styles.card}>
  //             <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
  //           </div>
  //           <div className={styles.card}>
  //             <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
  //           </div>
  //           <div className={styles.card}>
  //             <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
  //           </div>
  //         </div>
  //         {/* BUTTON*/}
  //         <button className={styles.secondaryButton} onClick={() => handleSubmit()}>See all Zelda like</button>
  //        <Footer />
  //     </div>

  // );
}

export default Home;
