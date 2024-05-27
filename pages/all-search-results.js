import Head from 'next/head';
import AllSearchResults from '../components/AllSearchResults';
import Header from '../components/Header';
import Footer from '../components/Footer';

function allSearchResultsPage() {
    return (
        <>
        <Header />
            <Head>
                <title>All releases / Gamecho</title>
            </Head>
            <AllSearchResults />
            <Footer/>
        </>
    );
}

export default allSearchResultsPage;