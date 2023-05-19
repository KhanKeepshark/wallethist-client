import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createContext, useState } from "react"
import Store from "./store/store"
import navState from "./store/navState"

export const Context = createContext(null)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Context.Provider value={{
        navState: new navState(),
        store: new Store()
    }}>
        <App />
    </Context.Provider>
)