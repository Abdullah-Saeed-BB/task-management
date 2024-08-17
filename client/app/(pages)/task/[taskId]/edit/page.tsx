"use client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import EditTable from "./editTable";
import { useGetTaskQuery } from "@/lib/store/slices/apiSlice";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/ErrorPage";

function EditTask({ params }: { params: Params }) {
  const { taskId } = params;

  const { data, isLoading, isError } = useGetTaskQuery(taskId);
  if (isLoading)
    return (
      <div className="mt-24">
        <Loading />
      </div>
    );
  else if (isError) return <ErrorPage>Error fetch task data</ErrorPage>;
  else if (data)
    return (
      <div className="md:px-10 md:py-5 px-2 py-4 space-y-5 mx-auto max-w-6xl">
        <EditTable task={data} />
      </div>
    );
}

export default EditTask;
