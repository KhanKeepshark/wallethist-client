import styles from './Sidebar.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartColumn, faList, faRightFromBracket, faMoon, faSun, faBars } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../../main'
import { Link } from 'react-router-dom'
import { AUTH_ROUTE, HOME_ROUTE, PROFILE_ROUTE, RECORD_LIST_ROUTE } from '../../routes/pathConsts'
import { observer } from 'mobx-react-lite'

const Sidebar = observer(({activeNav}) => {
    const active = activeNav
    const {navState, store} = useContext(Context)
    const [mobNav, setMobNav] = useState(false)

    useEffect(() => {
        if (navState.darkMode) {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
    }, [navState.darkMode])

    const closeSidebar = (event) => {
        if (event.target === event.currentTarget) {
            navState.setNavClose(!navState.navClose)
        }
    }

    const closeNavbar = e => {
        mobNav ? setMobNav(false) : null
    }

    return (
        
        <nav className={`${styles.sidebar} ${navState.navClose && styles.close} ${mobNav && styles.mobClose}`} onClick={closeNavbar}>
            <header>
                <div className={styles.imageText} >
                    <img className={styles.logoImg} src="logo.png" alt="logo"/>
                </div>
            </header>
            <div className={styles.toggleBlock} onClick={e => setMobNav(true)}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div className={styles.menuBar} onClick={closeSidebar}>
                <div className={styles.menu}>
                    <li className={active === 1 && styles.active}>
                        <Link to={HOME_ROUTE}>
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faChartColumn} />
                            </div>
                            <span>Графики</span>
                        </Link>
                    </li>
                    <li className={active === 2 && styles.active}>
                        <Link to={RECORD_LIST_ROUTE}>
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faList} />
                            </div>
                            <span>Данные</span>
                        </Link>
                    </li>
                </div>
                <div className={styles.bottomMenu}>
                        <li className={`${styles.userLi} ${active === 3 && styles.active}`}>
                            <Link to={PROFILE_ROUTE}>
                                <div className={styles.user}>
                                    <img src="user.png" alt="logo"/>
                                </div>
                                <span>Аккаунт</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => store.logoutUser()} to={AUTH_ROUTE}>
                                <div className={styles.icon}>
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                </div>
                                <span>Выйти</span>
                            </Link>
                        </li>
                        <li onClick={() => navState.setDarkMode(!navState.darkMode)}>
                            <div className={styles.moonSun}>
                                <FontAwesomeIcon icon={faMoon} className={styles.moon}/>
                                <FontAwesomeIcon icon={faSun} className={styles.sun}/>
                            </div>
                            <div className={styles.toggleSwitch}>
                                <span className={styles.switch}></span>
                            </div>
                        </li>
                </div>
            </div>
        </nav>
    )
})

export default Sidebar