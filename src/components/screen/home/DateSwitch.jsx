import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import styles from './DateSwitch.module.scss'


export const DateSwitch = ({setMonth, currentMonth}) => {
    
    const [isActive, setIsActive] = useState(false)
    const dropDownRef = useRef()

    useEffect(() => {
        const handleOutside = (event) => {
            setIsActive(false)
        }
        dropDownRef.current.addEventListener("mouseleave", handleOutside)
    }, [])

    const setTime = (month) => {
        setMonth(Number(month)+1)
    }

    const month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    
    return (
        <div className={styles.dropdownList} ref={dropDownRef}>
            <div className={styles.dropdownBtn} onClick={() => setIsActive(!isActive)} >{month[currentMonth - 1]}<FontAwesomeIcon icon={faCaretDown} /></div>
            <div className={`${styles.content} ${isActive && styles.active}`}>
                {month.map(e => <div className={styles.item} 
                    onClick={i => setTime(month.indexOf(e))}
                >{e}</div>)}
            </div>
        </div>
    )
}