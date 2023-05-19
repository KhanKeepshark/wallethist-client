import axios from 'axios'
import {makeAutoObservable} from 'mobx'
import { HOME_ROUTE } from '../components/routes/pathConsts'
import { login, registration, logout } from '../http/authApi'

export default class Store {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._budget = ''
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    setBudget(budget) {
        this._budget = budget
    }

    async authUser(name, password, reg, navigate, setError) {
        try {
            let response
            if (reg) {
                response = await registration(name, password)
            } else {
                response = await login(name, password)
            }
            localStorage.setItem('token', response.data.accessToken)
            this.setIsAuth(true)
            this.setUser(response.data.user)
            this.setBudget(response.data.budget)
            navigate(HOME_ROUTE)
        } catch(e) {
            console.log(e.response.data.message)
            setError(true)
        }
    } 

    async logoutUser() {
        try {
            const response = await logout()
            localStorage.removeItem('token')
            this.setIsAuth(false)
            this.setUser({})
            this.setBudget('')
        } catch(e) {
            console.log(e.response.data.message)
        }
    } 

    async checkAuth() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}user/refresh`, {withCredentials: true})
            this.setIsAuth(true)
            this.setUser(response.data.user)
            this.setBudget(response.data.budget)
        } catch(e) {
            console.log(e.response.data.message)
        }
    }
}