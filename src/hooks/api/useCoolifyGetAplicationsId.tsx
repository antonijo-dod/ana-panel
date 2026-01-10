import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import axiosInstance from "@/hooks/axiosInstance"

const URL = import.meta.env.VITE_COOLIFY_API

export const coolifyGetAplicationsIdQueryOptions = (id: string) => queryOptions({
    queryKey: ['coolifyAplications', id],
    queryFn: async () => {
        const response = await axiosInstance.get(`${URL}/api/v1/applications/${id}`)
        if (response.status !== 200) {
            throw new Error('Network response was not ok')
        }
        return response.data
    }
})

export const useCoolifyGetAplicationsId = (id: string) => {
    const coolifyAplications = useSuspenseQuery(coolifyGetAplicationsIdQueryOptions(id))

    return coolifyAplications
}