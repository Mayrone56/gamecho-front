import styles from '../styles/SignUp.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';

function SignUp() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () => {
        fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, confirmPassword }),
        }).then(response => response.json())
            .then(data => {
                data.result && dispatch(login({ token: data.token, username, email }));
            });
    };

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>GamEcho</h1>
                </div>
                <div className={styles.titleContainer}>
                    <h2>Create your GamEcho account</h2>
                    <h3>Sign Up</h3>
                </div>
                <div className={styles.inputContainer}>
                    <input type="text" className={styles.input} onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" />
                    <input type="text" className={styles.input} onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
                    <input type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
                    <input type="password" className={styles.input} onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="Confirm password" />
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={() => handleSubmit()}>Create an account</button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;