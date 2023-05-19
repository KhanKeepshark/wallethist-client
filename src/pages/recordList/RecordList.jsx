import Sidebar from "../../components/screen/sidebar/Sidebar"
import styles from './RecordList.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight, faFileCirclePlus, faMagnifyingGlass, faSortDown } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useRef, useState } from "react"
import Papa from 'papaparse'
import { fetchRecords, importCsv } from "../../http/recordAPI"
import { RecordForm } from "../../components/screen/recordList/RecordForm"
import { Context } from "../../main"
import { observer } from "mobx-react-lite"
import { List } from "../../components/screen/recordList/list/List"

export const RecordList = observer(() => {

    const [isClose, setIsClose] = useState(true)
    const [topBtnClose, setTopBtnClose] = useState(true)
    const [records, setRecords] = useState([])
    const [recordsCount, setRecordsCount] = useState()
    const [searchText, setSearchText] = useState()
    const [searchAttr, setSearchAttr] = useState(['', ''])
    const [searchReq, setSearchReq] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const topBtnRef = useRef()
    const {navState, store} = useContext(Context)
    const [dbUpdate, setDbUpdate] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!topBtnRef.current.contains(event.target)) {
                setTopBtnClose(true)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    useEffect(()=> {
        fetchRecords({page: currentPage, budgetId: store._budget.id, ...searchReq}).then(data => {
            setRecords(data.record)
            setRecordsCount(~(data.count/10)*-1)
            if (data.count + 10 < currentPage*10) {
                setCurrentPage(1)
            }
        })
        setDbUpdate(false)
    }, [currentPage, searchReq, dbUpdate])

    const csvRead = (event) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const first_row_data = Object.keys(results.data[0])
                const validHeaders = ['wallet', 'category', 'date', 'money']
                let valid = true
                validHeaders.map(e => {
                    if (first_row_data.indexOf(e) == -1) return valid = false
                })
                if (!valid) return alert('wrong csv form')
                importCsv([{budget: store._budget.id}, results.data])
            }
        })
        setDbUpdate(true)
    }

    const csvSave = () => {
        fetchRecords({budgetId: store._budget.id}).then(data => {
            data.map(e => {
                delete e.BudgetId
                delete e.createdAt
                delete e.id
                delete e.updatedAt
            })
            const csv = Papa.unparse({
                data
            });
            const blob = new Blob([csv])
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob)
            a.download = 'Данные.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        })
    }

    const changePage = (page) => {
        if (page >= 1 && page <= recordsCount) {
            setCurrentPage(Number(page))
        }
    }

    return (
        <div className={styles.flex}>
            <Sidebar activeNav={2} />
            <section className={styles.recordList}>
                <div className={styles.top}>
                    <div className={styles.title}>
                        Список записей
                    </div>
                    <div className={styles.flex}>
                        <div className={styles.search}>                          
                            <input type="text" placeholder={searchAttr[1]} onChange={e => setSearchText(e.target.value)}/>
                            <FontAwesomeIcon icon={faMagnifyingGlass} 
                            onClick={() => {setSearchReq({[searchAttr[0]]:searchText})}}/>
                        </div>
                        <div className={`${styles.topBtn} ${!isClose && styles.btnDis}`}>
                            <div className={styles.newRecord} onClick={() => {setIsClose(!isClose)}}>
                                <div className={styles.icon}>
                                    <FontAwesomeIcon icon={faFileCirclePlus} />
                                </div>
                                <span>Новая запись</span>
                            </div>
                            <div className={styles.dropDownBtn} onClick={() => {setTopBtnClose(false)}}>
                                    <FontAwesomeIcon icon={faSortDown} />
                            </div>
                            <div 
                            className={`${styles.dropDown} ${topBtnClose && styles.btnDis}`} 
                            onClick={() => {setTopBtnClose(true)}} ref={topBtnRef}
                            >
                                <label className={styles.item} htmlFor='csv'>Импорт CSV</label>
                                <div className={styles.item} onClick={csvSave} >Экспорт CSV</div>
                                <input type="file" id="csv" accept=".csv" onChange={csvRead} hidden/>
                            </div>
                        </div>
                    </div>
                </div>
                <List
                    records={records}
                    setSearchAttr={setSearchAttr}
                    setDbUpdate={setDbUpdate}
                />
                <div className={styles.recordPages}>
                    <div onClick={e => changePage(currentPage - 1)}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <div 
                        className={`${styles.pageItem} ${currentPage == 1 && styles.active}`}  
                        onClick={e => changePage(e.target.innerText)}
                    >1</div>
                    {currentPage > 2 && <div>...</div>}
                    {recordsCount > 1 && <div 
                        className={`${styles.pageItem} ${currentPage != 1 && currentPage != recordsCount &&  styles.active}`} 
                        onClick={e => changePage(e.target.innerText)}
                    >{
                        currentPage != 1 ?
                        currentPage != recordsCount ? currentPage : currentPage - 1
                        : currentPage + 1
                    }</div>}
                    {currentPage < recordsCount - 1 && <div>...</div>}
                    {recordsCount > 2 && <div 
                        className={`${styles.pageItem} ${currentPage == recordsCount && styles.active}`} 
                        onClick={e => changePage(e.target.innerText)}
                    >{recordsCount}</div>}
                    <div onClick={e => changePage(currentPage + 1)}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div>
            </section>
            <RecordForm 
                darkMode={navState.darkMode} 
                setIsClose={setIsClose} 
                isClose={isClose}
                setDbUpdate={setDbUpdate}
            />
        </div>
    )
})