import { createFileRoute } from '@tanstack/react-router'
import { useCoolifyGetAplicationsId, coolifyGetAplicationsIdQueryOptions } from '@/hooks/api/useCoolifyGetAplicationsId'
import { useCoolifyApplicationLogs, coolifyApplicationLogsQueryOptions } from '@/hooks/api/useCoolifyGetAplicationLogs'
import { Suspense } from 'react'

export const Route = createFileRoute('/coolify/$coolifyId')({
    loader: ({ context: { queryClient }, params: { coolifyId } }) => {
        return queryClient.ensureQueryData(coolifyGetAplicationsIdQueryOptions(coolifyId))
    },
    component: RouteComponent,
})

function ApplicationLogs({ coolifyId }: { coolifyId: string }) {
    const { data } = useCoolifyApplicationLogs(coolifyId)
    return (
        <Suspense fallback={<div>Loading logs...</div>}>
            <LogsComponent data={data} />
        </Suspense>
    )
}

function LogsComponent({ data }: { data: any }) {
    return (
        <div className='mt-4'>
            <pre className='text-xs'>{data.logs}</pre>
        </div>
    )
}

function RouteComponent() {
    const coolifyId = Route.useParams().coolifyId
    const { data } = useCoolifyGetAplicationsId(coolifyId)


    return (
        <div className='max-w-7xl mx-auto'>
            <div className='flex px-4 py-8 bg-blue-300 w-full'>{data.name}</div>
            <ApplicationLogs coolifyId={coolifyId} />
        </div>
    )
}
