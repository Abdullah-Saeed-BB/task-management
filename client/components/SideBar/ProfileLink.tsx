"use client";
import Link from "next/link";
import Avatar from "boring-avatars";
import LogoutButton from "./LogoutButton";
import { useGetClientUserQuery } from "@/lib/store/slices/apiSlice";

function ProfileLink() {
  const { data: user, isLoading, isError } = useGetClientUserQuery();
  if (!isLoading) {
    return (
      <div className="flex items-center justify-between">
        {!isError && user && (
          <Link
            href={`/users/${user.id}`}
            className="flex transition-opacity focus:opacity-70 lg:flex-row items-center gap-3"
          >
            <span className="rounded-full drop-shadow-md border border-slate-200">
              <Avatar name={user.id} variant="beam" size="3rem" />
            </span>
            <div className="block md:hidden lg:block">
              <h3 className="text-lg">{user.name}</h3>
              <p className="capitalize text-sm text-slate-500">
                {user.role.toLocaleLowerCase()}
              </p>
            </div>
          </Link>
        )}
        <LogoutButton />
      </div>
    );
  }
}

export default ProfileLink;
