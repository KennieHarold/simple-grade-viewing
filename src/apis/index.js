import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//-------------------------------------------------------------------------
// STUDENT APIS
//-------------------------------------------------------------------------
export const addStudent = async (data) => {
  try {
    await api.post("/students", data);
    return { status: true };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
};

export const getStudents = async () => {
  try {
    const res = await api.get("/students");

    if (res) {
      return { students: res.data, status: true };
    }

    return { students: [], status: false };
  } catch (error) {
    console.log(error);
    return { students: [], status: false };
  }
};

export const getStudentById = async (studentId) => {
  try {
    const res = await api.get("/students/" + studentId);

    if (res) {
      return { student: res.data, status: true };
    }

    return { student: null, status: false };
  } catch (error) {
    console.log(error);
    return { student: null, status: false };
  }
};

export const updateStudent = async (data, id) => {
  try {
    await api.put("/students/" + id, data);
    return { status: true };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
};

//-------------------------------------------------------------------------
// SUBJECT APIS
//-------------------------------------------------------------------------
export const addSubject = async (data) => {
  try {
    await api.post("/subjects", data);
    return { status: true };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
};

export const getSubjects = async () => {
  try {
    const res = await api.get("/subjects");

    if (res) {
      return { subjects: res.data, status: true };
    }

    return { subjects: [], status: false };
  } catch (error) {
    console.log(error);
    return { subjects: [], status: false };
  }
};

export const getSubjectById = async (subjectId) => {
  try {
    const res = await api.get("/subjects/" + subjectId);

    if (res) {
      return { subjects: res.data, status: true };
    }

    return { subject: null, status: false };
  } catch (error) {
    console.log(error);
    return { subject: null, status: false };
  }
};

export const updateSubject = async (data, id) => {
  try {
    await api.put("/subjects/" + id, data);
    return { status: true };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
};

//-------------------------------------------------------------------------
// INSTRUCTORS APIS
//-------------------------------------------------------------------------
export const addInstructor = async (data) => {
  try {
    await api.post("/instructors", data);
    return { status: true };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
};

export const getInstructors = async () => {
  try {
    const res = await api.get("/instructors");

    if (res) {
      return { instructors: res.data, status: true };
    }

    return { instructors: [], status: false };
  } catch (error) {
    console.log(error);
    return { instructors: [], status: false };
  }
};

export const getInstructorById = async (instructorId) => {
  try {
    const res = await api.get("/instructors/" + instructorId);

    if (res) {
      return { instructors: res.data, status: true };
    }

    return { instructor: null, status: false };
  } catch (error) {
    console.log(error);
    return { instructor: null, status: false };
  }
};

export const updateInstructor = async (data, id) => {
  try {
    await api.put("/instructors/" + id, data);
    return { status: true };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
};

//-------------------------------------------------------------------------
// GRADE APIS
//-------------------------------------------------------------------------
export const addGrade = async (data, studentId) => {
  try {
    await api.post("/grades/" + "grade-" + studentId, data);
    return { status: true };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
};

export const getGrades = async () => {
  try {
    const res = await api.get("/grades");

    if (res) {
      return { grades: res.data, status: true };
    }

    return { grades: [], status: false };
  } catch (error) {
    console.log(error);
    return { grades: [], status: false };
  }
};
