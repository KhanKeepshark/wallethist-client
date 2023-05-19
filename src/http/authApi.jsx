import { $host } from "."

export const registration = async (name, password) => {
    return await $host.post('user/registration', {name, password, role: 'USER'})
}

export const login = async (name, password) => {
    return await $host.post('user/login', {name, password})
}

export const logout = async () => {
    return await $host.post('user/logout')
}