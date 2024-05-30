import Image from "next/image";
import styles from "../styles/Home.module.css"; // on applique le style défini précédemment dans Home, avant la création d'un composant Cart / quand il faisait partie intégrante du code de Home
import { useState } from "react";


function GameCard({ game, isAddedToWishlist, onHeartClick, onClick, iconType }) { // les deux dernière props exploitent l'inverse data flow ! la fonction est initiée dans Home, recupérée dans la cart qui renvoie les informations dans home selon la prop classique game !!!

  const getIconDetails = () => {
    if (iconType === 'trash') {
      return {
        src: "/icons/trash.svg",
        alt: "Remove from list",
        ariaLabel: "Remove from list",
        className: styles.iconButton
      };
    } else {
      return {
        src: "/icons/heart.svg",
        alt: isAddedToWishlist ? "Remove from wishlist" : "Add to wishlist",
        ariaLabel: isAddedToWishlist ? "Remove from wishlist" : "Add to wishlist",
        className: isAddedToWishlist ? styles.iconButtonPink : styles.iconButton
      };
    }
  };

  const iconDetails = getIconDetails();

  return (
    <div
      onClick={onClick}
      key={game.name}
      isAddedToWishlist={isAddedToWishlist}
      className={styles.card} // si changement de dimension type portrait, on affiche deux carts scrollables ?
      style={{ backgroundImage: `url(${game.imageGame})` }} // Utilisez l'image de game comme fond et utiliser du CSS inline pour être prioritaire sur le placeholder
    >
      <p className={styles.gameNameCard}>{game.name}</p>
      <button
        className={iconDetails.className}
        onClick={onHeartClick}
        aria-label={iconDetails.ariaLabel}
      >
        <Image
          src={iconDetails.src}
          alt={iconDetails.alt}
          width={24}
          height={24}
          className={styles.likeIcon}
        />
      </button>
    </div>
  );
}

export default GameCard;
