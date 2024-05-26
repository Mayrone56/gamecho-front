import styles from "../styles/Welcome.module.css";
import { useRouter } from "next/router";
import Link from 'next/link';
import Footer from './Footer';
import { useSelector } from "react-redux";
import user from "../reducers/user";

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
  const userName= useSelector((state)=>state.user.value.username)

  return (
    <div className={isLightmode?styles.containerlight:styles.containerdark}>
      <div className={styles.header}>
        <Link href="/">
          <h1 className={styles.logoTitle}>GAMECHO</h1>
        </Link>
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Welcome!</h2>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.signin}>
            <h4>Already have an account?</h4>
            <button className={styles.button} onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
          <div className={styles.signup}>
            <h4>New to GamEcho? Create an account</h4>
            <button className={styles.button} onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Welcome;
