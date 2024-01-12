import UserForm from "@/components/forms/UserForm";
import React from "react";

const UpdateProfile = () => {
  return (
    <div className="common-container">
      <div className="m max-w-5xl flex-start gap-3 justify-start w-full">
        <img src="/assets/icons/edit.svg" alt="add" width={36} height={36} />
        <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
      </div>
      <UserForm />
    </div>
  );
};

export default UpdateProfile;
