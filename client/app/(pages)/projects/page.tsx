import { Metadata } from "next";
import ProjectTable from "./ProjectTable";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects page, provide a list of projects in a table.",
};

function Projects() {
  return (
    <div className="md:px-10 md:py-5 px-2 py-4 space-y-5 mx-auto max-w-6xl">
      <div>
        <ProjectTable />
      </div>
    </div>
  );
}

export default Projects;
