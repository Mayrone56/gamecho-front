// import styles from '../styles/Header.module.css';
// import Link from 'next/link';
// import Image from 'next/image';

// //TEST LOTTIE
// import React from "react";
// import Lottie from "lottie-react";
// import menuBurger from "../public/motion/burgerMenu.json";

// function Header() {

//   return (
//     <div className={styles.header}>
//       <Link href="/profile">
//         <Image src="/icons/emojiIcons/happy.svg" alt="Avatar" width={24} height={24} className={styles.icon} />
//       </Link>
//       <Link href="/home">
//         <h1 className={styles.logoTitle}>GAMECHO</h1>
//       </Link>
//       <Link href="/">
//       <Lottie onClick={() => handleLike()} animationData={menuBurger} loop={false} className={styles.icon}/>
//         {/* <Image onClick={() => handleLike()} src="/icons/burger.svg" alt="Avatar" width={24} height={24} className={styles.icon} /> */}
//       </Link>
//     </div>
//   )
// }

// export default Header;

///////////////////2

// import styles from '../styles/Header.module.css';
// import Link from 'next/link';
// import Image from 'next/image';

// //TEST LOTTIE
// import Lottie from "lottie-react";
// import menuBurger from "../public/motion/burgerMenu.json";

// //TEST NAVBAR
// import { useRef, useState } from 'react';

// function Header() {

//   const navRef = useRef();

//   const showNavbar = () => {
//     navRef.current.classList.toggle("responsiveNav");
//   }

//   return (
//     <div className={styles.headerNav}>
//       <Link href="/profile">
//         <Image src="/icons/emojiIcons/happy.svg" alt="Avatar" width={24} height={24} className={styles.icon} />
//       </Link>
//       <Link href="/home">
//         <h1 className={styles.logoTitle}>GAMECHO</h1>
//       </Link>
//       <nav ref={navRef} className={styles.navMenu}>
//         <a className={styles.linkBurgerMenu} href='/'>Home</a>
//         <a className={styles.linkBurgerMenu} href='/'>Profile</a>
//         <a className={styles.linkBurgerMenu} href='/'>Settings</a>
//         <a className={styles.linkBurgerMenu} href='/'>Wishlist</a>
//         <a className={styles.linkBurgerMenu} href='/'>Logout</a>
//         <button onClick={showNavbar} className={styles.navBtn}>
//           <Image src="/icons/cross.svg" alt="Avatar" width={24} height={24} className={styles.icon} />
//         </button>
//       </nav>
//       <button onClick={showNavbar} className={styles.navBtn}>
//         <Image src="/icons/burger.svg" alt="Avatar" width={24} height={24} className={styles.icon} />
//       </button>

//     </div>
//   )

// }

// export default Header;

// ///////////////3

// import styles from '../styles/Header.module.css';
// import Link from 'next/link';
// import Image from 'next/image';

// //TEST LOTTIE
// import React from "react";
// import Lottie from "lottie-react";
// import menuBurger from "../public/motion/burgerMenu.json";

// import { Modal } from "antd";
// import { useState } from 'react';

// function Header() {

//   const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);

//   //Permet d'afficher le contenu du menu burger
//   const showBurgerMenu = () => {
//     setIsOpenBurgerMenu(!isOpenBurgerMenu);
//     //   console.log('Click burger menu');
//   };

//   let burgerContent;
//   // if (!user.token) {
//   burgerContent = (
//     <div className={styles.burgerContainer}>
//       <div className={styles.topMenuBurger}>
//         <a className={styles.linkBurgerMenu} href="/home">Profile</a>
//         <a className={styles.linkBurgerMenu} href="/home">Ratings</a>
//         <a className={styles.linkBurgerMenu} href="/home">Wishlist</a>
//         <a className={styles.linkBurgerMenu} href="/home">Settings</a>
//       </div>
//       <div className={styles.bottomMenuBurger}>
//         <a className={styles.linkBurgerMenu} href="/home">Logout</a>
//       </div>
//     </div>
//   );
//   // }

//   return (
 
//     <div className={styles.header}>
//       <Link href="/profile">
//         <Image src="/icons/emojiIcons/happy.svg" alt="Avatar" width={24} height={24} className={styles.icon} />
//       </Link>
//       <Link href="/home">
//         <h1 className={styles.logoTitle}>GAMECHO</h1>
//       </Link>

//       <Lottie onClick={() => showBurgerMenu()} animationData={menuBurger} loop={false} className={styles.icon} />
//       {/* <Image onClick={() => showBurgerMenu()} src="/icons/burger.svg" alt="Avatar" width={24} height={24} className={styles.icon} /> */}


//       <Modal getContainer="#react-modals" className={styles.modal} visible={isOpenBurgerMenu} closable={false} footer={null}>
//         {burgerContent}
//       </Modal>

//     </div>
 
//   )
// }

// export default Header;




//////////4



import styles from '../styles/Header.module.css';
import Link from 'next/link';
import Image from 'next/image';

//TEST LOTTIE
import React from "react";
import Lottie from "lottie-react";
import menuBurger from "../public/motion/burgerMenu.json";

import { Modal } from "antd";
import { useState } from 'react';

function Header() {

  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);
  console.log(isOpenBurgerMenu);

  //Permet d'afficher le contenu du menu burger
  const toggleBurgerMenu = () => {
    setIsOpenBurgerMenu(!isOpenBurgerMenu);
  };

  const toggleClose = () => {
    isOpenBurgerMenu = false;
    console.log(isOpenBurgerMenu);
  };

  let burgerContent;
  // if (!user.token) {
  burgerContent = (
    <div className={styles.burgerContainer}>
      <div className={styles.topMenuBurger}>
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
        <Link href="/home">
          <a onClick={() => toggleClose()} className={styles.linkBurgerMenu}>CLOSE</a>
        </Link>
      </div>
      <div className={styles.bottomMenuBurger}>
        <a className={styles.linkBurgerMenu} href="/home">Logout</a>
      </div>
    </div>
  );
  // }

  return (
 
    <div className={styles.header}>
      <Link href="/profile">
        <Image src="/icons/emojiIcons/happy.svg" alt="Avatar" width={24} height={24} className={styles.icon} />
      </Link>
      <Link href="/home">
        <h1 className={styles.logoTitle}>GAMECHO</h1>
      </Link>

      {/* <Lottie onClick={toggleBurgerMenu} animationData={menuBurger} loop={false} className={styles.icon} /> */}
      <Image onClick={() => toggleBurgerMenu()} src="/icons/burger.svg" alt="Avatar" width={24} height={24} className={styles.icon} />


      <Modal getContainer="#react-modals" className={styles.modal} open={isOpenBurgerMenu} closable={false} footer={null}>
        {burgerContent}
      </Modal>
   

    </div>
 
  )
}

export default Header;
