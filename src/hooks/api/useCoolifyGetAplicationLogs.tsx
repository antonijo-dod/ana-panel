import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"

const URL = import.meta.env.VITE_COOLIFY_API

export const coolifyApplicationLogsQueryOptions = (id: string) => queryOptions({
    queryKey: ['coolifyApplicationLogs', id],
    queryFn: async () => {
        const response = await fetch(`${URL}/api/v1/applications/${id}/logs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_COOLIFY_TOKEN_KEY}`
            },
        })
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.json()
    },
    refetchInterval: 5000,
})

export const useCoolifyApplicationLogs = (id: string) => {

    const coolifyApplicationLogs = useSuspenseQuery(coolifyApplicationLogsQueryOptions(id))

    return coolifyApplicationLogs
}