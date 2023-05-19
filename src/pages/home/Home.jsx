import styles from './Home.module.scss'
import Sidebar from '../../components/screen/sidebar/Sidebar'
import { SmallCard } from '../../components/screen/home/SmallCard'
import { BarChart } from '../../components/screen/home/BarChart'
import { PieChart } from '../../components/screen/home/PieChart'
import { useContext, useEffect, useState } from 'react'
import { fetchRecords } from '../../http/recordAPI'
import { DateSwitch } from '../../components/screen/home/DateSwitch'
import { Context } from '../../main'

export const Home = () => {
    const d = new Date();
    const [month, setMonth] = useState(d.getMonth() + 1)
    const [records, setRecords] = useState([])
    const {store} = useContext(Context)
    
    useEffect(()=> {
        fetchRecords({timeSettings: '2023' + month, budgetId: store._budget.id}).then(data => {
            setRecords(data)
        })
    }, [month])

    let money = 0
    let days = records.length ? Number(records.slice(-1)[0].date.slice(8, 10)) : 0
    records.map(e => money = money + e.money)
    const average = records.length ? Math.round(money/days) : 0

    const walletAndMoney = {}
    records.map(e => {
      if (Object.keys(walletAndMoney).includes(e.wallet)) {
        const sum = walletAndMoney[e.wallet] + e.money
        return walletAndMoney[e.wallet] = sum
      }
      walletAndMoney[e.wallet] = e.money
    })

    const dateAndMoney = {}
    records.map(e => {
        if (Object.keys(dateAndMoney).includes(e.date)) {
        const sum = dateAndMoney[e.date] + e.money
        return dateAndMoney[e.date] = sum
        }
        dateAndMoney[e.date] = e.money
    })

    let topSpends = []
    let arr = []
    records.map(e => arr.push(e.money))
    for (let i = 0; i < 3; i++) topSpends = [...topSpends, ...arr.splice(arr.indexOf(Math.max(...arr)), 1)]
    let topSpendsRecords = []
    topSpends.forEach(i => topSpendsRecords = [...topSpendsRecords, ...records.filter(e => e.money == i)])
    
    return (
        <div className={styles.body}>
            <Sidebar activeNav={1}/>
            <section className={styles.dashboard}>
                <div className={styles.topTitle}>
                    Общие данные
                </div>
                <div className={styles.boxes}>
                    <SmallCard post={{number: average, text: 'Затрат в день'}} />
                    <SmallCard post={{number: money, text: 'Всего затрат'}} />
                    <SmallCard post={{number: store._budget.limit-money, text: 'Остаток денег'}} />
                </div>
                <div className={styles.charts}>
                    <div className={styles.barChart}>
                        <div className={styles.settings}>
                            <span>График за месяц</span>
                            <DateSwitch setMonth={setMonth} currentMonth={month}/>
                        </div>
                        <div className={styles.chartBox}>
                            <BarChart records={records} />
                        </div>
                    </div>
                    <div className={styles.pieChart}>
                        <PieChart records={records}/>
                    </div>
                </div>
                <div className={styles.activity}>
                    <div className={styles.lastActivity}>
                        <div className={`${styles.data} ${styles.topData}`}>
                            <span>Категория</span>
                            <span>Деньги</span>
                            <span>Кошелек</span>
                            <span>Дата</span>
                        </div>
                        {topSpendsRecords.map(e =>
                            <div className={`${styles.data} ${styles.categories}`}>
                                <span>{e.category}</span>
                                <span>{e.money}</span>
                                <span>{e.wallet}</span>
                                <span>{e.date}</span>
                            </div>
                        )}
                    </div>
                    <div className={styles.topActivity}>
                        <div className={styles.title}>Доля Кошелка</div>
                        <div className={`${styles.data} ${styles.topData}`}>
                            <span>Кошелек</span>
                            <span>Сумма</span>
                        </div>
                        {Object.keys(walletAndMoney).map(e => 
                            <div className={styles.data}>
                                <span>{e}</span>
                                <span>{walletAndMoney[e]}</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

