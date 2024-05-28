import Head from 'next/head';
import Game from '../components/Game';
import Header from '../components/Header';
import Footer from '../components/Footer';
function gamePage() {
  return (
    <>
    <Header/>
      <Head>
        <title>"gameName" / Gamecho</title>
      </Head>
      <Game />
      <Footer/>
    </>
  );
}

export default gamePage;
