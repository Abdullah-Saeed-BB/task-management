import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ErrorPopup from "../ErrorPopup";

type Props = {
  id: string;
  deleteAction: Function;
};

function TableDeleteAction({ id, deleteAction }: Props) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteAction(id).unwrap();
    } catch (err: any) {
      setError(err.data);
    }

    setLoading(false);
  };

  return error ? (
    <ErrorPopup message={error} onClose={() => setError(null)} />
  ) : (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-lg text-rose-500 duration-100 hover:text-rose-600 disabled:text-rose-700"
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}

export default TableDeleteAction;
