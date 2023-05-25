import React, { useState } from "react";
import microwaveIcon from "../../Assets/microwave-icon.png";
import poolIcon from "../../Assets/pool-icon.png";
import kitchenIcon from "../../Assets/kichen-icon.png";
import tennisIcon from "../../Assets/tennis-icon.png";
import fridgeIcon from "../../Assets/fridge-icon.png";
import skiIcon from "../../Assets/ski-icon.png";
import washingIcon from "../../Assets/wahsing-icon.png";
import valleyIcon from "../../Assets/valley-icon.png";
import CalenderSection from "./CalenderSection";
import { FormControl, MenuItem, Select } from "@mui/material";
import { FaAngleDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { useBookVenueMutation } from "../../services/venueApi";

const ProductsBottom = ({ venue }) => {
  const [startNEndDate, setStartNEndDate] = useState("");
  const [bookVenue] = useBookVenueMutation();
  // DROPDOWN STATE
  const [selected, setSeleceted] = useState("Guest 1");
  const handleChange = (event) => {
    setSeleceted(event.target.value);
  };

  const hanldeBooking = async () => {
    const dateFrom = startNEndDate?.from?.toISOString();
    const dateTo = startNEndDate?.to?.toISOString();
    const guests = Number(selected?.split(" ")[1]);
    const venueId = venue?.id;
    const authorizationValue = JSON.parse(
      localStorage.getItem("authentication")
    )?.accessToken;

    if (dateFrom && dateTo && guests && venueId && authorizationValue) {
      try {
        bookVenue({ venueId, guests, dateFrom, dateTo }).then((res) => {
          console.log(res);
          if (res?.data?.id) {
            toast.success("Successfully Booked!");
          } else {
            toast.error("Failed to book!");
          }
        });
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error("Please Fullfilled all requirements value.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-[60px] mt-[26px]">
      {/* ////// left side ////// */}
      <div>
        {/* ///// first group ///// */}
        <div>
          <h3 className="text-[36px] font-bold text-center">
            The place offers
          </h3>
          {/* ////// */}
          <div className="grid grid-cols-2 gap-[48px] lg:gap-[85px] mt-[1rem]">
            {/* /// */}
            <div className="flex items-center gap-[26px]">
              <img
                className="w-[40px] h-[40px] object-contain"
                src={microwaveIcon}
                alt="icon"
              />
              <p className="text-[20px] font-semibold">Microwave</p>
            </div>
            {/* /// */}
            <div className="flex items-center gap-[26px]">
              <img
                className="w-[40px] h-[40px] object-contain"
                src={poolIcon}
                alt="icon"
              />
              <p className="text-[20px] font-semibold">Pool</p>
            </div>
            {/* /// */}
            <div className="flex items-center gap-[26px]">
              <img
                className="w-[40px] h-[40px] object-contain"
                src={kitchenIcon}
                alt="icon"
              />
              <p className="text-[20px] font-semibold">Kitchen</p>
            </div>
            {/* /// */}
            <div className="flex items-center gap-[26px]">
              <img
                className="w-[40px] h-[40px] object-contain"
                src={tennisIcon}
                alt="icon"
              />
              <p className="text-[20px] font-semibold">Tennis</p>
            </div>
            {/* /// */}
            <div className="flex items-center gap-[26px]">
              <img
                className="w-[40px] h-[40px] object-contain"
                src={fridgeIcon}
                alt="icon"
              />
              <p className="text-[20px] font-semibold">Fridge</p>
            </div>
            {/* /// */}
            <div className="flex items-center gap-[26px]">
              <img
                className="w-[40px] h-[40px] object-contain"
                src={skiIcon}
                alt="icon"
              />
              <p className="text-[20px] font-semibold">Ski-in / Ski-out</p>
            </div>
            {/* /// */}
            <div className="flex items-center gap-[26px]">
              <img
                className="w-[40px] h-[40px] object-contain"
                src={washingIcon}
                alt="icon"
              />
              <p className="text-[20px] font-semibold">washing M</p>
            </div>
            {/* /// */}
            <div className="flex items-center gap-[26px]">
              <img
                className="w-[40px] h-[40px] object-contain"
                src={valleyIcon}
                alt="icon"
              />
              <p className="text-[20px] font-semibold">Valley view</p>
            </div>
          </div>
        </div>
        {/* ///// hr ////// */}
        <hr className="my-[22px]" />
        {/* ///// Calender Section ////// */}
        <CalenderSection setStartNEndDate={setStartNEndDate} />
        {/* ////// Select Guest Section ////// */}
        <div className=" flex flex-col items-center gap-[10px] pb-[22px]">
          <FormControl className="w-[100%]">
            <Select
              displayEmpty
              value={selected}
              onChange={handleChange}
              IconComponent={FaAngleDown}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <span>Guest 1</span>;
                }
                return selected;
              }}
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                height: "47px",
                borderRadius: "8px",
                fontSize: "24px",
                fontWeight: "700",
                color: "black",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#D9D9D9",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#D9D9D9",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#D9D9D9",
                },
                ".MuiSvgIcon-root ": {
                  fill: "white !important",
                },
              }}
            >
              <MenuItem value={"Guest 1"}>Guest 1</MenuItem>
              <MenuItem value={"Guest 2"}>Guest 2</MenuItem>
            </Select>
          </FormControl>
          <p className="w-[100%] h-[48px] flex items-center justify-between px-[1rem] rounded-[5px] border font-bold uppercase">
            <span>Total</span>{" "}
            <span>${`${venue?.price * Number(selected?.split(" ")[1])}`}</span>
          </p>
          <button
            onClick={hanldeBooking}
            className="w-[100%] h-[48px] bg-[#D9D9D9] rounded-[5px] font-bold"
          >
            BOOK NOW
          </button>
        </div>
      </div>
      {/* ////// right side ////// */}
      <div className="mb-[2rem] lg:mb-0">
        <p className="text-[20px] lg:text-[32px] font-semibold text-center tracking-[.3rem]">
          This is the dude Lebowski and I'm renting out my pad. It's a real cozy
          spot with a nice rug that really ties the room together, you know? My
          place has got everything you need to abide, man. A big screen TV to
          watch your favorite flicks, a comfy sofa to lounge on, and a fully
          stocked fridge with White Russians and other essentials. You can crash
          in the master bedroom, where you'll find a king-sized bed that's
          perfect for a lazy Sunday morning. Or if you prefer, you can take a
          nap on the rug in the living room, it's really soft.Oh, and don't
          worry about making a mess, man. Just remember to roll a jay, sit back
          and relax. The dude abides, you should too.
        </p>
      </div>
    </div>
  );
};

export default ProductsBottom;
