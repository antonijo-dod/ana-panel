import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"

const URL = import.meta.env.VITE_COOLIFY_API

export const coolifyGetAplicationsIdQueryOptions = (id: string) => queryOptions({
    queryKey: ['coolifyAplications', id],
    queryFn: async () => {
        const response = await fetch(`${URL}/api/v1/applications/${id}`, {
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
    }
})

export const useCoolifyGetAplicationsId = (id: string) => {
    const coolifyAplications = useSuspenseQuery(coolifyGetAplicationsIdQueryOptions(id))

    return coolifyAplications
}