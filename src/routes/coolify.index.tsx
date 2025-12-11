import { createFileRoute, Link } from '@tanstack/react-router'
import { useCoolifyGetAplications, coolifyGetAplicationsQueryOptions } from '../hooks/api/useCoolifyGetAplications'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useCoolifyGetDeployments } from '@/hooks/api/useCoolifyGetDeployments'

export const Route = createFileRoute('/coolify/')({
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(coolifyGetAplicationsQueryOptions),
    component: CoolifyIndexComponent,
})

export default function CoolifyIndexComponent() {

    const { data } = useCoolifyGetAplications()
    const { data: deployments } = useCoolifyGetDeployments()

    const ApplicationTable = ({ data }) => {
        return (
            <Table>
                <TableCaption>A list of your coolify applications.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((application) => (
                        <TableRow key={application.uuid}>
                            <TableCell className="font-medium">
                                <Link className="text-blue-600" to={`/coolify/${application.uuid}`}>{application.name}</Link>
                            </TableCell>
                            <TableCell>{application.status}</TableCell>
                            <TableCell>{application.uuid}</TableCell>
                            <TableCell className="text-right">{application.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    const Deployments = ({ data }) => {
        return (
            <div className='p-2 border rounded-lg'>
                <h2 className='font-bold mb-2'>{data.created_at}</h2>
            </div>
        )
    }

    return (
        <div className='flex max-w-7xl mx-auto gap-8'>
            {data.length > 0 ? <ApplicationTable data={data} /> : <div>No applications found.</div>}
            <div className='p-4 flex flex-col gap-4'>
                {deployments && deployments.map(application => (
                    <div key={application.id} className='p-2 border rounded-lg'>
                        <h2 className='font-bold mb-2'>{application.name} Deployments</h2>
                        <Deployments data={application} />
                    </div>
                ))}
            </div>
        </div>
    )
}