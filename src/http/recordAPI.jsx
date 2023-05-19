import { $authHost } from "."

export const importCsv = async (csvData) => {
    const {data} = await $authHost.post('record/csv', csvData)
    return data
}

export const fetchRecords = async (filter) => {
    const {data} = await $authHost.get('record?' + new URLSearchParams(filter))
    return data
}

export const createRecord = async (record) => {
    const {data} = await $authHost.post('record', record)
    return data
}

export const deleteRecord = async (id) => {
    const {data} = await $authHost.delete('record/' + id)
    return data
}