import styles from "../styles/RateModal.module.css";
import Image from "next/image";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "moment/locale/fr";
import { addRate } from "../reducers/rating";
const moment = require("moment");
moment.locale("fr");

function RateModal(props) {
  
  const gameDetails = useSelector((state) => state.game.details);

  const dispatch = useDispatch();
  const urlAvatar = useSelector((state) => state.user.value.avatar);
  const user = useSelector((state) => state.user.value);

  const [newReview, setNewReview] = useState("");

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
      rating: 5, // valeur d'exemple (de 1 à 5 selon l'emoji)
      ratingMode: "emoji", // pour la conversion, inexploité
      comment: newReview, // on récupère la valeur de la review (useState sur un input)
      ratingDate: new Date().getDate(),// conversion en Date pour que Mongoose accepte les données... pas de paramètre = new Date / Comme d'habitude les dates c'est L'ENFER, //
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

    if (response.ok) {
      console.log("Rating submitted successfully");
      setNewReview(""); // on vide la valeur de la review qui est dans input de la modal du rating via un setter
      
      //Rated
      dispatch(addRate(ratingData));//Ajoute au tableau qui permettra d'afficher comme pour wishlist sur home, mais sur la page ratings
      console.log(ratingData, "added to rating");

    } else {
      console.log("Error submitting rating");
      // si erreur quelconque, message
    }
  };

  return (
    <div className={styles.container}>
      <h2> How much did you like it?</h2>
      <div className={styles.iconContainer}>
        <Image
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
        />
      </div>
      <div className={styles.inputContainer}>
        <p>Your review</p><br></br>
        <textarea
          type="text"
          placeholder="Add a review"
          className={styles.input}
          onChange={(e) => handleInputChange(e)}
          value={newReview}
        ></textarea><br></br>
        <p>{newReview.length}/300 </p> <br></br>
        <button className={styles.button} onClick={handleVote}>
            SUBMIT
          </button>
      </div>
      <div className={styles.bottomContainer}>
        <Image
          src="/icons/emojiIcons/angry.svg"
          alt="Avatar"
          width={32}
          height={32}
          className={styles.avatar}
        />
        
        <p>
          RATED BY {user.username} ON {date}
        </p>
        {/* Au click sur le bouton, nous enregistrons le   */}
        <div>
        
        </div>
      </div>
    </div>
  );
}

export default RateModal;
