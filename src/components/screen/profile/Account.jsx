import { useEffect, useState } from 'react'
import { updateUsers } from '../../../http/userApi'
import { AccDropdown } from './accDropdown'
import styles from './Account.module.scss'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Account = ({user, setNewUserData}) => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(false)
    }, [username, email, oldPassword, password])

    const changeUserData = () => {
        const userUpdateData = {
            id: user.userId, 
            name: username,
            email: email,
            oldPassword: oldPassword,
            password: password
        }
        Object.keys(userUpdateData).forEach(e => {
            if (userUpdateData[e] == '') {
                delete userUpdateData[e]
            }
        })
        updateUsers(userUpdateData)
        setNewUserData(username, email)
        setActive(true)
    }

    return (
        <div className={styles.account}>
            <span>Имя пользователя</span>
            <input type="text" placeholder={user.username} value={username}
                onChange={e=> setUsername(e.target.value)}
            />
            <span>Email</span>
            <input type="text" placeholder={!user.userEmail ? 'Вы не указали email' : user.userEmail} value={email}
                onChange={e=> setEmail(e.target.value)}
            />
            <span>Пароль</span>
            <input type="password" placeholder={'Введите старый пароль'} value={oldPassword}
                onChange={e=> setOldPassword(e.target.value)}
            />
            <input type="password" placeholder={'Введите новый пароль'} value={password}
                onChange={e=> setPassword(e.target.value)}
            />
            <span>Текущий бюджет</span>
            <AccDropdown />
            <div className={styles.submit} onClick={changeUserData}>Сохранить
                <div className={`${styles.notification} ${active && styles.active}`}>
                        <FontAwesomeIcon icon={faCheck} />
                </div>
            </div>
        </div>
    )
}