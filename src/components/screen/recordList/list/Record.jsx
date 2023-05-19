import styles from './Record.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useRef, useState, useEffect } from 'react'
import { deleteRecord } from '../../../../http/recordAPI'


export const Record = ({post, add, remove, checked, setDbUpdate}) => {

    const [check, setCheck] = useState(false)
    const [isClose, setIsClose] = useState(true)
    const settingRef = useRef()

    useEffect(() => {
        setCheck(checked)
    }, [checked])
    

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!settingRef.current.contains(event.target)) {
                setIsClose(true)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    const changeCheck = () => {
        setCheck(!check)
        if (!check){
            return add(post)
        }
        return remove(post)
    }

    return (
        <div className={styles.record}>
            <div className={`${styles.checkbox} ${check && styles.check}`} onClick={changeCheck}><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></div>
            <span>{post.category}</span>
            <span>{post.money}</span>
            <span>{post.wallet}</span>
            <span>{post.date.slice(0, 10)}</span>
            <div className={styles.settings} onClick={e => setIsClose(!isClose)} ref={settingRef}>
                <FontAwesomeIcon icon={faEllipsis}/>
                <div className={`${styles.recordSettings} ${isClose && styles.close}`}>
                    <div className={styles.settingItem} onClick={e => {
                        deleteRecord(post.id)
                        setDbUpdate(true)
                    }}>
                        <FontAwesomeIcon icon={faTrash}/>
                        <span>Удалить</span>
                    </div>
                </div>
            </div>
        </div>
    )
}