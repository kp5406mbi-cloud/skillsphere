import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "freelancer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", formData);

      alert("Registration successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80"
      >
        <h1 className="text-3xl font-bold text-center">
          Register
        </h1>

        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
          className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
          className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="freelancer">Freelancer</option>
          <option value="client">Client</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 p-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
        >
          Register
        </button>

        <div className="flex flex-col items-center mt-4">
          <p className="text-gray-400 mb-3 text-lg">
            Already have an account?
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-blue-600 w-full py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;