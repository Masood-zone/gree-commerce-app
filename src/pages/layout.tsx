import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

function Layout() {
  return (
    <>
      {/* Navigation */}
      <Navbar />
      <Outlet />
      {/* Footer */}
      <Footer />
    </>
  );
}

export default Layout;
