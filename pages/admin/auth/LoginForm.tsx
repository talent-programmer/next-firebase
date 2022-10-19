import { BsEye, BsEyeSlash } from "react-icons/bs";
import React, { useState } from "react";

import { LOGIN } from "../../../util";
import { RiLoader5Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { useStateValue } from "../../../context/StateProvider";

const LoginForm = ({ setForm }: { setForm: any }) => {
  const [{}, dispatch] = useStateValue();
  const [credentials, setCredentials] = useState({
    email: "",
    secret: "",
  });
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (credentials.email === "" || credentials.secret === "") return toast.error("Please enter all fields");
    if (!validateEmail(credentials.email)) return toast.error("Please enter a valid email",);
    
    setLoading(true);
    LOGIN(credentials, setLoading, (data: any) => {
      setLoading(false);
      if(!data.success) return toast.error(data?.message || 'Something went wrong 😔');
      dispatch({
        type: "SET_USER",
        user: data.data,
      });
    });
  };
  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const togglePasswordShow = () => {
    credentials.secret.length > 0 &&
      setPasswordInputType(
        passwordInputType === "password" ? "text" : "password"
      );
  };

  return (
    <form method="POST" autoComplete="OFF">
      <div className="flex flex-col items-end gap-2 text-active w-80 my-2">
        <label className="text-sm font-sans" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({
              email: e.target.value,
              secret: credentials.secret,
            })
          }
          className="w-full border border-active-bg px-2 focus:border-active outline-none font-sans h-10 text-right"
        />
      </div>
      <div className="flex flex-col items-end gap-2 text-active w-80 my-2 relative">
        <label className="text-sm font-sans" htmlFor="password">
          Password
        </label>
        <input
          type={passwordInputType}
          name="password"
          id="password"
          value={credentials.secret}
          onChange={(e) =>
            setCredentials({
              email: credentials.email,
              secret: e.target.value,
            })
          }
          className="w-full border border-active-bg px-2 pl-8 group focus:border-active outline-none font-sans h-10 text-right"
        />
        {passwordInputType === "password" ? (
          <BsEye
            className={`${
              credentials.secret.length > 0 ? "text-active" : "text-active-bg"
            } text-lg absolute top-10 left-2 cursor-pointer `}
            onClick={togglePasswordShow}
          />
        ) : (
          <BsEyeSlash
            className={`${
              credentials.secret.length > 0 ? "text-active" : "text-active-bg"
            } text-lg absolute top-10 left-2 cursor-pointer `}
            onClick={togglePasswordShow}
          />
        )}
      </div>
      <div className="flex items-center justify-between font-sans px-1 py-3">
        <p
          className="text-primary text-sm cursor-pointer"
          onClick={() => setForm("forgot")}
        >
          forgot password
        </p>
        <div className="flex items-center flex-row-reverse justify-center gap-2">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="w-4 h-4 cursor-pointer"
          />
          <label htmlFor="remember" className="text-sm cursor-pointer">
            Remember me
          </label>
        </div>
      </div>
      <div className="flex items-center justify-center py-5">
        <button
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          className={`w-[95%] ${
            loading ? "bg-active-bg text-primary" : "bg-primary text-white"
          }  font-sans font-bold py-2 px-4 cursor-pointer flex items-center justify-center gap-x-3`}
        >
          {loading && <RiLoader5Line className="animate-spin text-2xl" />}
          {!loading ? "SIGN IN" : "Authenticating..."}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
