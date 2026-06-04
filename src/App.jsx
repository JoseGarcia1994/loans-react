import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CreateLoan from "./pages/CreateLoan";
import EditLoan from "./pages/EditLoan";
import WeeklyPayments from "./pages/WeeklyPayments";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-loan" element={<CreateLoan />} />
        <Route path="/edit-loan/:id" element={<EditLoan />} />
        <Route path="/weekly-payments" element={<WeeklyPayments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;