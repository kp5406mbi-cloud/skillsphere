import { useEffect, useState } from "react";

import API from "../api/axios";

import { Link } from "react-router-dom";

function MyJobs() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    fetchMyJobs();

  }, []);

  const fetchMyJobs = async () => {

    try {

      const response = await API.get("/jobs");

      const currentUser = JSON.parse(
        localStorage.getItem("user")
      );

      console.log(
        "CURRENT USER:",
        currentUser
      );

      console.log(
        "ALL JOBS:",
        response.data
      );

      const filteredJobs =
        response.data.filter(

          (job) =>

            job.client?._id ===
            currentUser.id

        );

      console.log(
        "FILTERED JOBS:",
        filteredJobs
      );

      setJobs(filteredJobs);

    }

    catch (error) {

      console.log(error);

    }

  };

  const handlePayment = async (
    amount,
    freelancerId,
    jobId
  ) => {

    try {

      const { data } = await API.post(

        "/payments/create-order",

        {
          amount,
          freelancerId,
          jobId
        },

        {

          headers: {

            Authorization:
              `Bearer ${localStorage.getItem("token")}`

          }

        }

      );

      console.log(data);

      const options = {

        key: "rzp_test_Su8OSFCk8Jf5b4",

        amount: data.order.amount,

        currency: "INR",

        name: "SkillSphere",

        description: "Freelancer Payment",

        order_id: data.order.id,

        handler: async function (
          response
        ) {

          try {

            await API.post(

              "/payments/verify",

              {

                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,

                freelancerId,

                jobId,

                amount

              },

              {

                headers: {

                  Authorization:
                    `Bearer ${localStorage.getItem("token")}`

                }

              }

            );

            alert(
              "Payment Successful"
            );

          }

          catch (error) {

            console.log(error);

            alert(
              "Payment Verification Failed"
            );

          }

        },

        prefill: {

          name: "SkillSphere User",

          email: "user@example.com"

        },

        theme: {

          color: "#7c3aed"

        }

      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();

    }

    catch (error) {

      console.log(error);

      alert("Payment Failed");

    }

  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">

        My Posted Jobs

      </h1>

      {

        jobs.length === 0 ? (

          <div
            className="
              bg-gray-900
              p-8
              rounded-2xl
              w-fit
            "
          >

            <h2 className="text-2xl font-semibold mb-4">

              No jobs posted yet

            </h2>

          </div>

        ) : (

          <div className="space-y-8">

            {

              jobs.map((job) => (

                <div

                  key={job._id}

                  className="
                    bg-gray-900
                    p-8
                    rounded-2xl
                  "

                >

                  <div
                    className="
                      flex
                      justify-between
                      items-start
                      mb-4
                    "
                  >

                    <div>

                      <h2 className="text-3xl font-bold">

                        {job.title}

                      </h2>

                      <p className="text-gray-300 mt-4">

                        {job.description}

                      </p>

                      <p className="text-green-400 text-xl mt-4">

                        Budget: ₹{job.budget}

                      </p>

                    </div>

                    <Link
                      to={`/applicants/${job._id}`}
                    >

                      <button
                        className="
                          bg-blue-600
                          px-5
                          py-3
                          rounded-xl
                          hover:bg-blue-700
                          transition
                          font-semibold
                        "
                      >

                        View Applicants

                      </button>

                    </Link>

                  </div>

                  <div className="mt-8">

                    <h3
                      className="
                        text-2xl
                        font-semibold
                        mb-4
                      "
                    >

                      Applicants

                    </h3>

                    {

                      job.applications?.length === 0 ? (

                        <p className="text-gray-400">

                          No applicants yet

                        </p>

                      ) : (

                        <div className="space-y-4">

                          {

                            job.applications.map((app) => (

                              <div

                                key={app._id}

                                className="
                                  bg-gray-800
                                  p-5
                                  rounded-xl
                                "

                              >

                                <h4
                                  className="
                                    text-xl
                                    font-semibold
                                  "
                                >

                                  {
                                    app.freelancer?.name
                                  }

                                </h4>

                                <p className="mt-2 text-gray-400">

                                  {
                                    app.freelancer?.email
                                  }

                                </p>

                                <p className="text-gray-300 mt-4">

                                  <span className="font-semibold">

                                    Proposal:

                                  </span>{" "}

                                  {
                                    app.proposalText
                                  }

                                </p>

                                <p className="text-green-400 mt-3">

                                  <span className="font-semibold">

                                    Bid Amount:

                                  </span>{" "}

                                  ₹{app.bidAmount}

                                </p>

                                <p className="text-yellow-400 mt-2">

                                  <span className="font-semibold">

                                    Delivery Time:

                                  </span>{" "}

                                  {
                                    app.estimatedDays
                                  } days

                                </p>

                                <div className="flex gap-4 mt-5">

                                  {

                                    app.resume ? (

                                      <a

                                        href={app.resume.replace(
  "/upload/",
  "/upload/fl_inline/"
)}

                                        target="_blank"

                                        rel="noreferrer"

                                        className="
                                          inline-block
                                          bg-blue-600
                                          px-5
                                          py-2
                                          rounded-lg
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
                                      handlePayment(

                                        app.bidAmount,

                                        app.freelancer._id,

                                        job._id

                                      )
                                    }

                                    className="
                                      bg-yellow-500
                                      px-5
                                      py-2
                                      rounded-lg
                                      hover:bg-yellow-600
                                      transition
                                      font-semibold
                                      text-black
                                    "

                                  >

                                    Pay Freelancer

                                  </button>

                                </div>

                              </div>

                            ))

                          }

                        </div>

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

export default MyJobs;