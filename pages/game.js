import Head from 'next/head';
import Game from '../components/Game';
import Header from '../components/Header';
import Footer from '../components/Footer';
function gamePage() {
  return (
    <>
      <Head>
        <title>Game | Gamecho</title>
      </Head>
      <Header />
      <Game />
      <Footer />
    </>
  );
}

export default gamePage;
