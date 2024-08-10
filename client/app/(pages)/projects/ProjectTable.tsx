"use client";
import Loading from "@/components/Loading";
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
  if (isError) return <div>Error fetching data</div>;
  if (data) {
    return (
      <Table
        title="Projects"
        columns={["Title", "Tasks", "Users", "Actions"]}
        data={data as Project[]}
        deleteAction={user.isEmployee ? null : deleteProject}
        viewAction="projects"
      >
        {(item: Project) => (
          <>
            <TableTd>{item.title}</TableTd>
            <TableTd>{item._count.tasks}</TableTd>
            <TableTd>
              <UsersList users={item.users} projectId={item.id} />
            </TableTd>
          </>
        )}
      </Table>
    );
  }
}

export default ProjectTable;
