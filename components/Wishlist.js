import styles from '../styles/Wishlist.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Image from "next/image";
import { removeFromWishlist } from "../reducers/wishlist";
import { useRouter } from "next/router";


import { getGameDetails } from "../reducers/game";
import GameCard from "../components/GameCard";

// Création du bouton de suppression à faire sur la carte de notre jeu : inexistant pour le moment


function Wishlist() {
  const router = useRouter();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.value);
  const isLightmode = useSelector((state) => state.config.value.mode);//Cible le mode dans le reducer setting

  const handleDelete = (event, game) => {
    event.stopPropagation();
    dispatch(removeFromWishlist(game));
  };

  const handleGameCardClick = (game) => {
    dispatch(getGameDetails(game));
    router.push("game/");
  };

  let games = <p>No games in the wishlist</p>;
  if (wishlist.length > 0) {
    games = wishlist.map((game, i) => {
      return (
        <div
          key={game.name}
          className={styles.card} // si changement de dimension type portrait, on affiche deux carts scrollables ?
          style={{
            backgroundImage: `url(${game.imageGame})`
          }} // Utilisez l'image de game comme fond
          onClick={() => handleGameCardClick(game)}
        >
          <p className={styles.gameNameCard}>{game.name}</p>
          <button
            className={styles.iconButton}
            onClick={(event) => handleDelete(event, game)}
          >
            {" "}
            <Image
              src="/icons/trash.svg"
              alt="Remove from wishlist"
              width={24}
              height={24}
              className={styles.likeIcon}
            />
          </button>
        </div>
      );
    });
  }
  // const game = useDispatch()

  // const [searchedGame, setSearchedGame] = useState('')


  // const handleGame = () => {
  //   fetch('')
  // }

  // const handleTrash = () => {
  //   fetch('http://localhost:3000/wishlist', {
  //     method: 'DELETE',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ game: game.name }),
  //     //pas besoin de body?
  //   }).then(response => response.json())
  //     .then(data => {
  //       data.result && dispatch(deleteGame(game.name));
  //     });
  // }

  return (
    <div className={isLightmode ? styles.containerlight : styles.containerdark}>
      <Header />
      <div className={styles.middleContainer}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.input}
            placeholder="Search in your wishlist..."
          />
          <Image
            onClick={() => handleSearch() /*VL*/}
            src="/icons/search.svg"
            alt="Search"
            width={24}
            height={24}
            className={isLightmode ? styles.searchIconlight : styles.searchIcondark}
          />
        </div>
        <h2>WISHLIST</h2>
        <div className={styles.contentCard}>
          {games}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Wishlist;