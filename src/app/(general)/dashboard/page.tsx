import type { Metadata } from "next";
import CardDashboard from "@/components/ui/cards-dashboard";

export const metadata: Metadata = {
  title: "Constellation - Dashboard",
  description: "Constellation dashboard, where you can see all your data.",
};

export default function DashboardPage() {
  return (
    <main>
      <h1 className="text-3xl font-semibold mb-5">Dashboard</h1>
      <CardDashboard />
      <h2 className="text-xl my-5">Last courses</h2>
      <h2 className="text-xl my-5">Last projects</h2>
    </main>
  );
}
