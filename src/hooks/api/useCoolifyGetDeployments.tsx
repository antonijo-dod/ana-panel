import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import axiosCoolifyInstance from "@/hooks/axiosCoolifyInstance"

const URL = import.meta.env.VITE_COOLIFY_API

export const coolifyGetDeploymentsQueryOptions = queryOptions({
    queryKey: ['coolifyDeployments'],
    queryFn: async () => {
        const response = await axiosCoolifyInstance.get(`${URL}/api/v1/deployments`)
        if (response.status !== 200) {
            throw new Error('Network response was not ok')
        }
        return response.data
    },
    refetchInterval: 5000, // Refetch every 5 seconds
})


export const useCoolifyGetDeployments = () => {

    const coolifyDeployments = useSuspenseQuery(coolifyGetDeploymentsQueryOptions)

    return coolifyDeployments
}