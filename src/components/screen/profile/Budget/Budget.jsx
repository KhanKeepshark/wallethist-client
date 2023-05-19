import { faMagnifyingGlass, faPlus, faEdit, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { createBudget, deleteBudget, fetchBudget, updateBudget } from '../../../../http/budgetApi'
import styles from './Budget.module.scss'

export const Budget = ({userId}) => {
    
    const [dbUpdate, setDbUpdate] = useState(false)
    const [budgetList, setBudgetList] = useState([])
    const [active, setActive] = useState(false)

    useEffect(()=> {
        fetchBudget({UserId: userId}).then(data => setBudgetList(data))
        setDbUpdate(false)
    }, [dbUpdate])

    const budgetSearch = (input) => {
        budgetList.map(budget => 
            budget.name.toLowerCase().search((input).toLowerCase()) == -1 ? 
            budget.hide = true : budget.hide = false
        )
        setBudgetList([...budgetList])
    }

    const changeEdit = (budget, status) => {
        const el = budgetList.find(e => e.id == budget.id)
        el.edit = status
        setBudgetList([...budgetList])
        setActive(false)
    }

    const changeBudgetName = (name, budget) => {
        const el = budgetList.find(e => e.id == budget.id)
        el.name = name
        el.edit = true
        if (el.status != 'create') el.status = 'update'
        setBudgetList([...budgetList])
    }

    const changeBudgetLimit = (limit, budget) => {
        const el = budgetList.find(e => e.id == budget.id)
        el.limit = limit
        el.edit = true
        if (el.status != 'create') el.status = 'update'
        setBudgetList([...budgetList])
    }

    const deleteBudgetFromList = (budget) => {
        const el = budgetList.find(e => e.id == budget.id)
        el.status = 'delete'
        setBudgetList([...budgetList])
        setActive(false)
    }

    const createNewBudget = () => {
        budgetList.push({
            name: 'NewBudget',
            limit: 100000,
            status: 'create',
            id: Math.random()
        })
        setBudgetList([...budgetList])
    }

    const submitBudgetChange = () => {
        budgetList.map(budget => {
            budget.status == 'update' && updateBudget({id: budget.id, name: budget.name, limit: budget.limit})
            budget.status == 'create' && createBudget({name: budget.name, UserId: userId, limit: budget.limit})
            budget.status == 'delete' && deleteBudget(budget.id)
        })
        setActive(true)
        setDbUpdate(true)
    }

    return (
        <div className={styles.budget}>
            <span className={styles.title}>Бюджет</span>
            <div className={styles.budgetCard}>
                <div className={`${styles.notification} ${active && styles.active}`}>
                    <FontAwesomeIcon icon={faCheck} />
                </div>
                <div className={styles.list}>
                    <div className={styles.search}>
                        <input type="text" onChange={e => budgetSearch(e.target.value)}/>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <div className={styles.items}>
                    {budgetList.map(budget => budget.status != 'delete' && !budget.hide ?
                        <div 
                            className={`
                                ${styles.item} 
                                ${budget.edit && styles.edit} 
                                ${budget.status === 'delete' && styles.delete}
                            `} 
                            key={budget.id}
                        >
                            <input 
                                readOnly={!budget.edit} 
                                type='text'
                                value={budget.name} 
                                onChange={e => changeBudgetName(e.target.value, budget)} 
                            />
                            <div className={styles.icons}>
                                <FontAwesomeIcon icon={faEdit} onClick={e => changeEdit(budget, budget.edit ? false : true)}/>
                                <FontAwesomeIcon icon={faXmark} onClick={e => deleteBudgetFromList(budget)} />
                            </div>
                            <div className={styles.limit}>
                                <span>Limit: </span>
                                <input 
                                    readOnly={!budget.edit}
                                    value={budget.limit}
                                    type="number"
                                    onChange={e => changeBudgetLimit(e.target.value, budget)} 
                                /> 
                            </div>
                        </div>
                        : null
                    )} 
                    <div className={styles.addNew}>
                        <FontAwesomeIcon icon={faPlus} onClick={createNewBudget}/>
                    </div>
                    </div>
                </div>
                <div className={styles.submit} onClick={submitBudgetChange}>Сохранить</div>
            </div>
        </div>
    )
}