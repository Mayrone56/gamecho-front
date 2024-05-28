import styles from '../styles/Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';

function Footer() {

  return (
    <div className={styles.footer}>
      <p className={styles.textFooter} >&copy; 2024 | Gamecho Tous droits réservés.</p>
      <div className={styles.iconFooter}>
        <Link href="/">
          <span className={styles.marginSideSmall}>
            <Image src="/icons/social/Instagram.svg" alt="Logo Instagram" width={24} height={24} className={styles.icon} />
          </span>
        </Link>
        <Link href="/">
          <span className={styles.marginSideSmall}>
            <Image src="/icons/social/X.svg" alt="Logo X" width={24} height={24} className={styles.icon} />
          </span>
        </Link>
      </div>
    </div>
  )
}

export default Footer;