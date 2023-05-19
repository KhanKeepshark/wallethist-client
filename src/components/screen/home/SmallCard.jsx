import styles from './SmallCard.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons'


export const SmallCard = (props) => {
    
    return (
        <div className={styles.box}>
            <FontAwesomeIcon icon={faMagnifyingGlassChart}></FontAwesomeIcon>
            <div className={styles.textBox}>
              <span className={styles.number}>{props.post.number}</span>
              <span className={styles.text}>{props.post.text}</span>
            </div>
        </div>
    )
}