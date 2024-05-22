import Head from 'next/head';
import AllSearchResults from '../components/AllSearchResults';

function allSearchResultsPage() {
    return (
        <>
            <Head>
                <title>All releases / Gamecho</title>
            </Head>
            <AllSearchResults />
        </>
    );
}

export default allSearchResultsPage;