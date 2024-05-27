import styles from "../styles/Game.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../reducers/wishlist";

function Game() {
  const gameDetails = useSelector((state) => state.game.details); // redistribuer les données importées dans le reducer via Home lors du clic
  const wishlist = useSelector((state) => state.wishlist.value);
  const isLightmode = useSelector((state) => state.config.value.mode); // pour Paul
  const dispatch = useDispatch();

  console.log("DETAILS", gameDetails); // pour connaître la structure de la réponse (normalement identifique à la BDD)

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
              onClick={() => handleSubmit()}
            >
              {" "}
              <Image
                onClick={() => handleLike()}
                src="/icons/heart.svg"
                alt="Add to wishlist"
                width={24}
                height={24}
                className={styles.likeIcon}
              />
            </button>
            <button
              className={styles.iconButton}
              onClick={() => handleSubmit()}
            >
              {" "}
              <Image
                onClick={() => handleLike()}
                src="/icons/heart.svg"
                alt="Add to wishlist"
                width={24}
                height={24}
                className={styles.likeIcon}
              />
            </button>
            <p className={styles.textButton}>Rate it!</p>
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
            <div className={styles.tag}>{gameDetails.developer}</div>
            <div className={styles.tag}>{gameDetails.platforms}</div>
            <div className={styles.tag}>{gameDetails.publisher}</div>
            <div className={styles.tag}>{gameDetails.releasedDate}</div>
            <div className={styles.tag}>{gameDetails.genre}</div>
          </div>

          <div className={styles.descriptionContainer}>
            <h3>Synopsis</h3>
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
    </div>
  );
}
export default Game;
