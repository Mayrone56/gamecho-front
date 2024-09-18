import Head from 'next/head';
import SignIn from '../components/SignIn';

function SignUpPage() {
    return (
        <>
            <Head>
                <title>Signin | Gamecho</title>
            </Head>
            <SignIn />
        </>
    );
}

export default SignUpPage;