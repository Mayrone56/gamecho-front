import Image from "next/image";
import styles from "../styles/Home.module.css"; // on applique le style défini précédemment dans Home, avant la création d'un composant Cart / quand il faisait partie intégrante du code de Home

function GameCard({ game, isAddedToWishlist, onHeartClick, onClick }) { // les deux dernière props exploitent l'inverse data flow ! la fonction est initiée dans Home, recupérée dans la cart qui renvoie les informations dans home selon la prop classique game !!!
  let iconStyle = {};
  //on declare un objet vide qui contiendra les propriétés de style CSS pour l'icône
  //on vérifie si la variable isAddedToWishlist est vraie (si le jeu en cours est dans la liste de souhaits ou non)
  if (isAddedToWishlist) {
    //si c'est vrai, on change la couleur de l'icône( on utilise le filtre css car l'icône n'est pas remplie, elle a un centre transparent et on ne change que la couleur de ses bordures - pour expliquer le filtre en détail, demandez à chatGPT de vous donner un exemple), vous pouvez utiliser https://isotropic.co/tool/hex-color-to-css-filter/ pour faire une conversion de couleur depuis un #hexadecimal
    iconStyle = {
      filter:
        "invert(47%) sepia(89%) saturate(7473%) hue-rotate(1deg) brightness(102%) contrast(105%)",
    };
  }

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
        className={styles.iconButton}
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
          style={iconStyle}
        />
      </button>
    </div>
  );
}

export default GameCard;
