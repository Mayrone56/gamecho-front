import Head from 'next/head';
import Home from '../components/Home';
import Header from '../components/Header';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <>
      <Head>
        <title>Home | Gamecho</title>
        <meta name="description" content="Bienvenue sur Gamecho qui vous permet de trouver facilement les denriers jeux sortis, les noter, ajouter à votre wishlist et trouver des jeux équivalents"></meta>
      </Head>
      <Header />
      <Home />
      <Footer />
    </>
  );
}

// function HomePage() {
//   return (
//     <Layout title="Home | Gamecho">
//       <router-outlet/>

//     </Layout>
//   );
// }

export default HomePage;
