import { faMagnifyingGlass, faPlus, faEdit, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { fetchCategory, updateCategory, createCategory, deleteCategory } from '../../../../http/categoryApi'
import styles from './Category.module.scss'

export const Category = ({budgetId}) => {
    
    const [dbUpdate, setDbUpdate] = useState(false)
    const [DataList, setDataList] = useState([])
    const [active, setActive] = useState(false)

    useEffect(()=> {
        fetchCategory({BudgetId: budgetId}).then(data => setDataList(data))
        setDbUpdate(false)
    }, [dbUpdate])

    const search = (input) => {
        DataList.map(el => 
            el.name.toLowerCase().search((input).toLowerCase()) == -1 ? 
            el.hide = true : el.hide = false
        )
        setDataList([...DataList])
    }

    const changeEdit = (el, status) => {
        const currentEl = DataList.find(e => e.id == el.id)
        currentEl.edit = status
        setDataList([...DataList])
        setActive(false)
    }

    const changeElName = (name, el) => {
        const currentEl = DataList.find(e => e.id == el.id)
        currentEl.name = name
        currentEl.edit = true
        if (currentEl.status != 'create') currentEl.status = 'update'
        setDataList([...DataList])
    }

    const deleteElFromList = (el) => {
        const currentEl = DataList.find(e => e.id == el.id)
        currentEl.status = 'delete'
        setDataList([...DataList])
        setActive(false)
    }

    const createNewEl = () => {
        DataList.push({
            name: 'NewCategory',
            status: 'create',
            id: Math.random()
        })
        setDataList([...DataList])
    }

    const submitElChange = () => {
        DataList.map(el => {
            el.status == 'update' && updateCategory({id: el.id, name: el.name})
            el.status == 'create' && createCategory({name: el.name, BudgetId: budgetId})
            el.status == 'delete' && deleteCategory(el.id)
        })
        setDbUpdate(true)
        setActive(true)
    }

    return (
        <div className={styles.budget}>
            <span className={styles.title}>Категория</span>
            <div className={styles.budgetCard}>
                <div className={`${styles.notification} ${active && styles.active}`}>
                    <FontAwesomeIcon icon={faCheck} />
                </div>
                <div className={styles.list}>
                    <div className={styles.search}>
                        <input type="text" onChange={e => search(e.target.value)}/>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <div className={styles.items}>
                    {DataList.map(el => el.status != 'delete' && !el.hide ?
                        <div 
                            className={`
                                ${styles.item} 
                                ${el.edit && styles.edit} 
                                ${el.status === 'delete' && styles.delete}
                            `} 
                            key={el.id}
                        >
                            <input 
                                readOnly={!el.edit} 
                                type='text'
                                value={el.name} 
                                onChange={e => changeElName(e.target.value, el)} 
                            />
                            <div className={styles.icons}>
                                <FontAwesomeIcon icon={faEdit} onClick={e => changeEdit(el, el.edit ? false : true)}/>
                                <FontAwesomeIcon icon={faXmark} onClick={e => deleteElFromList(el)} />
                            </div>
                        </div>
                        : null
                    )} 
                    <div className={styles.addNew}>
                        <FontAwesomeIcon icon={faPlus} onClick={createNewEl}/>
                    </div>
                    </div>
                </div>
                <div className={styles.submit} onClick={submitElChange}>Сохранить</div>
            </div>
        </div>
    )
}