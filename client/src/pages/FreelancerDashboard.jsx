import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import { toast } from "react-toastify";

function FreelancerDashboard() {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  const [proposals, setProposals] = useState({});

  const [openProposal, setOpenProposal] = useState(null);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = async () => {

    try {

      const res = await API.get("/jobs");

      setJobs(res.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  const applyToJob = async (jobId) => {

    try {

      const formData = new FormData();

      formData.append(
        "proposalText",
        proposals[jobId]?.proposalText
      );

      formData.append(
        "bidAmount",
        proposals[jobId]?.bidAmount
      );

      formData.append(
        "estimatedDays",
        proposals[jobId]?.estimatedDays
      );

      formData.append(
        "resume",
        proposals[jobId]?.resume
      );

       await API.post(
  `/jobs/${jobId}/apply`,

        formData,

        {
          headers: {

            Authorization:
              `Bearer ${localStorage.getItem("token")}`,

            "Content-Type":
              "multipart/form-data"

          }
        }

      );

      toast.success(
        "Proposal submitted successfully 🚀"
      );

      fetchJobs();

      setOpenProposal(null);

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Application failed"

      );

    }

  };

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      {/* Header */}

      <div className="flex justify-between items-start mb-10">

        <div>

          <h1 className="text-5xl font-bold mb-4">
            Freelancer Dashboard
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

      {/* Jobs Section */}

      <h2 className="text-3xl font-bold mb-8">

        Available Jobs

      </h2>

      <div
        className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >

        {

          jobs

            .filter(
              (job) =>
                job.title &&
                job.budget
            )

            .map((job) => {

              const alreadyApplied =
                job.applications?.some(

                  (app) =>

                    app.freelancer.toString() ===
                    user?._id

                );

              return (

                <div

                  key={job._id}

                  className="
                    bg-gray-900
                    p-6
                    rounded-2xl
                    shadow-lg
                  "

                >

                  <h3 className="text-2xl font-bold mb-3">

                    {job.title}

                  </h3>

                  <p className="text-gray-300 mb-4">

                    {job.description}

                  </p>

                  <p className="mb-2">

                    <span className="font-bold">

                      Skills:

                    </span>{" "}

                    {
                      job.skillsRequired?.join(", ")
                    }

                  </p>

                  <p className="mb-2">

                    <span className="font-bold">

                      Budget:

                    </span>{" "}

                    ₹{job.budget}

                  </p>

                  <p className="mb-2">

                    <span className="font-bold">

                      Deadline:

                    </span>{" "}

                    {

                      job.deadline

                        ? new Date(
                            job.deadline
                          ).toLocaleDateString()

                        : "No deadline"

                    }

                  </p>

                  <p className="mb-5">

                    <span className="font-bold">

                      Client:

                    </span>{" "}

                    {job.client?.name}

                  </p>

                  {/* Apply Button */}

                  <button

                    disabled={alreadyApplied}

                    onClick={() =>
                      setOpenProposal(job._id)
                    }

                    className={`
                      w-full
                      px-5
                      py-3
                      rounded-xl
                      font-bold
                      mt-4
                      transition

                      ${
                        alreadyApplied

                          ? "bg-gray-600 cursor-not-allowed"

                          : "bg-blue-600 hover:bg-blue-700"

                      }
                    `}

                  >

                    {

                      alreadyApplied

                        ? "Already Applied"

                        : "Apply Now"

                    }

                    {
  job.client && (

    <button

      onClick={() =>
        navigate(`/chat/${job.client._id}`)
      }

      className="
        mt-3
        w-full
        bg-purple-600
        py-3
        rounded-lg
        text-lg
        font-semibold
        hover:bg-purple-700
        transition
      "

    >

      Chat with Client

    </button>

  )
}

                  </button>

                </div>

              );

            })

        }

      </div>

      {/* Proposal Modal */}

      {

        openProposal && (

          <div
            className="
              fixed
              inset-0
              bg-black/70
              flex
              items-center
              justify-center
              z-50
            "
          >

            <div
              className="
                bg-gray-900
                p-8
                rounded-2xl
                w-[500px]
                shadow-2xl
              "
            >

              <h2 className="text-3xl font-bold mb-6">

                Submit Proposal

              </h2>

              {/* Proposal Text */}

              <textarea

                placeholder="Write proposal..."

                value={
                  proposals[openProposal]
                    ?.proposalText || ""
                }

                onChange={(e) =>
                  setProposals({

                    ...proposals,

                    [openProposal]: {

                      ...proposals[openProposal],

                      proposalText:
                        e.target.value

                    }

                  })
                }

                className="
                  w-full
                  p-3
                  rounded
                  bg-gray-800
                  mb-4
                "

              />

              {/* Bid Amount */}

              <input

                type="number"

                placeholder="Bid Amount"

                value={
                  proposals[openProposal]
                    ?.bidAmount || ""
                }

                onChange={(e) =>
                  setProposals({

                    ...proposals,

                    [openProposal]: {

                      ...proposals[openProposal],

                      bidAmount:
                        e.target.value

                    }

                  })
                }

                className="
                  w-full
                  p-3
                  rounded
                  bg-gray-800
                  mb-4
                "

              />

              {/* Estimated Delivery Days */}

              <input

                type="number"

                placeholder="Estimated Delivery Days"

                value={
                  proposals[openProposal]
                    ?.estimatedDays || ""
                }

                onChange={(e) =>
                  setProposals({

                    ...proposals,

                    [openProposal]: {

                      ...proposals[openProposal],

                      estimatedDays:
                        e.target.value

                    }

                  })
                }

                className="
                  w-full
                  p-3
                  rounded
                  bg-gray-800
                  mb-4
                "

              />

              {/* Resume Upload */}

<p className="text-sm text-gray-400 mb-2">

  Upload your resume (PDF preferred)

</p>

<input

  type="file"

  onChange={(e) =>
    setProposals({

      ...proposals,

      [openProposal]: {

        ...proposals[openProposal],

        resume: e.target.files[0]

      }

    })
  }

  className="
    w-full
    text-white
    mb-6
  "

/>

               

              {/* Buttons */}

              <div className="flex gap-4">

                <button

                  onClick={() =>
                    applyToJob(openProposal)
                  }

                  className="
                    flex-1
                    bg-green-600
                    hover:bg-green-700
                    py-3
                    rounded-xl
                    font-bold
                  "

                >

                  Submit Proposal

                </button>

                <button

                  onClick={() =>
                    setOpenProposal(null)
                  }

                  className="
                    flex-1
                    bg-red-600
                    hover:bg-red-700
                    py-3
                    rounded-xl
                    font-bold
                  "

                >

                  Cancel

                </button>

              </div>

            </div>

          </div>

        )

      }

    </div>

  );

}

export default FreelancerDashboard;