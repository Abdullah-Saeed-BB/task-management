import Link from "next/link";

export function CreateButton() {
  return (
    <button
      type="submit"
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    >
      Create
    </button>
  );
}

export function CancelButton({ href }: { href: string }) {
  return (
    <Link
      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
      href={href}
    >
      Cancel
    </Link>
  );
}
