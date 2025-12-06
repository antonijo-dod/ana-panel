import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"

const URL = import.meta.env.VITE_PLAUSABLE_API

export const plausableQueryOptions = queryOptions({
    queryKey: ['plausable'],
    queryFn: async () => {
        const response = await fetch(`${URL}/api/v2/query?site_id=slatkoifino.com&date_range=7d&metrics[]=visitors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_PLAUSABLE_TOKEN_KEY}`
            },
        })
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.json()
    }
})


export const usePlausableGetMetrics = () => {

    const plausable = useSuspenseQuery(plausableQueryOptions)

    return plausable
}