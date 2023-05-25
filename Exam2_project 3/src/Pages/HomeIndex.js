import React from "react";

import Cards from "../Components/HomeIndex/Cards";
import Footer from "../Components/Shared/Footer";

const HomeIndex = ({
  searchResult,
  search,
  handleSearch,
  isLoading,
  venues,
}) => {
  return (
    <div className="w-[100%]">
      {/* ////// top heading ////// */}

      <h1 className="font-bold text-[32px] lg:text-[76px] text-center lg:py-[2rem] hidden lg:block">
        Book your Venue holidays here!
      </h1>

      <Cards
        handleSearch={handleSearch}
        searchResult={searchResult}
        search={search}
        isLoading={isLoading}
        venues={venues}
      />

      <h3 className="text-[40px] font-bold text-center my-[82px]">More</h3>
      <Footer />
    </div>
  );
};

export default HomeIndex;
