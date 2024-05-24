import React, { useRef } from "react"; // useRef s'applique aussi aux fichiers selectionnés localement, permet de les cibler et poster
import styles from "../styles/Profile.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Image from "next/image";
import { logout } from '../reducers/user';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { addAvatar, editUsername, editEmail } from "../reducers/user";
import Link from "next/link";

function Profile() {
  const dispatch = useDispatch(); // Pour mettre à jour l'avatar dans tous les composants
  const user = useSelector((state) => state.user.value); // Cible les informations de l'utilisateur
  const currentUsername = useSelector((state) => state.user.value.username);
  const currentEmail = useSelector((state) => state.user.value.email);
  const [newUsername, setNewUsername] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);

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
  const handleAvatarClick = () => {
    fileInputRef.current.click(); // Simule le clic sur l'input caché dans le CSS (voir defaultInput)
  };

  const handleUsernameChange = () => {
    dispatch(editUsername({ username: newUsername }));
    setIsEditingUsername(false); // Exit editing mode
  };

  const handleEmailChange = () => {
    dispatch(editEmail({ email: newEmail }));
    setIsEditingEmail(false); // Exit editing mode
  };

  return (
    <div className={isLightmode === "light" ? styles.containerlight : styles.containerdark}>
      <Header />
      {!user.token && (
        <div className={styles.middleContainer}>
          <div className={styles.titleContainer}>
            <h1>Discover an exciting new approach to gaming!</h1>
            <h3>Rate your favourite titles according to your own criteria and explore recommendations tailored specifically to you.</h3>
            <h3>Join now and unleash the full potential of your gaming experience!</h3>
          </div>
          <div className={styles.buttonContainer}>
            <button className={isLightmode === "light" ? styles.buttondark : styles.buttonlight} onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        </div>
      )}
      {user.token && (
        <div className={styles.middleContainer}>
          <h1 className={styles.title}>MY PROFILE</h1>
          {!user.avatar && (
            <div className={styles.avatarContainer} onClick={handleAvatarClick}>
              <Image
                src="/icons/emojiIcons/happy.svg"
                alt="Avatar"
                width={150}
                height={150}
                className={styles.defaultAvatar} />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarEdit}
                className={styles.defaultInput}
              />
            </div>
          )}{" "}
          {user.avatar && (
            <div className={styles.avatarContainer} onClick={handleAvatarClick}>
              <Image
                src={user.avatar}
                alt="Avatar"
                className={styles.userAvatar}
                width={150}
                height={150}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarEdit}
                className={styles.defaultInput}
              />
            </div>
          )}
          <h3 className={styles.usernameTitle}>{currentUsername}</h3>
          <div className={styles.userInfoContainer}>
            <div className={styles.userInfo}>
              <p>Username:</p>
              {isEditingUsername ? (
                <div className={styles.editContainer}>
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      className={styles.input}
                      onChange={(e) => setNewUsername(e.target.value)}
                      value={newUsername}
                      placeholder='New username...'
                    />
                  </div>
                  <div className={styles.iconContainer}>
                    <Image
                      src="/icons/check.svg"
                      alt="save changes"
                      width={24}
                      height={24}
                      className={styles.saveButton}
                      onClick={handleUsernameChange} />
                  </div>
                </div>
              ) : (
                <div className={styles.usernameDisplay}>
                  <p>{currentUsername}</p>
                  <div className={styles.iconContainer}>
                    <Image
                      src="/icons/add.svg"
                      alt="add"
                      width={24}
                      height={24}
                      onClick={() => setIsEditingUsername(true)}
                      className={styles.editIcon}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className={styles.userInfo}>
              <p>Email:</p>
              {isEditingEmail ? (
                <div className={styles.editContainer}>
                  <input
                    type="text"
                    className={styles.input}
                    onChange={(e) => setNewEmail(e.target.value)}
                    value={newEmail}
                    placeholder='New email...'
                  />
                  <Image
                    src="/icons/check.svg"
                    alt="save changes"
                    width={24}
                    height={24}
                    className={styles.saveButton}
                    onClick={handleEmailChange} />
                </div>
              ) : (
                <div className={styles.usernameDisplay}>
                  <p>{currentEmail}</p>
                  <div className={styles.iconContainer}>
                    <Image
                      src="/icons/add.svg"
                      alt="add"
                      width={24}
                      height={24}
                      onClick={() => setIsEditingEmail(true)}
                      className={styles.editIcon}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className={styles.userInfo}>
              <p>Bio: </p>
              <div className={styles.iconContainer}>
                <Image
                  src="/icons/add.svg"
                  alt="add"
                  width={24}
                  height={24} />
              </div>
            </div>
          </div>
          <button onClick={() => { router.push('/'); dispatch(logout()); }} className={styles.logout}>Logout</button>
        </div>
      )
      }
      <Footer />
    </div >
  );
}

export default Profile;
