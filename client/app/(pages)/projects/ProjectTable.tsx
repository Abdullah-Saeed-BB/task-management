"use client";
import ErrorPage from "@/components/ErrorPage";
import Loading from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import Table from "@/components/Table/Table";
import TableTd from "@/components/Table/TableTd";
import UsersList from "@/components/UsersList";
import {
  useDeleteProjectMutation,
  useGetProjectsQuery,
} from "@/lib/store/slices/apiSlice";
import { Project } from "@/lib/type";
import { useUserPermissions } from "@/lib/useUserPermissions";

function ProjectTable() {
  const { data, isLoading, isError } = useGetProjectsQuery();
  const [deleteProject] = useDeleteProjectMutation();
  const user = useUserPermissions();

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage>Error fetching data</ErrorPage>;
  if (data) {
    return (
      <Table
        title="Projects"
        columns={["Title", "Tasks", "Users", "Actions"]}
        data={data as Project[]}
        deleteAction={user.isEmployee ? null : deleteProject}
        viewAction="projects"
      >
        {(item: Project) => {
          const tasksDone = item.tasks.filter(
            (t) => t.status === "DONE"
          ).length;
          const progress = (tasksDone / item.tasks.length) * 100;

          return (
            <>
              <TableTd>{item.title}</TableTd>
              <TableTd>
                <div className="flex items-center gap-2">
                  <ProgressBar progress={isNaN(progress) ? 0 : progress} />
                  <span>{item.tasks.length}</span>
                </div>
              </TableTd>
              <TableTd>
                <UsersList users={item.users} projectId={item.id} />
              </TableTd>
            </>
          );
        }}
      </Table>
    );
  }
}

export default ProjectTable;
