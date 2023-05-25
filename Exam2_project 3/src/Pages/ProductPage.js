import React, { useEffect, useState } from "react";
import productImg2 from "../Assets/product-img-2.png";
import ProductsBottom from "../Components/ProductsPage/ProductsBottom";
import Footer from "../Components/Shared/Footer";
import Carousel from "react-multi-carousel";
import { useParams } from "react-router-dom";
import { useGetVenueQuery } from "../services/venueApi";
import Loader from "../Components/Shared/Loader";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProductPage = () => {
  const { id } = useParams();
  // const [venue, setVenue] = useState({});
  const { data: venue, isLoading } = useGetVenueQuery(id);

  console.log(venue);
  if (isLoading) {
    return (
      <div className="h-[60vh] w-[100%] flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="px-[12px]">
      {/* ////// top heading ////// */}
      <h1 className="font-bold text-[32px] lg:text-[45px] text-center py-[2rem]">
        {venue?.description}
      </h1>
      {/* ////// upper 3 images ////// */}
      <Carousel responsive={responsive}>
        {venue?.media?.map((v) => (
          <div>
            <img
              className="w-[434px] h-[466px] object-contain"
              src={v}
              alt=""
            />
          </div>
        ))}
      </Carousel>
      {/* ///// bottom section ///// */}
      <ProductsBottom venue={venue} />
      {/* ////// footer ////// */}
      <Footer />
    </div>
  );
};

export default ProductPage;
