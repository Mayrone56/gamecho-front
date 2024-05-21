import Head from 'next/head';
import SignIn from '../components/SignIn';

function SignUpPage() {
    return (
        <>
            <Head>
                <title>Sign-up / GamEcho</title>
            </Head>
            <SignIn />
        </>
    );
}

export default SignUpPage;