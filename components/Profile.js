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
  const [usernameError, setUsernameError] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const isLightmode = useSelector((state) => state.config.value.mode);//Cible le mode dans le reducer setting
  const fileInputRef = useRef(null); // Création de la référence pour exploiter le fichier selectionné
  const router = useRouter();

  const handleSignUpClick = () => {
    // redirection SignUp
    router.push("/sign-up"); // changement de la route appelée, "SignUp" ciblait le composant
  };
  const handleSignInClick = () => {
    // redirection SignIn - pour l'instant identique à SignUp
    router.push("/sign-in");
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
    if (newUsername === user.username) {
      setUsernameError("That's your current username");
      return;
    } else if (newUsername === '') {
      //si l'input reste vide, un clic sur l'icône "check" fermera le mode d'édition et affichera l'username sans le modifier
      setIsEditingUsername(false);
      return;
    }

    fetch("http://localhost:3000/users/update-username", {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentUsername, newUsername })
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.result) {
          console.log(data.result)
          dispatch(editUsername({ username: newUsername }));
          setIsEditingUsername(false); // Exit editing mode
          setNewUsername('');
          setUsernameError('');
        } else if (data.error === 'New username is already taken') {
          setUsernameError("Username already taken")
        }
      })
  };

  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleEmailChange = () => {
    if (newEmail && !EMAIL_REGEX.test(newEmail)) {
      setEmailError("Invalid email address");
      return;
    };
    //si l'input reste vide, un clic sur l'icône "check" fermera le mode d'édition et affichera l'email' sans le modifier
    if (newEmail === '') {
      setIsEditingEmail(false);
      return;
    }

    fetch("http://localhost:3000/users/update-email", {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentEmail, newEmail })
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.result) {
          console.log(data.result)
          dispatch(editEmail({ email: newEmail }));
          setIsEditingEmail(false); // Exit editing mode
          setNewEmail('');
          setEmailError('');
        }
      })
  };

  return (
    <div className={isLightmode === "light" ? styles.containerlight : styles.containerdark}>
      <Header />
      {!user.token && ( // = if (user.token) {return <div> blablabla} Clean Code
        <div className={styles.middleContainer}>
          <div className={styles.titleContainer}>
            <h2>Discover an exciting new approach to gaming !</h2>
            <h3>Join now and unleash the full potential of your gaming experience !</h3>
            <p>Rate your favourite titles according to your own criteria and explore recommendations tailored specifically to you.</p>
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.signin}>
              <h3>Already have an account?</h3>
              <button className={isLightmode === "light" ? styles.buttondark : styles.buttonlight} onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div className={styles.signup}>
              <h3>New to GamEcho? Create an account!</h3>
              <button className={isLightmode === "light" ? styles.buttondark : styles.buttonlight} onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
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
              <span>Username:</span>
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
                <div className={styles.infoDisplay}>
                  <p>{currentUsername}</p>
                  <div className={styles.iconContainer}>
                    <Image
                      src="/icons/edit.svg"
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
            {usernameError && <div className={styles.errorContainer}><p className={styles.error}>{usernameError}</p></div>}
            <div className={styles.userInfo}>
              <span>Email:</span>
              {isEditingEmail ? (
                <div className={styles.editContainer}>
                  <input
                    type="text"
                    className={styles.input}
                    onChange={(e) => setNewEmail(e.target.value)}
                    value={newEmail}
                    placeholder='New email...'
                  />
                  <div className={styles.iconContainer}>
                    <Image
                      src="/icons/check.svg"
                      alt="save changes"
                      width={24}
                      height={24}
                      className={styles.saveButton}
                      onClick={handleEmailChange} />
                  </div>
                </div>
              ) : (
                <div className={styles.infoDisplay}>
                  <p>{currentEmail}</p>
                  <div className={styles.iconContainer}>
                    <Image
                      src="/icons/edit.svg"
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
            {emailError && <div className={styles.errorContainer}><p className={styles.error}>{emailError}</p></div>}
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
