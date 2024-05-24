import styles from '../styles/AllReleases.module.css';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
function AllReleases() {

    const [games, setGames] = useState([]);
    const isLightmode = useSelector((state) => state.config.value.mode);//Cible le mode dans le reducer setting

    // useEffect pour éviter un infinite re-render (préconisation React)
    // exploitation des données reçues de l'API: data.results >>name & background_image
    // On map sur le tableau results pour retourner les données souhaitées.

    useEffect(() => {
        fetch('http://localhost:3000/games/search?name=${searchValue}')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const formatedData = data.games.map(games => {
                    const card = `https://media.rawg.io/media/games/${games.background_image}`;
                    let gameName = games.name;
                    return { title: gameName, card };
                });
                setGames(formatedData);
            });
    }, []);


    return (
        <div className={isLightmode?styles.containerlight:styles.containerdark}>
            <Header />
            <div className={styles.middleContainer}>
                <h2 className={styles.sectionTitle}>All releases</h2>
            </div>
            <Footer />
        </div>
    )
}
export default AllReleases;