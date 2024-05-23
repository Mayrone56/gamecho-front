// import styles from '../styles/Home.module.css';
// import Link from 'next/link';
// import Image from 'next/image';
// import Header from './Header';
// import Footer from './Footer';

// function Home() {

//   //   {/* SEARCH TEST */}
//   //   <input
//   //   type="text"
//   //   className={styles.input}
//   //   // onChange={(e) => setUsername(e.target.value)}
//   //   // value={username}
//   //   placeholder="Search"
//   // />
//   // {/* BUTTON SEARCH */}
//   // <Link href="/all-releases">
//   //   <button className={styles.secondaryButton} >Search</button>
//   // </Link>

//   return (

//     <div className={styles.container}>
//       <Header />
//       <div className={styles.middleContainer}>
//         <div className={styles.searchContainer}>
//           <input
//             type="text"
//             className={styles.input}
//             // onChange={(e) => setUsername(e.target.value)}
//             // value={username}
//             placeholder="Search..."
//           />
//           <Image onClick={() => handleLike()} src="/icons/search.svg" alt="Search" width={24} height={24} className={styles.searchIcon} />
//         </div>

//         {/*SECTION 1*/}
//         <h2 className={styles.sectionTitle}>Latest releases</h2>
//         <div className={styles.contentCard}>
//           <div className={styles.card}>
//             <p className={styles.caption}>Zelda</p>
//             <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
//           </div>
//           <div className={styles.card}>
//             <p className={styles.caption}>Zelda</p>
//             <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
//           </div>
//           <div className={styles.card}>
//             <p className={styles.caption}>Zelda</p>
//             <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
//           </div>
//         </div>
//         <Link href="/all-releases">
//           <button className={styles.secondaryButton} >See all releases</button>
//         </Link>

//         {/*SECTION 2*/}
//         <div className={styles.searchContainer}>
//           <input
//             type="text"
//             className={styles.input}
//             // onChange={(e) => setUsername(e.target.value)}
//             // value={username}
//             placeholder="Search..."
//           />
//           <Image onClick={() => handleLike()} src="/icons/search.svg" alt="Search" width={24} height={24} className={styles.searchIcon} />
//         </div>
//         <h2 className={styles.sectionTitle}>"Game name" like</h2>
//         <div className={styles.contentCard}>
//           <div className={styles.card}>
//             <p className={styles.caption}>Zelda</p>
//             <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
//           </div>
//           <div className={styles.card}>
//             <p className={styles.caption}>Zelda</p>
//             <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
//           </div>
//           <div className={styles.card}>
//             <p className={styles.caption}>Zelda</p>
//             <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
//           </div>
//         </div>
//         <Link href="/games-like">
//           <button className={styles.secondaryButton} >"gameName" like</button>
//         </Link>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Home;




/////////////// V2 WITH MYMOVIES WORKS



import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';

function Home() {

  const [moviesData, setMoviesData] = useState([]);
  // Movies list
  useEffect(() => {
    fetch('http://localhost:3000/games/movies')
      .then(response => response.json())
      .then(data => {
        const formatedData = data.movies.map(movie => {
          //const poster = `https://media.rawg.io/media/games/120/${movie.image_background}`;
          const poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
          let overview = movie.overview;
          if (overview.length > 250) {
            overview = overview.substring(0, 250) + '...';
          }

          return { title: movie.title, poster, voteAverage: movie.vote_average, voteCount: movie.vote_count, overview };
        });
        setMoviesData(formatedData);
      });
  }, []);

  const movies = moviesData.map((data, i) => {
    return (
      <img className={styles.image} src={data.poster} alt={data.title} />
    )
  });



  return (

    <div className={styles.container}>
      <Header />
      <div className={styles.middleContainer}>
      {movies}
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.input}
            // onChange={(e) => setUsername(e.target.value)}
            // value={username}
            placeholder="Search..."
          />
          <Image onClick={() => handleLike()} src="/icons/search.svg" alt="Search" width={24} height={24} className={styles.searchIcon} />
        </div>




        {/*SECTION 1*/}
        <h2 className={styles.sectionTitle}>Latest releases</h2>
        <div className={styles.contentCard}>
          <div className={styles.card}>
            <p className={styles.caption}>Zelda</p>
            <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
          </div>
          <div className={styles.card}>
            <p className={styles.caption}>Zelda</p>
            <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
          </div>
          <div className={styles.card}>
            <p className={styles.caption}>Zelda</p>
            <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
          </div>
        </div>
        <Link href="/all-releases">
          <button className={styles.secondaryButton} >See all releases</button>
        </Link>

        {/*SECTION 2*/}
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.input}
            // onChange={(e) => setUsername(e.target.value)}
            // value={username}
            placeholder="Search..."
          />
          <Image onClick={() => handleLike()} src="/icons/search.svg" alt="Search" width={24} height={24} className={styles.searchIcon} />
        </div>
        <h2 className={styles.sectionTitle}>"Game name" like</h2>
        <div className={styles.contentCard}>
          <div className={styles.card}>
            <p className={styles.caption}>Zelda</p>
            <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
          </div>
          <div className={styles.card}>
            <p className={styles.caption}>Zelda</p>
            <button className={styles.iconButton} onClick={() => handleSubmit()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
          </div>
          <div className={styles.card}>
            <p className={styles.caption}>Zelda</p>
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
}

export default Home;

