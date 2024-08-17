import { Metadata } from "next";
import UsersTable from "./UsersTable";

export const metadata: Metadata = {
  title: "Users",
  description: "Users page, provide a list of users in a table.",
};

function Users() {
  return (
    <div className="md:px-10 md:py-5 px-2 py-4 space-y-5 mx-auto max-w-6xl">
      <div>
        <UsersTable />
      </div>
    </div>
  );
}

export default Users;
