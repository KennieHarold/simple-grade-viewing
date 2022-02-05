import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import SimpleAlert from "./SimpleAlert";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(
    "This is just an alert message!"
  );

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      localStorage.setItem("isLogin", true);
      localStorage.setItem("user", "admin");

      window.location.reload(false);
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
          <Card.Title className="text-center">Admin Login</Card.Title>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  value={username}
                  type="username"
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
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

export default AdminLogin;
