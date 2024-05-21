import Head from 'next/head';
import Welcome from "../components/Welcome";

function Index() {
  return (
    <>
    <Head>
      <title>Welcome / Gamecho</title>
    </Head>
    <Welcome />
    </>
  )
}

export default Index;
