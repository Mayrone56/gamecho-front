import React, { useRef } from "react"; // useRef s'applique aussi aux fichiers selectionnés localement, permet de les cibler et poster
import styles from "../styles/Profile.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { addAvatar } from "../reducers/user";
import Link from "next/link";

function Profile() {
  const dispatch = useDispatch(); // Pour mettre à jour l'avatar dans tous les composants
  const user = useSelector((state) => state.user.value); // Cible les informations de l'utilisateur
  const isLightmode = useSelector((state) => state.config.value.mode);//Cible le mode dans le reducer setting
  const fileInputRef = useRef(null); // Création de la référence pour exploiter le fichier selectionné
  const router = useRouter();
  const handleSignUpClick = () => {
    // redirection SignUp
    router.push("/sign-up"); // changement de la route appelée, "SignUp" ciblait le composant
  };
  // L'input est un évènement mais on ne recupère pas la valeur directement, sa référence doit être exploitée dans le backend et dispatch dans le front
  const handleAvatarEdit = () => {
    const file = fileInputRef.current.files[0]; // current est une propriété de useRef pour cibler le fichier selectionné / premier index en cas d'ajouts mutliples pour encadrer l'upload
    if (file) {
      const formData = new FormData(); // faceup part3 adapté à React
      formData.append("avatar", file); // premier paramètre = nom donné au fichier, second = cible du fichier

      fetch("http://localhost:3000/profile/avatar", {
        // création de la route
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          data.result && dispatch(addAvatar(data.url));
        });
    }
  };
  console.log(user.avatar);

  // Clic sur le input emulé en bouton
  const handleButtonClick = () => {
    fileInputRef.current.click(); // Simule le clic sur l'input caché dans le CSS (voir defaultInput)
  };

  return (
    <>
      <div className={isLightmode === "light" ? styles.containerlight : styles.containerdark}>
        <Header />
        {!user.token && (
          <div className={styles.middleContainer}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>Discover an exciting new approach to gaming!</h1>
              <h3>Rate your favourite titles according to your own criteria and explore recommendations tailored specifically to you.</h3>
              <h3>Join now and unleash the full potential of your gaming experience!</h3>
            </div>
            <div className={styles.buttonContainer}>
              <div className={styles.signup}>
                <button className={styles.button} onClick={handleSignUpClick}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
        {user.token && (
          <div className={styles.middleContainer}>
            <h1 className={styles.sectionTitle}>MY PROFILE</h1>
            {!user.avatar && (
              <Image
                src="/icons/emojiIcons/happy.svg"
                alt="Avatar"
                width={150}
                height={150}
                className={styles.avatar}
              />
            )}{" "}
            {user.avatar && (
              <Image
                src={user.avatar}
                alt="Avatar"
                className={styles.avatar}
                width={150}
                height={150}
              />
            )}
            <div className={isLightmode === "light" ? styles.buttondark : styles.buttonlight} onClick={handleButtonClick}>
              Upload avatar
              <input
                ref={fileInputRef} // on prête une référence à l'image selectionnée à la manière d'un ID temporaire
                type="file"
                accept="image/*"
                onChange={handleAvatarEdit}
                className={styles.defaultInput}
              />
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}

export default Profile;
