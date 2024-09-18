import Head from 'next/head';
import GameLike from '../components/GameLike';
import Header from '../components/Header';
import Footer from '../components/Footer';

function gameLikePage() {
  return (
    <>
      <Head>
        <title>Game like | Gamecho</title>
      </Head>
      <Header />
      <GameLike />
      <Footer />
    </>
  );
}

export default gameLikePage;
