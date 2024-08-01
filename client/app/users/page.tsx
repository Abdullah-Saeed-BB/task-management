import UsersTable from "./UsersTable";

async function Users() {
  return (
    <div className="px-10 py-5 space-y-5 mx-auto max-w-6xl">
      <div>
        <UsersTable />
      </div>
    </div>
  );
}

export default Users;
