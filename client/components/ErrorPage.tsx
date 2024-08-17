import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ErrorPage({ children }: { children: string }) {
  return (
    <div className="my-20 text-center mx-auto w-fit text-3xl text-slate-500 px-4 relative">
      <span className="absolute left-10 -top-10 -z-10 text-slate-200 font-bold">
        <FontAwesomeIcon icon={faXmark} size="4x" />
      </span>
      <span className="absolute right-10 -top-10 -z-10 text-slate-200 font-bold">
        <FontAwesomeIcon icon={faXmark} size="4x" />
      </span>
      {children}
    </div>
  );
}

export default ErrorPage;
