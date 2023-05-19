
import { observer } from "mobx-react-lite"
import { useContext, useEffect } from "react"
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./components/routes/AppRouter"
import { Context } from "./main"


const App = () => {
    const {store} = useContext(Context)
    
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    )
}

export default observer(App)