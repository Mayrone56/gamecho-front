//test commit
import styles from "../styles/Game.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../reducers/wishlist";
import { addRate, loadRates } from "../reducers/rating";
import { openCloseModal } from "../reducers/config";
import { Modal } from "antd";
import RateModal from "./RateModal";

const ratingToEmoji = {
  1: "/icons/emojiIcons/angry.svg",
  2: "/icons/emojiIcons/sad.svg",
  3: "/icons/emojiIcons/neutral.svg",
  4: "/icons/emojiIcons/happy.svg",
  5: "/icons/emojiIcons/love.svg",
};

function Game() {
  const modalVisible = useSelector((state) => state.config.value.modalOpen);
  const gameDetails = useSelector((state) => state.game.details); // redistribuer les données importées dans le reducer via Home lors du clic
  const wishlist = useSelector((state) => state.wishlist.value);
  const isLightmode = useSelector((state) => state.config.value.mode); // pour Paul
  const dispatch = useDispatch();

  const [ratingScale, setRatingScale] = useState(5); // échelle du vote, avec les émojis, par défaut sauvegardé dans un état qu'on mettra à jour selon le ratingMode

  console.log("DETAILS", gameDetails); // pour connaître la structure de la réponse (normalement identifique à la BDD)
  const [ratingsList, setRatingsList] = useState([]);
  const ratings = useSelector((state) => state.rating.value); // pour recuperer la valeur de notre

  useEffect(() => {
    //on construit une chaîne de requête en utilisant le nom du jeu à partir de gameDetails
    const query = `name=${gameDetails.name}`;
    fetch(`http://localhost:3000/games/ratings?${query}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("useEffect data", data);
        dispatch(loadRates(data))
        setRatingsList(data.data);
        console.log("fetch", data.data);

        // // on vérifie la présence d'une clé "ratingMode", qui détermine l'échelle du vote, dans le premier tableau du document

        // let ratingMode;
        // if (data && data.data && data.data[0]) {
        //   // IMPORTANT on doit vérifier étape par étape la présence du tableau

        //   // Pourquoi ne pas juste faire juste if (data.data[0]) ? Parce qu'essayer d'accéder à un tableau à partir de données qui n'existent peut-etre pas car ON ACCEDE PAS A UNE CLE D'UNDEFINED

        //   // avec les conditions chainées, "data && data.data && data.data[0]", si dès le data c'est undefined, le code n'execute pas la condition et continue !

        //   // si on trouve le premier tableau retourné par la route
        //   ratingMode = data.data[0].ratingMode; // on cible la clé "ratingMode" pour s'assurer d'avoir les bonnes valeurs et les convertir en aval et on sauvegarde la valeur de la clé dans une constante
        // }

        // // pour que la valeur du vote soit correctement traitée, on doit définir son échelle
        // // soit s'assurer que le nom d'une clé corresponde à l'échelle associée

        // if (ratingMode === "Out of 100") {
        //   setRatingScale(100);
        // } else if (ratingMode === "Out of 10") {
        //   // si le ratingMode du vote est sur 10, on modifie l'échelle
        //   setRatingScale(10);
      // }
      });
  }, []);
  // }, [ratingsList]);

  let totalRatings = 0; // on initialise à 0 les deux paramètres nécessaires au calcul de la moyenne EN DEHORS de la boucle pour les exploiter
  let ratingsLength = 0;

  //Le tableau « ratingsList » est utilisé pour le rendu de chaque note individuelle.
  console.log("ratings list", ratingsList);
  const allRatings = ratingsList
    ? ratingsList.map((vote, i) => {
      //La date de notation est formatée à l'aide de la fonction toLocaleDateString() afin de l'afficher dans un format dd/mm/yyyy
      const ratingDate = new Date(vote.ratingDate).toLocaleDateString();

      // CONVERSION DES NOTES

      // on récupère CHAQUE vote du jeu et selon l'échelle choisie par l'utilisateur, on entreprend un calcul pour le convertir à une valeur de 1 à 5 / Pourquoi ? Pour qu'il puisse être associé aux emojis numérotés

      // on initialise la conversion à l'exterieur de la boucle pour l'exploiter
      let convertedRating;

      if (vote.ratingMode === "Out of 100") {
        // ratingMode cible l'échelle choisie dans la BDD, ratingsList[i] cible un vote unique
        convertedRating = (vote.rating / 100) * 5; // on divise le vote pour que sa valeur de dépasse pas 5 / 100/20=5
      } else if (vote.ratingMode === "Out of 10") {
        convertedRating = (vote.rating / 10) * 5; // plus intuitif, on a juste à diviser l'échelle en deux
      } else {
        // cible le vote restant, par défaut l'emoji sur 5
        convertedRating = vote.rating;
        console.log("vote rating", vote.rating);
      }

      totalRatings += convertedRating; // on additionne toutes les valeurs converties trouvées et formatées pour avoir une échelle sur 5
      ratingsLength++; // fréquence choisie : chaque vote mappé est ajouté un par un

      const emojiRate = ratingToEmoji[Math.round(convertedRating)]; // on récupère un URL du tableau d'emoji attribué à un numéro et on le sauvegarde pour l'appeler en src de l'Image
      // Math.round permet d'avoir un nombre entier et d'éviter le problème de source undefined

      return (
        <div className={isLightmode ? styles.ratingLigtht : styles.rating}>
          <div className={styles.userInfoContainer}>
            {/*Les données peuplées de l'utilisateur sont un objet avec les clés suivantes: id, username, email, password, token, ratings, wishlist, __v.
          A cause de cela, React a eu un problème et n'a pas pu rendre une collection d'enfants qui sont un objet. Pour résoudre ce problème, on utilise Object.key() pour itérer à travers les clés de notre objet « user ». */}
            {Object.keys(vote.user).map((key, index) => {
              if (key === "username") {
                // nous vérifions si la clé courante qui est itérée est 'username'
                return (
                  <div key={index} className={styles.userDetail}>
                    {/* <Image
                    src="/icons/heart.svg"
                    alt="User's avatar"
                    width={24}
                    height={24}
                    className={styles.info}
                  /> */}
                    <span>
                    <b>Username:</b> {vote.user[key]}
                    </span>{" "}
                    {/*nous rendons la valeur de notre cle "username"*/}
                  </div>
                );
              }
            })}
            <span><b>Rating's date:</b>  {ratingDate}</span>
          </div>
          <div className={styles.ratingDetails}>
            {/*La valeur de l'évaluation est convertie en emoji à l'aide d'une table de correspondance ratingToEmoji, et elle est affichée à l'aide du composant Image.*/}
            <span className={styles.ratingInfo}>
              <b>Rating:{" "}</b>

              {/* SI ACTIF BUG SUR L'AFFICHAGE AU CLIC SUR UNE GAME CARD DANS HOME */}
              <Image
                // ICI on dynamise la source de l'icône utilisée pour illustrer le vote
                // Il est nécessaire de se servir de l'échelle, enregistrée dans l'état, et de la diviser par 5 pour qu'elle puisse être associée à un chiffre de 1 à 5 et ce peu importe le ratingMode
                // Le Math.floor est essentiel pour arrondir le resultat et obtenir un nombre entier et exploitable

                src={emojiRate}
                alt={`Rating: ${vote.rating}`}
                width={24}
                height={24}
                className={styles.iconMargin}
              />

            </span>
            <span><b>Commentary:</b> {vote.comment}</span>
          </div>
        </div>
      );
    })
    : null;




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
  // la constante ne s'execute que s'il y a au moins un vote => on divise le total des valeurs obtenueslors du map par le nombre de votes / sinon, la moyenne n'existe pas (0)

  const averageRating = ratingsLength > 0 ? totalRatings / ratingsLength : 0;
  const emojiAverage = ratingToEmoji[Math.round(averageRating)];
  console.log("average emoji", emojiAverage); // FONCTIONNE QUAND L'IMAGE EST COMMENTEE ??? Return la bonne valeur avec l'adresse...
  console.log("totalRatings", totalRatings);
  console.log("number rate", ratingsLength);

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
    console.log("CLICK HANDLE RATED");
  };

  const handleCancelRateModal = () => {
    dispatch(openCloseModal(false));
  };

  return (
    <div className={isLightmode ? styles.containerLight : styles.container}>
      <div className={styles.middleContainer}>
        <div
          className={styles.bannerContainer}
          style={{ /* pour ne pas avoir d'erreur si l'image ne s'affiche pas assez rapidements */
            backgroundImage: gameDetails.imageGame ? `url(${gameDetails.imageGame})` : "icons/emojiIcons/sad.svg", // on doit toujours spécifier le type de chemin avec l'attribut URL
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "40%",
          }}
        >
          <div className={styles.topBannerContainer}>
            <button className={styles.iconButton} onHeartClick={(event) => handleHeartIconClick(event, gameDetails)}>
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


          {/* Permet d'éviter une erreur si l'image n'est pas récupérée au moment de l'execution */}
          {gameDetails.imageGame && (<div className={styles.bottomBannerContainer}>
            <h2 className={styles.sectionTitle}>{gameDetails.name}</h2>
            <div className={styles.captionGameName}>
              {emojiAverage ? (
                <>
                  {" "}
                  <div className={styles.iconRating}>
                    {/* Sûrement le plus difficle : sans conditionner le rendu au calcul de la moyenne, l'app crash ! Il faut laisser le temps au code de s'executer avant de tenter d'afficher l'image. C'est presque comme un await */}

                    <Image
                      src={emojiAverage}
                      alt="Rating icon"
                      width={24}
                      height={24}
                    />

                  </div>
                  <p>
                    Average rating -{" "}
                    <span className={styles.caption}>
                      BASED ON {ratingsLength} RATING{ratingsLength > 1 && "S"}
                    </span>
                  </p>
                </>
              ) : (
                <>
                  {" "}
                  <p>No rating yet </p>
                </>
              )}
            </div>
          </div>)}
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.tagContainer}>

            {/* Si la clé du jeu n'est pas renseignée, on affiche pas le tag correspondant */}
            {gameDetails.developer && (<div className={styles.tag01}>{gameDetails.developer}</div>)}
            {gameDetails.platforms && (<div className={styles.tag02}>{gameDetails.platforms}</div>)}
            {gameDetails.publisher && (<div className={styles.tag03}>{gameDetails.publisher}</div>)}
            {gameDetails.releasedDate && (<div className={styles.tag04}>{gameDetails.releasedDate}</div>)}
            {gameDetails.genre && (<div className={styles.tag05}>{gameDetails.genre}</div>)}
          </div>

          <div className={styles.descriptionContainer}>
            <h3>Summary</h3>
            <div
              dangerouslySetInnerHTML={{ __html: gameDetails.description }}
            ></div>{" "}
            {/* attribut propre à React qui permet de convertir du code HTML (ce qu'on recoit de l'API) en texte sur React / voir doc : https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html */}
          </div>
          <div className={styles.ratingsContainer}>
            {ratingsList && ratingsList.length > 0 && (
              <>
                {" "}
                <h3>Game's ratings</h3>
                {allRatings}
              </>
            )}
          </div>
          {/* TRAILER */}
          {/* <div className={styles.trailerContainer}>
            <h3>Trailer</h3>
            <div className={styles.videoContainer}></div>
          </div> */}
        </div>
      </div>
      <Modal
        className={styles.frame}
        onCancel={() => handleCancelRateModal()}
        open={modalVisible}
        footer={null}
      >
        <RateModal />
      </Modal>
    </div>
  );
}
export default Game;
