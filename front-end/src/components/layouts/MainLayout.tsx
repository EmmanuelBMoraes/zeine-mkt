import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100/50 font-sans">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
