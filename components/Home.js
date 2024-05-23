import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";

import { useState, useEffect } from "react"; // VL
import { useSelector, useDispatch } from 'react-redux'; // useSelector: pour recuperer le valeur de notre tableau wishlist; useDispatch pour utiliser nos fonctions de notre reducer wishlist
import { addToWishlist, removeFromWishlist } from "../reducers/wishlist";

function Home() {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState(""); // VL
  const [searchResults, setSearchResults] = useState([]); // VL
  const [showSearchResults, setShowSearchResults] = useState(false); // VL
  const wishlist = useSelector(state => state.wishlist.value); // pour recuperer le valeur de notre tableau wishlist
  console.log(wishlist);

  //useEffect pour que les résultats de la recherche disparaissent lorsque l'input est vidée. Il s'exécute chaque fois que la valeur de la recherche change.
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
    setSearchResults(data.games.slice(0, 3)); // VL pour 3 cartes seulement
    setShowSearchResults(true); // VL
  };

  //WISHLIST HEART ICON CLICK: la fonction prend un seul paramètre : game. Cet objet représente le jeu sur lequel l'utilisateur a cliqué pour l'ajouter ou le retirer de la wishlist.
  const handleWishlistClick = (game) => {
    //la fonction vérifie s'il existe dans la wishlist un jeu portant le même nom que le jeu sur lequel on clique.
    if (wishlist.some(wishlistItem => wishlistItem.name === game.name)) {
      //Si le jeu est déjà dans la wishlist, cette ligne envoie l'action removeFromWishlist avec l'objet jeu comme payload. Cette action sera traitée par le reducer pour supprimer le jeu de la wishlist.
      dispatch(removeFromWishlist(game))
    } else {
      //Si le jeu n'est pas dans la wishlist, cette ligne envoie l'action addToWishlist avec l'objet jeu comme payload. Cette action sera traitée par le reducer pour ajouter le jeu à la wishlist.
      dispatch(addToWishlist(game))
    }
  };

  const searchResultsData = searchResults.map((game, index) => {
    const isAddedToWishlist = wishlist.some(wishlistItem => wishlistItem.name === game.name);

    let iconStyle = {}; //on declare un objet vide qui contiendra les propriétés de style CSS pour l'icône
    //on vérifie si la variable isAddedToWishlist est vraie (si le jeu en cours est dans la liste de souhaits ou non)
    if (isAddedToWishlist) {
      //si c'est vrai, on change la couleur de l'icône( on utilise le filtre css car l'icône n'est pas remplie, elle a un centre transparent et on ne change que la couleur de ses bordures - pour expliquer le filtre en détail, demandez à chatGPT de vous donner un exemple)
      iconStyle = { filter: 'invert(47%) sepia(89%) saturate(7473%) hue-rotate(1deg) brightness(102%) contrast(105%)' };
    }

    return (
      <div
        key={game.name}
        isAddedToWishlist={isAddedToWishlist}
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
        <button className={styles.iconButton} onClick={() => handleWishlistClick(game)}>
          <Image
            src="/icons/heart.svg"
            alt="Add to wishlist"
            width={24}
            height={24}
            className={styles.likeIcon}
            style={iconStyle}
          />
        </button>
      </div>
    )
  });


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
              {searchResultsData}
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
        <h2 className={styles.sectionTitle}>"Game name" like</h2>
        <div className={styles.contentCard}>
          <div className={styles.card}>
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
