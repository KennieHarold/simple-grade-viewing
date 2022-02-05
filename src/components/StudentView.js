import React, { useContext, useState, useEffect } from "react";
import { MainContext } from "../contexts/MainContext";
import { useNavigate } from "react-router-dom";
import { getStudentById } from "../apis";
import { Table, Button } from "react-bootstrap";

const StudentView = () => {
  const navigate = useNavigate();
  const { selectedStudent, setSelectedStudent, subjects, grades, instructors } =
    useContext(MainContext);

  useEffect(() => {
    async function init() {
      const studentId = localStorage.getItem("user");

      const res = await getStudentById(studentId);

      console.log(res);

      setSelectedStudent({ ...res.student });
    }

    if (!selectedStudent) {
      init();
    }

    return () => {};
  }, []);

  const getInstructorFromGrades = (term, subjectId) => {
    const idx = grades.findIndex(
      (grade) => grade.id === "grade-" + selectedStudent.id
    );

    if (idx !== -1) {
      const gradeObj = grades[idx];

      if (gradeObj[term] && gradeObj[term] !== undefined) {
        const gradeTerm = gradeObj[term];

        const idx2 = gradeTerm.findIndex(
          (item) => item.subjectId === subjectId
        );

        if (idx2 !== -1) {
          const instructorId = gradeTerm[idx2].instructorId;

          const idx3 = instructors.findIndex(
            (instructor) => instructor.id === instructorId
          );

          if (idx3 !== -1) {
            return (
              instructors[idx3].firstName + " " + instructors[idx3].lastName
            );
          }
        }
      }
    }

    return "Not set";
  };

  const getGradeFromGrades = (term, subjectId) => {
    const idx = grades.findIndex(
      (grade) => grade.id === "grade-" + selectedStudent.id
    );

    if (idx !== -1) {
      const gradeObj = grades[idx];

      if (gradeObj[term] && gradeObj[term] !== undefined) {
        const gradeTerm = gradeObj[term];

        const idx2 = gradeTerm.findIndex(
          (item) => item.subjectId === subjectId
        );

        if (idx2 !== -1) {
          return gradeTerm[idx2].grade;
        }
      }
    }

    return "Not set";
  };

  const getStatus = (_grade) => {
    let grade = parseFloat(_grade);

    if (grade <= 3) {
      return "Passed";
    } else if (grade === 5 || grade === 5.0) {
      return "Failed";
    } else if (grade === 7 || grade === 7.0) {
      return "Incomplete";
    } else if (grade === 9 || grade === 9.0) {
      return "Dropped";
    } else {
      return "Not Set";
    }
  };

  return selectedStudent ? (
    <div className="container d-flex flex-column mt-5 mb-5">
      <h5 className="mb-3 text-center">
        Grades for {selectedStudent.firstName + " " + selectedStudent.lastName}
      </h5>
      <div
        style={{
          padding: "1.25em",
          backgroundColor: "white",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          marginTop: "1em",
          borderRadius: 10,
          marginBottom: "1.5em",
        }}
      >
        <h5 className="mb-4 text-center">Prelim</h5>
        <Table bordered className="mt-4">
          <thead>
            <tr>
              <th>Subject Title</th>
              <th>Instructor</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={`grade-${index + 1}`}>
                <td>{subject.title}</td>
                <td>{getInstructorFromGrades("prelim", subject.id)}</td>
                <td>{getGradeFromGrades("prelim", subject.id)}</td>
                <td>{getStatus(getGradeFromGrades("prelim", subject.id))}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div
        style={{
          padding: "1.25em",
          backgroundColor: "white",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          marginTop: "1em",
          borderRadius: 10,
          marginBottom: "1.5em",
        }}
      >
        <h5 className="mb-4 text-center">Midterm</h5>
        <Table bordered className="mt-4">
          <thead>
            <tr>
              <th>Subject Title</th>
              <th>Instructor</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={`grade-${index + 1}`}>
                <td>{subject.title}</td>
                <td>{getInstructorFromGrades("midterm", subject.id)}</td>
                <td>{getGradeFromGrades("midterm", subject.id)}</td>
                <td>{getStatus(getGradeFromGrades("midterm", subject.id))}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div
        style={{
          padding: "1.25em",
          backgroundColor: "white",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          marginTop: "1em",
          borderRadius: 10,
          marginBottom: "1.5em",
        }}
      >
        <h5 className="mb-4 text-center">Pre-Final</h5>
        <Table bordered className="mt-4">
          <thead>
            <tr>
              <th>Subject Title</th>
              <th>Instructor</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={`grade-${index + 1}`}>
                <td>{subject.title}</td>
                <td>{getInstructorFromGrades("prefinal", subject.id)}</td>
                <td>{getGradeFromGrades("prefinal", subject.id)}</td>
                <td>{getStatus(getGradeFromGrades("prefinal", subject.id))}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div
        style={{
          padding: "1.25em",
          backgroundColor: "white",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          marginTop: "1em",
          borderRadius: 10,
          marginBottom: "1.5em",
        }}
      >
        <h5 className="mb-4 text-center">Finals</h5>
        <Table bordered className="mt-4">
          <thead>
            <tr>
              <th>Subject Title</th>
              <th>Instructor</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={`grade-${index + 1}`}>
                <td>{subject.title}</td>
                <td>{getInstructorFromGrades("finals", subject.id)}</td>
                <td>{getGradeFromGrades("finals", subject.id)}</td>
                <td>{getStatus(getGradeFromGrades("finals", subject.id))}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex flex-row mt-5 align-items-center justify-content-center">
        <a
          href="#"
          className="text-secondary"
          onClick={() => {
            localStorage.removeItem("isLogin");
            window.location.reload(false);
          }}
        >
          Logout
        </a>
        <span className="text-secondary">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="/admin-login" className="text-secondary">
          Admin Login
        </a>
      </div>

      <span className="mt-5 text-secondary" style={{ fontSize: 10 }}>
        Grade Viewing System v1.1 | Copyright @2022
      </span>
    </div>
  ) : (
    <span>Loading...</span>
  );
};

export default StudentView;
