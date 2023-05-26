import { FormControlLabel, Switch } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthenticationContext } from "../App";
import {
  useAddUserMutation,
  useSignInUserMutation,
} from "../services/usersApi";
import { InfinitySpin } from "react-loader-spinner";

const Authentication = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isManager, setIsManager] = useState({
    gilad: true,
    jason: false,
    antoine: true,
  });
  const { setAuthentication } = useContext(AuthenticationContext);
  const [addUser] = useAddUserMutation();
  const [signInUser] = useSignInUserMutation();

  // handle register
  // handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no)$/;
    const userName = e.target.name.value;
    const userEmail = e.target.email.value;
    const userPassword = e.target.password.value;
    if (!emailRegex.test(userEmail)) {
      setLoading(false);
      toast.error("Email must Contain @stud.noroff.no");

      return;
    }
    addUser({
      name: userName,
      email: userEmail,
      password: userPassword,
      venueManager: isManager?.gilad,
    }).then((result) => {
      setLoading(false);
      console.log(result);
      if (result?.data?.id) {
        toast.success("Successfully Created an Account.Please login!");
      } else {
        toast.error(result?.data?.errors[0]?.message);
      }
    });
  };

  // handle signin
  // handle signin
  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no)$/;
    const userEmail = e.target.email.value;
    const userPassword = e.target.password.value;
    if (!emailRegex.test(userEmail)) {
      setLoading(false);
      toast.error("Email must Contain @stud.noroff.no");

      return;
    }
    signInUser({
      email: userEmail,
      password: userPassword,
      venueManager: false,
    }).then((result) => {
      setLoading(false);
      // console.log(result);
      if (result?.data?.name) {
        localStorage.setItem("authentication", JSON.stringify(result.data));
        toast.success("Successfully Signin in Your Account.");
        setAuthentication(result.data);
        navigate("/");
      } else {
        toast.error(result?.data?.errors[0]?.message);
      }
    });
  };

  const handleChange = (event) => {
    setIsManager({
      ...isManager,
      [event.target.name]: event.target.checked,
    });
  };
  if (loading) {
    return (
      <div className="w-[10%] min-h-screen flex flex-col lg:flex-row justify-center items-center gap-[2rem] lg:gap-[5rem] py-[2rem] lg:py-0 px-[12px] lg:px-0">
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }
  return (
    <div className="w-[90%] min-h-screen flex flex-col lg:flex-row justify-center items-center gap-[2rem] lg:gap-[5rem] py-[2rem] lg:py-0 px-[12px] lg:px-0">
      <div className="lg:w-[600px] p-[22px] rounded-[8px] border border-black">
        <h1 className="text-[48px] lg:text-[76px] text-center font-bold">
          Sign-in
        </h1>
        <form
          onSubmit={handleSignin}
          className="flex flex-col  gap-[42px] mt-[50px]"
        >
          <div className="flex flex-col">
            <label
              className="text-[20px] lg:text-[30px] font-bold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-[100%] h-[48px] lg:h-[65px] text-[20px] lg:text-[30px] font-bold px-[1rem] rounded-[8px] border focus:outline-none"
              type="text"
              id="email"
              name="email"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-[20px] lg:text-[30px] font-bold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-[100%] h-[48px] lg:h-[65px] text-[20px] lg:text-[30px] font-bold px-[1rem] rounded-[8px] border focus:outline-none"
              type="password"
              id="password"
              name="password"
            />
          </div>
          <div className="flex justify-center mt-[32px] lg:mt-[68px]">
            <button className="bg-[#B1C4E0] w-[242px] h-[48px] lg:h-[65px] text-[20px] lg:text-[30px] font-bold rounded-[8px]">
              Sign in
            </button>
          </div>
        </form>
      </div>
      <div className="lg:w-[600px] p-[22px] rounded-[8px] border border-black">
        <h1 className="text-[32px] lg:text-[76px] text-center font-bold">
          Sign-up
        </h1>
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-[42px] mt-[50px]"
        >
          <div className="flex flex-col">
            <label
              className="text-[20px] lg:text-[30px] font-bold"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-[100%] h-[48px] lg:h-[65px] text-[20px] lg:text-[30px] font-bold px-[1rem] rounded-[8px] border focus:outline-none"
              type="text"
              id="name"
              name="name"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-[20px] lg:text-[30px] font-bold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-[100%] h-[48px] lg:h-[65px] text-[20px] lg:text-[30px] font-bold px-[1rem] rounded-[8px] border focus:outline-none"
              type="text"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-[20px] lg:text-[30px] font-bold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-[100%] h-[48px] lg:h-[65px] text-[20px] lg:text-[30px] font-bold px-[1rem] rounded-[8px] border focus:outline-none"
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={isManager.gilad}
                  onChange={handleChange}
                  name="gilad"
                />
              }
              label="Manager?"
            />
          </div>
          <div className="flex justify-center">
            <button className="bg-[#B1C4E0] w-[242px] h-[48px] lg:h-[65px] text-[20px] lg:text-[30px] font-bold rounded-[8px]">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
