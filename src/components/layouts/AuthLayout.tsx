import { Outlet } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import authIllustration from "../../assets/Background.png";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBF4F4] p-4 font-sans sm:p-6 lg:p-8">
      <div className="flex w-full max-w-6xl items-center justify-center gap-16">
        <div className="hidden lg:flex lg:w-[55%] flex-col justify-center relative">
          <div className="absolute top-0 left-0 flex items-center gap-4">
            <img src={logo} alt="Marketplace Logo" className="h-10 w-10" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
              <p className="text-md text-gray-500">Painel de Vendedor</p>
            </div>
          </div>
          <img
            src={authIllustration}
            alt="Painel de Vendedor"
            className="w-full h-auto"
          />
        </div>

        <div className="w-full lg:w-[45%] flex justify-center">
          <div className="w-full max-w-md bg-white p-12 rounded-3xl shadow-xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
