// src/app/page.tsx
"use client";
import { SidebarDemo } from "@/components/SidebarDemo";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is visiting for the first time
    const isNewUser = !localStorage.getItem("visited");
    if (isNewUser) {
      // Mark the user as visited and redirect to the landing page
      localStorage.setItem("visited", "true");
      router.push("/landing");
    }
  }, [router]);

  return (
    <>
      <SidebarDemo />
    </>
  );
}