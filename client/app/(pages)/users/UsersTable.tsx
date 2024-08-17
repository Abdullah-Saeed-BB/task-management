"use client";
import ErrorPage from "@/components/ErrorPage";
import Loading from "@/components/Loading";
import Table from "@/components/Table/Table";
import TableTd from "@/components/Table/TableTd";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/lib/store/slices/apiSlice";
import { useUserPermissions } from "@/lib/useUserPermissions";
import Avatar from "boring-avatars";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "EMPLOYEE" | "MANAGER";
};

function UsersTable() {
  const { data, isLoading, isError } = useGetUsersQuery(null);
  const [deleteUser] = useDeleteUserMutation();
  const user = useUserPermissions();

  if (isLoading) return <Loading />;
  else if (isError) return <ErrorPage>Error fetching data</ErrorPage>;
  else if (data) {
    return (
      <Table
        title="Users"
        columns={["User", "email", "role", "Actions"]}
        data={data as User[]}
        viewAction="users"
        deleteAction={user.isEmployee ? null : deleteUser}
        create={!user.isEmployee}
      >
        {(item: User) => (
          <>
            <TableTd>
              <div className="flex text-lg items-center gap-3">
                <span className="w-10">
                  <Avatar name={item.id} variant="beam" />
                </span>
                <p className="line-clamp-1">{item.name}</p>
              </div>
            </TableTd>
            <TableTd>{item.email}</TableTd>
            <TableTd>
              <span
                className={`capitalize text-sm block w-20 py-1 text-center rounded-full ${
                  item.role === "EMPLOYEE"
                    ? "bg-slate-200"
                    : "bg-blue-400 text-white"
                }`}
              >
                {item.role.toLowerCase()}
              </span>
            </TableTd>
          </>
        )}
      </Table>
    );
  }
}

export default UsersTable;
