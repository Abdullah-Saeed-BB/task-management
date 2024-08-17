"use client";
import { useGetUsersQuery } from "@/lib/store/slices/apiSlice";
import Loading from "../Loading";
import UserCard from "./UserCard";
import { User } from "@/lib/type";
import ErrorPage from "../ErrorPage";

function UsersBoard() {
  const { data, isLoading, isError } = useGetUsersQuery(null);

  if (isLoading) return <Loading />;
  else if (isError) return <ErrorPage>Error fetch employees</ErrorPage>;
  else if (data) {
    const employees = data.filter((u) => u.role === "EMPLOYEE");
    const managers = data.filter((u) => u.role === "MANAGER");

    return (
      <div className="md:w-60 w-full bg-slate-100 px-3 pb-3 pt-5 rounded-xl drop-shadow-md">
        <h2 className="text-xl font-bold tracking-wider mb-5">Employees</h2>
        {data.length ? (
          <>
            <div className="space-y-3 mb-6 md:flex md:flex-col grid grid-flow-row grid-cols-2">
              {employees.map((user: User) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
            <div className="text-slate-600 md:block flex gap-2">
              <div className="md:mb-2 w-full py-4 drop-shadow-md bg-white text-center rounded-xl">
                <h2 className="font-bold">Users</h2>
                <p>{data.length}</p>
              </div>
              <div className="flex gap-2 items-center w-full">
                <div className="w-full py-4 drop-shadow-md bg-white text-center rounded-xl">
                  <h2 className="font-bold text-sm">Employees</h2>
                  <p>{employees.length}</p>
                </div>
                <div className="w-full py-4 drop-shadow-md bg-white text-center rounded-xl">
                  <h2 className="font-bold text-sm">Managers</h2>
                  <p>{managers.length}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h4 className="text-center py-5">No users</h4>
        )}

        {/* <pre>{JSON.stringify(employees, undefined, 2)}</pre> */}
      </div>
    );
  }
}

export default UsersBoard;
