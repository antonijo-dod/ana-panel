import { createStore } from 'zustand/vanilla'

export type LoginState = {
    isLoggedIn: boolean
}

export type LoginActions = {
    login: () => void
    logout: () => void
}

export type LoginStore = LoginState & LoginActions

export const defaultInitState: LoginState = {
    isLoggedIn: false,
}

export const createLoginStore = (
    initState: LoginState = defaultInitState,
) => {
    return createStore<LoginStore>()((set) => ({
        ...initState,
        login: () => set(() => ({ isLoggedIn: true })),
        logout: () => set(() => ({ isLoggedIn: false })),
    }))
}