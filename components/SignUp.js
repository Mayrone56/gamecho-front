import styles from "../styles/SignUp.module.css";
import Footer from './Footer';
import Link from 'next/link';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router"; // ajout d'un état de route pour rediriger l'utilisateur
import { login } from "../reducers/user";
//import { BACKEND_URL } from "../const";
const BACKEND_URL= "https://gamecho-back.vercel.app";

function SignUp() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value); // import de l'état user pour cibler son token
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //état pour tous les types d'erreurs
  const [errors, setErrors] = useState({});

  // Grabbed from emailregex.com
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const router = useRouter(); // si un token est ajouté à l'état user, il peut se rendre sur la page Home
  if (user.token) { //
    router.push("/home");//
  };

  const handleSubmit = () => {
    //définir un objet "fields" qui contient tous les champs.
    const fields = { username, email, password, confirmPassword };
    //initialiser un objet vide qui sera utilisé pour stocker toutes les erreurs de validation trouvées au cours du processus de soumission du formulaire
    const newErrors = {};

    // On itère sur l'objet "fields" pour vérifier si chaque champ est vide.
    Object.keys(fields).forEach(field => {
      if (!fields[field]) {
        //Si un champ est vide, on ajoute un message d'erreur à l'objet newErrors avec le nom du champ comme clé.
        newErrors[field] = "This field is required";
      }
    });

    // affichage conditionnel de "Email not valid"
    if (email && !EMAIL_REGEX.test(email)) {
      newErrors.email = "Invalid email address";
    };

    // affichage conditionnel de "Passwords do not match"
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    };

    //L'état des erreurs est mis à jour
    setErrors(newErrors);

    //Par exemple, si les champs 'email' et 'password' comportent des erreurs, Object.keys(newErrors) peut renvoyer ['email', 'password'].
    // .length > 0 - vérifie si le tableau contient des éléments. Si le tableau contient des éléments, cela signifie que des erreurs sont présentes.
    if (Object.keys(newErrors).length > 0) return;

    fetch(`${BACKEND_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          //si le résultat est vrai, nous créons un compte et nous connectons l'utilisateur
          dispatch(login({ token: data.token, username, email }));
        } else if (data.error === "User already registered") {
          //affiche le message d'erreur si le nom d'utilisateur existe déjà dans notre bdd
          setErrors({ username: "Username already exists" });
        }
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/">
          <h1 className={styles.logoTitle}>GAMECHO</h1>
        </Link>
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Create your GamEcho account</h2>
          <h3 className={styles.title}>Sign Up</h3>
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.input}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
          />
          {errors.username && <div className={styles.errorContainer}><p className={styles.error}>{errors.username}</p></div>}
          <input
            type="text"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
          {errors.email && <div className={styles.errorContainer}><p className={styles.error}>{errors.email}</p></div>}
          <input
            type="password"
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
          {errors.password && <div className={styles.errorContainer}><p className={styles.error}>{errors.password}</p></div>}
          <input
            type="password"
            className={styles.input}
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="Confirm password"
          />
          {errors.confirmPassword && <div className={styles.errorContainer}><p className={styles.error}>{errors.confirmPassword}</p></div>}
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => handleSubmit()}>
            Create an account
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;
