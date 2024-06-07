import styles from "../styles/Rating.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRate, deleteRate } from "../reducers/rating";
import Image from "next/image";
import { useRouter } from "next/router";
import { getGameDetails } from "../reducers/game";
import GameCard from "../components/GameCard";
import { loadRates } from "../reducers/rating";
import { BACKEND_URL } from "../const";
//const BACKEND_URL= "https://gamecho-back.vercel.app";

const ratingToEmoji = {
  1: "/icons/emojiIcons/angry.svg",
  2: "/icons/emojiIcons/sad.svg",
  3: "/icons/emojiIcons/neutral.svg",
  4: "/icons/emojiIcons/happy.svg",
  5: "/icons/emojiIcons/love.svg",
};

//ratings

// CONDITIONNER L AFFICHAGE

function Ratings() {
  const router = useRouter();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.value);
  const isLightmode = useSelector((state) => state.config.value.mode); //Cible le mode dans le reducer setting

  //un état pour stocker les jeux de notre wishlist que nous voulons trouver
  const [arrayRating, setArrayRating] = useState([]);

  //Affiche la liste des ratings
  const ratings = useSelector((state) => state.rating.value);
  console.log("RATINGS", ratings);

  //Necessaire pour trouver le rating par user
  const user = useSelector((state) => state.user.value);
  console.log("USER ", user);

  const gameDetails = useSelector((state) => state.game.details);
  // console.log("GAME DETAILS", gameDetails)
  // console.log("GAME NAME", gameDetails.name)

  // //Delete rating qui marche mais sans back
  // const deleteRating = (event, game) => {
  //     event.stopPropagation();
  //     dispatch(deleteRate(game));
  // };

  useEffect(() => {
    if (!user.token) {
      return;
    }
    fetch(`${BACKEND_URL}/ratings/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("useEFFECT DATA", data);
        data.result && dispatch(loadRates(data.user.ratings));
      });
  }, [ratings.length]); // rerender si nombre de vote changé

  const handleDelete = (event, rating) => { //inversion, les arguments doivent être dans l'ordre d'appel
    event.stopPropagation();
    fetch(`${BACKEND_URL}/ratings/${user.token}/${rating.name}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data de la supression", data)
        console.log("rating supprimé",rating)
        
        data.result && dispatch(deleteRate(rating.name));
      });
  };

  const isAddedToWishlist = (game) => {
    return wishlist.some((wishlistItem) => wishlistItem.name === game.name);
  };

  const handleGameCardClick = (game) => {
    dispatch(getGameDetails(game));
    router.push("game/");
  };

  let games = <p>No game is rated</p>;
  if (ratings.length > 0) {
    console.log("RATED GAMES", ratings);
    games = ratings.map((data, i) => {
      console.log("RATED GAMES", games);
      const ratingDate = new Date(data.ratingDate).toLocaleDateString();
      const ratingEmoji = ratingToEmoji[data.rating];
      return (
        <div className={styles.rateContainer}>
          <Link href="/game" key={data.game.name}>
            <GameCard
              key={data.game.name}
              game={data.game}
              isAddedToWishlist={isAddedToWishlist(data.game)}
              onHeartClick={(event) => handleDelete(event, data.game)}
              onClick={() => handleGameCardClick(data.game)}
              iconType="trash"
            />
          </Link>
          {/* <div
                        key={game.gameDetails.name}
                        className={styles.card} // si changement de dimension type portrait, on affiche deux carts scrollables ?
                        style={{
                            backgroundImage: `url(${game.gameDetails.imageGame})`
                        }} // Utilisez l'image de game comme fond
                        onClick={() => handleGameCardClick(game)}
                    >
                        <p className={styles.gameNameCard}>{game.gameDetails.name}</p>
                    </div> */}
          <div className={styles.ratingInfo}>
            <span className={styles.infoWithIcon}>
              <b>Rating:</b>{" "}
              <Image
                src={ratingEmoji}
                alt={`Rating: ${data.rating}`}
                width={24}
                height={24}
              />
            </span>
            <span className={styles.info}>
              <b>Comment:</b> {data.comment}
            </span>
            <span className={styles.info}>
              <b>Rating added on:</b> {ratingDate}
            </span>
          </div>
        </div>
      );
    });
  }

  return (
    <div className={isLightmode ? styles.containerlight : styles.containerdark}>
      <Header />
      {ratings && (
        <div className={styles.middleContainer}>
          {" "}
          {/* n'execute pas le code s'il n'y pas de rating */}
          {/* l'input n'est pas affichée tant qu'il n'y a pas au moins 5 jeux ajoutés à la wishlist */}
          <h2 className={styles.title}>My Ratings</h2>
          <div className={styles.contentCard}>{games}</div>
        </div>
      )}
      <Footer />
    </div>
  );
}
export default Ratings;
