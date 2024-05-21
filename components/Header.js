import styles from '../styles/Header.module.css';
import Link from 'next/link';
import Image from 'next/image';

//TEST LOTTIE
import React from "react";
import Lottie from "lottie-react";
import menuBurger from "../public/motion/burgerMenu.json";

function Header() {

  return (
    <div className={styles.header}>
      <Link href="/profil">
        <Image src="/icons/emojiIcons/happy.svg" alt="Avatar" width={24} height={24} className={styles.icon} />
      </Link>
      <Link href="/home">
        <h1 className={styles.logoTitle}>GAMECHO</h1>
      </Link>
      <Link href="/">
      <Lottie onClick={() => handleLike()} animationData={menuBurger} loop={false} className={styles.icon}/>
        {/* <Image onClick={() => handleLike()} src="/icons/burger.svg" alt="Avatar" width={24} height={24} className={styles.icon} /> */}
      </Link>
    </div>
  )
}

export default Header;