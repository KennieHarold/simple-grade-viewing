import React, { createContext, useState, useEffect } from "react";
import { getInstructors, getStudents, getSubjects, getGrades } from "../apis";

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  //  Students
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);

  //  Subjects
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);

  //  Instructors
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [instructors, setInstructors] = useState([]);

  //  Grades
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const res = await getStudents();
      setStudents(res.students);
    }

    async function loadSubjects() {
      const res = await getSubjects();
      setSubjects(res.subjects);
    }

    async function loadInstructors() {
      const res = await getInstructors();
      setInstructors(res.instructors);
    }

    async function loadGrades() {
      const res = await getGrades();
      setGrades(res.grades);
    }

    Promise.all([
      loadStudents(),
      loadSubjects(),
      loadInstructors(),
      loadGrades(),
    ]);
  }, []);

  return (
    <MainContext.Provider
      value={{
        //  Students
        students,
        selectedStudent,
        setSelectedStudent,

        //  Subjects
        subjects,
        selectedSubject,
        setSelectedSubject,

        //  Instructors
        instructors,
        selectedInstructor,
        setSelectedInstructor,

        //  Grades
        grades,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
