import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

localStorage.setItem(
  "userId",
  response.data.user._id
);

      alert("Login successful");

      if (response.data.user.role === "client") {
        navigate("/client");
      } else {
        navigate("/freelancer");
      }

    } catch (error) {

      alert(
        error.response?.data?.message || "Login failed"
      );

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-black text-white">

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80"
      >

        <h1 className="text-3xl font-bold">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="p-3 rounded bg-gray-800"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="p-3 rounded bg-gray-800"
        />

   <button
  type="submit"
  className="bg-blue-600 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
>
  Login
</button>

<div className="flex flex-col items-center mt-2">

  <p className="text-gray-400 mb-4 text-lg">
    Don't have an account?
  </p>

  <button
    type="button"
    onClick={() => navigate("/register")}
    className="bg-green-600 w-full py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
  >
    Register
  </button>

</div>

      </form>

    </div>

  );

}

export default Login;