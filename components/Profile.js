import React, { useRef } from "react"; // useRef s'applique aussi aux fichiers selectionnés localement, permet de les cibler et poster
import styles from "../styles/Profile.module.css";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { addAvatar } from "../reducers/user";

function Profile() {
  const dispatch = useDispatch(); // Pour mettre à jour l'avatar dans tous les composants
  const user = useSelector((state) => state.user.value); // Cible les informations de l'utilisateur
  const fileInputRef = useRef(null); // Création de la référence pour exploiter le fichier selectionné

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
      <div className={styles.container}>
        <Header />
        <div className={styles.firstContainer}>
          <h1 className={styles.sectionTitle}>PROFILE</h1>
          <div className={styles.secondaryButton} onClick={handleButtonClick}>
            Upload avatar
            <input
              ref={fileInputRef} // on prête une référence à l'image selectionnée à la manière d'un ID temporaire
              type="file"
              accept="image/*"
              onChange={handleAvatarEdit}
              className={styles.defaultInput}
            />
          </div>
          <img src={user.avatar} alt="Avatar" className={styles.avatar} />
        </div>
      </div>
    </>
  );
}

export default Profile;
