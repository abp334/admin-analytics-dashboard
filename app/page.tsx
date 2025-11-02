"use client"; // This directive is required for using hooks like useEffect

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use 'next/navigation' in App Router

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page immediately
    router.replace("/login");
  }, [router]);

  // Render a simple loader or nothing while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Loading...</p>
    </div>
  );
}
