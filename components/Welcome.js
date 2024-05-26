import styles from "../styles/Welcome.module.css";
import { useRouter } from "next/router";
import Link from 'next/link';
import Footer from './Footer';
import { useSelector } from "react-redux";
import Image from "next/image";

function Welcome() {
  const router = useRouter();

  const handleSignUpClick = () => {
    // redirection SignUp
    router.push("/sign-up"); // changement de la route appelée, "SignUp" ciblait le composant
  };

  const handleSignInClick = () => {
    // redirection SignIn - pour l'instant identique à SignUp
    router.push("/sign-in");
  };
  const isLightmode = useSelector((state) => state.config.value.mode);//Cible le mode dans le reducer setting

  return (
    <div className={isLightmode ? styles.containerlight : styles.containerdark}>
      <div className={styles.header}>
        <Link href="/">
          <h1 className={styles.logoTitle}>GAMECHO</h1>
        </Link>
      </div>
      <div className={styles.middleContainer}>
        {/* BANNER MOBILE */}
        <div className={styles.bannerWelcomeMobile} alt="banner">
          <Image
            src="/Banner_welcome_without_text.jpg"
            alt="Banner Gamecho"
            width={1920}
            height={1000}
            className={styles.bannerImageMobile}
          />
          <div className={styles.bannerText}>
            <p className={styles.bannerTextTop}>Discover an exciting new approach to gaming !</p>
            <p className={styles.bannerTextBottom}>Join now and unleash the full potential of your gaming experience !</p>
          </div>
        </div>

        {/* BANNER DEKSTOP */}
        <div className={styles.bannerWelcomeDesktop} alt="banner">
          <Image
            src="/Banner_welcome_without_text_portrait.jpg"
            alt="Banner Gamecho"
            width={637}
            height={1024}
            className={styles.bannerImageDesktop}
          />
          <div className={styles.bannerText}>
            <p className={styles.bannerTextTop}>Discover an exciting new approach to gaming !</p>
            <p className={styles.bannerTextBottom}>Join now and unleash the full potential of your gaming experience !</p>
            {/* <div className={styles.backgroundText}></div> */}
          </div>
        </div>


        <div className={styles.bottomContainer}>
          <div className={styles.section}>
            <h2 className={styles.title}>Welcome to GamEcho !</h2>
            <p className={styles.restMargin}>Rate your favourite titles according to your own criteria and explore recommendations tailored specifically to you.</p>
          </div>
          <div className={styles.section}>
            <div className={styles.signContainer}>
              <h3 className={styles.titleButton}>Already have an account ?</h3>
              <button className={styles.seoncadryButton} onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div className={styles.signContainer}>
              <h3 className={styles.titleButton}>New to GamEcho ?</h3>
              <button className={styles.primaryButton} onClick={handleSignUpClick}>
                Create an account !
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Welcome;
