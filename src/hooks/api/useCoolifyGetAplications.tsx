import { useQuery } from "@tanstack/react-query"

export const useCoolifyGetAplications = () => {

    const URL = "http://91.99.119.7:8000"

    const coolifyAplications = useQuery({
        queryKey: ['coolifyAplications'],
        queryFn: async () => {
            const response = await fetch(`${URL}/api/v1/applications`, {
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

    return coolifyAplications
}