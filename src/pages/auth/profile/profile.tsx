import { Outlet } from "react-router-dom";
import { Sidebar } from "./profileSidebar";

function ProfileLayout() {
  return (
    <section className="flex container h-[75dvh] mx-auto overflow-hidden mb-14 rounded-2xl">
      <Sidebar />
      <Outlet />
    </section>
  );
}

export default ProfileLayout;
