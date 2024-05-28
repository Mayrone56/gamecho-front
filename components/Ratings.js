import styles from '../styles/Rating.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addRate, deleteRate } from "../reducers/rating";
import Image from 'next/image';
import { getGameDetails } from "../reducers/game";

function Ratings() {
    const dispatch = useDispatch();
    const isLightmode = useSelector((state) => state.config.value.mode);//Cible le mode dans le reducer setting

    //un état pour stocker les jeux de notre wishlist que nous voulons trouver
    const [arrayRating, setArrayRating] = useState([]);

    //Affiche la liste des ratings
    const ratings = useSelector((state) => state.rating.value);

    //Delete rating
    const handleDelete = (event, game) => {
        event.stopPropagation();
        dispatch(deleteRate(game));
    };

    let games = <p>No game is rated</p>;
    if (ratings.length > 0) {
        games = ratings.map((game, i) => {
            return (
                <div
                    key={game.gameDetails.name}
                    className={styles.card} // si changement de dimension type portrait, on affiche deux carts scrollables ?
                    style={{
                        backgroundImage: `url(${game.gameDetails.imageGame})`
                    }} // Utilisez l'image de game comme fond
                    onClick={() => handleGameCardClick(game)}
                >
                    <p className={styles.gameNameCard}>{game.gameDetails.name}</p>
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

    return (
        <div className={isLightmode ? styles.containerlight : styles.containerdark}>
            <Header />
            <div className={styles.middleContainer}>
                {/* l'input n'est pas affichée tant qu'il n'y a pas au moins 5 jeux ajoutés à la wishlist */}
                <h2>Ratings</h2>
                <div className={styles.contentCard}>
                    {games}
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Ratings;