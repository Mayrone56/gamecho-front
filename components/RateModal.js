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
  const [rateEmoji, setRateEmoji] = useState([])

  const emojiIcons = ["/icons/emojiIcons/angry.svg", "/icons/emojiIcons/sad.svg", "/icons/emojiIcons/neutral.svg", "/icons/emojiIcons/happy.svg", "/icons/emojiIcons/happy.svg"]

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
      // Handle error if needed
    }
  };



  const personalEmoji = [];
  for (let i = 0; i < 5; i++) {
    // let style = { 'cursor': 'pointer' };
    if (i < rateEmoji) {
      // style = { 'color': '#2196f3', 'cursor': 'pointer' };
    }
    personalEmoji.push(<Image src={emojiIcons[i]} key={i} width={50}
      height={50} onClick={() => setRateEmoji(i + 1)} />);
  }

  console.log(rateEmoji)
  return (
    <div className={styles.container}>
      <h2> How much did you like it?</h2>
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
        {personalEmoji}
      </div>
      <div>
        <p>Your review</p>
        <textarea
          type="text"
          placeholder="Add a review (optional)"
          className={styles.input}
          onChange={(e) => handleInputChange(e)}
          value={newReview}
        ></textarea>
        <p>{newReview.length}/300 </p>
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
          <button className={styles.submitbutton} onClick={handleVote}>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default RateModal;
