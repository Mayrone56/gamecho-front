import styles from "../styles/RateModal.module.css";
import Image from "next/image";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openCloseModal } from "../reducers/config";
import "moment/locale/fr";
import { addRate } from "../reducers/rating";

const moment = require("moment");
moment.locale("fr");

function RateModal(props) {
  const dispatch = useDispatch();
  const gameDetails = useSelector((state) => state.game.details);

  const urlAvatar = useSelector((state) => state.user.value.avatar);
  const user = useSelector((state) => state.user.value);
  const userRatingMode = useSelector((state) => state.config.value.ratingMode); // selectione la valeur de l'état mode dans le reducer config
  const [newReview, setNewReview] = useState("");
  const [rate, setRate] = useState(0); // vote sans valeur indiquée
  const [myEmoji, setMyEmoji] = useState("");

  const emojiIcons = [
    "/icons/emojiIcons/angry.svg",
    "/icons/emojiIcons/sad.svg",
    "/icons/emojiIcons/neutral.svg",
    "/icons/emojiIcons/happy.svg",
    "/icons/emojiIcons/love.svg",
  ];

  const date = moment().format("L");

  const handleInputChange = (e) => {
    if (
      newReview.length <= 299 ||
      e.nativeEvent.inputType === "deleteContentBackward"
    ) {
      setNewReview(e.target.value);
    }
  };

  const handleWishlistClick = (game) => {
    //la fonction vérifie s'il existe dans la wishlist un jeu portant le même nom que le jeu sur lequel on clique.
    if (wishlist.some((wishlistItem) => wishlistItem.name === game.name)) {
      //Si le jeu est déjà dans la wishlist, cette ligne envoie l'action removeFromWishlist avec l'objet jeu comme payload. Cette action sera traitée par le reducer pour supprimer le jeu de la wishlist.
      dispatch(removeFromWishlist(game));
      console.log(`${game.name} removed from wishlist`);
    } else {
      //Si le jeu n'est pas dans la wishlist, cette ligne envoie l'action addToWishlist avec l'objet jeu comme payload. Cette action sera traitée par le reducer pour ajouter le jeu à la wishlist.
      dispatch(setArrayRating(game));
      console.log(`${game.name} added to wishlist`);
    }
  };

  //VALENTIN COEE
  const handleVote = async (game) => {
    console.log("GAME", game);
    // fetch d'une route POST pour sauvegarde le jeu ET le vote
    const ratingData = {
      username: user.username, // on exploite Redux et l'username sauvegardé
      gameName: gameDetails.name, // le nom du jeu qui servira à le trouver côté BACKEND
      rating: rate, // valeur d'exemple (de 1 à 5 selon l'emoji)
      ratingMode: userRatingMode, // pour la conversion, inexploité
      comment: newReview, // on récupère la valeur de la review (useState sur un input)
      ratingDate: new Date(), // date au moment de l'appel de la route
      //Pour le moment Date est le composant javascript de base, il faudra utiliser si on a le temps moment
      gameDetails: gameDetails, // reducer game qui contient TOUTES les données du jeu
    };

    const response = await fetch("http://localhost:3000/ratings/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ratingData),
    });
    console.log(response);
    if (response.ok) {
      console.log("Rating submitted successfully");
      setNewReview(""); // on vide la valeur de la review qui est dans input de la modal du rating via un setter

      //Rated
      dispatch(addRate(ratingData)); //Ajoute au tableau qui permettra d'afficher comme pour wishlist sur home, mais sur la page ratings
      console.log(ratingData, "added to rating");
      dispatch(openCloseModal(false));
    } else {
      console.log("Error submitting rating");
      // si erreur quelconque, message
    }
  };

  const handleSelection = (emojiPath, i) => {
    setRate(i + 1), setMyEmoji(emojiPath);
  };
  const personalEmoji = [];
  for (let i = 0; i < 5; i++) {
    const isSelected = i === rate - 1; // au lieu de colorer tous les emojis antérieurs à la valeur selectionnée, on ne cible que l'index (-1 pour convertir le 1er élement à l'index 0 !!!)
    let style = {
      cursor: "pointer",
      filter:
        "brightness(0) saturate(100%) invert(62%) sepia(11%) saturate(762%) hue-rotate(205deg) brightness(94%) contrast(88%)", // on applique une couleur noir pour ensuite trouver notre couleur via un concertisseur CSS (ex: https://codepen.io/sosuke/pen/Pjoqqp)
    };
    if (isSelected) {
      // si l'emoji est selectionné, on lui attribue un autre style
      style = {
        cursor: "pointer",
        filter:
          "brightness(0) saturate(100%) invert(87%) sepia(29%) saturate(211%) hue-rotate(329deg) brightness(105%) contrast(109%)",
      };
    }
    personalEmoji.push(
      // le tableau renvoie dans l'ordre chaque emoji avec une clé index pour y associer une valeur (de 0 à 4, converti à 1 à 5 dans le setter)
      <Image
        src={emojiIcons[i]}
        key={i}
        width={50}
        height={50}
        style={style}
        onClick={() => handleSelection(emojiIcons[i], i)}
      />
    );
  }

  let ratingMethod; //affichage conditionnelle en fonction de l'état du reducer setting soit emoji
  if (userRatingMode === "Emojis") {
    ratingMethod = personalEmoji;
  } else if (userRatingMode === "Out of 10") {
    ratingMethod = (
      <div>
        <input
          className={styles.inputnote}
          type="number"
          min="0"
          max="10"
          placeholder="Out of 10"
          onChange={(e) => setRate(e.target.value)}
        />
      </div>
    );
  } else if (userRatingMode === "Out of 100") {
    ratingMethod = (
      <div>
        <input
          className={styles.inputnote}
          type="number"
          min="0"
          max="100"
          placeholder="Out of 100"
          onChange={(e) => setRate(e.target.value)}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}> How much did you like it?</h3>
      <div className={styles.iconContainer}>
        {/* <Image
          className={styles.emoji}
          src="/icons/emojiIcons/angry.svg"
          alt="Love emoji"
          width={50}
          height={50}
        />
        <Image
          className={styles.emoji}
          src="/icons/emojiIcons/sad.svg"
          alt="Love emoji"
          width={50}
          height={50}
        />
        <Image
          className={styles.emoji}
          src="/icons/emojiIcons/neutral.svg"
          alt="Love emoji"
          width={50}
          height={50}
        />
        <Image
          className={styles.emoji}
          src="/icons/emojiIcons/happy.svg"
          alt="Love emoji"
          width={50}
          height={50}
        />
        <Image
          className={styles.emoji}
          src="/icons/emojiIcons/love.svg"
          alt="Love emoji"
          width={50}
          height={50}
        /> */}
        {ratingMethod}
      </div>
      <div className={styles.inputContainer}>
        <p className={styles.resetMarginTitle}>Your review</p>
        <br></br>
        <textarea
          type="text"
          placeholder="Add a review"
          className={styles.input}
          onChange={(e) => handleInputChange(e)}
          value={newReview}
        ></textarea>
        <p className={styles.resetMarginLength}>{newReview.length}/300</p>
        <button className={styles.button} onClick={handleVote}>
          SUBMIT
        </button>
      </div>
      <div className={styles.bottomContainer}>
        {myEmoji && (
          <Image // A DYNAMISER
            src={myEmoji}
            alt="My rating emoji"
            width={32}
            height={32}
            className={styles.avatar}
          />
        )}

        <p>
          RATED BY {user.username.toUpperCase()} ON {date}{" "}
          {/* Username affiché en majuscule si vote   */}
        </p>
        {/* Au click sur le bouton, nous enregistrons le   */}
        <div></div>
      </div>
    </div>
  );
}

export default RateModal;
