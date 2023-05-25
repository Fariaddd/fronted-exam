import React, { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TbBrandBooking, TbPhoneCall } from "react-icons/tb";
import { MdMobileFriendly, MdWifiCalling3 } from "react-icons/md";
import { Drawer } from "@mui/material";
import { AuthenticationContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { BsHouseAdd, BsPlusLg, BsSearch } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import logo from "../../Assets/logo.png";
const SideBar = ({ handleSearch }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { authentication, setAuthentication } = useContext(
    AuthenticationContext
  );
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("authentication"));
    console.log(auth);
    setAuthentication(auth);
  }, []);
  useEffect(() => {
    if (!authentication) {
      navigate("/authentication");
    }
  }, [authentication, navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("authentication");
    setAuthentication({});
    navigate("/authentication");
  };

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollPos > currentScrollPos;

    setPrevScrollPos(currentScrollPos);
    setVisible(visible);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible]);

  return (
    <div>
      {/* ///////// for large screen ////////// */}
      <div className="sticky top-0 w-fit min-h-screen overflow-y-auto hidden lg:flex flex-col items-center p-[1rem] bg-[#D9D9D9] md:pb-[200px]">
        {/* ///// top logo ///// */}
        {authentication?.email ? (
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <img
              className="w-[181px] h-[186px] object-contain"
              src={logo}
              alt="logo"
            />
          </div>
        ) : (
          <div>
            <img
              className="w-[181px] h-[186px] object-contain"
              src={logo}
              alt="logo"
            />
          </div>
        )}

        {/* ///// navigate options ///// */}
        <div className="flex flex-col items-center gap-[48px] mt-[64px]">
          {/* ///// */}
          {authentication?.email ? (
            <>
              <div
                onClick={() => navigate("/")}
                className="flex items-center gap-[8px] cursor-pointer"
              >
                <span className="text-[#85B6FF] text-[2.5rem]">
                  <BsSearch />
                </span>
                {/* <p className="bg-white w-[134px] h-[54px] flex justify-center items-center text-[23px] font-bold rounded-[12px]">
                  Search
                </p> */}
                <input
                  className="w-[134px] h-[54px] border-[#7c7c7c8f] border-[1px] bg-[#D9D9D9] outline-none px-[10px] py-[12px] rounded-full  mt-[10px] hidden lg:block"
                  placeholder="Search"
                  onChange={handleSearch}
                />
              </div>
              {authentication?.venueManager && (
                <div
                  onClick={() => navigate("/create-venue")}
                  className="flex items-center gap-[8px] cursor-pointer"
                >
                  <span className="text-[#85B6FF] text-[2.5rem]">
                    <BsHouseAdd />
                  </span>
                  <p className="bg-white w-[134px] h-[54px] flex justify-center items-center text-[23px] font-bold rounded-[12px]">
                    Add Venue
                  </p>
                </div>
              )}
              {/* ///// */}
              <div
                onClick={() => navigate("/my-profile")}
                className="flex items-center gap-[8px] cursor-pointer"
              >
                <span className="text-[#85B6FF] text-[2.5rem]">
                  <CgProfile />
                </span>
                <p className="bg-white w-[134px] h-[54px] flex justify-center items-center text-[23px] font-bold rounded-[12px]">
                  Accounts
                </p>
              </div>
              {/* ///// */}
              <div
                onClick={() => navigate("/venue-manager")}
                className="flex items-center gap-[8px] cursor-pointer"
              >
                <span className="text-[#85B6FF] text-[2.5rem]">
                  <TbBrandBooking />
                </span>
                <p className="bg-white w-[134px] h-[54px] flex justify-center items-center text-[23px] font-bold rounded-[12px]">
                  Venues
                </p>
              </div>
              {/* ///// */}
              <div className="flex items-center gap-[8px] cursor-pointer">
                <span className="text-[#85B6FF] text-[2.5rem]">
                  <TbPhoneCall />
                </span>
                <p className="bg-white w-[134px] h-[54px] flex justify-center items-center text-[23px] font-bold rounded-[12px]">
                  Contacts
                </p>
              </div>
              <div
                onClick={handleSignOut}
                className="flex items-center gap-[8px] cursor-pointer"
              >
                <span className="text-[#85B6FF] text-[2.5rem]">
                  <MdMobileFriendly />
                </span>
                <p className="bg-white w-[134px] h-[54px] flex justify-center items-center text-[23px] font-bold rounded-[12px]">
                  Log out
                </p>
              </div>
            </>
          ) : (
            <div
              onClick={() => navigate("/authentication")}
              className="flex items-center gap-[8px] cursor-pointer"
            >
              <span className="text-[#85B6FF] text-[2.5rem]">
                <MdMobileFriendly />
              </span>
              <p className="bg-white w-[134px] h-[54px] flex justify-center items-center text-[23px] font-bold rounded-[12px]">
                Log in
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ////////// for small screen ////////// */}
      <div className={`bottomBar ${visible ? "" : "hidden"} lg:hidden`}>
        {authentication?.email ? (
          <>
            <div className="flex justify-around items-center w-[100%]">
              <div
                onClick={handleSignOut}
                className="flex flex-col items-center"
              >
                <BiLogOut className="text-[24px] text-[#85B6FF] cursor-pointer" />
                <p className="text-[12px]">Logout</p>
              </div>
              {authentication?.venueManager ? (
                <div
                  onClick={() => navigate("/create-venue")}
                  className="flex flex-col items-center"
                >
                  <BsHouseAdd className="text-[24px] text-[#85B6FF] cursor-pointer" />
                  <p className="text-[12px]">Add Venue</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <MdWifiCalling3 className="text-[24px] text-[#85B6FF] cursor-pointer" />
                  <p className="text-[12px]">Contact Us</p>
                </div>
              )}
              <div
                onClick={() => navigate("/venue-manager")}
                className="flex flex-col items-center"
              >
                <TbBrandBooking className="text-[24px] text-[#85B6FF] cursor-pointer" />
                <p className="text-[12px]">My Venues</p>
              </div>
              <div
                onClick={() => navigate("/my-profile")}
                className="flex flex-col items-center"
              >
                <CgProfile className="text-[24px] text-[#85B6FF] cursor-pointer" />
                <p className="text-[12px]">Account</p>
              </div>
              <div
                onClick={() => navigate("/")}
                className="flex flex-col items-center"
              >
                <TbBrandBooking className="text-[24px] text-[#85B6FF] cursor-pointer" />
                <p className="text-[12px]">Venues</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => navigate("/authentication")}
              className="flex flex-col items-center"
            >
              <MdMobileFriendly className="text-[24px] text-[#85B6FF] cursor-pointer" />
              <p className="text-[12px]">Login</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
