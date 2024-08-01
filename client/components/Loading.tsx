import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Loading() {
  return (
    <div className="w-full flex justify-center">
      <FontAwesomeIcon
        icon={faSpinner}
        className="size-10 animate-spin text-slate-500"
      />
    </div>
  );
}

export default Loading;
