import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { addInstructor, getInstructorById, updateInstructor } from "../apis";
import SimpleAlert from "./SimpleAlert";
import { BiUserPlus } from "react-icons/bi";
import { MainContext } from "../contexts/MainContext";

const InstructorForm = ({ from }) => {
  const { selectedInstructor, setSelectedInstructor } = useContext(MainContext);
  const navigate = useNavigate();
  const location = useLocation();
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
        if (selectedInstructor) {
          setFirstName(selectedInstructor.firstName);
          setMiddleInitial(selectedInstructor.middleInitial);
          setLastName(selectedInstructor.lastName);
        } else {
          let pathId = location.pathname.split("/");
          pathId = pathId[pathId.length - 1];

          const instructorObj = {
            firstName: "",
            middleInitial: "",
            lastName: "",
          };

          const res = await getInstructorById(pathId);

          if (res.status) {
            const instructor = {
              ...instructorObj,
              ...res.instructor,
            };

            setFirstName(instructor?.firstName);
            setMiddleInitial(instructor?.middleInitial);
            setLastName(instructor?.lastName);
          }
        }
      }
    }

    init();

    return () => setSelectedInstructor(null);
  }, [selectedInstructor]);

  const handleAddInstructor = async (e) => {
    e.preventDefault();

    const res = await addInstructor({
      firstName,
      middleInitial,
      lastName,
    });

    if (res.status) {
      setFirstName("");
      setMiddleInitial("");
      setLastName("");
      setAlertMessage("Successfully Added!");
      setShowAlert(true);
    } else {
      setAlertMessage("Failed to add instructor!");
      setShowAlert(true);
    }
  };

  const handleUpdateInstructor = async (e) => {
    e.preventDefault();

    let pathId = location.pathname.split("/");
    pathId = pathId[pathId.length - 1];

    const res = await updateInstructor(
      {
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
      setAlertMessage("Failed to update instructor!");
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
          {from === "add" ? "Add Instructor" : "Edit Instructor"}
        </h5>
        <Form style={{ width: "40%" }}>
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
                ? handleAddInstructor
                : from === "edit"
                ? handleUpdateInstructor
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

const InstructorView = () => {
  const navigate = useNavigate();
  const { instructors, setSelectedInstructor } = useContext(MainContext);

  return (
    <div className="d-flex flex-column">
      <NavLink className="align-self-end" to="/admin/instructors/add">
        <Button
          variant="success"
          className="d-flex flex-row align-items-center"
        >
          <BiUserPlus style={{ fontSize: 22, marginRight: "5px" }} />
          <span>Add Instructor</span>
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
              <th>First Name</th>
              <th>Middle Initial</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor, index) => (
              <tr
                key={`instructor-${index + 1}`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/admin/instructors/edit/" + instructor.id);
                  setSelectedInstructor(instructor);
                }}
              >
                <td>{index + 1}</td>
                <td>{instructor.firstName}</td>
                <td>{instructor.middleInitial}</td>
                <td>{instructor.lastName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const Instructors = () => {
  const location = useLocation();
  let subPath = "index";

  if (location.pathname.split("/").length > 3) {
    subPath = location.pathname.split("/")[3];
  }

  return subPath === "add" || subPath === "edit" ? (
    <InstructorForm from={subPath} />
  ) : (
    <InstructorView />
  );
};

export default Instructors;
