import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"

const URL = import.meta.env.VITE_COOLIFY_API

export const coolifyGetDeploymentsQueryOptions = queryOptions({
    queryKey: ['coolifyDeployments'],
    queryFn: async () => {
        const response = await fetch(`${URL}/api/v1/deployments`, {
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
    refetchInterval: 5000, // Refetch every 5 seconds
})


export const useCoolifyGetDeployments = () => {

    const coolifyDeployments = useSuspenseQuery(coolifyGetDeploymentsQueryOptions)

    return coolifyDeployments
}