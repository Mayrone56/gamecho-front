import styles from "../styles/SignUp.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router"; // ajout d'un état de route pour rediriger l'utilisateur
import { login } from "../reducers/user";

//ChatGPT notes au sujet des avertissements quand redirection au click : This warning indicates that the end value you are using in your CSS is not well supported across all browsers, and it suggests using flex-end instead.

function SignIn() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value); // import de l'état user pour cibler son token
  const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter(); // si un token est ajouté à l'état user, il peut se rendre sur la page Home
  if (user.token) { //
    router.push("/home");//
  } //

  const handleSubmit = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        data.result && dispatch(login({ token: data.token, username, email: data.email }));
      });
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>GamEcho</h1>
        </div>
        <div className={styles.titleContainer}>
          <h2>Access your GamEcho account</h2>
          <h3>Sign In</h3>
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.input}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
          />
          {/* <input
            type="text"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          /> */}
          <input
            type="password"
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
          {/* <input
            type="password"
            className={styles.input}
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="Confirm password"
          /> */}
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => handleSubmit()}>
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
