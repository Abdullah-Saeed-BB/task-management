import { Metadata } from "next";
import CreateForm from "./CreateForm";

export const metadata: Metadata = {
  title: "Create User",
  description: "Create user form page",
};

function CreateUserPage() {
  return (
    <div className="md:px-10 md:py-5 px-2 py-4 space-y-5 mx-auto max-w-4xl">
      <CreateForm />
    </div>
  );
}

export default CreateUserPage;
