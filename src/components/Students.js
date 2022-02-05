import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { addStudent, getStudentById, updateStudent } from "../apis";
import SimpleAlert from "./SimpleAlert";
import { BiUserPlus } from "react-icons/bi";
import { MainContext } from "../contexts/MainContext";

const StudentForm = ({ from }) => {
  const { selectedStudent, setSelectedStudent } = useContext(MainContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [studentId, setStudentId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [lastName, setLastName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(
    "This is just an alert message!"
  );

  useEffect(() => {
    async function init() {
      if (from === "edit") {
        if (selectedStudent) {
          setStudentId(selectedStudent.studentId);
          setFirstName(selectedStudent.firstName);
          setMiddleInitial(selectedStudent.middleInitial);
          setLastName(selectedStudent.lastName);
        } else {
          let pathId = location.pathname.split("/");
          pathId = pathId[pathId.length - 1];

          const studentObj = {
            studentId: "",
            firstName: "",
            middleInitial: "",
            lastName: "",
          };

          const res = await getStudentById(pathId);

          if (res.status) {
            const student = {
              ...studentObj,
              ...res.student,
            };

            setStudentId(student?.studentId);
            setFirstName(student?.firstName);
            setMiddleInitial(student?.middleInitial);
            setLastName(student?.lastName);
          }
        }
      }
    }

    init();

    return () => setSelectedStudent(null);
  }, [selectedStudent]);

  const handleAddStudent = async (e) => {
    e.preventDefault();

    const res = await addStudent({
      studentId,
      firstName,
      middleInitial,
      lastName,
    });

    if (res.status) {
      setStudentId("");
      setFirstName("");
      setMiddleInitial("");
      setLastName("");
      setAlertMessage("Successfully Added!");
      setShowAlert(true);
    } else {
      setAlertMessage("Failed to add student!");
      setShowAlert(true);
    }
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();

    let pathId = location.pathname.split("/");
    pathId = pathId[pathId.length - 1];

    const res = await updateStudent(
      {
        studentId,
        firstName,
        middleInitial,
        lastName,
      },
      pathId
    );

    if (res.status) {
      setAlertMessage("Successfully Updated!");
      setShowAlert(true);
    } else {
      setAlertMessage("Failed to update student!");
      setShowAlert(true);
    }
  };

  return (
    <>
      <SimpleAlert
        show={showAlert}
        message={alertMessage}
        onClose={() => {
          setAlertMessage("");
          setShowAlert(false);
        }}
      />
      <div
        className="d-flex flex-column bg-white p-4"
        style={{
          boxShadow: "1px 1px 5px 1px rgba(0, 0, 0, 0.2)",
          borderRadius: 10,
        }}
      >
        <h5 className="mb-4">
          {from === "add" ? "Add Student" : "Edit Student"}
        </h5>
        <Form style={{ width: "40%" }}>
          <Form.Group className="mb-3" controlId="formBasicStudentId">
            <Form.Label>Student ID</Form.Label>
            <Form.Control
              value={studentId}
              type="text"
              placeholder="Enter student id"
              onChange={(e) => setStudentId(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              value={firstName}
              type="text"
              placeholder="Enter first name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMiddleInitial">
            <Form.Label>Middle Initial</Form.Label>
            <Form.Control
              value={middleInitial}
              type="text"
              placeholder="Enter middle initial"
              onChange={(e) => setMiddleInitial(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              value={lastName}
              type="text"
              placeholder="Enter last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
        </Form>
        <div className="d-flex flex-row align-self-end">
          <Button
            className="mt-5 me-2"
            variant="secondary"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </Button>
          <Button
            className="mt-5"
            variant="primary"
            type="submit"
            onClick={
              from === "add"
                ? handleAddStudent
                : from === "edit"
                ? handleUpdateStudent
                : null
            }
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

const StudentView = () => {
  const navigate = useNavigate();
  const { students, setSelectedStudent } = useContext(MainContext);

  return (
    <div className="d-flex flex-column">
      <NavLink className="align-self-end" to="/admin/students/add">
        <Button
          variant="success"
          className="d-flex flex-row align-items-center"
        >
          <BiUserPlus style={{ fontSize: 22, marginRight: "5px" }} />
          <span>Add Student</span>
        </Button>
      </NavLink>

      <div
        style={{
          padding: "1em",
          backgroundColor: "white",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          marginTop: "1em",
          borderRadius: 10,
        }}
      >
        <Table borderless hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Student ID</th>
              <th>First Name</th>
              <th>Middle Initial</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={`student-${index + 1}`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/admin/students/edit/" + student.id);
                  setSelectedStudent(student);
                }}
              >
                <td>{index + 1}</td>
                <td>{student.studentId}</td>
                <td>{student.firstName}</td>
                <td>{student.middleInitial}</td>
                <td>{student.lastName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const Students = () => {
  const location = useLocation();
  let subPath = "index";

  if (location.pathname.split("/").length > 3) {
    subPath = location.pathname.split("/")[3];
  }

  return subPath === "add" || subPath === "edit" ? (
    <StudentForm from={subPath} />
  ) : (
    <StudentView />
  );
};

export default Students;
