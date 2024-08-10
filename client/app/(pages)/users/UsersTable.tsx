"use client";
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
  if (isError) return <div>Error fetching data</div>;

  return (
    <Table
      title="Users"
      columns={["User", "email", "role", "Actions"]}
      data={data as User[]}
      viewAction="users"
      deleteAction={user.isEmployee ? null : deleteUser}
      create={!user.isEmployee}
      filter={{
        label: "Role",
        name: "role",
        logic: { EMPLOYEE: true, MANAGER: true },
      }}
    >
      {(item: User) => (
        <>
          <TableTd>
            <div className="flex text-lg items-center gap-3">
              <Avatar name={item.id} variant="beam" />
              <span>{item.name}</span>
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

export default UsersTable;
