import React, { useState } from "react";
import SideBar from "../Components/Shared/SideBar";
import { Outlet } from "react-router-dom";

const Home = ({handleSearch}) => {
  
  return (
    <div className="flex flex-col lg:flex-row relative">
      <SideBar handleSearch={handleSearch} />
      <div className="container m-auto">
        <Outlet
          
        />
      </div>
    </div>
  );
};

export default Home;
