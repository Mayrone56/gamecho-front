import Head from 'next/head';
import Game from '../components/Game';

function gamePage() {
  return (
    <>
      <Head>
        <title>"gameName" / Gamecho</title>
      </Head>
      <Game />
    </>
  );
}

export default gamePage;
