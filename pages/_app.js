import "../styles/globals.css";
import Head from "next/head";
// Import de Provider et configureStore pour l'initialisation du store Redux 
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import user from "../reducers/user";
import config from "../reducers/config";
import wishlist from "../reducers/wishlist";
import game from "../reducers/game";
import rating from "../reducers/rating";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({ config, game, rating, user, wishlist });

const persistConfig = { key: "gamecho", storage };

//Definition des reducers
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <>
      {/* Englobé par Provider, tous les composants ont accés au store */}
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Head>
            <title>Next.js App</title>
          </Head>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
