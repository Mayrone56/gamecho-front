import React from 'react';
import Image from 'next/image';
import CustomToggle from './Toggle';
import styles from '../styles/Setting.module.css';
import { useRouter } from "next/router";
import Dropdown from 'react-dropdown'; //import du composant Dropdown déja tout fait
import 'react-dropdown/style.css'; // import du css du composant Dropdown
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { switchMode, changeRatingMode } from '../reducers/config'; // import de la fonction switchmode du reducer config
import { logout } from '../reducers/user';
import { resetRate } from '../reducers/rating';
import { BACKEND_URL } from "../const";

function Setting() {
    const rooter = useRouter()
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false); // hook d'état pour la modale de confirmation du bouton delete account

    const usertoken = useSelector((state) => state.user.value.token)
    const userName = useSelector((state) => state.user.value.username) //cible la valeur du nom de l'etat user
    const isLightmode = useSelector((state) => state.config.value.mode);//Cible le mode dans le reducer setting qui est par defaut à False


    // fonction qui passe l'état de la modale a vrai
    const handleModal = () => {
        setModalVisible(true)
    }

    //fonction qui va fetch la route delete/:token pour suprimer les ratings en fonctions de l'utilisateur pui qui remetes la valeur de ratings a tableau vide
    const handleDeleteRatings = () => {
        fetch(`${BACKEND_URL}/ratings/${usertoken}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {
                //event.stopPropagation();
                data && dispatch(resetRate());
            })
    };

    //fonction qui vas fetch la route delete user du backend(si réponse du back on dispatch la fonction logout qui remet les valeur de user a null, si non erreur. Ensuite on redirige vers la welcome)
    const handleRemove = () => {
        fetch(`${BACKEND_URL}/users/${userName}`, { method: 'DELETE' })
            .then(data => {
                if (data) {
                    dispatch(logout())
                }
                else {
                    console.log('erreur')
                }
            })
            .then(
                rooter.push('/')
            )
    }
    // fonction qui fetch le backend via la route delete ( si resultat on supprime l'utilisateur de la bdd puis redirection sur Welcome(index.js), si non erreur)

    const handleToggle = () => {
        dispatch(switchMode(!isLightmode))
    };
    //fonction qui change l'état de isToggled de faux a vrai puis qui dispatche sont etat dans le reducer


    const note = [
        'Emojis', 'Out of 10', 'Out of 100',
    ]; // liste des options disponible pour le Dropdown contenant la façon de noter.

    const privacy = [
        'Public', 'Private'
    ]; // liste des options disponible pour le Dropdown contenant la privacy



    const defaultNote = note[0];
    const defaultPrivacy = privacy[0];
    //variable contenant la premiere valeur du dropdown

    //Modale de confirmation de supression de compte
    const modale = modalVisible && (
        <div className={isLightmode ? styles.modalLight : styles.modalDark}>
            <div>
                <div>Your account will be delete definitively. Do you want to continue ?</div>
                <div className={styles.buttoncontainer}>
                    <button className={isLightmode ? styles.buttonlight : styles.buttondark} onClick={() => handleRemove()}>Confirm</button>
                    <button className={isLightmode ? styles.buttonlight : styles.buttondark} onClick={() => setModalVisible(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
    //

    return (
        <>
            <div className={isLightmode ? styles.containerlight : styles.containerdark}>
                <div className={styles.middleContainer}>
                    <h2>Settings</h2>
                    <div className={styles.parameter}>
                        <div className={styles.iconContainer}>
                            <Image src="/icons/star.svg" alt="star" width={24} height={24} className={isLightmode ? styles.iconlight : styles.icondark} />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Rating method</p>
                        </div>
                        <div className={styles.dropdownContainer}>
                            <Dropdown options={note} value={defaultNote} placeholder="Select an option"
                                onChange={(e) => (dispatch(changeRatingMode(e.value)))}
                                className={styles.customDropdown} // Classe personnalisée pour le conteneur principal
                                controlClassName={styles.customDropdownControl} // Classe personnalisée pour le control
                            />
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
                            <Dropdown options={privacy} value={defaultPrivacy} placeholder="Select an option"
                                className={styles.customDropdown} // Classe personnalisée pour le conteneur principal
                                controlClassName={styles.customDropdownControl} // Classe personnalisée pour le control
                            />
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
                            <CustomToggle isToggled={isLightmode} onToggle={handleToggle} />
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
                            <button onClick={() => handleDeleteRatings()} className={isLightmode ? styles.buttonlight : styles.buttondark}>Reset</button>
                        </div>
                    </div>
                    <div className={styles.parameter}>
                        <div className={styles.iconContainer}>
                            <Image src="/icons/trash.svg" alt="trash" width={24} height={24} className={isLightmode ? styles.iconlight : styles.icondark} />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Delete account</p>
                        </div>
                        <div className={styles.dropdownContainer}>
                            <button className={isLightmode ? styles.buttonlight : styles.buttondark} onClick={() => handleModal()}>Delete</button>
                        </div>
                        <div>
                            {modale}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Setting;