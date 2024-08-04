import KanbanBorder from "@/components/KanbanBorder/KanbanBorder";
import Loading from "@/components/Loading";
import TitleInput from "@/components/Project/TitleInput";
import UsersList from "@/components/UsersList";
import type { Project } from "@/lib/type";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";

async function ProjectPage({ params }: { params: Params }) {
  const { projectId } = params;
  const res = await fetch(
    `${process.env.SERVER_URL}/api/project/${projectId}`,
    { cache: "no-cache" }
  );

  const project: Project = await res.json();

  if (project) {
    return (
      <div>
        <header className="h-14 px-4 bg-slate-300 flex items-center gap-5">
          <TitleInput name={project.title} id={projectId} />
          <UsersList users={project.users} isBackWhite={false} />
        </header>
        <div className="mx-auto max-w-5xl">
          <div className="flex justify-end">
          </div>
          <KanbanBorder Tasks={project.tasks || []} projectId={projectId}/>
        </div>
      </div>
    );
  } else return <Loading />;
}

export default ProjectPage;
