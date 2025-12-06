import { createFileRoute } from '@tanstack/react-router'
import { plausableQueryOptions, usePlausableGetMetrics } from '../hooks/api/plausable/usePlausableGetMetrics'


export const Route = createFileRoute('/plausable/')({
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(plausableQueryOptions),
    component: PlausableIndexComponent,
})


export default function PlausableIndexComponent() {

    const { data } = usePlausableGetMetrics()
    console.log(data)

    return (
        <div className='max-w-7xl mx-auto'>
            Visitors in last 7 days - <span className='font-bold'>{data.results[0].metrics[0]}</span>
        </div>
    )
}