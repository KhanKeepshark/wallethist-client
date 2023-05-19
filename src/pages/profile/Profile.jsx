import styles from './Profile.module.scss'
import Sidebar from '../../components/screen/sidebar/Sidebar'
import { Account } from '../../components/screen/profile/Account'
import { useContext, useEffect, useState } from 'react'
import { Budget } from '../../components/screen/profile/Budget/Budget'
import { Context } from '../../main'
import { observer } from 'mobx-react-lite'
import { Wallet } from '../../components/screen/profile/Wallet/Wallet'
import { Category } from '../../components/screen/profile/Category/Category'
import { fetchUsers, updateUsers } from '../../http/userApi'

export const Profile = observer(() => {

    const {store} = useContext(Context)
    const [settingPage, setSettingPage] = useState('Account')
    const [dbUpdate, setDbUpdate] = useState(false)
    const [userData, setUserData] = useState({})

    useEffect(() => {
        fetchUsers({
            id: store._user.userId
        }).then(data => setUserData(data))
        setDbUpdate(false)
    }, [dbUpdate])

    const setNewUserData = (name, email) => {
        name ? userData.username = name : null
        email ? userData.userEmail = email : null
        setUserData(userData)
        setDbUpdate(true)
    }

    const selectImg = (img) => {
        const formData = new FormData()
        formData.append('img', img[0])
        formData.append('id', store._user.userId)
        updateUsers(formData)
        setDbUpdate(true)
    }

    return (
        <div className={styles.body}>
            <Sidebar activeNav={3}/>
            <div className={styles.profile}>
                <div className={styles.profileCard}>
                    <div className={styles.left}>
                        <div className={styles.top}>
                            <div className={styles.img}>
                                <img 
                                    id="accImg"
                                    src={import.meta.env.VITE_SERVER_URL + userData.img} 
                                />
                                <label htmlFor="imgEdit">Изменить</label>
                                <input type="file" id='imgEdit' hidden onChange={e => selectImg(e.target.files)}/>
                            </div>
                            <span>{store._user.username}</span>
                        </div>
                        <div className={styles.btns}>
                            <li 
                                onClick={e => setSettingPage('Account')} 
                                className={settingPage == 'Account' && `${styles.activeBtn}`} 
                            >Пользователь</li>
                            <li 
                                onClick={e => setSettingPage('Budget')}
                                className={settingPage == 'Budget' && `${styles.activeBtn}`} 
                            >Бюджет</li>
                            <li 
                                onClick={e => setSettingPage('Wallet')}
                                className={settingPage == 'Wallet' && `${styles.activeBtn}`} 
                            >Кошелек</li>
                            <li 
                                onClick={e => setSettingPage('Category')}
                                className={settingPage == 'Category' && `${styles.activeBtn}`} 
                            >Категория</li>
                        </div>
                    </div>
                    <div className={styles.settings}>
                        {settingPage === 'Account' && <Account user={userData} setNewUserData={setNewUserData} />}
                        {settingPage === 'Budget' && <Budget userId={store._user.userId}/>}
                        {settingPage === 'Wallet' && <Wallet budgetId={store._budget.id}/>}
                        {settingPage === 'Category' && <Category budgetId={store._budget.id}/>}
                    </div>
                </div>
            </div>
        </div>
    )
})