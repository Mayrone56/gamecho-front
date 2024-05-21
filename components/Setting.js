import Image from 'next/image';
import styles from '../styles/Setting.module.css';
import { useRouter } from "next/router";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function Setting() {

    const note = [
        'Emojis', 'Out of 10', 'Out of 100', 'tag'
    ];

    const privacy = [
        'public', 'private'
    ];

    const mode = [
        'light', 'dark'
    ];

    const defaultNote = note[0];
    const defaultPrivacy = privacy[0];
    const defaultMode = mode[0];

    return (
        <>
            <div className={styles.main}>
                <div className={styles.content}>
                    <h2>Settings</h2>
                    <div className={styles.parameter}>
                        <div className={styles.iconContainer}>
                            <Image src="/icons/eye.svg" alt="Eye" width={24} height={24} className={styles.icon} />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Rating method</p>
                        </div>
                        <div className={styles.dropdownContainer}>
                            <Dropdown options={note} value={defaultNote} placeholder="Select an option" />
                        </div>

                    </div>
                    <div className={styles.parameter}>
                        <div className={styles.iconContainer}>
                            <Image src="/icons/eye.svg" alt="Eye" width={24} height={24} className={styles.icon} />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Account privacy</p>
                        </div>
                        <div className={styles.dropdownContainer}>
                            <Dropdown options={privacy} value={defaultPrivacy} placeholder="Select an option" />
                        </div>
                    </div>
                    <div className={styles.parameter}>
                        <div className={styles.iconContainer}>
                            <Image src="/icons/eye.svg" alt="Eye" width={24} height={24} className={styles.icon} />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Mode</p>
                        </div>
                        <div className={styles.dropdownContainer}>
                            <Dropdown options={mode} value={defaultMode} placeholder="Select an option" />
                        </div>
                    </div>
                    <div className={styles.parameter}>
                        <div className={styles.iconContainer}>
                            <Image src="/icons/eye.svg" alt="Eye" width={24} height={24} className={styles.icon} />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Notifications</p>
                        </div>
                    </div>
                    <div className={styles.parameter}>
                        <div className={styles.iconContainer}>
                            <Image src="/icons/eye.svg" alt="Eye" width={24} height={24} className={styles.icon} />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Reset all your ratings</p>
                        </div>
                    </div>
                    <div className={styles.parameter}>
                        <div className={styles.iconContainer}>
                            <Image src="/icons/eye.svg" alt="Eye" width={24} height={24} className={styles.icon} />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Delete account</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Setting;

