import Head from 'next/head';
import Ratings from '../components/ratings';
import Header from '../components/Header';
import Footer from '../components/Footer';
function ratingsPage() {
  return (
    <>
    <Header/>
      <Head>
        <title>Ratings / Gamecho</title>
      </Head>
      <Ratings />
      <Footer/>
    </>
  );
}

export default ratingsPage;
