"use client";
import ErrorPage from "@/components/ErrorPage";
import Loading from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import Table from "@/components/Table/Table";
import TableTd from "@/components/Table/TableTd";
import {
  useDisconnectProjectsUserMutation,
  useGetUserQuery,
} from "@/lib/store/slices/apiSlice";
import { Project } from "@/lib/type";
import { useUserPermissions } from "@/lib/useUserPermissions";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "boring-avatars";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";

function User({ params }: { params: Params }) {
  const { userId } = params;
  const userPermissions = useUserPermissions();

  const { data: user, isLoading, isError } = useGetUserQuery(userId);

  const [disconnectUser] = useDisconnectProjectsUserMutation();

  const disconnectUserBrief = (projectId: string) =>
    disconnectUser({ projectId, userId });

  if (isLoading)
    return (
      <div className="mt-20">
        <Loading />
      </div>
    );
  else if (isError) return <ErrorPage>Error fetch user data</ErrorPage>;
  else if (user) {
    return (
      <div className="md:px-10 md:py-5 px-2 py-4 space-y-10 mx-auto max-w-4xl">
        <div className="flex bg-slate-100 p-2 rounded-2xl drop-shadow-md items-center gap-2">
          <span className="border-2 border-slate-100 rounded-full drop-shadow-md">
            <Avatar name={user.id} variant="beam" size="5rem" />
          </span>
          <div className="mx-auto md:w-2/3 w-3/4 gap-x-4 gap-y-2 grid grid-row-2 md:grid-flow-col md:grid-rows-2">
            <p className="text-slate-500">Name:</p>
            <p className="line-clamp-1">{user.name}</p>
            <p className="text-slate-500">Email:</p>
            <p className="line-clamp-1">{user.email}</p>
            <p className="text-slate-500">Role:</p>
            <p className="capitalize">{user.role.toLowerCase()}</p>
          </div>
          {userPermissions.id === userId && (
            <Link href={`edit`} className="pr-5 text-slate-600">
              <FontAwesomeIcon icon={faEdit} size="xl" />
            </Link>
          )}
        </div>
        {user.role === "EMPLOYEE" && (
          <div>
            <Table
              title="Projects"
              columns={["Project", "Tasks", "Actions"]}
              data={user.projects}
              deleteAction={
                userPermissions.isEmployee ? null : disconnectUserBrief
              }
              viewAction="/projects"
              isUserMinusIcon
            >
              {(item: Project) => {
                const tasksDone = item.tasks.filter(
                  (task) => task.status === "DONE"
                ).length;
                const progress = (tasksDone / item.tasks.length) * 100;

                return (
                  <>
                    <TableTd>{item.title}</TableTd>
                    <TableTd>
                      <div className="flex items-center gap-4">
                        <ProgressBar
                          progress={isNaN(progress) ? 0 : progress}
                        />
                        <span>{item.tasks.length}</span>
                      </div>
                    </TableTd>
                  </>
                );
              }}
            </Table>
          </div>
        )}
        {/* <pre>{JSON.stringify(user, undefined, 2)}</pre> */}
      </div>
    );
  }
}

export default User;
