import React, { useState, useContext } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import SimpleAlert from "./SimpleAlert";
import { MainContext } from "../contexts/MainContext";
import background from "../assets/background.jpg";
import overlay from "../assets/overlay.jpg";

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
      <Row className="w-100" style={{ margin: 0 }}>
        <Col md="6" style={{ padding: 0 }}>
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <h2 className="mb-5 fw-bold">BSIT BSCS Grade Viewing System</h2>
            <img width="95%" src={background} />
          </div>
        </Col>
        <Col md="6" style={{ padding: 0 }}>
          <div
            className="d-flex justify-content-center align-items-center bg-dark"
            style={{ height: "100vh", position: "relative" }}
          >
            <div
              style={{
                background: "black",
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: 1,
                opacity: 0.4,
              }}
            ></div>
            <div
              style={{
                backgroundImage: `url(${overlay})`,
                backgroundSize: "cover",
                width: "100%",
                height: "100%",
                position: "absolute",
              }}
            ></div>
            <Card className="p-4" style={{ width: 350, zIndex: 2 }}>
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
        </Col>
      </Row>
    </>
  );
};

export default StudentLogin;
