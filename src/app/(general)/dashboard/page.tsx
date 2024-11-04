import type { Metadata } from "next";
import CardDashboard from "@/components/ui/dashboard-cards";
import { DashboardCarousel } from "@/components/ui/dashboard-carousel";

export const metadata: Metadata = {
  title: "Constellation - Dashboard",
  description: "Constellation dashboard, where you can see all your data.",
};

export default function DashboardPage() {
  return (
    <main className="overflow-hidden">
      <h1 className="text-3xl font-semibold mb-5">Dashboard</h1>
      <CardDashboard />
      <h2 className="text-xl my-5">Last courses</h2>
      <DashboardCarousel />
      <h2 className="text-xl my-5">Last activities</h2>
    </main>
  );
}
