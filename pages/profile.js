import Head from 'next/head';
import Profile from '../components/Profile';
import Header from '../components/Header';
import Footer from '../components/Footer';
function ProfilePage() {
    return (
        <>
            <Head>
                <title>Profile | Gamecho</title>
            </Head>
            <Header />
            <Profile />
            <Footer />
        </>
    );
}

export default ProfilePage;