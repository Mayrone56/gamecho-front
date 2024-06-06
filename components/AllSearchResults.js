import styles from '../styles/AllSearchResults.module.css';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GameCard from "../components/GameCard";
import { getGameDetails } from "../reducers/game";
import { addToWishlist, removeFromWishlist } from "../reducers/wishlist";

const BACKEND_URL= "gamecho-back.vercel.app";

function AllSearchResults() {
    const [searchResults, setSearchResults] = useState([]);
    const isLightmode = useSelector((state) => state.config.value.mode);
    const wishlist = useSelector((state) => state.wishlist.value);

    const router = useRouter();
    const dispatch = useDispatch();

    const searchQuery = router.query.name;

    useEffect(() => {
        if (!searchQuery) return;

        const fetchSearchResults = async () => {
            const response = await fetch(
                `${BACKEND_URL}/games/search?name=${searchQuery}`, {
                cache: "force-cache",
            });

            if (!response.ok) {
                console.log("Response searchresults was not ok");
                return;
            }

            const data = await response.json();
            console.log("ALL SEARCH RESULTS ", data);
            setSearchResults(data.games.slice(0, 20)); // VL pour 3 cartes seulement
        };
        fetchSearchResults();
    }, [searchQuery]);


    const isAddedToWishlist = (game) => {
        return wishlist.some((wishlistItem) => wishlistItem.name === game.name);
    };

    const handleWishlistClick = (game) => {
        if (isAddedToWishlist(game)) {
            dispatch(removeFromWishlist(game));
            console.log(`${game.name} removed from wishlist`);
        } else {
            dispatch(addToWishlist(game));
            console.log(`${game.name} added to wishlist`);
        }
    };

    const handleHeartIconClick = (event, game) => {
        event.stopPropagation();
        handleWishlistClick(game);
    };

    const handleGameCardClick = (game) => {
        dispatch(getGameDetails(game));
        router.push('game/');
    };

    const searchResultsData = searchResults.map((game) => (
        <Link href="/game" key={game.name}>
            <GameCard
                key={game.name}
                game={game}
                isAddedToWishlist={isAddedToWishlist(game)}
                onHeartClick={(event) => handleHeartIconClick(event, game)}
                onClick={() => handleGameCardClick(game)}
            />
        </Link>
    ));

    return (
        <div className={isLightmode ? styles.containerlight : styles.containerdark}>
            <div className={styles.middleContainer}>
                <h2 className={styles.sectionTitle}>All search results</h2>
                <div className={styles.contentCard}>{searchResultsData}</div>
            </div>
        </div>
    );
};

export default AllSearchResults;