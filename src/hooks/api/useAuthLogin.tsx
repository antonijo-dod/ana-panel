import { useMutation } from "@tanstack/react-query"

const URL = import.meta.env.VITE_SERVER_API

// export const coolifyApplicationLogsQueryOptions = (id: string) => queryOptions({
//     queryKey: ['coolifyApplicationLogs', id],
//     queryFn: async () => {
//         const response = await fetch(`${URL}/auth/login`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${import.meta.env.VITE_COOLIFY_TOKEN_KEY}`
//             },
//         })
//         if (!response.ok) {
//             throw new Error('Network response was not ok')
//         }
//         return response.json()
//     },
//     refetchInterval: 5000,
// })

export const useCoolifyApplicationLogs = () => {

    const coolifyApplicationLogs = useMutation({
        mutationFn: async ({ username, password }: { username: string, password: string }) => {
            const response = await fetch(`${URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        },
    })

    return coolifyApplicationLogs
}