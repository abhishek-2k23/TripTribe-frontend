import { Routes, Route, Navigate } from "react-router-dom";
import Hero from "./page/Hero";
import SignIn from "./page/SignIn";
import SSOCallback from "./page/SSOCallback";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import MyTrips from "./page/MyTrip";
import CheckLists from "./page/CheckLists";
import Budget from "./page/Budget";
import FilesPage from "./page/Files"; // ✅ correct import
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Hero />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Navigate to="/signin" />} />
        <Route path="/sso-callback" element={<SSOCallback />} />

        {/* Protected Dashboard Layout */}
        <Route path="/home" element={<ProtectedLayout />}>
          <Route index element={<MyTrips />} />
          <Route path="my-trips" element={<MyTrips />} />
          <Route path="checklists" element={<CheckLists />} />
          <Route path="budget" element={<Budget />} />
          <Route path="files" element={<FilesPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;