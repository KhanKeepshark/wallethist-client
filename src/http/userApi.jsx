import { $authHost } from "."

export const fetchUsers = async (filter) => {
    const {data} = await $authHost.get('user/getusers?' + new URLSearchParams(filter))
    return data
}

export const updateUsers = async (attrs) => {
    const {data} = await $authHost.put('user/update', attrs)
    return data
}
