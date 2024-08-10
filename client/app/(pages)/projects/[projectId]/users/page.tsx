"use client";
import Loading from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import Table from "@/components/Table/Table";
import TableTd from "@/components/Table/TableTd";
import {
  useDeleteUserMutation,
  useDisconnectProjectsUserMutation,
  useGetProjectsUsersQuery,
} from "@/lib/store/slices/apiSlice";
import { ProjectsUser, User } from "@/lib/type";
import Avatar from "boring-avatars";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

function ProjectsUsersPage({ params }: { params: Params }) {
  const { projectId } = params;

  const { data, isLoading, isError } = useGetProjectsUsersQuery(projectId);
  const [disconnectUser] = useDisconnectProjectsUserMutation();

  const disconnectUserBrief = (userId: string) =>
    disconnectUser({ projectId, userId });

  if (isLoading)
    return (
      <div className="mt-24">
        <Loading />
      </div>
    );
  else if (isError) return <div>Error fetch project&#39;s users</div>;
  else if (data) {
    return (
      <div className="px-10 py-5 space-y-5 mx-auto max-w-6xl">
        <div>
          <Table
            columns={["User", "Email", "Tasks Progress", "Actions"]}
            data={data.users}
            title="Project's Users"
            deleteAction={disconnectUserBrief}
            viewAction="users"
            isUserMinusIcon={true}
          >
            {(item: ProjectsUser) => {
              const tasks = item.tasks.filter(
                (task) => task.projectId === projectId
              );
              const progress =
                tasks.filter((task) => task.status === "DONE").length /
                tasks.length;

              return (
                <>
                  <TableTd>
                    <div className="flex items-center gap-2">
                      <Avatar name={item.id} variant="beam" />
                      <h3 className="text-lg">{item.name}</h3>
                    </div>
                  </TableTd>
                  <TableTd>
                    <span className="text-sm">{item.email}</span>
                  </TableTd>
                  <TableTd>
                    <div className="flex items-center gap-2">
                      <ProgressBar
                        progress={isNaN(progress * 100) ? 0 : progress * 100}
                      />
                      <span>{tasks.length}</span>
                    </div>
                  </TableTd>
                </>
              );
            }}
          </Table>
        </div>
        {/* <pre>{JSON.stringify(data, undefined, 2)}</pre> */}
      </div>
    );
  }
}

export default ProjectsUsersPage;
