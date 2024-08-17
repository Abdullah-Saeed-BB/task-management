"use client";
import Loading from "@/components/Loading";
import { useGetClientUserQuery } from "@/lib/store/slices/apiSlice";
import EditTable from "./editTable";
import ErrorPage from "@/components/ErrorPage";

function EditUserProfile() {
  const { data, isLoading, isError } = useGetClientUserQuery();

  if (isLoading) return <Loading />;
  else if (isError) return <ErrorPage>Error fetch your data</ErrorPage>;
  else if (data) {
    return (
      <div className="md:px-10 md:py-5 px-2 py-4 space-y-5 mx-auto max-w-6xl">
        <EditTable user={data} />
      </div>
    );
  }
}

export default EditUserProfile;
