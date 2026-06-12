import { registerCSS } from "../components/register/registerStyles";
import { RegisterLeft } from "../components/register/RegisterLeft";
import { RegisterRight } from "../components/register/RegisterRight";

export default function RegisterPage() {
  return (
    <>
      <style>{registerCSS}</style>
      <div className="register-wrapper">
        <RegisterLeft />
        <RegisterRight />
      </div>
    </>
  );
}
