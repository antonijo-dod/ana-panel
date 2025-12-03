import { createFileRoute } from '@tanstack/react-router'
import { useCoolifyGetAplications } from '../hooks/api/useCoolifyGetAplications'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export const Route = createFileRoute('/about')({
    component: About,
})

export default function About() {
    const { data, error, isLoading } = useCoolifyGetAplications()
    console.log('Applications data:', data)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading applications</div>

    const ApplicationTable = ({ data }) => {
        return (
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
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
                        <TableRow key={application.id}>
                            <TableCell className="font-medium">{application.name}</TableCell>
                            <TableCell>{application.status}</TableCell>
                            <TableCell>{application.method}</TableCell>
                            <TableCell className="text-right">{application.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    return (
        <div>
            {data.length > 0 ? <ApplicationTable data={data} /> : <div>No applications found.</div>}
        </div>
    )
}