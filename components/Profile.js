import styles from "../styles/Profile.module.css"; // suit la logique de Home.module.css dans un premier temps
import Header from "./Header"; // import du Header sur toutes les pages post-authentification


// username // avatar // email
function Profile() {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.firstContainer}>
          <h1 className={styles.sectionTitle}>PROFILE</h1>
        </div>
      </div>
    </>
  );

}

export default Profile;
