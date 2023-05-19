import {makeAutoObservable} from 'mobx'

export default class NavState {
    textColor = 'black'
    purpleColor = '#3A36DB'

    constructor() {
        this.navClose = false
        this.darkMode = false
        makeAutoObservable(this)
    }

    setNavClose(bool) {
        this.navClose = bool
    }

    setDarkMode(bool) {
        this.darkMode = bool
        if (bool) {
            this.textColor = 'white'
            this.purpleColor = '#605CFF'
        } else {
            this.textColor = 'black'
            this.purpleColor = '#3A36DB'
        }
    }
}