import React, { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { Row, Col } from "react-bootstrap";

const Dashboard = () => {
  const { students, subjects, instructors } = useContext(MainContext);
  return (
    <Row>
      <Col lg={4}>
        <div
          className="bg-white p-4 text-primary"
          style={{
            boxShadow: "1px 1px 10px 1px rgba(0, 0, 0, 0.1)",
            borderRadius: 15,
          }}
        >
          <h6 className="mb-4">Total Students Registered</h6>
          <h2>{students ? students.length : 0}</h2>
        </div>
      </Col>
      <Col lg={4}>
        <div
          className="bg-white p-4 text-success"
          style={{
            boxShadow: "1px 1px 10px 1px rgba(0, 0, 0, 0.1)",
            borderRadius: 15,
          }}
        >
          <h6 className="mb-4">Total Subjects</h6>
          <h2>{subjects ? subjects.length : 0}</h2>
        </div>
      </Col>
      <Col lg={4}>
        <div
          className="bg-white p-4 text-danger"
          style={{
            boxShadow: "1px 1px 10px 1px rgba(0, 0, 0, 0.1)",
            borderRadius: 15,
          }}
        >
          <h6 className="mb-4">Total Instructors</h6>
          <h2>{instructors ? instructors.length : 0}</h2>
        </div>
      </Col>
    </Row>
  );
};

export default Dashboard;
