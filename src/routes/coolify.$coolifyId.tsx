import { createFileRoute } from '@tanstack/react-router'
import { useCoolifyGetAplicationsId, coolifyGetAplicationsIdQueryOptions } from '@/hooks/api/useCoolifyGetAplicationsId'
import { useCoolifyApplicationLogs } from '@/hooks/api/useCoolifyGetAplicationLogs'
import { useCoolifyGetAppDeployments } from '@/hooks/api/useCoolifyGetAppDeployments'
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

function Deployments() {
    const coolifyId = Route.useParams().coolifyId
    const { data } = useCoolifyGetAppDeployments(coolifyId)

    return (
        <Suspense fallback={<div>Loading deployments...</div>}>
            <div className='p-4 flex flex-col gap-4'>
                {/* @ts-expect-error ADD later */}
                {data && data.deployments.map(application => (
                    <div key={application.id} className='p-2 border rounded-lg'>
                        <h2 className='font-bold mb-2'>{application.name} Deployments</h2>
                        <div className={`p-2 border border-l-4 rounded-sm ${application.status === 'finished' ? 'border-green-500' : application.status === 'failed' ? 'border-red-500' : 'border-yellow-500'}`}>
                            <h2 className='font-bold mb-2'>{application.updated_at}</h2>
                            <div>
                                {application.status}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Suspense>
    )
}

function RouteComponent() {
    const coolifyId = Route.useParams().coolifyId
    const { data } = useCoolifyGetAplicationsId(coolifyId)


    return (
        <div className='max-w-7xl mx-auto'>
            <div className='flex px-4 py-8 bg-blue-300 w-full'>{data.name}</div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto p-4'>
                <ApplicationLogs coolifyId={coolifyId} />
                <Deployments />
            </div>
        </div>
    )
}
