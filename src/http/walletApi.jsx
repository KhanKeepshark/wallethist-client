import { $authHost } from "."

export const fetchWallet = async (filter) => {
    const {data} = await $authHost.get('wallet?' + new URLSearchParams(filter))
    return data
}

export const createWallet = async (attrs) => {
    const {data} = await $authHost.post('wallet', attrs)
    return data
}

export const updateWallet = async (attrs) => {
    const {data} = await $authHost.put('wallet', attrs)
    return data
}

export const deleteWallet = async (id) => {
    const {data} = await $authHost.delete('wallet/' + id)
    return data
}