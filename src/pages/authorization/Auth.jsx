import styles from './Auth.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../main'
import { HOME_ROUTE } from '../../components/routes/pathConsts'

export const Auth = () => {

    const [show, setShow] = useState(false)
    const [regForm, setRegForm] = useState(false)
    const [error, setError] = useState(false)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const {store} = useContext(Context)
    const navigate = useNavigate()

    const authSubmit = (event) => {
        store.authUser(name, password, regForm, navigate, setError)
        event.preventDefault()
    }

    return (
        <div className={styles.flex}>
            <form className={styles.auth}>
                <label>Логин</label>
                <div className={styles.iconInput}>
                    <input 
                        type='name' 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        minlength="5"
                        required
                    />
                </div>
                <label>Пароль</label>
                <div className={styles.iconInput}>
                    <input 
                        type={show ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        minlength="3"
                        required
                    />
                    <div onClick={() => setShow(!show)}>
                        <FontAwesomeIcon icon={faEye} className={show ? undefined : styles.isClose}/>
                        <FontAwesomeIcon icon={faEyeSlash} className={show ? styles.isClose : undefined}/>
                    </div>
                </div>
                {error && <span>*Неверный логин или пароль</span>}
                <button className={styles.authBtn} onClick={authSubmit}  >
                    {regForm ? 'Зарегистрироваться' : 'Авторизоваться' }
                </button>
                <div className={styles.authSwitch}>
                    {regForm ? 'Есть аккаунт?' :  'Нету аккаунта?'} 
                    <span onClick={e => setRegForm(!regForm)}>{regForm ? 'Авторизоваться' :  'Регистрация'}</span>
                </div>
                <div className={styles.testacc}>Тестовый аккаунт <br />Логин и пароль: login</div>
            </form>
            <div className={styles.mainPageBg}>
                <img src="mainPageBg.png" alt="mainPageBg" />
            </div>
        </div>
    )
}
   