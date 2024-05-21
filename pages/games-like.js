import Head from 'next/head';
import GameLike from '../components/GameLike';

function gameLikePage() {
  return (
    <>
      <Head>
        <title>"gameName" like / Gamecho</title>
      </Head>
      <GameLike />
    </>
  );
}

export default gameLikePage;
