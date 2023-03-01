import { Outlet } from "react-router-dom";
import TopBar from "../shared/TopBar";
import SideBar from "../shared/SideBar";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <>
      {/* <!-- BEGIN: Mobile Menu */}

      {/* <!-- END: Mobile Menu */}
      {/* <!-- BEGIN: Top Bar */}
      <TopBar />
      {/* <!-- END: Top Bar */}
      <div className="wrapper">
        <div className="wrapper-box">
          {/* <!-- BEGIN: Side Menu */}
          <SideBar />

          {/* <!-- END: Side Menu */}
          {/* <!-- BEGIN: Content */}
          <div className="content">
            <Outlet />
          </div>
          {/* <!-- END: Content */}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* <!-- BEGIN: Dark Mode Switcher*/}

      {/* <!-- END: Dark Mode Switcher*/}
      {/* <!-- BEGIN: Main Color Switcher*/}

      {/* <!-- END: Main Color Switcher*/}
    </>
  );
};

export default Layout;
