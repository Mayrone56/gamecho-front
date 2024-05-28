//test commit
import styles from "../styles/Game.module.css";
import Image from "next/image";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../reducers/wishlist";
import { addRate, deleteRate } from "../reducers/rating";
import { Modal } from 'antd'
import RateModal from "./RateModal";


function Game() {

  const [rateModalVisible, setRateModalVisible] = useState(false);

  const ratings = useSelector((state) => state.rating.value); // pour recuperer la valeur de notre 

  // FONCTION RATE EXTERNE POUR L'APPELER AILLEUR 
  const isRated = (game) => {
    //On compare le nom de jeu que l'on vient de vote si il est présent dans notre tableau rating
    //Si c'est vrai alors c'est rated
    return ratings.some((ratingItem) => ratingItem.name === game.name);
  };

  //Click sur l'etoile rate
  const handleRatedClick = (game) => {
    //la fonction vérifie s'il existe dans la wishlist un jeu portant le même nom que le jeu sur lequel on clique.
    if (!isRated) {
      dispatch(addRate(game));
      console.log(`${game.name} added to rating`);
    }
  };


  const showRateModal = () => {
    setRateModalVisible(true);   
    console.log("CLICK HANDLE RATED")
  };

  const handleCancelRateModal = () => {
    setRateModalVisible(false)
  }

  const gameDetails = useSelector((state) => state.game.details); // redistribuer les données importées dans le reducer via Home lors du clic
  const wishlist = useSelector((state) => state.wishlist.value);
  const isLightmode = useSelector((state) => state.config.value.mode); // pour Paul
  const dispatch = useDispatch();

  console.log("DETAILS", gameDetails); // pour connaître la structure de la réponse (normalement identifique à la BDD)

  //AJOUT TEST SANDRINE POUR AJOUTER RATING
  const handleSearchSuggestions = async () => {
    const response = await fetch(
      `http://localhost:3000/games`
    );

    if (!response.ok) {
      return;
    }
  }

  //RATED GAME TEST 2

  // const handleGameCardClick = () => {
  //   fetch('http://localhost:3000/games/saveGameDetails', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //           description: game.description,
  //           name: game.name,
  //           developer: game.developer,
  //           publisher: game.publisher,
  //           releasedDate: game.releasedDate,
  //           platforms: game.platforms,
  //           genre,
  //           isMultiplayer,
  //           isOnline,
  //           isExpandedContent,
  //           expandedContentList,
  //           ratingsID,
  //           imageGame,
  //           ratingSummary, }),
  //   }).then(response => response.json())
  //     .then(data => {
  //       if (data.savedGame) {
  //         dispatch(getGameDetails(game))
  //       }
  //     });
  // };

  //     // router.push("game/");
  // }; 


  // //RATED GAME DEEBUT AVEC VALENTIN

  // const handleGameCardClick = (game) => {
  //   dispatch(getGameDetails(game));
  //   fetch("http://localhost:3000/users/signup", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       description: game.description,
  //       name: game.name,
  //       developer: game.developer,
  //       publisher: game.publisher,
  //       releasedDate: game.releasedDate,
  //       platforms: game.platforms,
  //       genre,
  //       isMultiplayer,
  //       isOnline,
  //       isExpandedContent,
  //       expandedContentList,
  //       ratingsID,
  //       imageGame,
  //       ratingSummary,
  //     }),
  //   }),
  //     router.push("game/");
  // }; 


  return (
    <div className={styles.container}>
      <div className={styles.middleContainer}>
        <div
          className={styles.bannerContainer}
          style={{
            backgroundImage: `url(${gameDetails.imageGame})`, // on doit toujours spécifier le type de chemin avec l'attribut URL
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "40%",
          }}
        >
          <div className={styles.topBannerContainer}>
            <button
              className={styles.iconButton}
             onClick={() => handleLike()}
            >
              {" "}
              <Image
                src="/icons/heart.svg"
                alt="Add to wishlist"
                width={24}
                height={24}
              // className={styles.likeIcon}
              />
            </button>
            <button
              className={styles.iconButton}
              onClick={() => showRateModal()}
            >
              {" "}
              <Image
                src="/icons/star.svg"
                alt="Rate the game"
                width={24}
                height={24}
                className={styles.likeIcon}
              />
            </button>
            <p className={styles.textButton}>Rate it !</p>
          </div>
          <div className={styles.bottomBannerContainer}>
            <h2 className={styles.sectionTitle}>{gameDetails.name}</h2>
            <div className={styles.captionGameName}>
              <div className={styles.iconRating}>
                <Image
                  src="/icons/emojiIcons/happy.svg"
                  alt="Rating icon"
                  width={24}
                  height={24}
                  className={styles.icon}
                />
              </div>
              <p>
                Average rating -{" "}
                <span className={styles.caption}>Based on 634 ratings</span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.tagContainer}>
            <div className={styles.tag01}>{gameDetails.developer}</div>
            <div className={styles.tag02}>{gameDetails.platforms}</div>
            <div className={styles.tag03}>{gameDetails.publisher}</div>
            <div className={styles.tag04}>{gameDetails.releasedDate}</div>
            <div className={styles.tag05}>{gameDetails.genre}</div>
          </div>

          <div className={styles.descriptionContainer}>
            <h3>Summary</h3>
            <div
              dangerouslySetInnerHTML={{ __html: gameDetails.description }}
            ></div>{" "}
            {/* attribut propre à React qui permet de convertir du code HTML (ce qu'on recoit de l'API) en texte sur React / voir doc : https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html */}
          </div>
          <div className={styles.trailerContainer}>
            <h3>Trailer</h3>
            <div className={styles.videoContainer}></div>
          </div>
        </div>
      </div>
      <Modal className={styles.frame} onCancel={() => handleCancelRateModal()} open={rateModalVisible} footer={null}>
        <RateModal />
      </Modal>

    </div>
  );
}
export default Game;