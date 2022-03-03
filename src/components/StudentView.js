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
        <h5 className="mb-4 text-center">1st Year - First Semester</h5>
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
            {subjects
              .filter((subject) => subject.term === "1st-1sem")
              .map((subject, index) => (
                <tr key={`grade-${index + 1}`}>
                  <td>{subject.title}</td>
                  <td>{getInstructorFromGrades("1st-1sem", subject.id)}</td>
                  <td>{getGradeFromGrades("1st-1sem", subject.id)}</td>
                  <td>
                    {getStatus(getGradeFromGrades("1st-1sem", subject.id))}
                  </td>
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
        <h5 className="mb-4 text-center">1st Year - Second Semester</h5>
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
            {subjects
              .filter((subject) => subject.term === "1st-2sem")
              .map((subject, index) => (
                <tr key={`grade-${index + 1}`}>
                  <td>{subject.title}</td>
                  <td>{getInstructorFromGrades("1st-2sem", subject.id)}</td>
                  <td>{getGradeFromGrades("1st-2sem", subject.id)}</td>
                  <td>
                    {getStatus(getGradeFromGrades("1st-2sem", subject.id))}
                  </td>
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
        <h5 className="mb-4 text-center">2nd Year - First Semester</h5>
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
            {subjects
              .filter((subject) => subject.term === "2nd-1sem")
              .map((subject, index) => (
                <tr key={`grade-${index + 1}`}>
                  <td>{subject.title}</td>
                  <td>{getInstructorFromGrades("2nd-1sem", subject.id)}</td>
                  <td>{getGradeFromGrades("2nd-1sem", subject.id)}</td>
                  <td>
                    {getStatus(getGradeFromGrades("2nd-1sem", subject.id))}
                  </td>
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
        <h5 className="mb-4 text-center">2nd Year - Second Semester</h5>
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
            {subjects
              .filter((subject) => subject.term === "2nd-2sem")
              .map((subject, index) => (
                <tr key={`grade-${index + 1}`}>
                  <td>{subject.title}</td>
                  <td>{getInstructorFromGrades("2nd-2sem", subject.id)}</td>
                  <td>{getGradeFromGrades("2nd-2sem", subject.id)}</td>
                  <td>
                    {getStatus(getGradeFromGrades("2nd-2sem", subject.id))}
                  </td>
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
        <h5 className="mb-4 text-center">3rd Year - First Semester</h5>
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
            {subjects
              .filter((subject) => subject.term === "3rd-1sem")
              .map((subject, index) => (
                <tr key={`grade-${index + 1}`}>
                  <td>{subject.title}</td>
                  <td>{getInstructorFromGrades("3rd-1sem", subject.id)}</td>
                  <td>{getGradeFromGrades("3rd-1sem", subject.id)}</td>
                  <td>
                    {getStatus(getGradeFromGrades("3rd-1sem", subject.id))}
                  </td>
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
        <h5 className="mb-4 text-center">3rd Year - Second Semester</h5>
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
            {subjects
              .filter((subject) => subject.term === "3rd-2sem")
              .map((subject, index) => (
                <tr key={`grade-${index + 1}`}>
                  <td>{subject.title}</td>
                  <td>{getInstructorFromGrades("3rd-2sem", subject.id)}</td>
                  <td>{getGradeFromGrades("3rd-2sem", subject.id)}</td>
                  <td>
                    {getStatus(getGradeFromGrades("3rd-2sem", subject.id))}
                  </td>
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
        <h5 className="mb-4 text-center">4th Year - First Semester</h5>
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
            {subjects
              .filter((subject) => subject.term === "4th-1sem")
              .map((subject, index) => (
                <tr key={`grade-${index + 1}`}>
                  <td>{subject.title}</td>
                  <td>{getInstructorFromGrades("4th-1sem", subject.id)}</td>
                  <td>{getGradeFromGrades("4th-1sem", subject.id)}</td>
                  <td>
                    {getStatus(getGradeFromGrades("4th-1sem", subject.id))}
                  </td>
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
        <h5 className="mb-4 text-center">4th Year - Second Semester</h5>
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
            {subjects
              .filter((subject) => subject.term === "4th-2sem")
              .map((subject, index) => (
                <tr key={`grade-${index + 1}`}>
                  <td>{subject.title}</td>
                  <td>{getInstructorFromGrades("4th-2sem", subject.id)}</td>
                  <td>{getGradeFromGrades("4th-2sem", subject.id)}</td>
                  <td>
                    {getStatus(getGradeFromGrades("4th-2sem", subject.id))}
                  </td>
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
