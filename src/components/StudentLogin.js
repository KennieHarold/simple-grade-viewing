import React, { useState, useContext } from "react";
import { Card, Form, Button } from "react-bootstrap";
import SimpleAlert from "./SimpleAlert";
import { MainContext } from "../contexts/MainContext";

const StudentLogin = () => {
  const { students } = useContext(MainContext);
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(
    "This is just an alert message!"
  );

  const handleLogin = (e) => {
    e.preventDefault();

    const idx = students.findIndex(
      (student) => student.studentId === studentId
    );

    if (idx !== -1) {
      if (password === `${students[idx].lastName}-${students[idx].studentId}`) {
        localStorage.setItem("isLogin", true);
        localStorage.setItem("user", students[idx].id);

        window.location.reload(false);
      } else {
        setAlertMessage("Wrong credentials please try again!");
        setShowAlert(true);
      }
    } else {
      setAlertMessage("Wrong credentials please try again!");
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
      <div className="d-flex justify-content-center align-items-center">
        <Card className="mt-5 p-4 w-25">
          <Card.Title className="text-center">Student Login</Card.Title>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicStudentId">
                <Form.Label>Student ID</Form.Label>
                <Form.Control
                  value={studentId}
                  type="text"
                  placeholder="Enter Student ID"
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={handleLogin}>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default StudentLogin;
