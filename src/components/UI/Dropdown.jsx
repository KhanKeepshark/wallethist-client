import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import styles from './Dropdown.module.scss'

export const Dropdown = () => {

    const [isActive, setIsActive] = useState(false)
    const [select, setSelect] = useState('Категория')
    const dropDownRef = useRef()

    useEffect(() => {
        const handleOutside = (event) => {
            setIsActive(false)
        }
        dropDownRef.current.addEventListener("mouseleave", handleOutside)
    })
    
    return (
        <div className={styles.dropdownList} ref={dropDownRef}>
            <div className={styles.dropdownBtn} onClick={() => setIsActive(!isActive)} >{select}<FontAwesomeIcon icon={faCaretDown} /></div>
            <div className={`${styles.content} ${isActive && styles.active}`}>
                <div className={styles.item}>category1</div>
                <div className={styles.item}>category2</div>
                <div className={styles.item} onClick={(e) => {
                    setIsActive(false)
                    setSelect(e.target.textContent)
                }}>category3</div>
            </div>
        </div>
    )
}