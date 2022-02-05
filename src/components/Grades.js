import React, { useContext, useState, useEffect } from "react";
import { MainContext } from "../contexts/MainContext";
import { useNavigate, useLocation } from "react-router-dom";
import { addGrade, getStudentById } from "../apis";
import SimpleAlert from "./SimpleAlert";
import { Table, Button, Form } from "react-bootstrap";

const GradeForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedStudent, setSelectedStudent, subjects, instructors } =
    useContext(MainContext);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(
    "This is just an alert message!"
  );

  let studentId = location.pathname.split("/");
  studentId = studentId[studentId.length - 1];

  let term = location.search.split("?term=");
  term = term.length > 0 ? term[1] : "prelim";

  useEffect(() => {
    async function init() {
      let pathId = location.pathname.split("/");
      pathId = pathId[pathId.length - 1];

      const res = await getStudentById(pathId);

      setSelectedStudent({ ...res.student });
    }

    if (!selectedStudent) {
      init();
    }

    return () => {};
  }, []);

  const handleSubmitGrade = async (e) => {
    e.preventDefault();

    let gradesWithInst = [];
    let index = 0;

    for (let i = 0; i < subjects.length; i++) {
      const data = {
        subjectId: "",
        instructorId: "",
        grade: "",
      };

      data.subjectId = subjects[i].id;

      for (let j = 0; j < 2; j++) {
        if (j === 0) {
          const val = e.target.form[index].value;
          data.grade = parseFloat(val.toString()).toFixed(2);
        } else {
          data.instructorId = e.target.form[index].value;
        }
        index++;
      }
      gradesWithInst.push(data);
    }

    const gradeObj = {
      term,
      grades: gradesWithInst,
    };

    const res = await addGrade(gradeObj, selectedStudent.id);

    if (res.status) {
      setAlertMessage("Successfully updated grade!");
      setShowAlert(true);
    } else {
      setAlertMessage("Failed to update grade!");
      setShowAlert(true);
    }
  };

  return selectedStudent ? (
    <>
      <SimpleAlert
        show={showAlert}
        message={alertMessage}
        onClose={() => {
          setAlertMessage("");
          setShowAlert(false);
        }}
      />
      <div className="d-flex flex-column">
        <h5>
          {`Update ${term} grade for ${
            selectedStudent.firstName + " " + selectedStudent.lastName
          }`}
        </h5>

        <div style={{ width: "40%", marginTop: "2em", paddingBottom: "2em" }}>
          <Form>
            {subjects.map((subject, index) => (
              <Form.Group
                key={`grade-${index}`}
                className="mb-4 bg-white p-4 pb-5"
                controlId={`formBasicGrade-${index}`}
                style={{
                  boxShadow: "1px 1px 5px 1px rgba(0, 0, 0, 0.1)",
                  borderRadius: 10,
                }}
              >
                <Form.Label className="fw-bold">{subject.title}</Form.Label>
                <Form.Control type="number" className="mb-3" />

                <Form.Label>Instructor</Form.Label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected disabled>
                    Select Instructors
                  </option>
                  {instructors.map((instructor, index) => (
                    <option key={`inst-${index}`} value={instructor.id}>
                      {instructor.firstName + " " + instructor.lastName}
                    </option>
                  ))}
                </select>
              </Form.Group>
            ))}
            <div className="d-flex flex-row" style={{ float: "right" }}>
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
                onClick={handleSubmitGrade}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  ) : (
    <span>Loading...</span>
  );
};

const GradeIndex = () => {
  const navigate = useNavigate();
  const { students, setSelectedStudent } = useContext(MainContext);

  return (
    <div className="d-flex flex-column">
      <h5 className="mb-3">List of registered students</h5>
      <div
        style={{
          padding: "1.25em",
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
                  navigate("/admin/grades/view/" + student.id);
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

const GradeView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedStudent, setSelectedStudent, subjects, grades, instructors } =
    useContext(MainContext);

  let studentId = location.pathname.split("/");
  studentId = studentId[studentId.length - 1];

  useEffect(() => {
    async function init() {
      let pathId = location.pathname.split("/");
      pathId = pathId[pathId.length - 1];

      const res = await getStudentById(pathId);

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
    <div className="d-flex flex-column">
      <h5 className="mb-3">
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
        <Button
          size="sm"
          onClick={() => {
            navigate("/admin/grades/edit/" + studentId + "?term=prelim");
          }}
        >
          Update Grade
        </Button>
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
        <Button
          size="sm"
          onClick={() => {
            navigate("/admin/grades/edit/" + studentId + "?term=midterm");
          }}
        >
          Update Grade
        </Button>
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
        <Button
          size="sm"
          onClick={() => {
            navigate("/admin/grades/edit/" + studentId + "?term=prefinal");
          }}
        >
          Update Grade
        </Button>
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
        <Button
          size="sm"
          onClick={() => {
            navigate("/admin/grades/edit/" + studentId + "?term=finals");
          }}
        >
          Update Grade
        </Button>
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
    </div>
  ) : (
    <span>Loading...</span>
  );
};

const Grades = () => {
  const location = useLocation();
  let subPath = "index";

  if (location.pathname.split("/").length > 3) {
    subPath = location.pathname.split("/")[3];
  }

  return subPath === "view" ? (
    <GradeView />
  ) : subPath === "edit" ? (
    <GradeForm />
  ) : (
    <GradeIndex />
  );
};

export default Grades;
