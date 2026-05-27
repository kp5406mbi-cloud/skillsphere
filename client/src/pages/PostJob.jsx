import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function PostJob() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    budget: "",
    deadline: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

const handleSubmit = async (e) => {

  e.preventDefault();

  console.log(
    "TOKEN:",
    localStorage.getItem("token")
  );

  console.log(
    "USER:",
    localStorage.getItem("user")
  );

  console.log(
    "FORM DATA:",
    formData
  );

  try {

    const response = await API.post(

      "/jobs",

      {
        ...formData,

        skillsRequired:
          formData.skillsRequired.split(",")
      },

      {
        headers: {

          Authorization:
            `Bearer ${localStorage.getItem("token")}`

        }

      }

    );

    console.log(
      "JOB CREATED:",
      response.data
    );

    alert("Job posted successfully");

    navigate("/client");

  }

  catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to post job"
    );

  }

};

  return (

    <div className="min-h-screen bg-black text-white flex justify-center items-center p-10">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-10 rounded-2xl w-full max-w-2xl flex flex-col gap-5"
      >

        <h1 className="text-4xl font-bold mb-4">
          Post New Job
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          onChange={handleChange}
          className="p-4 rounded-lg bg-gray-800"
        />

        <textarea
          name="description"
          placeholder="Job Description"
          rows="5"
          onChange={handleChange}
          className="p-4 rounded-lg bg-gray-800"
        />

        <input
          type="text"
          name="skillsRequired"
          placeholder="Skills Required (React, Node, MongoDB)"
          onChange={handleChange}
          className="p-4 rounded-lg bg-gray-800"
        />

        <input
          type="number"
          name="budget"
          placeholder="Budget"
          onChange={handleChange}
          className="p-4 rounded-lg bg-gray-800"
        />

        <input
          type="date"
          name="deadline"
          onChange={handleChange}
          className="p-4 rounded-lg bg-gray-800"
        />

        <button
          type="submit"
          className="bg-blue-600 py-4 rounded-xl text-xl font-semibold hover:bg-blue-700 transition"
        >
          Post Job
        </button>

      </form>

    </div>

  );

}

export default PostJob;