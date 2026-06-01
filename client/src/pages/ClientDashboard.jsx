import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

function ClientDashboard() {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    fetchMyJobs();

  }, []);

  const fetchMyJobs = async () => {

    try {

      const response = await API.get(

        "/jobs/client/my-jobs",

        {

          headers: {

            Authorization:
              `Bearer ${localStorage.getItem("token")}`

          }

        }

      );

      console.log(
        "API RESPONSE:",
        response.data
      );

      setJobs(response.data);

    }

    catch (error) {

      console.log(
        "FETCH ERROR:",
        error
      );

    }

  };

  const totalJobs = jobs.length;

const totalApplicants = jobs.reduce(
  (count, job) =>
    count + (job.applications?.length || 0),
  0
);

const acceptedApplicants = jobs.reduce(
  (count, job) =>
    count +
    (job.applications?.filter(
      (app) => app.status === "accepted"
    ).length || 0),
  0
);

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <div className="flex justify-between items-start">

        <div>

          <h1 className="text-5xl font-bold mb-4">
            Client Dashboard
          </h1>

          <p className="text-2xl">
            Welcome, {user?.name}
          </p>

        </div>

       <button
          onClick={handleLogout}
          className="
            bg-red-600
            px-6
            py-3
            rounded-lg
            text-lg
            font-semibold
            hover:bg-red-700
            transition
          "
        >

          Logout

        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-10">

  <div className="bg-blue-900 p-6 rounded-xl">
    <h3 className="text-lg text-gray-300">
      Total Jobs
    </h3>

    <p className="text-4xl font-bold mt-2">
      {totalJobs}
    </p>
  </div>

  <div className="bg-green-900 p-6 rounded-xl">
    <h3 className="text-lg text-gray-300">
      Total Applicants
    </h3>

    <p className="text-4xl font-bold mt-2">
      {totalApplicants}
    </p>
  </div>

  <div className="bg-purple-900 p-6 rounded-xl">
    <h3 className="text-lg text-gray-300">
      Accepted Freelancers
    </h3>

    <p className="text-4xl font-bold mt-2">
      {acceptedApplicants}
    </p>
  </div>

</div>

      <div className="mt-10">

        <div className="flex gap-6">

          <button
            onClick={() =>
              navigate("/post-job")
            }
            className="
              bg-blue-600
              px-8
              py-4
              rounded-xl
              text-xl
              font-semibold
              hover:bg-blue-700
              transition
            "
          >

            Post Job

          </button>

          <button
            onClick={() =>
              navigate("/my-jobs")
            }
            className="
              bg-green-600
              px-8
              py-4
              rounded-xl
              text-xl
              font-semibold
              hover:bg-green-700
              transition
            "
          >

            View Posted Jobs

          </button>

        </div>

      </div>

    </div>

  );

}

export default ClientDashboard;