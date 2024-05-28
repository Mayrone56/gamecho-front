import React from 'react';
import Image from 'next/image';
import Header from "./Header";
import Footer from "./Footer";
import Toggle from './toggle';
import styles from '../styles/Setting.module.css';
import { useRouter } from "next/router";
import Dropdown from 'react-dropdown'; //import du composant Dropdown déja tout fait
import 'react-dropdown/style.css'; // import du css du composant Dropdown
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { switchMode, changeRatingMode} from '../reducers/config'; // import de la fonction switchmode du reducer config
import { logout } from '../reducers/user';

function Setting() {
    const rooter = useRouter()
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);

    const user = useSelector((state) => state.user.value.username) //cible la valeur du nom de l'etat user
    const isLightmode = useSelector((state) => state.config.value.mode);//Cible le mode dans le reducer setting qui est par defaut à False
    const ratingMethode=useSelector((state)=>state.config.value.ratingMode)

    // fonction qui passe l'état de la modale a vrai
    const handleModal = () => {
        setModalVisible(true)
    }

    //fonction qui vas fetch la route delete user du backend(si réponse du back on dispatch la fonction logout qui remet les valeur de user a null, si non erreur. Ensuite on redirige vers la welcome)
    const handleRemove = () => {
        fetch(`http://localhost:3000/users/${user}`, { method: 'DELETE' })
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
        'Emojis', 'Out of 10', 'Out of 100', 'Tag'
    ]; // liste des options disponible pour le Dropdown contenant la façon de noter.

    const privacy = [
        'Public', 'Private'
    ]; // liste des options disponible pour le Dropdown contenant la privacy



    const defaultNote = note[0];
    const defaultPrivacy = privacy[0];
    //variable contenant la premiere valeur du dropdown

    //Modale de confirmation de supression de compte
    const modale = modalVisible && (
        <div className={styles.modal}>
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
<<<<<<< HEAD
            <div className={isLightmode === "light" ? styles.containerlight : styles.containerdark}>
                <Header />
                <div className={styles.middleContainer}>
=======
            <div className={isLightmode ? styles.mainlight : styles.maindark}>
                <div className={styles.content}>
>>>>>>> ae3448f2987b1a3c0df78e0d7d4bf3b582bf3e91
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
                            onChange={(e)=>(dispatch(changeRatingMode(e.value)))}
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
                            <p>Delete account {ratingMethode}</p>
                        </div>
                        <div className={styles.dropdownContainer}>
                            <button className={isLightmode ? styles.buttonlight : styles.buttondark} onClick={() => handleModal()}>Delete</button>
                        </div>
                        <div>
                            {modale}
                        </div>
                    </div>
                </div>
<<<<<<< HEAD
                <Footer />
=======
>>>>>>> ae3448f2987b1a3c0df78e0d7d4bf3b582bf3e91
            </div>
        </>
    )
}

export default Setting;

