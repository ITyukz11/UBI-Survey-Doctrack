import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface DataResultTable {
    data: object
}
export const DataResultTable = ({ data }: DataResultTable) => {
    const entries = Object.entries(data);

    const router = useRouter();

    console.log("entries: ", entries)
    return (
        <Table>
            <TableCaption>Lists of data</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Region</TableHead>
                    <TableHead>Contract Id</TableHead>
                    <TableHead>Surveyor/Designer</TableHead>
                    <TableHead>File Location</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {entries.map(([key, data]) => (
                    <TableRow key={key}>
                        <TableCell className="font-medium">{data.region}</TableCell>
                        <TableCell className="font-medium">{data.contract_id}</TableCell>
                        <TableCell className="font-medium">{data.designer}</TableCell>
                        <TableCell>{data.designer}</TableCell>
                        <TableCell>{data.createdAt}</TableCell>
                        <TableCell>
                            <Button variant='outline' onClick={() => {
                                const queryParams = new URLSearchParams({
                                    region: data.region,
                                    contract_id: data.contract_id,
                                    designer: data.designer,
                                    createdAt: data.createdAt
                                });
                                router.push(`/documents/result?${queryParams.toString()}`);
                            }}>View</Button>
                        </TableCell>
                    </TableRow>
                ))}

            </TableBody>
            <TableFooter>

            </TableFooter>
        </Table>
    )
}
