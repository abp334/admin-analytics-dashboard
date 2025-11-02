"use client"; // This is a hook, it will be used in a client component

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

// This 'fetcher' function is what SWR will use to get data
const fetcher = async (url: string) => {
  // Get the token from localStorage
  const token = localStorage.getItem("admin_token");

  if (!token) {
    // If no token, we're not authenticated
    throw new Error("No auth token found.");
  }

  // Make the API request with the token in the Authorization header
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    // If the API returns an error (like 401 Unauthorized), it means the token is bad
    if (res.status === 401 || res.status === 403) {
      throw new Error("Auth failed");
    }
    // For other errors, try to get a message from the API body
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch data");
  }

  // If successful, return the JSON data
  return res.json();
};

// This is the main custom hook for our dashboard
export function useAdminData() {
  const router = useRouter();

  // Use SWR to fetch data from all 6 of our endpoints
  const { data: kpis, error: kpisError } = useSWR(
    "/api/analytics/kpis",
    fetcher
  );
  const { data: demographics, error: demographicsError } = useSWR(
    "/api/analytics/user-demographics",
    fetcher
  );
  const { data: cvUsage, error: cvUsageError } = useSWR(
    "/api/analytics/cv-usage",
    fetcher
  );
  const { data: paidVsFree, error: paidVsFreeError } = useSWR(
    "/api/analytics/paid-vs-free",
    fetcher
  );
  const { data: topUsers, error: topUsersError } = useSWR(
    "/api/analytics/top-users",
    fetcher
  );
  const { data: careerStage, error: careerStageError } = useSWR(
    "/api/analytics/career-stage",
    fetcher
  );

  // Check if any of the API calls returned an error
  const anyError =
    kpisError ||
    demographicsError ||
    cvUsageError ||
    paidVsFreeError ||
    topUsersError ||
    careerStageError;

  // Check if we are still loading the initial data
  const isLoading =
    !kpis &&
    !demographics &&
    !cvUsage &&
    !paidVsFree &&
    !topUsers &&
    !careerStage &&
    !anyError;

  useEffect(() => {
    // This effect runs if an error occurs
    if (anyError) {
      // If the error is 'Auth failed', the token is bad or missing
      if (
        anyError.message === "Auth failed" ||
        anyError.message === "No auth token found."
      ) {
        // Clear the bad token and force the user back to the login page
        localStorage.removeItem("admin_token");
        router.replace("/login");
      }
    }
  }, [anyError, router]); // Re-run this check if anyError or router changes

  // Return all the data and states to the component
  return {
    data: {
      kpis,
      demographics,
      cvUsage,
      paidVsFree,
      topUsers,
      careerStage,
    },
    isLoading,
    error: anyError,
  };
}
