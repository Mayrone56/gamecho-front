import styles from '../styles/Wishlist.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import Header from './Header';
import Footer from './Footer';
import Image from "next/image";
import Link from "next/link";
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

  //un état pour gérer les résultats de la recherche
  const [searchGame, setSearchGame] = useState('');
  //un état pour stocker les jeux de notre wishlist que nous voulons trouver
  const [filteredWishlist, setFilteredWishlist] = useState([]);

  const handleDelete = (event, game) => {
    event.stopPropagation();
    dispatch(removeFromWishlist(game));
  };

  const isAddedToWishlist = (game) => {
    return wishlist.some((wishlistItem) => wishlistItem.name === game.name);
  };

  const handleGameCardClick = (game) => {
    dispatch(getGameDetails(game));
    router.push("game/");
  };

  //Mettre à jour l'état chaque fois que l'utilisateur saisit l'entrée de recherche
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchGame(value);
    //si la valeur de l'input est vidée, il affiche à nouveau tous les jeux de la wishlist
    if (value === '') {
      setFilteredWishlist([]);
    }
  };

  //Filtrer la wishlist en fonction du terme de recherche en cliquant sur l'icône de loupe
  const handleSearchClick = () => {
    //Si le nom d'un jeu contient le mot que on a tapé dans l'input, il l'affichera
    const filteredGames = wishlist.filter(game => game.name.toLowerCase().includes(searchGame.toLowerCase()));
    setFilteredWishlist(filteredGames);
  };

  //détermine les jeux à afficher : si on recherche un jeu, il affiche la liste filtrée, sinon il affiche la liste complète.
  const gamesToDisplay = filteredWishlist.length > 0 ? filteredWishlist : wishlist;

  let games = <p>No games in the wishlist</p>;
  if (gamesToDisplay.length > 0) {
    games = gamesToDisplay.map((game, i) => {
      return (
        <Link href="/game" key={game.name}>
          <GameCard
            key={game.name}
            game={game}
            isAddedToWishlist={isAddedToWishlist(game)}
            onHeartClick={(event) => handleDelete(event, game)}
            onClick={() => handleGameCardClick(game)}
            iconType="trash"
          />
        </Link>
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
        {/* l'input n'est pas affichée tant qu'il n'y a pas au moins 5 jeux ajoutés à la wishlist */}
        {wishlist.length >= 5 && (
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.input}
              placeholder="Search in your wishlist..."
              value={searchGame}
              onChange={handleSearchChange}
            />
            <Image
              onClick={handleSearchClick}
              src="/icons/search.svg"
              alt="Search"
              width={24}
              height={24}
              className={isLightmode ? styles.searchIconlight : styles.searchIcondark}
            />
          </div>
        )}

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