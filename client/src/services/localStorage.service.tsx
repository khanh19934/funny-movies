const saveAccessToken = (token: string) => {
    localStorage.setItem("accessToken", token)
}

const saveRefreshToken = (token: string) => {
    localStorage.setItem("refreshToken", token)
}

const getAccessToken = (): string => {
    return localStorage.getItem("accessToken") as string
}

const getRefreshToken = (): string => {
    return localStorage.getItem("refreshToken") as string
}

const clearAllToken = () => {
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
}

export {
    saveAccessToken,
    saveRefreshToken,
    getAccessToken,
    getRefreshToken,
    clearAllToken
}