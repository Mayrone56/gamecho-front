import React from 'react';
import Image from 'next/image';
import Toggle from './toggle';
import styles from '../styles/Setting.module.css';
import { useRouter } from "next/router";
import Dropdown from 'react-dropdown'; //import du composant Dropdown déja tout fait
import 'react-dropdown/style.css'; // import du css du composant Drodown
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { switchMode } from '../reducers/config'; // import de la fonction switchmode du reducer config
import { logout,removeUser } from '../reducers/user';

function Setting() {
    const rooter=useRouter()
    const user = useSelector((state) => state.user.value.username) //cible la valeur du nom de l'etat user

    const isLightmode = useSelector((state) => state.config.value.mode);//Cible le mode dans le reducer setting qui est par defaut à False

    const handleRemove = () => {
        fetch(`http://localhost:3000/users/${user}`, { method: 'DELETE' })
        .then(data=>{
            if(data){
                dispatch(removeUser);
                dispatch(logout)
                rooter.push('/')
                }
        })
    }
    // fonction qui fetch le backend via la route delete ( si resultat on supprime l'utilisateur de la bdd puis redirection sur Welcome(index.js), si non erreur)

    const handleToggle = () => {
        dispatch(switchMode(!isLightmode))
    };
    //function qui change l'état de isToggled de faux a vrai puis qui dispatche sont etat dans le reducer

    const dispatch = useDispatch();

    const note = [
        'Emojis', 'Out of 10', 'Out of 100', 'tag'
    ]; // liste des options disponible pour le Dropdown contenant la façon de noter.

    const privacy = [
        'public', 'private'
    ]; // liste des options disponible pour le Dropdown contenant la privacy



    const defaultNote = note[0];
    const defaultPrivacy = privacy[0];
    //variable contenant la premiere valeur du dropdown


    return (
        <>
            <div className={isLightmode ? styles.mainlight : styles.maindark}>
                <div className={styles.content}>
                    <h2>Settings</h2>
                    <div className={styles.parameter}>
                        <div className={styles.iconContainer}>
                            <Image src="/icons/star.svg" alt="star" width={24} height={24} className={isLightmode ? styles.iconlight : styles.icondark} />
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
                            <Image src="/icons/lock.svg" alt="lock" width={24} height={24} className={isLightmode ? styles.iconlight : styles.icondark} />
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
                            <Image src="/icons/eye.svg" alt="Eye" width={24} height={24} className={isLightmode ? styles.iconlight : styles.icondark} />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Mode</p>
                        </div>
                        <div className={styles.dropdownContainer}>
                            <Image src="/icons/moon.svg" alt="moon" width={24} height={24} className={isLightmode ? styles.iconlight : styles.icondark} />
                            <Toggle isToggled={isLightmode} onToggle={handleToggle} />
                            <Image src="/icons/sun.svg" alt="sun" width={24} height={24} className={isLightmode ? styles.iconlight : styles.icondark} />
                        </div>
                    </div>
                    <div className={styles.parameter}>
                        <div className={styles.iconContainer}>
                            <Image src="/icons/notification.svg" alt="bell" width={24} height={24} className={isLightmode ? styles.iconlight : styles.icondark} />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Notifications</p>
                        </div>
                    </div>
                    <div className={styles.parameter}>
                        <div className={styles.iconContainer}>
                            <Image src="/icons/reset.svg" alt="reset" width={24} height={24} className={isLightmode ? styles.iconlight : styles.icondark} />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Reset all your ratings</p>
                        </div>
                        <div className={styles.dropdownContainer}>
                            <button className={isLightmode ? styles.buttonlight : styles.buttondark}>Reset</button>
                        </div>
                    </div>
                    <div className={styles.parameter}>
                        <div className={styles.iconContainer}>
                            <Image src="/icons/trash.svg" alt="trash" width={24} height={24} className={isLightmode ? styles.iconlight : styles.icondark} />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Delete account </p>
                        </div>
                        <div className={styles.dropdownContainer}>
                            <button className={isLightmode ? styles.buttonlight : styles.buttondark} onClick={()=>handleRemove()}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Setting;

