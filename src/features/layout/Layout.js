import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";

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
      {/* <!-- BEGIN: Dark Mode Switcher*/}

      {/* <!-- END: Dark Mode Switcher*/}
      {/* <!-- BEGIN: Main Color Switcher*/}

      {/* <!-- END: Main Color Switcher*/}
    </>
  );
};

export default Layout;
