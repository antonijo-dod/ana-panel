import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import axiosCoolifyInstance from "@/hooks/axiosCoolifyInstance"

const URL = import.meta.env.VITE_COOLIFY_API

export const coolifyGetAplicationsQueryOptions = queryOptions({
    queryKey: ['coolifyAplications'],
    queryFn: async () => {
        const response = await axiosCoolifyInstance.get(`${URL}/api/v1/applications`)
        if (response.status !== 200) {
            throw new Error('Network response was not ok')
        }
        return response.data
    }
})


export const useCoolifyGetAplications = () => {

    const coolifyAplications = useSuspenseQuery(coolifyGetAplicationsQueryOptions)

    return coolifyAplications
}