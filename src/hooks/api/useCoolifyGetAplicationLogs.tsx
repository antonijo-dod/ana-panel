import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import axiosInstance from "@/hooks/axiosInstance"

const URL = import.meta.env.VITE_COOLIFY_API

export const coolifyApplicationLogsQueryOptions = (id: string) => queryOptions({
    queryKey: ['coolifyApplicationLogs', id],
    queryFn: async () => {
        const response = await axiosInstance.get(`${URL}/api/v1/applications/${id}/logs`)
        if (response.status !== 200) {
            throw new Error('Network response was not ok')
        }
        return response.data
    },
    refetchInterval: 5000,
})

export const useCoolifyApplicationLogs = (id: string) => {

    const coolifyApplicationLogs = useSuspenseQuery(coolifyApplicationLogsQueryOptions(id))

    return coolifyApplicationLogs
}