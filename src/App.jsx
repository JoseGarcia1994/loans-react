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
import ChangeEmail from "./pages/ChangeEmail";
import AccessPreferences from "./pages/AccessPreferences";
import CreateClient from "./pages/CreateClient";
import ClientsPage from "./pages/ClientsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/access-preferences" element={<AccessPreferences />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/change-email" element={<ChangeEmail />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-loan" element={<CreateLoan />} />
        <Route path="/edit-loan/:id" element={<EditLoan />} />
        <Route path="/weekly-payments" element={<WeeklyPayments />} />
        <Route path="/create-client" element={<CreateClient />} />
        <Route path="/clients" element={<ClientsPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;