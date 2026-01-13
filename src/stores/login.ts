import { createStore } from 'zustand/vanilla'

export type LoginState = {
    isLoggedIn: boolean
    coolifyId?: string
    plausableId?: string
}

export type LoginActions = {
    login: ({ coolifyId, plausableId }: { coolifyId: string, plausableId: string }) => void
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
        login: ({ coolifyId, plausableId }) => {
            set(() => ({ isLoggedIn: true, coolifyId: coolifyId, plausableId: plausableId }));
        },
        logout: () => set(() => ({ isLoggedIn: false })),
    }))
}