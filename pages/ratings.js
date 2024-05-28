import Head from 'next/head';
import Ratings from '../components/ratings';
import Header from '../components/Header';
import Footer from '../components/Footer';
function ratingsPage() {
  return (
    <>
      <Head>
        <title>Ratings / Gamecho</title>
      </Head>
      <Header />
      <Ratings />
      <Footer />
    </>
  );
}

export default ratingsPage;
