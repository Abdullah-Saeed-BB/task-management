"use client";
import ErrorPage from "@/components/ErrorPage";
import Loading from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import Table from "@/components/Table/Table";
import TableTd from "@/components/Table/TableTd";
import {
  useDisconnectProjectsUserMutation,
  useGetProjectsUsersQuery,
} from "@/lib/store/slices/apiSlice";
import { ProjectsUser } from "@/lib/type";
import { useUserPermissions } from "@/lib/useUserPermissions";
import Avatar from "boring-avatars";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";

function ProjectsUsersPage({ params }: { params: Params }) {
  const { projectId } = params;
  const user = useUserPermissions();

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
  else if (isError) {
    return <ErrorPage>Error fetch project&#39;s users</ErrorPage>;
  } else if (data) {
    return (
      <div className="md:px-10 md:py-5 px-2 py-4 space-y-5 mx-auto max-w-6xl">
        <div>
          <Table
            columns={["User", "Email", "Tasks Progress", "Actions"]}
            data={data.users}
            title={
              <Link href="./" className="focus:opacity-70 underline">
                Project&#39;s Users
              </Link>
            }
            deleteAction={user.isEmployee ? null : disconnectUserBrief}
            viewAction="/users"
            isUserMinusIcon
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
                    <div className="flex text-lg items-center gap-3">
                      <span className="w-10">
                        <Avatar name={item.id} variant="beam" />
                      </span>
                      <p className="line-clamp-1">{item.name}</p>
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
      </div>
    );
  }
}

export default ProjectsUsersPage;
