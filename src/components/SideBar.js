import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  const { pathname } = useLocation();
  const menus = [
    {
      id: 1,
      name: "Bảng Điều Khiển",
      to: "/dashboard",
      icon: "uil uil-estate",
      subMenus: [],
    },
    {
      id: 2,
      name: "Danh Mục",
      to: null,
      icon: "uil uil-cube",
      subMenus: [
        {
          id: 1,
          name: "Danh Mục Cha",
          to: "/category",
          icon: "uil uil-heart-rate",
        },
      ],
    },
    {
      id: 3,
      name: "Bài Đăng",
      to: null,
      icon: "uil uil-estate",
      subMenus: [
        {
          id: 1,
          name: "Bài Viết",
          to: "/post",
          icon: "uil uil-heart-rate",
        },
        {
          id: 2,
          name: "Thẻ",
          to: "/tag",
          icon: "uil uil-heart-rate",
        },
      ],
    },
  ];

  const toggleSideMenu = (e) => {
    const subMenu = e.target.closest("li").querySelector("ul");
    const icon = e.target.querySelector(".side-menu__sub-icon");
    icon.classList.toggle("rotate-180");

    if (subMenu.classList.contains("side-menu__sub-open")) {
      subMenu.style.height = "0px";

      subMenu.addEventListener(
        "transitionend",
        () => {
          subMenu.classList.remove("side-menu__sub-open");
        },
        {
          once: true,
        }
      );
    } else {
      subMenu.classList.add("side-menu__sub-open");
      subMenu.style.height = "auto";

      var height = subMenu.clientHeight - 4 + "px";

      subMenu.style.height = "0px";

      setTimeout(function () {
        subMenu.style.height = height;
      }, 0);
    }
  };

  return (
    <>
      <nav className="side-nav">
        <ul>
          {menus.map((menu, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={menu.to}
                  className={
                    menu.subMenus.map((item) => item.to).includes(pathname) ||
                    [menu.to].includes(pathname)
                      ? `side-menu side-menu--active`
                      : `side-menu`
                  }
                  onClick={(e) =>
                    menu.subMenus.length > 0 ? toggleSideMenu(e) : null
                  }
                >
                  <div className="side-menu__icon">
                    <i className={menu.icon}></i>
                  </div>
                  <div className="side-menu__title">
                    {menu.name}
                    {menu.subMenus.length > 0 && (
                      <div className="side-menu__sub-icon transform">
                        <i className="fa-solid fa-chevron-down"></i>
                      </div>
                    )}
                  </div>
                </NavLink>
                <ul className="transition-height">
                  {menu.subMenus &&
                    menu.subMenus.map((subMenu, index) => {
                      return (
                        <li key={index}>
                          <NavLink
                            to={subMenu.to}
                            className={({ isActive }) =>
                              isActive
                                ? "side-menu side-menu--active"
                                : "side-menu "
                            }
                          >
                            <div className="side-menu__icon">
                              <i className={subMenu.icon}></i>
                            </div>
                            <div className="side-menu__title">
                              {subMenu.name}
                            </div>
                          </NavLink>
                        </li>
                      );
                    })}
                </ul>
              </li>
            );
          })}
          <li className="side-nav__devider my-6"></li>
        </ul>
      </nav>
    </>
  );
};

export default SideBar;
