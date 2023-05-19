import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import styles from './DropdownSelect.module.scss'

export const DropdownSelect = ({dataList, set, dataKey}) => {

    const [isActive, setIsActive] = useState(false)
    const [select, setSelect] = useState(dataList.length ? dataList[0].name : 'Пусто')
    const dropDownRef = useRef()

    useEffect(() => {
        const handleOutside = (event) => {
            setIsActive(false)
        }
        dropDownRef.current.addEventListener("mouseleave", handleOutside)
    }, [])

    useEffect(() => {
        if (select != 'Пусто') {
            set(dataKey, select)
        }
    }, [select])
    
    return (
        <div className={styles.dropdownList} ref={dropDownRef}>
            <div className={styles.dropdownBtn} onClick={() => setIsActive(!isActive)} >{select}<FontAwesomeIcon icon={faCaretDown} /></div>
            <div className={`${styles.content} ${isActive && styles.active}`}>
                {dataList.map(e =>
                    <div key={e.id} className={styles.item} onClick={(e) => {
                        setIsActive(false)
                        setSelect(e.target.textContent)
                    }}>{e.name}</div>
                )}
            </div>
        </div>
    )
}