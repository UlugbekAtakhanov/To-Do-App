

export const getFromLS = (store) => {
    return JSON.parse(localStorage.getItem(store))
}

export const setToLS = (store, data) => {
    return localStorage.setItem(store, JSON.stringify(data))
}

export const clearLS = () => {
    return localStorage.clear()
}