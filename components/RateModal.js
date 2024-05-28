import styles from "../styles/RateModal.module.css";
import Image from "next/image";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "moment/locale/fr";
import { addRate } from "../reducers/rating";
const moment = require("moment");
moment.locale("fr");

function RateModal() {
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

  const handleVote = async () => {
    // fetch d'une route POST pour sauvegarde le jeu ET le vote
    const ratingData = {
      username: user.username, // on exploite Redux et l'username sauvegardé
      gameName: gameDetails.name, // le nom du jeu qui servira à le trouver côté BACKEND
      rating: 5, // valeur d'exemple (de 1 à 5 selon l'emoji)
      ratingMode: "emoji", // pour la conversion, inexploité
      comment: newReview, // on récupère la valeur de la review (useState sur un input)
      ratingDate: moment().toDate(),// conversion en Date pour que Mongoose accepte les données... pas de paramètre = new Date / Comme d'habitude les dates c'est L'ENFER, //
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
      setNewReview(""); // on vide l'input via un setter
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
        <p className={styles.input}>Your review</p><br></br>
        <textarea
          type="text"
          placeholder="Add a review"
          className={styles.input}
          onChange={(e) => handleInputChange(e)}
          value={newReview}
        ></textarea><br></br>
        <p className={styles.input}>{newReview.length}/300 </p> <br></br>
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
