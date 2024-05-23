import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";

import { useState, useEffect } from "react"; // VL
import { useSelector } from "react-redux";
function Home() {
  const [searchValue, setSearchValue] = useState(""); // VL
  const [searchResults, setSearchResults] = useState([]); // VL
  const [showSearchResults, setShowSearchResults] = useState(false); // VL

  const isLightmode = useSelector((state) => state.config.value.mode)// affiche la valeur du mode dark ou light

  useEffect(() => {
    if (searchValue === "") {
      setShowSearchResults(false);
    }
  }, [searchValue]);

  const handleSearch = async () => {
    // VL
    const response = await fetch(
      `http://localhost:3000/games/search?name=${searchValue}`
    ); // VL

    if (!response.ok) {
      // VL
      return; // VL
    } // VL

    const data = await response.json(); // VL
    console.log("DATA ", data)
    setSearchResults(data.games.slice(0, 3)); // VL pour 3 cartes seulement
    setShowSearchResults(true); // VL
  };

  //   {/* SEARCH */}
  //   <input
  //   type="text"
  //   className={styles.input}
  //   // onChange={(e) => setUsername(e.target.value)}
  //   // value={username}
  //   placeholder="Search"
  // />
  // {/* BUTTON SEARCH */}
  // <Link href="/all-releases">
  //   <button className={styles.secondaryButton} >Search</button>
  // </Link>

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.middleContainer}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.input}
            onChange={(e) => setSearchValue(e.target.value)} // VL
            value={searchValue} // VL
            placeholder="Search..."
          />
          <Image
            onClick={() => handleSearch() /*VL*/}
            src="/icons/search.svg"
            alt="Search"
            width={24}
            height={24}
            className={styles.searchIcon}
          />
        </div>

        {/*SECTION SEARCH RESULTS*/}
        {showSearchResults && (
          <>
            <h2 className={styles.sectionTitle}>Your search results</h2>
            <div className={styles.contentCard}>
              {searchResults.map((game, index) => (
                <div
                  key={game.name}
                  className={styles.card} // si changement de dimension type portrait, on affiche deux carts scrollables ?
                  style={{
                    backgroundImage: `url(${game.imageGame})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "40px",
                    height: "160px", // Hauteur de la carte INVERSEMENT = les images de l'API sont toutes au format paysage
                    width: "110px", // Largeur de la carte ELARGISSEMENT ???
                    minWidth: "80px",
                    minHeight: "120px",
                    margin: "0 8px",
                    cursor: "pointer",
                    transition: "box-shadow 0.3s ease",
                  }} // Utilisez l'image de game comme fond
                >
                  <p className={styles.gameNameCard}>{game.name}</p>
                  <button className={styles.iconButton}>
                    <Image
                      src="/icons/heart.svg"
                      alt="Add to wishlist"
                      width={24}
                      height={24}
                      className={styles.likeIcon}
                    />
                  </button>
                </div>
              ))}
            </div>
            <Link href="/all-search-results">
              <button className={styles.secondaryButton}>
                See all search results
              </button>
            </Link>
          </>
        )}


        {/*SECTION 1*/}
        <h2 className={styles.sectionTitle}>Latest releases</h2>
        <div className={styles.contentCard}>
          <div className={styles.card}>
            {/* Remplacer par la ligne commenter quand latest result sera fonctionnel*/}
            {/* <p className={styles.gameNameCard}>{game.name}</p> */}
            <p className={styles.gameName}>"GameName"</p>
            <button
              className={styles.iconButton}
              onClick={() => handleSubmit()}
            >
              {" "}
              <Image
                onClick={() => handleLike()}
                src="/icons/heart.svg"
                alt="Add to wishlist"
                width={24}
                height={24}
                className={styles.likeIcon}
              />
            </button>
          </div>
          <div className={styles.card}>
            {/* Remplacer par la ligne commenter quand latest result sera fonctionnel*/}
            {/* <p className={styles.gameNameCard}>{game.name}</p> */}
            <p className={styles.gameName}>"GameName"</p>
            <button
              className={styles.iconButton}
              onClick={() => handleSubmit()}
            >
              {" "}
              <Image
                onClick={() => handleLike()}
                src="/icons/heart.svg"
                alt="Add to wishlist"
                width={24}
                height={24}
                className={styles.likeIcon}
              />
            </button>
          </div>
          <div className={styles.card}>
            {/* Remplacer par la ligne commenter quand latest result sera fonctionnel*/}
            {/* <p className={styles.gameNameCard}>{game.name}</p> */}
            <p className={styles.gameName}>"GameName"</p>
            <button
              className={styles.iconButton}
              onClick={() => handleSubmit()}
            >
              {" "}
              <Image
                onClick={() => handleLike()}
                src="/icons/heart.svg"
                alt="Add to wishlist"
                width={24}
                height={24}
                className={styles.likeIcon}
              />
            </button>
          </div>
        </div>
        <Link href="/all-releases">
          <button className={styles.secondaryButton}>See all releases</button>
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
            {/* Remplacer par la ligne commenter quand latest result sera fonctionnel*/}
            {/* <p className={styles.gameNameCard}>{game.name}</p> */}
            <p className={styles.gameName}>"GameName"</p>
            <button
              className={styles.iconButton}
              onClick={() => handleSubmit()}
            >
              {" "}
              <Image
                onClick={() => handleLike()}
                src="/icons/heart.svg"
                alt="Add to wishlist"
                width={24}
                height={24}
                className={styles.likeIcon}
              />
            </button>
          </div>
          <div className={styles.card}>
            {/* Remplacer par la ligne commenter quand latest result sera fonctionnel*/}
            {/* <p className={styles.gameNameCard}>{game.name}</p> */}
            <p className={styles.gameName}>"GameName"</p>
            <button
              className={styles.iconButton}
              onClick={() => handleSubmit()}
            >
              {" "}
              <Image
                onClick={() => handleLike()}
                src="/icons/heart.svg"
                alt="Add to wishlist"
                width={24}
                height={24}
                className={styles.likeIcon}
              />
            </button>
          </div>
          <div className={styles.card}>
            {/* Remplacer par la ligne commenter quand latest result sera fonctionnel*/}
            {/* <p className={styles.gameNameCard}>{game.name}</p> */}
            <p className={styles.gameName}>"GameName"</p>
            <button
              className={styles.iconButton}
              onClick={() => handleSubmit()}
            >
              {" "}
              <Image
                onClick={() => handleLike()}
                src="/icons/heart.svg"
                alt="Add to wishlist"
                width={24}
                height={24}
                className={styles.likeIcon}
              />
            </button>
          </div>
        </div>
        <Link href="/games-like">
          <button className={styles.secondaryButton}>"gameName" like</button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default Home;

