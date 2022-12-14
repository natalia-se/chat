import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

type Props = {
  title: string;
  button: string;
  isRegister: boolean;
};

const Form = (props: Props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleOnClick = async (): Promise<void> => {
    if (props.isRegister) {
      if (!username || !password || !email) {
        setError("username, email and password are required");
      }
      const signupResponse = await axios.post(`/register`, {
        username,
        password,
        email,
      });
      if (signupResponse && signupResponse.status === 200) {
        navigate("/login");
      }
    } else {
      if (!username || !password) {
        setError("username, password are required");
      }
      const signinResponse = await axios.post(`/login`, {
        username: username,
        password: password,
      });
      if (signinResponse && signinResponse.status === 200) {
        localStorage.setItem("jwt", signinResponse.data);
        navigate("/chat");
      }
    }
  };
  return (
    <div className="container mx-auto">
      <div className="flex justify-center px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          <div
            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
            style={{
              backgroundImage:
                "url('https://cdn.pixabay.com/photo/2015/02/07/10/10/giraffes-627031__480.jpg')",
              backgroundPosition: "center center",
            }}
          ></div>
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 text-2xl text-center">{props.title}</h3>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {props.isRegister && (
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {props.isRegister && error && (
                    <p className="text-xs italic text-red-500">
                      Please choose a password.
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleOnClick}
                >
                  {props.button}
                </button>
              </div>
              {props.isRegister && (
                <div className="text-center">
                  <Link to="/login" className="text-sky-600">
                    Already have an account? Login!
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
