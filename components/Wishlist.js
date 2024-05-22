import styles from '../styles/Wishlist.module.css';
import { useState, useDispatch } from 'react';
import Header from './Header';
import Footer from './Footer';

// Création du bouton de suppression à faire sur la carte de notre jeu : inexistant pour le moment


function Wishlist() {
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
        <input type="text" className={styles.input} onChange={(e) => setSearchedGame(e.target.value)} value={searchedGame} placeholder="Search..." ></input>
        <h1>WISHLIST</h1>
        <div className={styles.card}>
          {/* Intégration de nos jeux favoris via la Home */}
        </div>
        <Footer />
      </div>
    </div>
  )

}

export default Wishlist;