import Head from 'next/head';
import AllReleases from '../components/AllReleases';
import Header from '../components/Header';
import Footer from '../components/Footer';

function allReleasesPage() {
  return (
    <>
    <Header />
      <Head>
        <title>All releases / Gamecho</title>
      </Head>
      <AllReleases />
      <Footer />
    </>
  );
}

export default allReleasesPage;
