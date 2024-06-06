import styles from "../styles/SignUp.module.css";
import Footer from './Footer';
import Link from 'next/link';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router"; // ajout d'un état de route pour rediriger l'utilisateur
import { login } from "../reducers/user";
const BACKEND_URL= "gamecho-back.vercel.app";

//ChatGPT notes au sujet des avertissements quand redirection au click : This warning indicates that the end value you are using in your CSS is not well supported across all browsers, and it suggests using flex-end instead.

function SignIn() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value); // import de l'état user pour cibler son token
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const router = useRouter(); // si un token est ajouté à l'état user, il peut se rendre sur la page Home
  if (user.token) { //
    router.push("/home");//
  }

  const handleSubmit = () => {
    //définir un objet "fields" qui contient tous les champs.
    const fields = { username, password };
    //initialiser un objet vide qui sera utilisé pour stocker toutes les erreurs de validation trouvées au cours du processus de soumission du formulaire
    const newErrors = {};

    // On itère sur l'objet "fields" pour vérifier si chaque champ est vide.
    Object.keys(fields).forEach(field => {
      if (!fields[field]) {
        //Si un champ est vide, on ajoute un message d'erreur à l'objet newErrors avec le nom du champ comme clé.
        newErrors[field] = "This field is required";
      }
    });

    //L'état des erreurs est mis à jour
    setErrors(newErrors);

    //Par exemple, si les champs 'email' et 'password' comportent des erreurs, Object.keys(newErrors) peut renvoyer ['email', 'password'].
    // .length > 0 - vérifie si le tableau contient des éléments. Si le tableau contient des éléments, cela signifie que des erreurs sont présentes.
    if (Object.keys(newErrors).length > 0) return;

    fetch(`${BACKEND_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data.result)
          //si le résultat est vrai, nous connectons l'utilisateur
          dispatch(login({ token: data.token, username, email: data.email }));
        } else if (data.error === "User not found or wrong password") {
          //affiche le message d'erreur si le nom d'utilisateur existe déjà dans notre bdd
          setErrors({ general: "User not found or wrong password" });
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
          <h2 className={styles.title}>Access your GamEcho account</h2>
          <h3 className={styles.title}>Sign In</h3>
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
            type="password"
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
          {errors.password && <div className={styles.errorContainer}><p className={styles.error}>{errors.password}</p></div>}
          {errors.general && <div className={styles.errorContainer}><p className={styles.error}>{errors.general}</p></div>}
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => handleSubmit()}>
            Connect
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignIn;
