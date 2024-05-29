import styles from '../styles/AllReleases.module.css';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GameCard from "../components/GameCard";
import { getGameDetails } from "../reducers/game";
import { addToWishlist, removeFromWishlist } from "../reducers/wishlist";

function AllReleases() {

  const [latestGamesData, setLatestGamesData] = useState([]);
  const isLightmode = useSelector((state) => state.config.value.mode);//Cible le mode dans le reducer setting
  const wishlist = useSelector((state) => state.wishlist.value);

  const router = useRouter();
  const dispatch = useDispatch();

  // useEffect pour éviter un infinite re-render (préconisation React)
  // exploitation des données reçues de l'API: data.results >>name & background_image
  // On map sur le tableau results pour retourner les données souhaitées.

  useEffect(() => {
    const fetchLatestGames = async () => {
      const response = await fetch('http://localhost:3000/games/latestreleased', {
        cache: "force-cache",
      })
      // Convention pour vérifier la réception du fetch
      if (!response.ok) {
        console.log("Response latestreleased was not ok");
        return;
      }
      const data = await response.json();
      if (!data.latestgames) {
        console.log("Invalid ddata latestgames", data);
        return;
      }
      console.log("DATA LASTESTGAMES ", data.latestgames)
      setLatestGamesData(data.latestgames.slice(0, 20));
    }
    fetchLatestGames();
  }, []);

  //FONCTION LIKE EXTERNE POUR L'APPELER AILLEUR SANDRINE
  const isAddedToWishlist = (game) => {
    return wishlist.some((wishlistItem) => wishlistItem.name === game.name);
  }

  const handleWishlistClick = (game) => {
    if (isAddedToWishlist(game)) {
      dispatch(removeFromWishlist(game));
      console.log(`${game.name} removed from wishlist`);
    } else {
      dispatch(addToWishlist(game));
      console.log(`${game.name} added to wishlist`);
    }
  };

  const handleHeartIconClick = (event, game) => {
    event.stopPropagation();
    handleWishlistClick(game);
  };

  const handleGameCardClick = (game) => {
    dispatch(getGameDetails(game));
    router.push('game/');
  };

  const latestReleases = latestGamesData.map((game, index) => (
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
  /////FIN TEST LASTEST RELEASES SANDRINE


  return (
    <div className={isLightmode ? styles.containerlight : styles.containerdark}>
      <div className={styles.middleContainer}>
        {/*SECTION LATEST RELEASES*/}
        {latestGamesData && (
          <>
            <h2 className={styles.sectionTitle}>Latest releases</h2>
            <div className={styles.contentCard}>{latestReleases}</div>
            <Link href="/all-releases">
              <button className={styles.secondaryButton}>
                See all search releases
              </button>
            </Link>
          </>
        )}

      </div>
    </div>
  );
}

export default AllReleases;