import Head from 'next/head';
import AllReleases from '../components/AllReleases';

function allReleasesPage() {
  return (
    <>
      <Head>
        <title>All releases / Gamecho</title>
      </Head>
      <AllReleases />
    </>
  );
}

export default allReleasesPage;
