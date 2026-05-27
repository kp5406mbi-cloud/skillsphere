import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import API from "../api/axios";

import { toast } from "react-toastify";

function Applicants() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [applicants, setApplicants] =
    useState([]);

  useEffect(() => {

    fetchApplicants();

  }, []);

  const fetchApplicants = async () => {

    try {

      const res = await API.get(

        `/jobs/${id}/applicants`,

        {

          headers: {

            Authorization:
              `Bearer ${localStorage.getItem("token")}`

          }

        }

      );

      setApplicants(res.data);

    }

    catch (error) {

      toast.error(
        "Failed to load applicants"
      );

    }

  };

  const handleStatusUpdate = async (
    applicationId,
    status
  ) => {

    try {

      await API.put(

        `/jobs/${id}/applications/${applicationId}`,

        { status },

        {

          headers: {

            Authorization:
              `Bearer ${localStorage.getItem("token")}`

          }

        }

      );

      toast.success(
        `Application ${status}`
      );

      setApplicants((prev) =>
        prev.map((app) =>
          app._id === applicationId
            ? { ...app, status }
            : app
        )
      );

    }

    catch (error) {

      toast.error(
        "Failed to update status"
      );

    }

  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8">

        Applicants

      </h1>

      <div className="space-y-6">

        {

          applicants.map((app) => (

            <div

              key={app._id}

              className="
                bg-gray-900
                p-6
                rounded-2xl
              "

            >

              <h2 className="text-2xl font-bold mb-3">

                {
                  app.freelancer?.name
                }

              </h2>

              <p className="mb-2">

                <span className="font-bold">

                  Email:

                </span>{" "}

                {
                  app.freelancer?.email
                }

              </p>

              <p className="mb-2">

                <span className="font-bold">

                  Proposal:

                </span>{" "}

                {app.proposalText}

              </p>

              <p className="mb-2 text-green-400">

                <span className="font-bold">

                  Bid Amount:

                </span>{" "}

                ₹{app.bidAmount}

              </p>

              <p className="mb-4 text-yellow-400">

                <span className="font-bold">

                  Delivery Time:

                </span>{" "}

                {app.estimatedDays} days

              </p>

              <p className="font-bold mt-4">

                Status:{" "}

                <span

                  className={

                    app.status === "Accepted"

                      ? "text-green-400"

                      : app.status === "Rejected"

                      ? "text-red-400"

                      : "text-yellow-400"

                  }

                >

                  {app.status || "Pending"}

                </span>

              </p>

              <div className="flex items-center mt-4 flex-wrap gap-3">

                {

                  app.resume && (

                    <a

                      href={app.resume}

                      target="_blank"

                      rel="noreferrer"

                      className="
                        bg-blue-600
                        px-4
                        py-2
                        rounded
                        inline-block
                      "

                    >

                      View Resume

                    </a>

                  )

                }

                <button

                  onClick={() =>
                    handleStatusUpdate(
                      app._id,
                      "Accepted"
                    )
                  }

                  disabled={
                    app.status === "Accepted"
                  }

                  className={`
                    px-4
                    py-2
                    rounded

                    ${
                      app.status === "Accepted"

                        ? "bg-gray-600 cursor-not-allowed"

                        : "bg-green-600"
                    }
                  `}

                >

                  {

                    app.status === "Accepted"

                      ? "Accepted"

                      : "Accept"

                  }

                </button>

                <button

                  onClick={() =>
                    handleStatusUpdate(
                      app._id,
                      "Rejected"
                    )
                  }

                  disabled={
                    app.status === "Rejected"
                  }

                  className={`
                    px-4
                    py-2
                    rounded

                    ${
                      app.status === "Rejected"

                        ? "bg-gray-600 cursor-not-allowed"

                        : "bg-red-600"
                    }
                  `}

                >

                  {

                    app.status === "Rejected"

                      ? "Rejected"

                      : "Reject"

                  }

                </button>

                {

                  app.status === "Accepted" && (

                    <button

                      onClick={() =>
                        navigate(
  `/chat/${app.freelancer._id}`
)
                      }

                      className="
                        bg-purple-600
                        px-4
                        py-2
                        rounded
                      "

                    >

                      Chat

                    </button>

                  )

                }

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default Applicants;