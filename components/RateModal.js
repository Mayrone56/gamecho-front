import styles from '../styles/RateModal.module.css'
import Image from 'next/image';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'moment/locale/fr';
import { addRate } from '../reducers/rating';
const moment = require("moment");
moment.locale('fr')

function RateModal() {
  const dispatch = useDispatch()
  const urlAvatar = useSelector((state) => state.user.value.avatar);
  const user = useSelector((state) => state.user.value);
  const [newReview, setNewReview] = useState("")

  const date = moment().format('L');


  const handleInputChange = (e) => {
    if (newReview.length <= 299 || e.nativeEvent.inputType === 'deleteContentBackward') {
      setNewReview(e.target.value)
    }
  };



  return (
    <div className={styles.container}>
      <h2> How much did you like it?</h2>
      <div className={styles.iconContainer}>
        <Image className={styles.emoji}
          src="/icons/emojiIcons/angry.svg"
          alt="Love emoji"
          width={50}
          height={50}
        />
        <Image className={styles.emoji}
          src="/icons/emojiIcons/sad.svg"
          alt="Love emoji"
          width={50}
          height={50}
        />
        <Image className={styles.emoji}
          src="/icons/emojiIcons/neutral.svg"
          alt="Love emoji"
          width={50}
          height={50}
        />
        <Image className={styles.emoji}
          src="/icons/emojiIcons/happy.svg"
          alt="Love emoji"
          width={50}
          height={50}
        />
        <Image className={styles.emoji}
          src="/icons/emojiIcons/love.svg"
          alt="Love emoji"
          width={50}
          height={50}
        />
      </div>
      <div>
        <p>Your review</p>
        <textarea type="text" placeholder='Add a review (optional)' className={styles.input} onChange={(e) => handleInputChange(e)} value={newReview}></textarea>
        <p>{newReview.length}/300 </p>
      </div>
      <div className={styles.bottomContainer}>
        <Image src="/icons/emojiIcons/angry.svg" alt="Avatar" width={32} height={32} className={styles.avatar} />
        <p>RATED BY {user.username} ON {date}</p>
        {/* Au click sur le bouton, nous enregistrons le   */}
        <div>
          <button className={styles.submitbutton} onClick={(dispatch(addRate))}>SUBMIT</button>
        </div>
      </div>

    </div>

  )

}


export default RateModal;