"use client"; // This page needs to be a client component to use hooks

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAdminData } from "@/lib/useAdminData";

// We'll import all our chart components here.
// They won't exist yet, which is OK.
import KpiCards from "@/components/charts/KpiCards";
import CountryChart from "@/components/charts/CountryChart";
import CvUsageChart from "@/components/charts/CvUsageChart";
import PaidFreeChart from "@/components/charts/PaidFreeChart";
import TopUsersTable from "@/components/charts/TopUsersTable";
import CareerStageChart from "@/components/charts/CareerStageChart";

// A simple loading component
function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* Simple spinner */}
        <svg
          className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="text-lg text-gray-700 mt-4">Loading Dashboard Data...</p>
      </div>
    </div>
  );
}

// A simple error component
function DashboardError({
  error,
  onRetry,
}: {
  error: Error;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Error Loading Dashboard
        </h2>
        <p className="text-gray-700 mb-6">{error.message}</p>
        <Button onClick={onRetry}>Try Again</Button>
      </div>
    </div>
  );
}

// The main page component
export default function AdminDashboard() {
  const router = useRouter();
  // Use our custom hook to get data and states
  const { data, isLoading, error } = useAdminData();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.replace("/login");
  };

  // 1. Handle Loading State
  if (isLoading) {
    return <DashboardLoading />;
  }

  // 2. Handle Error State
  if (error) {
    // Note: Auth errors are handled by the hook, this is for other API errors
    return <DashboardError error={error} onRetry={() => router.refresh()} />;
  }

  // 3. Handle Success State (data is loaded)
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 md:px-6 bg-white dark:bg-gray-800 border-b">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Admin Analytics Dashboard
        </h1>
        <Button variant="outline" onClick={handleLogout}>
          Log Out
        </Button>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid gap-6">
          {/* Section 1: KPI Cards */}
          <KpiCards data={data.kpis} />

          {/* Section 2: Main Charts (2-column) */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CvUsageChart data={data.cvUsage} />
            </div>
            <PaidFreeChart data={data.paidVsFree} />
          </div>

          {/* Section 3: More Charts & Tables (3-column) */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <CountryChart data={data.demographics} />
            <CareerStageChart data={data.careerStage} />
            <TopUsersTable data={data.topUsers} />
          </div>
        </div>
      </main>
    </div>
  );
}
