import Image from "next/image";
import React from "react";
import avatarImg from "../../../public/avatar.jpg";

const Avatar = () => {
  return (
    <div className="h-14 w-14 rounded-full shadow-md shadow-primary">
      <Image
        src={avatarImg}
        alt="profile-img"
        className="w-14 h-14 rounded-full"
      />
    </div>
  );
};

export default Avatar;
