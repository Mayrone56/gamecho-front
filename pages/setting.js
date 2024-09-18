import Setting from "../components/Setting";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from 'next/head';

function SettingPage() {
    return (
        <>
            <Head>
                <title>Settings| Gamecho</title>
            </Head>
            <Header />
            <Setting />
            <Footer />
        </>

    )

}

export default SettingPage;