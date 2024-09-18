import Head from 'next/head';
import AllReleases from '../components/AllReleases';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Layout from '../components/Layout';

function allReleasesPage() {
  return (
    <>
      <Head>
        <title>All releases | Gamecho</title>
      </Head>
      <Header />
      <AllReleases />
      <Footer />
    </>
  );
}

export default allReleasesPage;


// export default function () {
//   return (
//     <Layout title="All releases | Gamecho">
//       <AllReleases />
//     </Layout>
//   )
// }