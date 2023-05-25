import React from "react";
import user from "../Assets/profile.png";
const Profile = () => {
  const auth = JSON.parse(localStorage.getItem("authentication"));
  return (
    <div className="mt-[20px] bg-slate-200 p-[20px]">
      <div className="flex justify-center items-center flex-col">
        <div>
          <img src={user} height={"150px"} width={"150px"} alt="user" />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-[24px] font-bold mb-[15px]">{auth?.name}</h1>
          <p className="font-bold">{auth?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
