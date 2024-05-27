import Head from 'next/head';
import Profile from '../components/Profile';
import Header from '../components/Header';
import Footer from '../components/Footer';
function ProfilePage() {
    return (
        <>
        <Header/>
            <Head>
                <title>Sign-up / GamEcho</title>
            </Head>
            <Profile />
            <Footer/>
        </>
    );
}

export default ProfilePage;