import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CreateLoan from "./pages/CreateLoan";
import EditLoan from "./pages/EditLoan";
import WeeklyPayments from "./pages/WeeklyPayments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-loan" element={<CreateLoan />} />

        <Route path="/edit-loan/:id" element={<EditLoan />} />
        <Route path="/weekly-payments" element={<WeeklyPayments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
