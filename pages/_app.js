import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user'
import config from '../reducers/config';
import wishlist from '../reducers/wishlist';
import game from '../reducers/game';
import rating from '../reducers/rating';

const store = configureStore({
  reducer: { user, config, wishlist, game, rating},
 });


function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Next.js App</title>
        </Head>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default App;
