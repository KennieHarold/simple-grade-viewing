import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { addSubject, getSubjectById, updateSubject } from "../apis";
import SimpleAlert from "./SimpleAlert";
import { BiUserPlus } from "react-icons/bi";
import { MainContext } from "../contexts/MainContext";

function getTermFromCode(termCode) {
  if (termCode === "1st-1sem") {
    return "1st Year - First Semester";
  } else if (termCode === "1st-2sem") {
    return "1st Year - Second Semester";
  } else if (termCode === "2nd-1sem") {
    return "2nd Year - First Semester";
  } else if (termCode === "2nd-2sem") {
    return "2nd Year - Second Semester";
  } else if (termCode === "3rd-1sem") {
    return "3rd Year - First Semester";
  } else if (termCode === "3rd-2sem") {
    return "3rd Year - Second Semester";
  } else if (termCode === "4th-1sem") {
    return "4th Year - First Semester";
  } else if (termCode === "4th-2sem") {
    return "4th Year - Second Semester";
  } else {
    return "Not Set";
  }
}

const SubjectForm = ({ from }) => {
  const { selectedSubject, setSelectedSubject } = useContext(MainContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [term, setTerm] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(
    "This is just an alert message!"
  );

  useEffect(() => {
    async function init() {
      if (from === "edit") {
        if (selectedSubject) {
          setCode(selectedSubject.code);
          setTitle(selectedSubject.title);
          setDesc(selectedSubject.desc);
          setTerm(selectedSubject.term || "");
        } else {
          let pathId = location.pathname.split("/");
          pathId = pathId[pathId.length - 1];

          const subjectObj = {
            code: "",
            title: "",
            desc: "",
            term: "",
          };

          const res = await getSubjectById(pathId);

          if (res.status) {
            const subject = {
              ...subjectObj,
              ...res.subject,
            };

            setCode(subject.code);
            setTitle(subject.title);
            setDesc(subject.desc);
            setTerm(subject.term || "");
          }
        }
      }
    }

    init();

    return () => setSelectedSubject(null);
  }, [selectedSubject]);

  const handleAddSubject = async (e) => {
    e.preventDefault();

    const res = await addSubject({
      code,
      title,
      desc,
      term,
    });

    if (res.status) {
      setCode("");
      setTitle("");
      setDesc("");
      setTerm("");
      setAlertMessage("Successfully Added!");
      setShowAlert(true);
    } else {
      setAlertMessage("Failed to add subject!");
      setShowAlert(true);
    }
  };

  const handleUpdateSubject = async (e) => {
    e.preventDefault();

    let pathId = location.pathname.split("/");
    pathId = pathId[pathId.length - 1];

    const res = await updateSubject(
      {
        code,
        title,
        desc,
        term,
      },
      pathId
    );

    if (res.status) {
      setAlertMessage("Successfully Updated!");
      setShowAlert(true);
    } else {
      setAlertMessage("Failed to update subject!");
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
          {from === "add" ? "Add Subject" : "Edit Subject"}
        </h5>
        <Form style={{ width: "40%" }}>
          <Form.Group className="mb-3" controlId="formBasicSubject">
            <Form.Label>Subject Code</Form.Label>
            <Form.Control
              value={code}
              type="text"
              placeholder="Enter subject code"
              onChange={(e) => setCode(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Subject Title</Form.Label>
            <Form.Control
              value={title}
              type="text"
              placeholder="Enter subject title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={desc}
              type="text"
              placeholder="Enter description"
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTerm">
            <Form.Label>Term or Semester</Form.Label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={term}
              onChange={(e) => {
                console.log(e.target.value);
                setTerm(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Term or Semester
              </option>
              <option value="1st-1sem">1st Year - First Semester</option>
              <option value="1st-2sem">1st Year - Second Semester</option>
              <option value="2nd-1sem">2nd Year - First Semester</option>
              <option value="2nd-1sem">2nd Year - Second Semester</option>
              <option value="3rd-1sem">3rd Year - First Semester</option>
              <option value="3rd-2sem">3rd Year - Second Semester</option>
              <option value="4th-1sem">4th Year - First Semester</option>
              <option value="4th-2sem">4th Year - Second Semester</option>
            </select>
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
                ? handleAddSubject
                : from === "edit"
                ? handleUpdateSubject
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

const SubjectView = () => {
  const navigate = useNavigate();
  const { subjects, setSelectedSubject } = useContext(MainContext);

  return (
    <div className="d-flex flex-column">
      <NavLink className="align-self-end" to="/admin/subjects/add">
        <Button
          variant="success"
          className="d-flex flex-row align-items-center"
        >
          <BiUserPlus style={{ fontSize: 22, marginRight: "5px" }} />
          <span>Add Subject</span>
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
              <th>Subject Code</th>
              <th>Subject Title</th>
              <th>Description</th>
              <th>Term or Semester</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr
                key={`subject-${index + 1}`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/admin/subjects/edit/" + subject.id);
                  setSelectedSubject(subject);
                }}
              >
                <td>{index + 1}</td>
                <td>{subject.code}</td>
                <td>{subject.title}</td>
                <td>{subject.desc}</td>
                <td>{getTermFromCode(subject.term)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const Subjects = () => {
  const location = useLocation();
  let subPath = "index";

  if (location.pathname.split("/").length > 3) {
    subPath = location.pathname.split("/")[3];
  }

  return subPath === "add" || subPath === "edit" ? (
    <SubjectForm from={subPath} />
  ) : (
    <SubjectView />
  );
};

export default Subjects;
