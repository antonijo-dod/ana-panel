import { type ReactNode, createContext, useState, useContext } from 'react'
import { useStore } from 'zustand'

import { type LoginStore, createLoginStore } from '@/stores/login'

export type LoginStoreApi = ReturnType<typeof createLoginStore>

export const LoginStoreContext = createContext<LoginStoreApi | undefined>(
    undefined,
)

export interface LoginStoreProviderProps {
    children: ReactNode
}

export const LoginStoreProvider = ({
    children,
}: LoginStoreProviderProps) => {
    const [store] = useState(() => createLoginStore())
    return (
        <LoginStoreContext.Provider value={store}>
            {children}
        </LoginStoreContext.Provider>
    )
}

export const useLoginStore = <T,>(
    selector: (store: LoginStore) => T,
): T => {
    const loginStoreContext = useContext(LoginStoreContext)
    if (!loginStoreContext) {
        throw new Error(`useLoginStore must be used within LoginStoreProvider`)
    }

    return useStore(loginStoreContext, selector)
}