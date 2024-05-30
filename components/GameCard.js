import Image from "next/image";
import styles from "../styles/Home.module.css"; // on applique le style défini précédemment dans Home, avant la création d'un composant Cart / quand il faisait partie intégrante du code de Home
import { useState } from "react";


function GameCard({ game, isAddedToWishlist, onHeartClick, onClick }) { // les deux dernière props exploitent l'inverse data flow ! la fonction est initiée dans Home, recupérée dans la cart qui renvoie les informations dans home selon la prop classique game !!!



  return (
    <div
      onClick={onClick}
      key={game.name}
      isAddedToWishlist={isAddedToWishlist}
      className={styles.card} // si changement de dimension type portrait, on affiche deux carts scrollables ?
      style={{ backgroundImage: `url(${game.imageGame})` }} // Utilisez l'image de game comme fond et utiliser du CSS inline pour être prioritaire sur le placeholder
    >
      <div className={styles.ratingInfo}>

        <p className={styles.gameNameCard}>{game.name}</p>
      </div>
      <button
        className={isAddedToWishlist?styles.iconButtonPink:styles.iconButton}
        onClick={onHeartClick}
        aria-label={
          isAddedToWishlist ? "Remove from wishlist" : "Add to wishlist"
        }
      >
        <Image
          src="/icons/heart.svg"
          alt={isAddedToWishlist ? "Remove from wishlist" : "Add to wishlist"}
          width={24}
          height={24}
          className={styles.likeIcon}
        />
      </button>
    </div>
  );
}

export default GameCard;
