import React, { useEffect, useState } from "react";
import personsImg from "../../Assets/persons-vector.png";
import bedImg from "../../Assets/bed-vecotor.png";
import wifiImg from "../../Assets/wifi-vector.png";
import { GoPrimitiveDot } from "react-icons/go";
import southParkVillaImg from "../../Assets/south-park-villa.png";
import testHouseImg from "../../Assets/test-house.png";
import newZealandImg from "../../Assets/new-zealand.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../Shared/Loader";
import { useGetVenuesQuery } from "../../services/venueApi";
import logo from "../../Assets/logo.png";
import {BsSearch } from "react-icons/bs";
const Cards = ({searchResult, search, handleSearch, isLoading, venues}) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div >
      <div className="sticky top-1 bg-[#EAEAEA]  flex items-end justify-between mx-auto w-[90%]">
        <img
          src={logo}
          className="block lg:hidden cursor-pointer"
          height={60}
          width={60}
          alt="hello"
          onClick={() => navigate("/")}
        />
        <input
          className="sticky top-0 bg-[#D9D9D9]  w-[85%] border-[#7c7c7c8f] border-[1px] outline-none px-[22px] py-[10px] rounded-full block  mt-[10px] lg:hidden"
          placeholder="Search"
          onChange={handleSearch}
        />

      </div>
      </div>

      <div className="flex flex-col gap-[160px] mt-[2.5rem]">
        {!isLoading ? (
          <>
            {!search ? (
              <>
                {venues?.map((venue) => {
                  return (
                    <div
                      className="flex flex-col md:flex-row gap-[20px] p-[32px] rounded-[5px] border"
                      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                      key={venue?.id}
                    >
                      {/* ///// img side ///// */}
                      <div>
                        <h2 className="text-[24px] lg:text-[32px] font-semibold">
                          {venue?.name}
                        </h2>
                        <img
                          className="w-[100%] lg:w-[580px] h-[220px] lg:h-[377px] object-fill"
                          src={venue?.media[0]}
                          alt="village_img"
                        />
                      </div>
                      {/* ///// right side ///// */}
                      <div className="grow mt-0 lg:mt-[3rem]">
                        {/* //// */}
                        <div className="flex gap-[.5rem] justify-between">
                          <div className="flex flex-col items-center gap-[1rem]">
                            <img
                              className="w-[50px] h-[50px] lg:w-[70px] lg:h-[70px] object-contain"
                              src={personsImg}
                              alt="person_icon"
                            />
                            <p
                              className="text-[14px] md:text-[1rem] text-center border border-black px-[.5rem] py-[.3rem] rounded-[4px] font-bold"
                              style={{
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                              }}
                            >
                              Max {venue?.maxGuests} Persons
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-[1rem]">
                            <img
                              className="w-[50px] h-[50px] lg:w-[70px] lg:h-[70px] object-contain"
                              src={bedImg}
                              alt="person_icon"
                            />
                            <p
                              className="text-[14px] md:text-[1rem] text-center border border-black px-[.5rem] py-[.3rem] rounded-[4px] font-bold"
                              style={{
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                              }}
                            >
                              3 bedrooms
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-[1rem]">
                            <img
                              className="w-[50px] h-[50px] lg:w-[70px] lg:h-[70px] object-contain"
                              src={wifiImg}
                              alt="person_icon"
                            />
                            <p
                              className="text-[14px] md:text-[1rem] text-center border border-black px-[.5rem] py-[.3rem] rounded-[4px] font-bold"
                              style={{
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                              }}
                            >
                              Free WiFi
                            </p>
                          </div>
                        </div>
                        {/* //// */}
                        <div className="flex flex-col lg:flex-row flex-wrap items-center justify-center md:justify-around mt-[48px] lg:mt-[86px] gap-[1rem] md:gap-0">
                          {venue?.meta?.pets && (
                            <div className="flex items-center gap-[6px]">
                              <span className="text-[1.5rem]">
                                <GoPrimitiveDot />
                              </span>
                              <p className="font-bold">Animals allowed</p>
                            </div>
                          )}
                          {venue?.meta?.breakfast && (
                            <div className="flex items-center gap-[6px]">
                              <span className="text-[1.5rem]">
                                <GoPrimitiveDot />
                              </span>
                              <p className="font-bold">Free Breakfast</p>
                            </div>
                          )}
                          {venue?.meta?.parking && (
                            <div className="flex items-center gap-[6px]">
                              <span className="text-[1.5rem]">
                                <GoPrimitiveDot />
                              </span>
                              <p className="font-bold">Free Parking</p>
                            </div>
                          )}
                          {venue?.meta?.wifi && (
                            <div className="flex items-center gap-[6px]">
                              <span className="text-[1.5rem]">
                                <GoPrimitiveDot />
                              </span>
                              <p className="font-bold">Free Wifi</p>
                            </div>
                          )}
                        </div>
                        {/* //// */}
                        <div className="flex flex-col md:flex-row items-center justify-end gap-[14px] mt-[48px] lg:mt-[86px]">
                          <h1 className="text-[32px] font-bold">
                            {venue?.price}$-3days
                          </h1>
                          <button
                            onClick={() => navigate(`/products/${venue?.id}`)}
                            className="bg-[#B1C4E0] w-[256px] h-[64px] text-[32px] font-bold rounded-[5px]"
                          >
                            Book now
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {searchResult?.map((venue) => {
                  return (
                    <div
                      className="flex flex-col md:flex-row gap-[20px] p-[32px] rounded-[5px] border"
                      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                      key={venue?.id}
                    >
                      {/* ///// img side ///// */}
                      <div>
                        <h2 className="text-[24px] lg:text-[32px] font-semibold">
                          {venue?.name}
                        </h2>
                        <img
                          className="w-[100%] lg:w-[580px] h-[220px] lg:h-[377px] object-fill"
                          src={venue?.media[0]}
                          alt="village_img"
                        />
                      </div>
                      {/* ///// right side ///// */}
                      <div className="grow mt-0 lg:mt-[3rem]">
                        {/* //// */}
                        <div className="flex gap-[.5rem] justify-between">
                          <div className="flex flex-col items-center gap-[1rem]">
                            <img
                              className="w-[50px] h-[50px] lg:w-[70px] lg:h-[70px] object-contain"
                              src={personsImg}
                              alt="person_icon"
                            />
                            <p
                              className="text-[14px] md:text-[1rem] text-center border border-black px-[.5rem] py-[.3rem] rounded-[4px] font-bold"
                              style={{
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                              }}
                            >
                              Max {venue?.maxGuests} Persons
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-[1rem]">
                            <img
                              className="w-[50px] h-[50px] lg:w-[70px] lg:h-[70px] object-contain"
                              src={bedImg}
                              alt="person_icon"
                            />
                            <p
                              className="text-[14px] md:text-[1rem] text-center border border-black px-[.5rem] py-[.3rem] rounded-[4px] font-bold"
                              style={{
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                              }}
                            >
                              3 bedrooms
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-[1rem]">
                            <img
                              className="w-[50px] h-[50px] lg:w-[70px] lg:h-[70px] object-contain"
                              src={wifiImg}
                              alt="person_icon"
                            />
                            <p
                              className="text-[14px] md:text-[1rem] text-center border border-black px-[.5rem] py-[.3rem] rounded-[4px] font-bold"
                              style={{
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                              }}
                            >
                              Free WiFi
                            </p>
                          </div>
                        </div>
                        {/* //// */}
                        <div className="flex flex-col lg:flex-row flex-wrap items-center justify-center md:justify-around mt-[48px] lg:mt-[86px] gap-[1rem] md:gap-0">
                          {venue?.meta?.pets && (
                            <div className="flex items-center gap-[6px]">
                              <span className="text-[1.5rem]">
                                <GoPrimitiveDot />
                              </span>
                              <p className="font-bold">Animals allowed</p>
                            </div>
                          )}
                          {venue?.meta?.breakfast && (
                            <div className="flex items-center gap-[6px]">
                              <span className="text-[1.5rem]">
                                <GoPrimitiveDot />
                              </span>
                              <p className="font-bold">Free Breakfast</p>
                            </div>
                          )}
                          {venue?.meta?.parking && (
                            <div className="flex items-center gap-[6px]">
                              <span className="text-[1.5rem]">
                                <GoPrimitiveDot />
                              </span>
                              <p className="font-bold">Free Parking</p>
                            </div>
                          )}
                          {venue?.meta?.wifi && (
                            <div className="flex items-center gap-[6px]">
                              <span className="text-[1.5rem]">
                                <GoPrimitiveDot />
                              </span>
                              <p className="font-bold">Free Wifi</p>
                            </div>
                          )}
                        </div>
                        {/* //// */}
                        <div className="flex flex-col md:flex-row items-center justify-end gap-[14px] mt-[48px] lg:mt-[86px]">
                          <h1 className="text-[32px] font-bold">
                            {venue?.price}$-3days
                          </h1>
                          <button
                            onClick={() => navigate(`/products/${venue?.id}`)}
                            className="bg-[#B1C4E0] w-[256px] h-[64px] text-[32px] font-bold rounded-[5px]"
                          >
                            Book now
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </>
        ) : (
          <div className="h-[60vh] w-[100%] flex justify-center items-center">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

export default Cards;
