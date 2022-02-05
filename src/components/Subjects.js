import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { addSubject, getSubjectById, updateSubject } from "../apis";
import SimpleAlert from "./SimpleAlert";
import { BiUserPlus } from "react-icons/bi";
import { MainContext } from "../contexts/MainContext";

const SubjectForm = ({ from }) => {
  const { selectedSubject, setSelectedSubject } = useContext(MainContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

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
        } else {
          let pathId = location.pathname.split("/");
          pathId = pathId[pathId.length - 1];

          const subjectObj = {
            code: "",
            title: "",
            desc: "",
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
    });

    if (res.status) {
      setCode("");
      setTitle("");
      setDesc("");
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
