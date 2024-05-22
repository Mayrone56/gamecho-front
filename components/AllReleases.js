import styles from '../styles/AllReleases.module.css';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';

const [games, setGames] = useState([])

// useEffect pour éviter un infinite re-render (préconisation React)
// exploitation des données reçues de l'API: data.results >>name & background_image
// On map sur le tableau results pour retourner les données souhaitées.
useEffect(() => {
    fetch('http://localhost:3000/games')
        .then(response => response.json())
        .then(data => {
            const formatedData = data.results.map(games => {
                const card = `https://media.rawg.io/media/games/${games.background_image}`;
                let gameName = games.name;

                return { title: gameName, card };

            });
            setGames(formatedData);
        });

});



function AllReleases() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.middleContainer}>
                <h2 className={styles.sectionTitle}>All releases</h2>
                <p>{games}</p>
            </div>
            <Footer />
        </div>
    )
}
export default AllReleases;