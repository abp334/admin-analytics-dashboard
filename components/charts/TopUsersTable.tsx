import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TableData {
  email: string;
  country: string;
  averageScore: number;
  analysisCount: number;
}

export default function TopUsersTable({
  data,
}: {
  data: TableData[] | undefined;
}) {
  if (!data) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Users</CardTitle>
        <CardDescription>
          Users with the highest average CV scores.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Avg. Score</TableHead>
              <TableHead className="text-right">Analyses</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.email}>
                <TableCell
                  className="font-medium truncate"
                  style={{ maxWidth: "120px" }}
                >
                  {user.email}
                </TableCell>
                <TableCell className="text-right">
                  {user.averageScore}
                </TableCell>
                <TableCell className="text-right">
                  {user.analysisCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
