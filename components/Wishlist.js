import { useState } from 'react';
import Header from './Header';


function Wishlist() {

  const [searchedGame, setSearchedGame] = useState('')

  // const handleTrash = () => {
  //   fetch('http://localhost:3000/wishlist', {
  //       method: 'DELETE',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ game: game.name}),
  //     }).then(response => response.json())
  //       .then(data => {
  //         data.result && dispatch(deleteGame(Game.name));
  //       });
  // }  

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.middleContainer}>
        <input type="text" className={styles.input} onChange={(e) => setSearchedGame(e.target.value)} value={searchedGame} placeholder="Search..." 
      <button className={styles.iconButton} onClick={() => handleTrash()}> <Image onClick={() => handleLike()} src="/icons/heart.svg" alt="Add to wishlist" width={24} height={24} className={styles.likeIcon} /></button>
        <div className={styles.card}>
        </div>






      </div>
    </div>
  )

}