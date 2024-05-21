import Head from 'next/head';
import Profile from '../components/Profile';

function ProfilePage() {
    return (
        <>
            <Head>
                <title>Sign-up / GamEcho</title>
            </Head>
            <Profile />
        </>
    );
}

export default ProfilePage;