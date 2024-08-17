import Avatar from "boring-avatars";
import Link from "next/link";

type Props = {
  users: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "EMPLOYEE" | "MANAGER";
  }[];
  projectId: string;
  ringColor?: string;
};

function UsersList({ users, projectId, ringColor = "ring-white" }: Props) {
  if (!users.length) return <p className="text-sm italic">No users</p>;
  return (
    <Link href={`/projects/${projectId}/users`}>
      <ul className="flex -space-x-4 items-end">
        {users.length <= 5 ? (
          users.map((user) => (
            <li
              className={`drop-shadow-sm rounded-full ring-2 ${ringColor}`}
              key={user.id}
            >
              <Avatar name={user.id} variant="beam" />
            </li>
          ))
        ) : (
          <>
            {users.slice(0, 4).map((user) => (
              <li
                className={`drop-shadow-sm rounded-full ring-2 ${ringColor}`}
                key={user.id}
              >
                <Avatar name={user.id} variant="beam" />
              </li>
            ))}
            <li className="pl-4 text-blue-400 underline">
              <span>+{users.length - 4}</span>
            </li>
          </>
        )}
      </ul>
    </Link>
  );
}

export default UsersList;
