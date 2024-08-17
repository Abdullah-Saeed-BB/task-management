"use client";
import { useGetProjectsQuery } from "@/lib/store/slices/apiSlice";
import Loading from "../Loading";
import ProjectCard from "./ProjectCard";
import ErrorPage from "../ErrorPage";

function ProjectCards() {
  const { data: projects, isLoading, isError } = useGetProjectsQuery();

  if (isLoading) return <Loading />;
  else if (isError) return <ErrorPage>Error fetch projects</ErrorPage>;
  else if (projects)
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold tracking-wider">Projects</h2>
        <hr className="border-slate-200 my-4 " />
        {projects.length ? (
          <div className="flex flex-wrap md:flex-row flex-col w-full gap-6 py-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <h2 className="text-slate-500 text-center text-3xl p-5">
            There is no projects to provide.
          </h2>
        )}
      </div>
    );
}

export default ProjectCards;
