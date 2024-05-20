import styles from '../styles/Welcome.module.css';
import { useRouter } from 'next/router'

function Welcome() {

    const router=useRouter();

    const handleClick=()=>{
        router.push("/signUp")
    }
    
    return (
        <>
            <div className={styles.main} >
                <div className={styles.container} >
                    <div className={styles.title} >
                        <h1 >GamEcho</h1>
                    </div>
                    <div className={styles.content}>
                        <h2 className={styles.welcome}>Welcome !</h2>
                        <div className={styles.signin}>
                            Already have an account ?
                        <button className={styles.button}>SignIn</button>
                        </div>
                        <div className={styles.signup}>
                        New to GamEcho? Create an account
                        <button className={styles.button}>SignUp</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Welcome;