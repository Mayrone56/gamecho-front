import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";

import { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux"; // useSelector: pour recuperer le valeur de notre tableau wishlist; useDispatch pour utiliser nos fonctions de notre reducer wishlist
import { addToWishlist, removeFromWishlist } from "../reducers/wishlist";
import { getGameDetails } from "../reducers/game";
import GameCard from "../components/GameCard";

function Home() {
  // SANDRINE
  // Parce que quand on va recevoir le fetch ça doit maj en temps réel, ça re-render, c'est pour ça que c'est mis dans cet état
  const [latestGamesData, setLatestGamesData] = useState([]);
  // SANDRINE

  const dispatch = useDispatch();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState(""); // VL
  const [searchSuggValue, setSearchSuggValue] = useState(""); // VL
  const [searchResults, setSearchResults] = useState([]); // VL
  const [searchSuggResults, setSearchSuggResults] = useState([]); // VL
  const [showSearchResults, setShowSearchResults] = useState(false); // VL
  const [showSearchSuggResults, setShowSearchSuggResults] = useState(false); // VL
  const wishlist = useSelector((state) => state.wishlist.value); // pour recuperer le valeur de notre tableau wishlist
  //console.log("WISHLIST ", wishlist);

  const isLightmode = useSelector((state) => state.config.value.mode);

  // LATEST RELEASES
  useEffect(() => {
    const fetchLatestGames = async () => {
      const response = await fetch(
        "http://localhost:3000/games/latestreleased"
      );
      if (!response.ok) {
        console.log("Response latestreleased was not ok");
        return;
      }
      const data = await response.json();
      if (!data.latestgames) {
        console.log("Invalid data latestgames", data);
        return;
      }
      console.log("DATA LATESTGAMES ", data.latestgames);
      setLatestGamesData(data.latestgames.slice(0, 3)); // VL pour 3 cartes seulement
    };
    fetchLatestGames();
  }, []);


  // FONCTION LIKE EXTERNE POUR L'APPELER AILLEUR SANDRINE 
  const isAddedToWishlist = (game) => {
    return wishlist.some((wishlistItem) => wishlistItem.name === game.name);
  };

  //WISHLIST HEART ICON CLICK
  //la fonction prend un seul paramètre : game. Cet objet représente le jeu sur lequel l'utilisateur a cliqué pour l'ajouter ou le retirer de la wishlist.
  const handleWishlistClick = (game) => {
    //la fonction vérifie s'il existe dans la wishlist un jeu portant le même nom que le jeu sur lequel on clique.
    if (wishlist.some((wishlistItem) => wishlistItem.name === game.name)) {
      //Si le jeu est déjà dans la wishlist, cette ligne envoie l'action removeFromWishlist avec l'objet jeu comme payload. Cette action sera traitée par le reducer pour supprimer le jeu de la wishlist.
      dispatch(removeFromWishlist(game));
      console.log(`${game.name} removed from wishlist`);
    } else {
      //Si le jeu n'est pas dans la wishlist, cette ligne envoie l'action addToWishlist avec l'objet jeu comme payload. Cette action sera traitée par le reducer pour ajouter le jeu à la wishlist.
      dispatch(addToWishlist(game));
      console.log(`${game.name} added to wishlist`);
    }
  };

  const handleHeartIconClick = (event, game) => {
    event.stopPropagation();
    // cela empêche l'événement de clic de "handleWishlistClick" de se propager à l'événement de clic "handleGameCardClick" de la div parente. Cela signifie que l'on peut cliquer sur le cœur et que cela ne déclenchera pas la navigation vers la page du jeu. Cela ajoutera simplement le jeu à la liste de souhaits.
    handleWishlistClick(game);
  };

  const handleGameCardClick = (game) => {
    dispatch(getGameDetails(game));
    router.push("game/");
  };

  const latestReleases = latestGamesData.map((game) => (
    <Link href="/game" key={game.name}>
      <GameCard
        game={game}
        isAddedToWishlist={isAddedToWishlist(game)}
        onHeartClick={(event) => handleHeartIconClick(event, game)}
        onClick={() => handleGameCardClick(game)}
      />
    </Link>
  ));

  // constante sortie du Search Map pour s'appliquer à toutes les carts // VL //
  const searchResultsData = searchResults.map((game) => (
    <Link href="/game" key={game.name}>
      <GameCard
        key={game.name}
        game={game}
        isAddedToWishlist={isAddedToWishlist(game)}
        onHeartClick={(event) => handleHeartIconClick(event, game)}
        onClick={() => handleGameCardClick(game)}
      />
    </Link>
  ));

  const searchSuggResultsData = searchSuggResults.map((game) => (
    <Link href="/game" key={game.name}>
      <GameCard
        key={game.name}
        game={game}
        isAddedToWishlist={isAddedToWishlist(game)}
        onHeartClick={(event) => handleHeartIconClick(event, game)}
        onClick={() => handleGameCardClick(game)}
      />
    </Link>
  ));

  // MAIN SEARCH RESULTS
  // DISPLAY ONLY ON THE CLICK ON SEARCH
  useEffect(() => {
    if (searchValue === "") {
      setShowSearchResults(false);
    }
    if (searchSuggValue === "") {
      setShowSearchSuggResults(false);
    }
  }, [searchValue, searchSuggValue]);

  const handleSearch = async () => {
    const response = await fetch(
      `http://localhost:3000/games/search?name=${searchValue}`
    );

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    console.log("HANDLESEARCH ", data);
    setSearchResults(data.games.slice(0, 3)); // VL pour 3 cartes seulement
    setShowSearchResults(true);
  };

  // GAME LIKE RESULTATS
  // Display only on the search icon
  const handleSearchSuggestions = async () => {
    const response = await fetch(
      `http://localhost:3000/games/suggestions?name=${searchSuggValue}`
    );

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    console.log("DATA ", data);
    setSearchSuggResults(data.games.slice(0, 3)); // VL pour 3 cartes seulement
    setShowSearchSuggResults(true);
  };


  //Paul

  const handleAllGames = () => {
    handleSearch();
    handleSearchSuggestions();
  }
//Fonction qui prend les deux fonctions handleSearch et handleSearchSuggestions pour fetcher les jeux+les suggestions en meme temps

  // MAIN RETURN OF HOME COMPONENT
  return (
    <div className={isLightmode ? styles.containerlight : styles.containerdark}>
      <div className={styles.middleContainer}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.input}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setSearchSuggValue(e.target.value)
            }}
            value={searchValue}
            placeholder="Search..."
          />
          <Image
            onClick={() => handleAllGames()}
            src="/icons/search.svg"
            alt="Search"
            width={24}
            height={24}
            className={
              isLightmode ? styles.searchIconlight : styles.searchIcondark
            }
          />
        </div>

        {/* SECTION SEARCH RESULTS */}
        {showSearchResults && (
          <>
            <h2 className={styles.sectionTitle}>Your search results</h2>
            <div className={styles.contentCard}>{searchResultsData}</div>
            <Link href="/all-search-results">
              <button className={styles.secondaryButton}>
                See all search results
              </button>
            </Link>
          </>
        )}
 
         {/* SECTION SUGGESTIONS */}
         {showSearchSuggResults && (
          <>
            <h2 className={styles.sectionTitle}>You might also like...</h2>
            <div className={styles.contentCard}>{searchSuggResultsData}</div>
            <Link href="/all-suggestions">
              <button className={styles.secondaryButton}>
                See all suggestions
              </button>
            </Link>
          </>
        )}

        {/* SECTION LATEST RELEASES */}
        {latestGamesData && (
          <>
            <h2 className={styles.sectionTitle}>Latest releases</h2>
            <div className={styles.contentCard}>{latestReleases}</div>
            <Link href="/all-releases">
              <button className={styles.secondaryButton}>
                See all latest releases
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
