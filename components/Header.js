import styles from '../styles/Header.module.css';
import Link from 'next/link';
import Image from 'next/image';

function Header() {

return (
    <div className={styles.header}>
    <Link href="/">
      <Image onClick={() => handleLike()} src="/icons/emojiIcons/happy.svg" alt="Avatar" width={24} height={24} className={styles.icon} />
    </Link>
    <Link href="/">
      <h1 onClick={() => handleLike()} className={styles.title}>GAMECHO</h1>
    </Link>
    <Link href="/">
      <Image onClick={() => handleLike()} src="/icons/burger.svg" alt="Avatar" width={24} height={24} className={styles.icon} />
    </Link>
  </div>
)

}



export default Header;