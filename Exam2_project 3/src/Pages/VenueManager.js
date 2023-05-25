import React, { useContext, useState } from "react";
import CalenderSection from "../Components/ProductsPage/CalenderSection";
import img from "../Assets/Skjermbilde 2023-04-26 kl. 02.59 7.png";
import {
  useDeleteVenueMutation,
  useGetVenuesByProfileQuery,
  useUpdateVenueMutation,
} from "../services/venueApi";
import { AuthenticationContext } from "../App";
import { toast } from "react-toastify";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "gray",
    zIndex: 10000,
  },
};

const VenueManager = () => {
  const [startNEndDate, setStartNEndDate] = useState("");
  const user = JSON.parse(localStorage.getItem("authentication"));
  const { data } = useGetVenuesByProfileQuery(user?.name);
  const [userName, setUserName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [deleteVenue] = useDeleteVenueMutation();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [updateVenue] = useUpdateVenueMutation();
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleDelete = (id) => {
    deleteVenue(id).then((res) => toast.success("Venue deleted successfully!"));
  };

  const handleUpdate = () => {
    const data = {
      name: userName,
      description: desc,
      price: parseInt(price),
    };
    updateVenue({ data: data, id: selectedId }).then((res) => {
      toast.success("Venue Updated Successfully");
      closeModal();
      setPrice("");
      setDesc("");
      setSelectedId("");
      setUserName("");
    });
  };

  return (
    <div className="px-[12px] lg:px-0 pb-[3rem]">
      {/* ////// top heading ////// */}
      <h1 className="font-bold text-[32px] lg:text-[45px] text-center py-[2rem] lg:py-[4rem]">
        Your Venues
      </h1>
      <h3 className="font-bold text-[32px] lg:text-[45px] py-[1rem] lg:py-[4rem]">
        You have {data?.length} Venue
      </h3>
      {/* ////// */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[3rem]">
        {data?.map((d) => (
          <>
            <div className="lg:h-[550px]  relative">
              <div className="grid lg:grid-cols-2 items-center gap-[1rem] lg:mt-[48px]">
                <CalenderSection
                  startNEndDate={startNEndDate}
                  setStartNEndDate={setStartNEndDate}
                />

                {d?.media?.length > 1 ? (
                  <>
                    <div className="grid lg:grid-cols-2 gap-[22px]">
                      {d?.media?.map((m) => (
                        <img
                          className="w-[100%] h-[300px] object-cover"
                          src={m}
                          alt=""
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      className="w-[100%] h-[300px] object-contain"
                      src={d?.media[0]}
                      alt=""
                    />
                  </>
                )}

                <div>{d?.name}</div>
                <div>{d?.description}</div>
              </div>
              <div className="flex gap-[3rem] mt-[48px] lg:absolute bottom-[20px] w-[70%] left-[15%]">
                <button
                  onClick={() => handleDelete(d?.id)}
                  className="px-[20px] flex items-center justify-center h-[48px] lg:h-[67px] w-[100%] text-[20px] lg:text-[40px] font-bold bg-[#B1C4E0] rounded-[8px]"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    openModal();
                    setSelectedId(d?.id);
                  }}
                  className="px-[20px] flex items-center justify-center h-[48px] lg:h-[67px] w-[100%] text-[20px] lg:text-[40px] font-bold bg-[#B1C4E0] rounded-[8px]"
                >
                  Update
                </button>
              </div>
            </div>

            {/* ////// */}
          </>
        ))}
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {" "}
          <div className="mb-[10px]">
            <input
              className="w-[100%] h-[48px] lg:h-[65px] text-[18px] lg:text-[30px] text-[gray] font-bold px-[1rem] py-[10px] border rounded-[5px] focus:outline-none"
              type="text"
              id="userName"
              name="userName"
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-[10px]">
            <textarea
              className="w-[100%] lg:h-[165px] text-[18px] lg:text-[30px] text-[gray] font-bold px-[1rem] py-[10px] border rounded-[5px] focus:outline-none"
              type="text"
              id="desc"
              name="desc"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="mb-[10px]">
            <input
              className="w-[100%] h-[48px] lg:h-[65px] text-[18px] lg:text-[30px] text-[gray] font-bold px-[1rem] py-[10px] border rounded-[5px] focus:outline-none"
              type="text"
              id="price"
              name="price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-[10px]">
            <div className="flex justify-around items-center">
              <button
                onClick={handleUpdate}
                className="bg-[green] w-[100px] lg:w-[150px] h-[40px] text-white font-bold rounded-sm block"
              >
                Update
              </button>
              <button
                onClick={closeModal}
                className="bg-[red] w-[100px] lg:w-[150px] h-[40px] text-white font-bold rounded-sm block"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default VenueManager;
