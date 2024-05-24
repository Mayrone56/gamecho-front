import React from 'react';
import Image from 'next/image';
import styles from '../styles/Setting.module.css';
import { useRouter } from "next/router";
import Dropdown from 'react-dropdown'; //import du composant Dropdown déja tout fait
import 'react-dropdown/style.css'; // import du css du composant Drodown
import { useDispatch, useSelector } from 'react-redux';
import { switchMode } from '../reducers/config'; // import de la fonction switchmode du reducer config 

function Setting() {
    const isLightmode = useSelector((state) => state.config.value.mode);//Cible le mode dans le reducer setting


    const dispatch = useDispatch();

    const note = [
        'Emojis', 'Out of 10', 'Out of 100', 'tag'
    ]; // liste des options disponible pour le Dropdown contenant la façon de noter.

    const privacy = [
        'public', 'private'
    ]; // liste des options disponible pour le Dropdown contenant la privacy

    const modes = [
        'dark', 'light'
    ]; // liste des options disponible pour le Dropdown contenant le darkmode et lightmode

    const defaultNote = note[0];
    const defaultPrivacy = privacy[0];
    const defaultModes = modes[0];
    //variable contenant la premiere valeur du dropdown


    return (
        <>
            <div className={isLightmode === 'light' ? styles.mainlight : styles.maindark}>
                <div className={styles.content}>
                    <h2>Settings</h2>
                    <div className={styles.parameter}>
                        <div className={styles.iconContainer}>
                            <Image src="/icons/eye.svg" alt="Eye" width={24} height={24} className={isLightmode === 'light' ? styles.iconlight : styles.icondark} />
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
                            <Image src="/icons/eye.svg" alt="Eye" width={24} height={24} className={isLightmode === 'light' ? styles.iconlight : styles.icondark} />
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
                            <Image src="/icons/eye.svg" alt="Eye" width={24} height={24} className={isLightmode === 'light' ? styles.iconlight : styles.icondark} />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Mode</p>
                        </div>
                        <div className={styles.dropdownContainer}>
                            <Dropdown options={modes} placeholder="Select an option" onChange={(e) => dispatch(switchMode(e.value))} value={defaultModes} />
                        </div>
                    </div>
                    <div className={styles.parameter}>
                        <div className={styles.iconContainer}>
                            <Image src="/icons/eye.svg" alt="Eye" width={24} height={24} className={isLightmode === 'light' ? styles.iconlight : styles.icondark} />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Notifications</p>
                        </div>
                    </div>
                    <div className={styles.parameter}>
                        <div className={styles.iconContainer}>
                            <Image src="/icons/trash.svg" alt="trash" fill='red' width={24} height={24} className={isLightmode === 'light' ? styles.iconlight : styles.icondark} />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Reset all your ratings</p>
                        </div>
                        <div className={styles.dropdownContainer}>
                            <button className={isLightmode === "light" ? styles.buttonlight : styles.buttondark}>Reset</button>
                        </div>
                    </div>
                    <div className={styles.parameter}>
                        <div className={styles.iconContainer}>
                            <Image src="/icons/eye.svg" alt="Eye" width={24} height={24} className={isLightmode === 'light' ? styles.iconlight : styles.icondark} />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Delete account </p>
                        </div>
                        <div className={styles.dropdownContainer}>
                            <button className={isLightmode === "light" ? styles.buttonlight : styles.buttondark}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Setting;

