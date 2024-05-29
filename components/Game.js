//test commit
import styles from "../styles/Game.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../reducers/wishlist";
import { addRate, deleteRate } from "../reducers/rating";
import { openCloseModal } from "../reducers/config";
import { Modal } from 'antd'
import RateModal from "./RateModal";

const ratingToEmoji = {
  1: '/icons/emojiIcons/angry.svg',
  2: '/icons/emojiIcons/sad.svg',
  3: '/icons/emojiIcons/neutral.svg',
  4: '/icons/emojiIcons/happy.svg',
  5: '/icons/emojiIcons/love.svg',
};


function Game() {
  const modalVisible = useSelector((state) => state.config.value.modalOpen)
  const gameDetails = useSelector((state) => state.game.details); // redistribuer les données importées dans le reducer via Home lors du clic
  const wishlist = useSelector((state) => state.wishlist.value);
  const isLightmode = useSelector((state) => state.config.value.mode); // pour Paul
  const dispatch = useDispatch();

  console.log("DETAILS", gameDetails); // pour connaître la structure de la réponse (normalement identifique à la BDD)
  const [ratingsList, setRatingsList] = useState([]);
  const ratings = useSelector((state) => state.rating.value); // pour recuperer la valeur de notre 

  useEffect(() => {
    //on construit une chaîne de requête en utilisant le nom du jeu à partir de gameDetails
    const query = `name=${gameDetails.name}`
    fetch(`http://localhost:3000/games/ratings?${query}`)
      .then(response => response.json())
      .then(data => {
        console.log("useEffect data", data);
        setRatingsList(data.data)
      });
  }, []);

  //Le tableau « ratingsList » est utilisé pour le rendu de chaque note individuelle.
  const allRatings = ratingsList.map((vote, i) => {
    //La date de notation est formatée à l'aide de la fonction toLocaleDateString() afin de l'afficher dans un format dd/mm/yyyy
    const ratingDate = new Date(vote.ratingDate).toLocaleDateString();
    return (
      <div className={styles.rating}>
        <div className={styles.userInfoContainer}>
          {/*Les données peuplées de l'utilisateur sont un objet avec les clés suivantes: id, username, email, password, token, ratings, wishlist, __v.
          A cause de cela, React a eu un problème et n'a pas pu rendre une collection d'enfants qui sont un objet. Pour résoudre ce problème, on utilise Object.key() pour itérer à travers les clés de notre objet « user ». */}
          {Object.keys(vote.user).map((key, index) => {
            if (key === 'username') { // nous vérifions si la clé courante qui est itérée est 'username'
              return (
                <div key={index} className={styles.userDetail}>
                  {/* <Image
                    src="/icons/heart.svg"
                    alt="User's avatar"
                    width={24}
                    height={24}
                    className={styles.info}
                  /> */}
                  <span className={styles.info}>Username: {vote.user[key]}</span> {/*nous rendons la valeur de notre cle "username"*/}
                </div>
              );
            }
          })}
          <span className={styles.info}>Rating's date: {ratingDate}</span>
        </div>
        <div className={styles.ratingDetails}>
          {/*La valeur de l'évaluation est convertie en emoji à l'aide d'une table de correspondance ratingToEmoji, et elle est affichée à l'aide du composant Image.*/}
          <span className={styles.ratingInfo}>Rating: <Image src={ratingToEmoji[vote.rating]} alt={`Rating: ${vote.rating}`} width={24} height={24} /></span>
          <span>Commentary: {vote.comment}</span>
        </div>
      </div>
    )
  });

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
    dispatch(openCloseModal(true));
    console.log("CLICK HANDLE RATED")
  };

  const handleCancelRateModal = () => {
    dispatch(openCloseModal(false))
  }


  //AJOUT TEST SANDRINE POUR AJOUTER RATING
  // const handleSearchSuggestions = async () => {
  //   const response = await fetch(
  //     `http://localhost:3000/games`
  //   );

  //   if (!response.ok) {
  //     return;
  //   }
  // }

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
          <div className={styles.ratingsContainer}>
            <h3>Game's ratings</h3>
            {allRatings}
          </div>
          <div className={styles.trailerContainer}>
            <h3>Trailer</h3>
            <div className={styles.videoContainer}></div>
          </div>
        </div>
      </div>
      <Modal className={styles.frame} onCancel={() => handleCancelRateModal()} open={modalVisible} footer={null}>
        <RateModal />
      </Modal>

    </div>
  );
}
export default Game;