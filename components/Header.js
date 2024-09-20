import styles from '../styles/Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { logout } from '../reducers/user';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

//TEST LOTTIE
//import Lottie from "lottie-react";


function Header() {
  //etat de l'avatar
  const urlAvatar = useSelector((state) => state.user.value.avatar);
  const userName = useSelector((state) => state.user.value.username)

  //Menu burger
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  // console.log(openBurgerMenu);

  //Logout
  const dispatch = useDispatch();

  // Redirect to / if not logged in
  const router = useRouter();
  //Permet d'obtenir la route actuelle de la page
  const currentRoute = router.pathname;

  //Permet d'afficher le contenu du menu burger
  const toggleMenuBurger = () => {
    setOpenBurgerMenu(!openBurgerMenu);
  };

  //Fonction pour gérer le clic sur les lien dans le menu burger
  const handleMenuCLick = (route) => {
    if (route === currentRoute) {
      setOpenBurgerMenu(false);
    } else {
      router.push(route);
      setOpenBurgerMenu(false);
    }
  }

  //image de l'avatar qui change en fonction de si on en a uploadé un ou pas (par default smiley)
  let avatar;
  if (urlAvatar) {
    avatar = (
      <Image src={urlAvatar} alt="Avatar" width={48} height={48} className={styles.icon} />
    )
  }
  else {
    avatar = (
      <Image src="/icons/emojiIcons/happy.svg" alt="Avatar" width={48} height={48} className={styles.icon} />
    )
  }

  return (

    <div>
      <div className={styles.header}>
        <div className={styles.profilcontainer}>
          <Link href="/profile">
            {avatar}
          </Link>
        </div>

        {/* <Link href="/home" >
          <h1 className={styles.logoTitle}>GAMECHO</h1>
        </Link> */}
        <h1 className={styles.logoTitle} onClick={() => handleMenuCLick("/home")}>GAMECHO</h1>

        {/* <Lottie onClick={toggleBurgerMenu} animationData={menuBurger} loop={false} className={styles.icon} /> */}

        <Image onClick={toggleMenuBurger} src="/icons/burger.svg" alt="Burger menu" width={24} height={24} className={styles.burgerIcon} />
      </div>

      {openBurgerMenu && (
        <div className={styles.navigation}>
          <div className={styles.burgerContainer}>
            <div className={styles.topMenuBurger}>
              <button className={styles.seoncadryButton} onClick={() => handleMenuCLick("/profile")}>
                Profile
              </button>

              <button className={styles.seoncadryButton} onClick={() => handleMenuCLick("/ratings")}>
                Ratings
              </button>
              <button className={styles.seoncadryButton} onClick={() => handleMenuCLick("/wishlist")} >
                Wishlist
              </button>
              <button className={styles.seoncadryButton} onClick={() => handleMenuCLick("/setting")}>
                Settings
              </button>

            </div>
            {/* Logout */}
            <button onClick={() => { router.push('/'); dispatch(logout()); }} className={styles.logout}>Logout</button>
          </div>
        </div>
      )}

    </div>


  )
}

export default Header;