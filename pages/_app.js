import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user'
import config from '../reducers/config';

const store = configureStore({
  reducer: { user,config},
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
