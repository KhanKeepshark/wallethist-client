import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { Context } from "../../main"
import { authRoutes, publicRoutes } from "./routes"


const AppRouter = observer(() => {
    const {store} = useContext(Context)
    return (
        <Routes>
            {store._isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
        </Routes>

    )
})

export default AppRouter