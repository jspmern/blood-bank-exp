import React from "react";
import { userMenu } from "./Menus/userMenu";
import { NavLink, useLocation } from "react-router-dom";
import "../../../style/Layout.css";

function Sidebar() {
  let location = useLocation();
  return (
    <>
      {userMenu.map((item) => {
        let isActive = location.pathname === item.path;
        return (
          <div className={isActive && "active-link"}>
            <i className={`${item.icon} menu-logo`}></i>
            <NavLink to={item.path} className="menu-nav">
              {item.name}
            </NavLink>
          </div>
        );
      })}
    </>
  );
}

export default Sidebar;
