import { createStore } from 'zustand/vanilla'

export type LoginState = {
    isLoggedIn: boolean
    coolifyId?: string
}

export type LoginActions = {
    login: ({ coolifyId }: { coolifyId: string }) => void
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
        login: ({ coolifyId }) => {
            set(() => ({ isLoggedIn: true, coolifyId: coolifyId }));
        },
        logout: () => set(() => ({ isLoggedIn: false })),
    }))
}