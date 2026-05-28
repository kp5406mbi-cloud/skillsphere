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

      console.log(
        "APPLICANTS:",
        res.data
      );

      setApplicants(res.data);

    }

    catch (error) {

      console.log(error);

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

      console.log(error);

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

      {

        applicants.length === 0 ? (

          <div
            className="
              bg-gray-900
              p-8
              rounded-2xl
              w-fit
            "
          >

            <h2 className="text-2xl font-semibold">

              No Applicants Yet

            </h2>

          </div>

        ) : (

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

                  <h2
                    className="
                      text-2xl
                      font-bold
                      mb-3
                    "
                  >

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

                    {
                      app.proposalText
                    }

                  </p>

                  <p
                    className="
                      mb-2
                      text-green-400
                    "
                  >

                    <span className="font-bold">

                      Bid Amount:

                    </span>{" "}

                    ₹{app.bidAmount}

                  </p>

                  <p
                    className="
                      mb-4
                      text-yellow-400
                    "
                  >

                    <span className="font-bold">

                      Delivery Time:

                    </span>{" "}

                    {
                      app.estimatedDays
                    } days

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

                      {
                        app.status || "Pending"
                      }

                    </span>

                  </p>

                  <div
                    className="
                      flex
                      items-center
                      mt-4
                      flex-wrap
                      gap-3
                    "
                  >

                    {

                      app.resume ? (

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
                            hover:bg-blue-700
                            transition
                          "

                        >

                          View Resume

                        </a>

                      ) : (

                        <p className="text-red-400">

                          Resume Not Uploaded

                        </p>

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

                            : "bg-green-600 hover:bg-green-700"
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

                            : "bg-red-600 hover:bg-red-700"
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
                            hover:bg-purple-700
                            transition
                          "

                        >

                          Chat

                        </button>

                      )

                    }

                    {

                      app.status === "Accepted" && (

                        <button

                          onClick={() =>
                            navigate(
                              `/payment/${app._id}`
                            )
                          }

                          className="
                            bg-yellow-500
                            text-black
                            px-4
                            py-2
                            rounded
                            hover:bg-yellow-600
                            transition
                            font-semibold
                          "

                        >

                          Pay Now

                        </button>

                      )

                    }

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );

}

export default Applicants;