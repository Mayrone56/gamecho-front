import Head from 'next/head';
import Ratings from '../components/ratings';

function ratingsPage() {
  return (
    <>
      <Head>
        <title>Ratings / Gamecho</title>
      </Head>
      <Ratings />
    </>
  );
}

export default ratingsPage;
