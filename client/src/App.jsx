import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import FreelancerDashboard from "./pages/FreelancerDashboard";
import ClientDashboard from "./pages/ClientDashboard";

import Jobs from "./pages/Jobs";

import PostJob from "./pages/PostJob";

import MyJobs from "./pages/MyJobs";

import Applicants from "./pages/Applicants";

import Chat from "./pages/Chat";

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/freelancer"
        element={<FreelancerDashboard />}
      />

      <Route
        path="/client"
        element={<ClientDashboard />}
      />

      <Route path="/jobs" element={<Jobs />} />

      <Route
  path="/post-job"
  element={<PostJob />}
/>

<Route
  path="/my-jobs"
  element={<MyJobs />}
/>

<Route
  path="/applicants/:id"
  element={<Applicants />}
/>

<Route
  path="/chat/:id"
  element={<Chat />}
/>

    </Routes>

  );

}

export default App;