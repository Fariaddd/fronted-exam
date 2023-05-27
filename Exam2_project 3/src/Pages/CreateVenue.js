import React, { useState } from "react";
import InputForm from "../Components/CreateVenue/InputForm";
import wifiIcon from "../Assets/wifi-vector.png";
import petIcon from "../Assets/pet-icon.png";
import carIcon from "../Assets/car-icon.png";
import breakfastIcon from "../Assets/breakfast-icon.png";
import CalenderSection from "../Components/ProductsPage/CalenderSection";
import Footer from "../Components/Shared/Footer";
import { toast } from "react-toastify";
import { useCreateVenueMutation } from "../services/venueApi";
import { useNavigate } from "react-router-dom";

const CreateVenue = () => {
  const [startNEndDate, setStartNEndDate] = useState("");
  const [userName, setUserName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const user = JSON.parse(localStorage.getItem("authentication"));

  const [createVenue] = useCreateVenueMutation();
  const navigate = useNavigate();
  // DROPDOWN STATE
  const [selected, setSeleceted] = useState(0);

  const handleCreateVenue = async () => {
    if (!startNEndDate) {
      toast.warning("Please select date and add event!");
      return;
    }
    if (userName && desc && price) {
      try {
        const data = {
          name: userName,
          description: desc,
          price: parseInt(price),
          maxGuests: selected,
          rating: 5,
          meta: {
            wifi: true,
            parking: true,
            breakfast: true,
            pets: true,
          },
          media: images,
        };
        createVenue(data).then((res) => {
          if (res?.data?.id) {
            toast.success("Venue created Successfully!");
            setTimeout(() => {
              navigate("/venue-manager");
            }, 500);
          } else {
            toast.error("Failed to book");
          }
          setImages([])
        });
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error("Please Fullfilled All Requirement Data!");
    }
  };

  return (
    <div className="px-[12px]">
      {/* ////// top heading ////// */}
      <h1 className="font-bold text-[32px] lg:text-[45px] text-center py-[2rem] lg:py-[4rem]">
        Enjoy to create your own Venue!
      </h1>
      {/* /////// */}
      <div className="grid lg:grid-cols-2 gap-[48px] lg:gap-[180px]">
        {/* ////// left side ////// */}
        <div>
          <InputForm
            selected={selected}
            setSeleceted={setSeleceted}
            userName={userName}
            setUserName={setUserName}
            desc={desc}
            setDesc={setDesc}
            price={price}
            setPrice={setPrice}
            images={images}
            setImages={setImages}
          />
          <div className="flex gap-[1rem] justify-center mt-[2.5rem]">
            <p className="text-[1rem] lg:text-[30px] font-semibold">
              Owner by:{" "}
            </p>
            <div>
              <p className="text-[1rem] lg:text-[30px] font-semibold">
                {user?.name}
              </p>
              <p className="text-[1rem] lg:text-[30px] font-semibold">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
        {/* ////// right side ////// */}
        <div>
          <h4 className="text-center text-[32px] lg:text-[40px] font-bold">
            We Offer
          </h4>
          <div className="flex flex-col gap-[85px] mt-[54px]">
            <div className="flex items-center gap-[2rem] lg:gap-[96px]">
              <img
                className="w-[40px] h-[40px] object-contain"
                src={wifiIcon}
                alt="icon"
              />
              <h4 className="text-[24px] lg:text-[40px] font-bold">
                Free WiFi
              </h4>
            </div>
            <div className="flex items-center gap-[2rem] lg:gap-[96px]">
              <img
                className="w-[40px] h-[40px] object-contain"
                src={petIcon}
                alt="icon"
              />
              <h4 className="text-[24px] lg:text-[40px] font-bold">
                Animals allowed
              </h4>
            </div>
            <div className="flex items-center gap-[2rem] lg:gap-[96px]">
              <img
                className="w-[40px] h-[40px] object-contain"
                src={carIcon}
                alt="icon"
              />
              <h4 className="text-[24px] lg:text-[40px] font-bold">
                Free Parking
              </h4>
            </div>
            <div className="flex items-center gap-[2rem] lg:gap-[96px]">
              <img
                className="w-[40px] h-[40px] object-contain"
                src={breakfastIcon}
                alt="icon"
              />
              <h4 className="text-[24px] lg:text-[40px] font-bold">
                Breakfast
              </h4>
            </div>
          </div>
        </div>
      </div>
      {/* /////// mid section /////// */}
      <div className="flex justify-center mt-[48px]">
        <CalenderSection setStartNEndDate={setStartNEndDate}>

        </CalenderSection>
      </div>
      {/* ////// bottom section ////// */}

      {/* //////// submit button /////// */}
      <div className="flex justify-center mt-[48px] mb-[24px]">
        <button
          onClick={handleCreateVenue}
          className="h-[48px] lg:h-[90px] w-[1058px] bg-[#699BF7] text-[24px] lg:text-[50px] font-bold text-white rounded-[8px]"
        >
          Publish
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default CreateVenue;
