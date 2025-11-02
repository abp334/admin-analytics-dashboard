"use client"; // All chart components are client components
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ChartData {
  date: string;
  count: number;
}

export default function CvUsageChart({
  data,
}: {
  data: ChartData[] | undefined;
}) {
  if (!data) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>CV Analysis Usage</CardTitle>
        <CardDescription>Usage trends over the last 30 days.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* We need a parent div with a defined height for Recharts */}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
