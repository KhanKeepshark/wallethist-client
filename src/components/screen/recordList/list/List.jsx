import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Record } from "./Record"
import styles from './List.module.scss'
import { deleteRecord } from "../../../../http/recordAPI"


export const List = ({records, setSearchAttr, setDbUpdate}) => {

    const [checkAll, setCheckAll] = useState(false)
    const [checkList, setCheckList] = useState([])

    useEffect(()=> {
        if (checkList.length === 10) {
            setCheckAll(true)
        } else {
            setCheckAll(false)
        }
    }, [checkList])

    const fullCheckList = () => {
        setCheckAll(!checkAll)
        if (!checkAll) {
            setCheckList(records)
        } else {
            setCheckList([])
        }
    }

    const addCheckList = (post) => {
        setCheckList([...checkList, post])
    }

    const removeCheckList = (post) => {
        setCheckList(checkList.filter(e => e.id !== post.id))
        setCheckAll(false)
    }

    const deleteCheckedRecords = () => {
        checkList.map(e => deleteRecord(e.id))
        setCheckList([])
        setCheckAll(false)
        setDbUpdate(true)
    }

    return (
        <div className={styles.list}>
            <div className={styles.heading}>
                <div 
                className={`${styles.checkbox} ${checkAll && styles.check}`} 
                onClick={fullCheckList}
                ><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></div>
                <span onClick={e => setSearchAttr(['category', e.target.innerText])}>Категория</span>
                <span onClick={e => setSearchAttr(['money', e.target.innerText])}>Сумма</span>
                <span onClick={e => setSearchAttr(['wallet', e.target.innerText])}>Кошелек</span>
                <span onClick={e => setSearchAttr(['date', e.target.innerText])}>Дата</span>
                <FontAwesomeIcon icon={faTrash} className={styles.trashIcon} onClick={deleteCheckedRecords} />
            </div>
            {records.length ? records.map(record => 
                <Record 
                    key={record.id} 
                    post={record} 
                    checked={checkList.find(e => e === record ? true : false)}  
                    add={addCheckList} 
                    remove={removeCheckList}
                    setDbUpdate={setDbUpdate}
                />
            ): <div className={styles.empty}>Пусто</div>
            }
        </div>
    )
}