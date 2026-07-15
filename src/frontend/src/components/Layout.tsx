import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
