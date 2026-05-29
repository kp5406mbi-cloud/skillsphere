import { useEffect, useState } from "react";
import API from "../api/axios";

function Jobs() {

  const [jobs, setJobs] = useState([]);
  const [proposals, setProposals] = useState({});

  const [search, setSearch] = useState("");
const [minBudget, setMinBudget] = useState("");
const [maxBudget, setMaxBudget] = useState("");
const [sort, setSort] = useState("newest");

  useEffect(() => {

  fetchJobs();

}, [

  search,
  minBudget,
  maxBudget,
  sort

]);

  const fetchJobs = async () => {

    try {

      const res = await API.get(

  `/jobs?search=${search}&minBudget=${minBudget}&maxBudget=${maxBudget}&sort=${sort}`

);

      setJobs(res.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  const handleApply = async (jobId) => {

    try {

      if (
        !proposals[jobId]?.proposalText ||
        !proposals[jobId]?.bidAmount ||
        !proposals[jobId]?.estimatedDays
      ) {

        alert("Please fill all fields");

        return;

      }

      console.log(
        "APPLICATION DATA:",
        proposals[jobId]
      );

      const formData = new FormData();

      formData.append(
        "proposalText",
        proposals[jobId].proposalText
      );

      formData.append(
        "bidAmount",
        proposals[jobId].bidAmount
      );

      formData.append(
        "estimatedDays",
        proposals[jobId].estimatedDays
      );

      if (proposals[jobId].resume) {

        formData.append(
          "resume",
          proposals[jobId].resume
        );

      }

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

      alert("Applied successfully");

      setProposals((prev) => ({

        ...prev,

        [jobId]: {

          proposalText: "",
          bidAmount: "",
          estimatedDays: "",
          resume: null

        }

      }));

    }

    catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Application failed"
      );

    }

  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        Available Jobs
      </h1>

      <div className="flex flex-wrap gap-4 mb-8">

  <input
    type="text"
    placeholder="Search jobs..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="p-3 rounded bg-gray-800 text-white"
  />

  <input
    type="number"
    placeholder="Min Budget"
    value={minBudget}
    onChange={(e) => setMinBudget(e.target.value)}
    className="p-3 rounded bg-gray-800 text-white"
  />

  <input
    type="number"
    placeholder="Max Budget"
    value={maxBudget}
    onChange={(e) => setMaxBudget(e.target.value)}
    className="p-3 rounded bg-gray-800 text-white"
  />

  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="p-3 rounded bg-gray-800 text-white"
  >
    <option value="newest">Newest</option>
    <option value="highest">Highest Budget</option>
    <option value="lowest">Lowest Budget</option>
  </select>

</div>

      <div className="space-y-6">

        {

          jobs.map((job) => (

            <div
              key={job._id}
              className="
                bg-gray-900
                p-6
                rounded-2xl
              "
            >

              <h2 className="text-3xl font-bold">
                {job.title}
              </h2>

              <p className="text-gray-300 mt-3">
                {job.description}
              </p>

              <p className="text-green-400 mt-3 text-lg">
                Budget: ₹{job.budget}
              </p>

              <textarea

                placeholder="Write your proposal..."

                value={
                  proposals[job._id]?.proposalText || ""
                }

                onChange={(e) =>

                  setProposals((prev) => ({

                    ...prev,

                    [job._id]: {

                      ...prev[job._id],

                      proposalText:
                        e.target.value

                    }

                  }))

                }

                className="
                  w-full
                  mt-5
                  p-4
                  rounded-xl
                  bg-gray-800
                  outline-none
                "

              />

              <input

                type="number"

                placeholder="Bid Amount"

                value={
                  proposals[job._id]?.bidAmount || ""
                }

                onChange={(e) =>

                  setProposals((prev) => ({

                    ...prev,

                    [job._id]: {

                      ...prev[job._id],

                      bidAmount:
                        e.target.value

                    }

                  }))

                }

                className="
                  w-full
                  mt-4
                  p-4
                  rounded-xl
                  bg-gray-800
                  outline-none
                "

              />

              <input

                type="number"

                placeholder="Estimated Delivery Days"

                value={
                  proposals[job._id]?.estimatedDays || ""
                }

                onChange={(e) =>

                  setProposals((prev) => ({

                    ...prev,

                    [job._id]: {

                      ...prev[job._id],

                      estimatedDays:
                        e.target.value

                    }

                  }))

                }

                className="
                  w-full
                  mt-4
                  p-4
                  rounded-xl
                  bg-gray-800
                  outline-none
                "

              />

              <input

                type="file"

                onChange={(e) =>

                  setProposals((prev) => ({

                    ...prev,

                    [job._id]: {

                      ...prev[job._id],

                      resume:
                        e.target.files[0]

                    }

                  }))

                }

                className="
                  w-full
                  mt-4
                  text-white
                "

              />

              <button

                onClick={() =>
                  handleApply(job._id)
                }

                className="
                  bg-blue-600
                  hover:bg-blue-700
                  px-6
                  py-3
                  rounded-xl
                  mt-5
                  font-semibold
                  transition
                "

              >

                Apply

              </button>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default Jobs;

