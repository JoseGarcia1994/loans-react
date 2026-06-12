import { loginCSS } from "../components/login/loginStyles";
import { LoginLeft } from "../components/login/LoginLeft";
import { LoginRight } from "../components/login/LoginRight";

export default function LoginPage() {
  return (
    <>
      <style>{loginCSS}</style>
      <div className="login-wrapper">
        <LoginLeft />
        <LoginRight />
      </div>
    </>
  );
}
