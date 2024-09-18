import Head from 'next/head';
import Wishlist from '../components/Wishlist';

function wishlistPage() {
  return (
    <>
      <Head>
        <title>Wishlist | Gamecho</title>
      </Head>
      <Wishlist />
    </>
  );
}

export default wishlistPage;
