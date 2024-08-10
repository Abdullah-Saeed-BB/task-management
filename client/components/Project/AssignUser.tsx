"use client";
import {
  useAssignProjectsUserMutation,
  useGetUsersQuery,
} from "@/lib/store/slices/apiSlice";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";
import Loading from "../Loading";
import { User } from "@/lib/type";
import ErrorPopup from "../ErrorPopup";

type Props = {
  projectId: string;
  projectUsers: User[];
};

function AssignUser({ projectId, projectUsers }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [isAssign, setIsAssign] = useState(false);
  const { data, isLoading, isError } = useGetUsersQuery("employee");
  const [assignUser] = useAssignProjectsUserMutation();

  const handleSelect = async (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      try {
        await assignUser({ projectId, userId: e.target.value }).unwrap();
      } catch (err: any) {
        // console.log(err.data);
        setError(err.data);
      }

      setIsAssign(false);
    }
  };

  if (isLoading) return <Loading />;
  else if (isError) return <div>Error fetch data</div>;
  else if (data) {
    const restUsers = data.filter(
      (user) => !projectUsers.find((projectUser) => projectUser.id === user.id)
    );

    return (
      <div>
        {error ? (
          <ErrorPopup message={error} onClose={() => setError(null)} />
        ) : null}
        {isAssign ? (
          <select
            onChange={handleSelect}
            className="bg-slate-300 border-b border-slate-500"
          >
            <option value="">-- Assign user --</option>
            {restUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        ) : (
          <button className="text-slate-600 " onClick={() => setIsAssign(true)}>
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
        )}
      </div>
    );
  }
}

export default AssignUser;
