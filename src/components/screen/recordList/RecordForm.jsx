import { useContext, useEffect, useRef, useState } from 'react'
import { fetchCategory } from '../../../http/categoryApi'
import { createRecord } from '../../../http/recordAPI'
import { fetchWallet } from '../../../http/walletApi'
import { Context } from '../../../main'
import { DropdownSelect } from './DropdownSelect'
import styles from './RecordForm.module.scss'

export const RecordForm = ({darkMode, isClose, setIsClose, setDbUpdate}) => {

    const recordFormRef = useRef()
    const [categoryList, setCategoryList] = useState([])
    const [walletList, setWalletList] = useState([])
    const {store} = useContext(Context)
    const [newRecordData, setNewRecordData] = useState({BudgetId: store._budget.id, description: 'Пусто'})

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!recordFormRef.current.contains(event.target)) {
                setIsClose(true)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    useEffect(()=> {
        fetchCategory({BudgetId: store._budget.id}).then(data => {
            setCategoryList(data)
        })
        fetchWallet({BudgetId: store._budget.id}).then(data => {
            setWalletList(data)
        })
    }, [])

    const setDropdown = (key, value) => {
        newRecordData[key] = value
        setNewRecordData({...newRecordData})
    }

    const createNewRecord = () => {
        if (newRecordData.description === '') {
            newRecordData.description = 'Пусто'
        }
        let validNewRecord = Object.values(newRecordData).filter(e => e != '')
        if (validNewRecord.length === 6) {
            console.log('Не заполнены все поля')
            createRecord(newRecordData)
            return setDbUpdate(true)
        }
        console.log('Не заполнены все поля')
    }

    return (
        <div className={`${styles.recordForm} ${isClose && styles.close}`} ref={recordFormRef}>
            <div className={styles.title}>
                    Добавить запись
            </div>
            <div className={styles.formData}>
                <label>Категория</label>
                <DropdownSelect 
                    dataList={categoryList} 
                    dataKey='category'
                    set={setDropdown}
                />
                <label>Сумма</label>
                <input type='number'
                    onChange={ e => {
                        newRecordData.money = e.target.value
                        setNewRecordData({...newRecordData})
                    }}
                />
                <label>Кошелек</label>
                <DropdownSelect 
                    dataList={walletList}
                    dataKey='wallet'
                    set={setDropdown} 
                />
                <label>Дата</label>
                <input style={{colorScheme: `${darkMode && 'dark'}`}} type='date'
                    onChange={ e => {
                        newRecordData.date = e.target.value
                        setNewRecordData({...newRecordData})
                    }}
                />
                <label>Описание</label>
                <input type='text'
                    onChange={ e => {
                        newRecordData.description = e.target.value
                        setNewRecordData({...newRecordData})
                    }}
                />
                <div className={styles.btn} onClick={createNewRecord}>Сохранить</div>
            </div>
        </div>
    )
}