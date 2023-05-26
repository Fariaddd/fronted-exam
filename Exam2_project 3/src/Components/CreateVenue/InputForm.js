import React, { useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { FaAngleDown } from "react-icons/fa";

const InputForm = ({
  selected,
  setSeleceted,
  userName,
  setUserName,
  desc,
  setDesc,
  price,
  setPrice,
  images,
  setImages,
}) => {
  const handleChange = (event) => {
    setSeleceted(event.target.value);
  };

  const handleImage = (e) => {
    setImages([...images, e.target.value]);
  };

  return (
    <div>
      <form className="flex flex-col gap-[36px]">
        <input
          className="w-[100%] h-[48px] lg:h-[65px] text-[18px] lg:text-[30px] text-[gray] font-bold px-[1rem] py-[10px] border rounded-[5px] focus:outline-none"
          type="text"
          id="userName"
          name="userName"
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <textarea
          className="w-[100%] lg:h-[165px] text-[18px] lg:text-[30px] text-[gray] font-bold px-[1rem] py-[10px] border rounded-[5px] focus:outline-none"
          type="text"
          id="desc"
          name="desc"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
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
              height: "65px",
              borderRadius: "8px",
              fontSize: "24px",
              fontWeight: "700",
              color: "gray",
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
            <MenuItem value={1}>Guest 1</MenuItem>
            <MenuItem value={2}>Guest 2</MenuItem>
            <MenuItem value={3}>Guest 3</MenuItem>
          </Select>
        </FormControl>
        <input
          className="w-[100%] h-[48px] lg:h-[65px] text-[18px] lg:text-[30px] text-[gray] font-bold px-[1rem] py-[10px] border rounded-[5px] focus:outline-none"
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="w-[100%] h-[48px] lg:h-[65px] text-[18px] lg:text-[30px] text-[gray] font-bold px-[1rem] py-[10px] border rounded-[5px] focus:outline-none"
          type="text"
          id="userName"
          name="images"
          placeholder="It must be a image-URL"
          onChange={handleImage}
        />
      </form>
    </div>
  );
};

export default InputForm;
