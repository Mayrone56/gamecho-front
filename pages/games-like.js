import Head from 'next/head';
import GameLike from '../components/GameLike';
import Header from '../components/Header';
import Footer from '../components/Footer';

function gameLikePage() {
  return (
    <>
    <Header/>
      <Head>
        <title>"gameName" like / Gamecho</title>
      </Head>
      <GameLike />
      <Footer/>
    </>
  );
}

export default gameLikePage;
