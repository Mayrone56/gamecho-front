//Page de test pour optimisation ultérieur
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props) {
    return (
        <>
            <Head>
                <title>{props.title}</title>
            </Head>
            {props.children}
            <Footer />
        </>
    )
}