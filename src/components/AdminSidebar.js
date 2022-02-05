import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { GoDashboard } from "react-icons/go";
import { BsBookmarkCheck, BsBook } from "react-icons/bs";
import { RiUserLine, RiUser2Line } from "react-icons/ri";
import { Button } from "react-bootstrap";

const Adminsidebar = () => {
  const location = useLocation();
  const selectedNavItem = location.pathname.split("/")[2];

  return (
    <div
      className="admin-sidebar"
      style={{
        boxShadow: "1px 1px 8px 1px rgba(0, 0, 0, 0.1)",
        width: "16%",
        height: "100vh",
        padding: "1em",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99,
        backgroundColor: "white",
      }}
    >
      <div className="w-100 d-flex flex-column">
        <span className="text-center mb-5">Hello Administrator!</span>
        <NavLink
          to={"/admin/dashboard"}
          className="nav-item"
          style={{
            ...styles.navItem,
            backgroundColor:
              selectedNavItem === "dashboard" ? "rgba(0, 0, 0, 0.08)" : null,
          }}
        >
          <GoDashboard className="me-3" style={{ fontSize: 20 }} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={"/admin/grades"}
          className="nav-item"
          style={{
            ...styles.navItem,
            backgroundColor:
              selectedNavItem === "grades" ? "rgba(0, 0, 0, 0.08)" : null,
          }}
        >
          <BsBookmarkCheck className="me-3" style={{ fontSize: 20 }} />
          <span>Grades</span>
        </NavLink>

        <NavLink
          to={"/admin/students"}
          className="nav-item"
          style={{
            ...styles.navItem,
            backgroundColor:
              selectedNavItem === "students" ? "rgba(0, 0, 0, 0.08)" : null,
          }}
        >
          <RiUserLine className="me-3" style={{ fontSize: 20 }} />
          <span>Students</span>
        </NavLink>

        <NavLink
          to={"/admin/subjects"}
          className="nav-item"
          style={{
            ...styles.navItem,
            backgroundColor:
              selectedNavItem === "subjects" ? "rgba(0, 0, 0, 0.08)" : null,
          }}
        >
          <BsBook className="me-3" style={{ fontSize: 20 }} />
          <span>Subjects</span>
        </NavLink>

        <NavLink
          to={"/admin/instructors"}
          className="nav-item"
          style={{
            ...styles.navItem,
            backgroundColor:
              selectedNavItem === "instructors" ? "rgba(0, 0, 0, 0.08)" : null,
          }}
        >
          <RiUser2Line className="me-3" style={{ fontSize: 20 }} />
          <span>Instructors</span>
        </NavLink>
      </div>
      <Button
        variant="danger"
        className="w-100"
        onClick={() => {
          localStorage.removeItem("isLogin");
          window.location.reload(false);
        }}
      >
        Logout
      </Button>
    </div>
  );
};

const styles = {
  navItem: {
    height: 45,
    display: "flex",
    alignItems: "center",
    paddingLeft: 10,
    borderRadius: 7,
    marginBottom: 10,
    cursor: "pointer",
    color: "rgba(0, 0, 0, 0.7)",
    textDecoration: "none",
  },
};

export default Adminsidebar;
