import ProjectCards from "@/components/Dashboard/ProjectCards";
import UsersBoard from "@/components/Dashboard/UsersBoard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page",
};

export default function Dashboard() {
  return (
    <div className="lg:px-10 lg:py-5 px-3 py-4 space-y-5 mx-auto max-w-6xl">
      <div className="flex md:flex-row flex-col justify-between items-start gap-4">
        <ProjectCards />
        <UsersBoard />
      </div>
    </div>
  );
}
