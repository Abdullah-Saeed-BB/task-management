import TitleInput from "@/components/Project/TitleInput";
import UsersList from "@/components/UsersList";
import type { Project } from "@/lib/type";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

async function ProjectPage({ params }: { params: Params }) {
  const { projectId } = params;
  const res = await fetch(
    `${process.env.SERVER_URL}/api/project/${projectId}`,
    { cache: "no-cache" }
  );

  const project: Project = await res.json();

  return (
    <div>
      <header className="h-14 px-4 bg-slate-300 flex items-center gap-5">
        <TitleInput name={project.title} id={projectId} />
        <UsersList users={project.users} isBackWhite={false} />
      </header>
    </div>
  );
}

export default ProjectPage;
