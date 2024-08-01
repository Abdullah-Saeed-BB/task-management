import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function TableViewAction({ link }: { link: string }) {
  return (
    <Link href={link}>
      <FontAwesomeIcon
        icon={faEye}
        className="size-5 text-slate-500 hover:text-slate-600 duration-100"
      />
    </Link>
  );
}

export default TableViewAction;
