import { User } from "@/lib/type";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "boring-avatars";
import Link from "next/link";

function UserCard({ user }: { user: User }) {
  return (
    <Link
      href={`/users/${user.id}`}
      key={user.id}
      className="flex items-center focus:opacity-70 space-x-3"
    >
      <span className="drop-shadow-sm">
        <Avatar name={user.id} variant="beam" size="3rem" />
      </span>
      <div className="space-y-1 w-full line-clamp-2">
        <h4>{user.name}</h4>
        <div className="space-x-1 text-slate-600">
          <FontAwesomeIcon icon={faFolderOpen} />
          <span>{user.projects.length}</span>
        </div>
      </div>
    </Link>
  );
}

export default UserCard;
