import { type ReactNode, createContext, useContext, useRef } from 'react'
import { useStore } from 'zustand'

import { type LoginStore, createLoginStore } from '@/stores/login'
import { setLoginStore } from '@/hooks/axiosCoolifyInstance'
import { setLoginStore as setPlausableLoginStore } from '@/hooks/axiosPlausableInstance'

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
    const storeRef = useRef<LoginStoreApi>(undefined);

    if (!storeRef.current) {
        const newStore = createLoginStore();
        setLoginStore(newStore);
        setPlausableLoginStore(newStore);
        storeRef.current = newStore;
    }

    return (
        <LoginStoreContext.Provider value={storeRef.current}>
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