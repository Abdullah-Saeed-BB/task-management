"use client";
import ErrorPage from "@/components/ErrorPage";
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

  if (isError) return <ErrorPage>Error fetch project data.</ErrorPage>;

  if (project) {
    const canCreate = !!project.users.length;

    if (
      !project.users.find((projectUser) => projectUser.id === user.id) &&
      user.isEmployee
    ) {
      return (
        <h2 className="text-center text-xl  mt-12">
          You not assigned in this project.
        </h2>
      );
    }

    return (
      <div>
        <header className="h-14 overflow-x-autoto px-4 bg-slate-300 flex items-center gap-5">
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
            ringColor="ring-slate-300"
          />
          {!user.isEmployee && (
            <AssignUser projectId={projectId} projectUsers={project.users} />
          )}
        </header>
        <div className="mx-auto px-1 max-w-6xl">
          <div>
            <KanbanBorder
              canCreate={canCreate}
              Tasks={project.tasks || []}
              projectId={projectId}
            />
          </div>
        </div>
      </div>
    );
  } else return <Loading />;
}

export default ProjectPage;
