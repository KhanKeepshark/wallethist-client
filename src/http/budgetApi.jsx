import { $authHost } from "."

export const createBudget = async (attrs) => {
    const {data} = await $authHost.post('budget', attrs)
    return data
}

export const fetchBudget = async (filter) => {
    const {data} = await $authHost.get('budget?' + new URLSearchParams(filter))
    return data
}

export const updateBudget = async (attrs) => {
    const {data} = await $authHost.put('budget', attrs)
    return data
}

export const deleteBudget = async (id) => {
    const {data} = await $authHost.delete('budget/' + id)
    return data
}