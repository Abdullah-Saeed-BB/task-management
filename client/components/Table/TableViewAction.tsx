import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function TableViewAction({ link }: { link: string }) {
  return (
    <Link
      href={link}
      className="text-slate-500 hover:text-slate-600 focus:text-slate-900"
    >
      <FontAwesomeIcon icon={faEye} className="size-5 duration-100" />
    </Link>
  );
}

export default TableViewAction;
