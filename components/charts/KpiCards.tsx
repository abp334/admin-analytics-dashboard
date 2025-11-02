import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the shape of the data
interface KpiData {
  totalUsers: number;
  totalCVAnalyses: number;
  averageCVScore: number;
  totalFeedback: number;
  averageRating: number;
}

export default function KpiCards({ data }: { data: KpiData | undefined }) {
  if (!data) return null; // Or return a loading skeleton

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalUsers}</div>
          <p className="text-xs text-muted-foreground">Total platform users</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CV Analyses</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 9H8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalCVAnalyses}</div>
          <p className="text-xs text-muted-foreground">Total CVs processed</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. CV Score</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="m12 14 4-4" />
            <path d="M12 14v4" />
            <path d="M12 14H8" />
            <path d="M12 14v-4" />
            <path d="M12 6H8" />
            <path d="M12 6v-4" />
            <path d="M12 6h4" />
            <path d="M16 6v-4" />
            <path d="M16 6h4" />
            <path d="M16 10h4" />
            <path d="M16 14h4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.averageCVScore} / 100</div>
          <p className="text-xs text-muted-foreground">Platform-wide average</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Feedback</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.averageRating.toFixed(1)} / 5
          </div>
          <p className="text-xs text-muted-foreground">
            From {data.totalFeedback} reviews
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
