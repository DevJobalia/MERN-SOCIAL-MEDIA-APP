import { useGetUsers } from "@/lib/react-query/queriesAndMutation";
import React from "react";
import Loader from "./Loader";
import { Button } from "../ui/button";

const Rightbar = () => {
  const { data: users, isPending } = useGetUsers();
  if (isPending) {
    <Loader />;
  }
  return (
    <div className="hidden md:flex flex-col px-6 py-10 min-w-[370px] bg-dark-2">
      <h2 className="h3-bold md:h2-bold w-full mb-5">Top Creators</h2>
      {/* square */}
      <div className="grid grid-cols-2  gap-5">
        {users?.documents.map((user) => (
          <div
            className="bg-dark-2 rounded-3xl border border-dark-4 lg:px-14 lg:py-7 flex flex-col items-center gap-2"
            key={user.$id}
          >
            {/* photo */}
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            {/* name */}
            <div className="flex flex-col items-center">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
            {/* follow button */}
            <Button type="button" className="shad-button_primary">
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rightbar;
