import Link from "next/link";

export function CreateButton({ disabled }: { disabled: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`px-4 py-2 text-white rounded-md ${
        disabled ? "bg-blue-800" : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      Create
    </button>
  );
}

export function CancelButton({ href }: { href: string }) {
  return (
    <Link
      className="px-4 py-2 bg-gray-300 text-gray-700 focus:opacity-70 rounded-md hover:bg-gray-400"
      href={href}
    >
      Cancel
    </Link>
  );
}
