import styles from '../styles/Rating.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addRate, deleteRate } from "../reducers/rating";
import Image from 'next/image';
import { useRouter } from "next/router";
import { getGameDetails } from "../reducers/game";
import GameCard from "../components/GameCard";

function Ratings() {

    const router = useRouter();
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist.value);
    const isLightmode = useSelector((state) => state.config.value.mode);//Cible le mode dans le reducer setting

    //un état pour stocker les jeux de notre wishlist que nous voulons trouver
    const [arrayRating, setArrayRating] = useState([]);

    //Affiche la liste des ratings
    const ratings = useSelector((state) => state.rating.value);
    console.log("RATINGS", ratings);
    //Necessaire piyr trouver le rating par user
    const user = useSelector((state) => state.user.value);
    console.log("USER ", user);

    const gameDetails = useSelector((state) => state.game.details)
    console.log("GAME DETAILS", gameDetails)
    console.log("GAME NAME", gameDetails.name)


    // //Delete rating qui marche mais sans back
    // const deleteRating = (event, game) => {
    //     event.stopPropagation();
    //     dispatch(deleteRate(game));
    // };

    const handleDelete = (rating, event) => {
        fetch(`http://localhost:3000/ratings/${user.token}/${game.name}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {
                //event.stopPropagation();
                data.result && dispatch(deleteRate(rating));
            })
    };

    const isAddedToWishlist = (game) => {
        return wishlist.some((wishlistItem) => wishlistItem.name === game.name);
    };

    const handleGameCardClick = (game) => {
        dispatch(getGameDetails(game));
        router.push("game/");
    };

    let games = <p>No game is rated</p>;
    if (ratings.length > 0) {
        games = ratings.map((g, i) => {
            console.log("RATED GAMES", ratings)
            const game = g.gameDetails;
            const ratingDate = new Date(g.ratingDate).toLocaleDateString();
            return (
                <div className={styles.rateContainer}>
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
                    {/* <div
                        key={game.gameDetails.name}
                        className={styles.card} // si changement de dimension type portrait, on affiche deux carts scrollables ?
                        style={{
                            backgroundImage: `url(${game.gameDetails.imageGame})`
                        }} // Utilisez l'image de game comme fond
                        onClick={() => handleGameCardClick(game)}
                    >
                        <p className={styles.gameNameCard}>{game.gameDetails.name}</p>
                    </div> */}
                    <div className={styles.ratingInfo}>
                        <span className={styles.info}>Rating: {game.rating}</span>
                        <span className={styles.info}>Comment: {game.comment}</span>
                        <span className={styles.info}>Rating added on: {ratingDate}</span>
                    </div>
                    <div className={styles.buttonContainer}>
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
                </div>
            );
        });
    }

    return (
        <div className={isLightmode ? styles.containerlight : styles.containerdark}>
            <Header />
            <div className={styles.middleContainer}>
                {/* l'input n'est pas affichée tant qu'il n'y a pas au moins 5 jeux ajoutés à la wishlist */}
                <h2 className={styles.title}>My Ratings</h2>
                <div className={styles.contentCard}>
                    {games}
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Ratings;