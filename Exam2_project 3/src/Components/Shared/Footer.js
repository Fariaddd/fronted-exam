import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between p-[32px] rounded-[5px] border mb-[1rem] gap-[2rem] lg:gap-0">
      {/* ///// first group ///// */}
      <div className="w-[100%] lg:w-fit p-[32px] rounded-[5px] border flex flex-col items-center gap-[1rem]">
        <h3 className="text-[32px] font-bold">Address</h3>
        <h4 className="text-[24px] font-bold">Osloveien 2, 1801</h4>
        <div className="flex items-center gap-[1.5rem]">
          <span className="text-[#85B6FF] text-[2.5rem]">
            <FaFacebook />
          </span>
          <span className="text-[#85B6FF] text-[2.5rem]">
            <FaTwitter />
          </span>
          <span className="text-[#85B6FF] text-[2.5rem]">
            <FaInstagram />
          </span>
        </div>
      </div>
      {/* ///// second group ///// */}
      <div className="w-[100%] lg:w-[378px] p-[32px] rounded-[5px] border flex flex-col items-center gap-[1rem]">
        <h3 className="text-[32px] font-bold">Support</h3>
        <h4 className="text-[24px] text-center leading-loose font-normal">
          Help center <br /> COVID-19 Response <br /> Air-Cover
        </h4>
      </div>
      {/* ///// third group ///// */}
      <div className="w-[100%] lg:w-[378px] p-[32px] rounded-[5px] border flex flex-col items-center text-center gap-[1rem]">
        <h3 className="text-[32px] font-bold">VENUE-HOLIDAY</h3>
        <h4 className="text-[24px] text-center leading-loose font-normal">Newsroom <br /> Careers <br /> Investors</h4>
      </div>
    </div>
  );
};

export default Footer;
