import React from "react";
import { useLocation } from "react-router-dom";
import Adminsidebar from "./AdminSidebar";
import Dashboard from "./Dashboard";
import Grades from "./Grades";
import Students from "./Students";
import Subjects from "./Subjects";
import Instructors from "./Instructors";

const Adminpanel = () => {
  const location = useLocation();
  const selectedPath = location.pathname.split("/")[2];
  const title = selectedPath.charAt(0).toUpperCase() + selectedPath.slice(1);

  return (
    <div className="d-flex flex-row">
      <Adminsidebar />
      <div
        style={{
          paddingTop: "1em",
          paddingRight: "2em",
          paddingLeft: "2em",
          paddingBottom: "1em",
          width: "100%",
        }}
      >
        <span
          style={{
            fontSize: "1.5em",
            fontWeight: "bold",
            color: "rgba(0, 0, 0, 0.75)",
          }}
        >
          {title}
        </span>
        <div className="mt-5">
          {selectedPath === "dashboard" ? (
            <Dashboard />
          ) : selectedPath === "grades" ? (
            <Grades />
          ) : selectedPath === "students" ? (
            <Students />
          ) : selectedPath === "subjects" ? (
            <Subjects />
          ) : selectedPath === "instructors" ? (
            <Instructors />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Adminpanel;
