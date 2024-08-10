"use client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import EditTable from "./editTable";
import { useGetTaskQuery } from "@/lib/store/slices/apiSlice";
import Loading from "@/components/Loading";

function EditTask({ params }: { params: Params }) {
  const { taskId } = params;

  const { data, isLoading, isError } = useGetTaskQuery(taskId);
  if (isLoading)
    return (
      <div className="mt-24">
        <Loading />
      </div>
    );
  else if (isError) return <div>Error fetch task data</div>;
  else if (data)
    return (
      <div>
        <EditTable task={data} />
      </div>
    );
}

export default EditTask;
