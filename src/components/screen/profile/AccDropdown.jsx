import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../../main'
import styles from './AccDropdown.module.scss'
import { fetchBudget } from '../../../http/budgetApi'
import { updateUsers } from '../../../http/userApi'


export const AccDropdown = () => {
    
    const [isActive, setIsActive] = useState(false)
    const {store} = useContext(Context)
    const dropDownRef = useRef()
    const [budgetList, setBudgetList] = useState([])
    const [currentBudget, setCurrentBudget] = useState('')
    const [dbUpdate, setDbUpdate] = useState(false)

    useEffect(() => {
        const handleOutside = (event) => {
            setIsActive(false)
        }
        dropDownRef.current.addEventListener("mouseleave", handleOutside)
    }, [])

    useEffect(()=> {
        fetchBudget({UserId: store._user.userId}).then(data => {
            setBudgetList(data)
            setCurrentBudget(data.find(e => e.id == store._budget.id))
        })
        setDbUpdate(false)
    }, [dbUpdate])

    const changeCurrentBudget = (elem) => {
        updateUsers({id: store._user.userId, lastBudget: elem.id})
        store.setBudget(elem)
        setCurrentBudget(elem)
        setIsActive(false)
    }
    
    return (
        <div className={styles.dropdownList} ref={dropDownRef}>
            <div className={styles.dropdownBtn} onClick={() => setIsActive(!isActive)} >
                {currentBudget.name}
                <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <div className={`${styles.content} ${isActive && styles.active}`}>
                {budgetList.map(el => 
                    <div className={styles.item} onClick={e => changeCurrentBudget(el)}>{el.name}</div>
                )}
            </div>
        </div>
    )
}