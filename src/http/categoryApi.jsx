import { $authHost } from "."

export const fetchCategory = async (filter) => {
    const {data} = await $authHost.get('category?' + new URLSearchParams(filter))
    return data
}

export const createCategory = async (attrs) => {
    const {data} = await $authHost.post('category', attrs)
    return data
}

export const updateCategory = async (attrs) => {
    const {data} = await $authHost.put('category', attrs)
    return data
}

export const deleteCategory = async (id) => {
    const {data} = await $authHost.delete('category/' + id)
    return data
}