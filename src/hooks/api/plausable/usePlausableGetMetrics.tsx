import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import axiosPlausableInstance from "@/hooks/axiosPlausableInstance"

const URL = import.meta.env.VITE_PLAUSABLE_API

export const plausableQueryOptions = queryOptions({
    queryKey: ['plausable'],
    queryFn: async () => {
        const response = await axiosPlausableInstance.post(`${URL}/api/v2/query?site_id=slatkoifino.com&date_range=7d&metrics[]=visitors`)
        if (response.status !== 200) {
            throw new Error('Network response was not ok')
        }
        return response.data
    }
})


export const usePlausableGetMetrics = () => {

    const plausable = useSuspenseQuery(plausableQueryOptions)

    return plausable
}