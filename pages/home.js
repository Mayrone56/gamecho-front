import Head from 'next/head';
import Home from '../components/Home';
import Header from '../components/Header';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <>
    <Header/>
      <Head>
        <title>Home / Gamecho</title>
      </Head>
      <Home />
      <Footer/>
    </>
  );
}

export default HomePage;
