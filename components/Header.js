import styles from '../styles/Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { logout } from '../reducers/user';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

//TEST LOTTIE
import Lottie from "lottie-react";


function Header() {

  //Menu burger
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  console.log(openBurgerMenu);

//Logout
const dispatch = useDispatch();

  // Redirect to / if not logged in
  const router = useRouter();

  //Permet d'afficher le contenu du menu burger
  const toggleMenuBurger = () => {
    setOpenBurgerMenu(!openBurgerMenu);
  };

  return (

    <div>
      <div className={styles.header}>
        <Link href="/profile">
          <Image src="/icons/emojiIcons/happy.svg" alt="Avatar" width={24} height={24} className={styles.icon} />
        </Link>
        <Link href="/home">
          <h1 className={styles.logoTitle}>GAMECHO</h1>
        </Link>

        {/* <Lottie onClick={toggleBurgerMenu} animationData={menuBurger} loop={false} className={styles.icon} /> */}

        <Image onClick={toggleMenuBurger} src="/icons/burger.svg" alt="Avatar" width={24} height={24} className={styles.burgerIcon} />
      </div>

      {openBurgerMenu && (
        <div className={styles.navigation}>
          <div className={styles.burgerContainer}>
            <div className={styles.topMenuBurger}>
              <Link href="/home">
                <a className={styles.linkBurgerMenu} href="/home">Home</a>
              </Link>
              <Link href="/profile">
                <a className={styles.linkBurgerMenu} href="/home">Profile</a>
              </Link>
              <Link href="/ratings">
                <a className={styles.linkBurgerMenu} href="/home">Ratings</a>
              </Link>
              <Link href="/wishlist">
                <a className={styles.linkBurgerMenu} href="/home">Wishlist</a>
              </Link>
              <Link href="/setting">
                <a className={styles.linkBurgerMenu} href="/home">Settings</a>
              </Link>
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