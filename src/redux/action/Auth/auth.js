export const auth = (isLoaded, data) => ({
    type: 'AUTH',
    payload: {
        token: data.token,
        authData: data.user
    }
})

export const isLoaded = (isLoaded) => ({
    type: 'IS_LOADED',
    payload: {
        isLoaded: isLoaded
    }
})