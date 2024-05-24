import styles from '../styles/Wishlist.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Image from "next/image";
import { removeFromWishlist } from "../reducers/wishlist";

// Création du bouton de suppression à faire sur la carte de notre jeu : inexistant pour le moment


function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.value);

  const handleDelete = (game) => {
    dispatch(removeFromWishlist(game))
  };

  let games = <p>No games in the wishlist</p>;
  if (wishlist.length > 0) {
    games = wishlist.map((game, i) => {
      return (
        <div
          key={game.name}
          className={styles.card} // si changement de dimension type portrait, on affiche deux carts scrollables ?
          style={{
            backgroundImage: `url(${game.imageGame})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "40px",
            height: "160px", // Hauteur de la carte INVERSEMENT = les images de l'API sont toutes au format paysage
            width: "110px", // Largeur de la carte ELARGISSEMENT ???
            minWidth: "80px",
            minHeight: "120px",
            margin: "0 8px",
            cursor: "pointer",
            transition: "box-shadow 0.3s ease",
          }} // Utilisez l'image de game comme fond
        >
          <button
            className={styles.iconButton}
            onClick={() => handleDelete(game)}
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
    <div className={styles.container}>
      <Header />
      <div className={styles.middleContainer}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.input}
            placeholder="Search..."
          />
          <Image
            onClick={() => handleSearch() /*VL*/}
            src="/icons/search.svg"
            alt="Search"
            width={24}
            height={24}
            className={styles.searchIcon}
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