import { Project } from "@/lib/type";
import UsersList from "../UsersList";
import Link from "next/link";
import ProgressBar from "../ProgressBar";

function ProjectCard({ project }: { project: Project }) {
  const tasksDone = project.tasks.filter((t) => t.status === "DONE").length;
  const progress = (tasksDone / project.tasks.length) * 100;

  return (
    <div className="bg-slate-100 rounded-xl h-44 lg:w-60 md:w-40 w-full px-2 pt-6 drop-shadow-md flex justify-center relative">
      <span
        style={{ backgroundColor: project.color }}
        className="size-9 -top-4 drop-shadow-md rounded-lg inline-block absolute bg-cyan-400"
      ></span>
      <div className="flex items-center flex-col justify-between gap-1 w-full">
        <div className="text-center">
          <Link
            href={`projects/${project.id}`}
            className="text-lg text-slate-700 line-clamp-1 mb-2"
          >
            {project.title}
          </Link>
          <UsersList
            users={project.users}
            projectId={project.id}
            ringColor="ring-slate-100"
          />
        </div>
        <div className="w-full pb-2 text-sm space-y-2 mb-1">
          <div className="flex justify-between font-semibold tracking-wider">
            <p>Tasks: {project.tasks.length}</p>
            <p>%{isNaN(progress) ? 0 : Math.round(progress)}</p>
          </div>
          <ProgressBar progress={isNaN(progress) ? 0 : progress} />
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
