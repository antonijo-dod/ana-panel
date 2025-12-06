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

export const Route = createFileRoute('/coolify/')({
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(coolifyGetAplicationsQueryOptions),
    component: CoolifyIndexComponent,
})


export default function CoolifyIndexComponent() {

    const { data } = useCoolifyGetAplications()

    const ApplicationTable = ({ data }) => {
        return (
            <div className='max-w-7xl mx-auto'>
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
            </div>
        )
    }

    return (
        <div>
            {data.length > 0 ? <ApplicationTable data={data} /> : <div>No applications found.</div>}
        </div>
    )
}