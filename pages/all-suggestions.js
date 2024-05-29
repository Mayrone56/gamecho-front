import Link from "next/link";
import Image from "next/image";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from "next/head";
import AllSuggestions
 from "../components/AllSuggestions";
function AllSuggestionsPage () {
    
    return (
        <>
        <Header />
          <Head>
            <title>All suggestions / Gamecho</title>
          </Head>
          <AllSuggestions />
          <Footer />
        </>
      );
      
};

export default AllSuggestionsPage;