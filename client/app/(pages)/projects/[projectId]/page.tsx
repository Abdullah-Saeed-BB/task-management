"use client";
import KanbanBorder from "@/components/KanbanBorder/KanbanBorder";
import Loading from "@/components/Loading";
import AssignUser from "@/components/Project/AssignUser";
import ColorPicker from "@/components/Project/ColorPicker";
import TitleInput from "@/components/Project/TitleInput";
import UsersList from "@/components/UsersList";
import { useGetProjectQuery } from "@/lib/store/slices/apiSlice";
import { useUserPermissions } from "@/lib/useUserPermissions";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

function ProjectPage({ params }: { params: Params }) {
  const { projectId } = params;
  const { data: project, isLoading, isError } = useGetProjectQuery(projectId);
  const user = useUserPermissions();

  if (isLoading)
    return (
      <div className="mt-24">
        <Loading />
      </div>
    );

  if (isError) return <div>Error fetch project data</div>;

  if (project) {
    const canCreate = !!project.users.length;

    return (
      <div>
        <header className="h-14 px-4 bg-slate-300 flex items-center gap-5">
          <ColorPicker
            color={project.color}
            projectId={projectId}
            isEmployee={user.isEmployee}
          />
          <TitleInput
            name={project.title}
            id={projectId}
            isEmployee={user.isEmployee}
          />
          <UsersList
            users={project.users}
            projectId={projectId}
            isBackWhite={false}
          />
          {!user.isEmployee && (
            <AssignUser projectId={projectId} projectUsers={project.users} />
          )}
        </header>
        <div className="mx-auto max-w-5xl">
          <div className="flex justify-end"></div>
          <KanbanBorder
            canCreate={canCreate}
            Tasks={project.tasks || []}
            projectId={projectId}
          />
        </div>
      </div>
    );
  } else return <Loading />;
}

export default ProjectPage;
