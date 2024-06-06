import Link from "next/link";
import Image from "next/image";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { getGameDetails } from "../reducers/game";
import { addToWishlist, removeFromWishlist } from "../reducers/wishlist";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styles from '../styles/AllSuggestions.module.css'

import { BACKEND_URL } from "../const";

function AllSuggestions () {
    const dispatch = useDispatch()
    const router = useRouter()
    const suggestionQuery = router.query.name
    const [suggestionsData, setSuggestionsData] = useState([])
    const wishlist = useSelector((state) => state.wishlist.value)
    const isLightmode = useSelector((state) => state.config.value.mode);

useEffect(() => {
    const fetchSuggestions = async () => {
        const response = await fetch(`${BACKEND_URL}/games/suggestions?name=${suggestionQuery}`, {
        cache: "force-cache",
       })
       if(!response.ok) {
        return;
      }
      const data = await response.json();
      console.log("ALL SUGGESTION RESULTS ", data);
            setSuggestionsData(data.games.slice(0, 20));
    }
 fetchSuggestions();
    }, [suggestionQuery]);

    const isAddedToWishlist = (game) => {
        return wishlist.some((wishlistItem) => wishlistItem.name === game.name);
      }

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


    const searchSuggResultsData = suggestionsData.map((game) => (
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
                <h2 className={styles.sectionTitle}>All suggestions</h2>
                <div className={styles.contentCard}>{searchSuggResultsData}</div>
            </div>
        </div>
    );

}  



export default AllSuggestions;