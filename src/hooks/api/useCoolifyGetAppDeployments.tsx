import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import axiosInstance from "@/hooks/axiosInstance"

const URL = import.meta.env.VITE_COOLIFY_API

export const coolifyGetAppDeploymentsQueryOptions = (id: string) => queryOptions({
    queryKey: ['coolifyDeployments', id],
    queryFn: async () => {
        const response = await axiosInstance.get(`${URL}/api/v1/deployments/applications/${id}`)
        if (response.status !== 200) {
            throw new Error('Network response was not ok')
        }
        return response.data
    },
    refetchInterval: 5000, // Refetch every 5 seconds
})

export const useCoolifyGetAppDeployments = (id: string) => {

    const coolifyDeployments = useSuspenseQuery(coolifyGetAppDeploymentsQueryOptions(id))

    return coolifyDeployments
}