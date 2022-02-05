const path = require("path");
const JSONdb = require("simple-json-db");
const { v4: uuidv4 } = require("uuid");
const students = new JSONdb(path.join(__dirname + "/../db/students.json"));
const subjects = new JSONdb(path.join(__dirname + "/../db/subjects.json"));
const instructors = new JSONdb(
  path.join(__dirname + "/../db/instructors.json")
);
const grades = new JSONdb(path.join(__dirname + "/../db/grades.json"));

module.exports.configure = (app) => {
  //-------------------------------------------------------------------------
  // STUDENTS APIS
  //-------------------------------------------------------------------------
  app.post("/api/students", function (req, res) {
    try {
      const id = uuidv4();
      students.set(id, { ...req.body });

      res.status(200).send("Success");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

  app.get("/api/students", function (req, res) {
    try {
      const studentsJSON = students.JSON();
      let data = [];

      Object.keys(studentsJSON).forEach((key) => {
        data.push({
          id: key,
          ...studentsJSON[key],
        });
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  });

  app.get("/api/students/:id", function (req, res) {
    try {
      const id = req.params.id;
      const studentsJSON = students.JSON();

      res.status(200).json({ id, ...studentsJSON[id] });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  });

  app.put("/api/students/:id", function (req, res) {
    try {
      const id = req.params.id;

      students.set(id, { ...req.body });

      res.status(200).send("Success");
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  });

  //-------------------------------------------------------------------------
  // SUBJECT APIS
  //-------------------------------------------------------------------------
  app.post("/api/subjects", function (req, res) {
    try {
      const id = uuidv4();
      subjects.set(id, { ...req.body });

      res.status(200).send("Success");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

  app.get("/api/subjects", function (req, res) {
    try {
      const subjectsJSON = subjects.JSON();
      let data = [];

      Object.keys(subjectsJSON).forEach((key) => {
        data.push({
          id: key,
          ...subjectsJSON[key],
        });
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  });

  app.get("/api/subjects/:id", function (req, res) {
    try {
      const id = req.params.id;
      const subjectsJSON = subjects.JSON();

      res.status(200).json({ id, ...subjectsJSON[id] });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  });

  app.put("/api/subjects/:id", function (req, res) {
    try {
      const id = req.params.id;

      subjects.set(id, { ...req.body });

      res.status(200).send("Success");
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  });

  //-------------------------------------------------------------------------
  // INSTRUCTORS APIS
  //-------------------------------------------------------------------------
  app.post("/api/instructors", function (req, res) {
    try {
      const id = uuidv4();
      instructors.set(id, { ...req.body });

      res.status(200).send("Success");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

  app.get("/api/instructors", function (req, res) {
    try {
      const instructorsJSON = instructors.JSON();
      let data = [];

      Object.keys(instructorsJSON).forEach((key) => {
        data.push({
          id: key,
          ...instructorsJSON[key],
        });
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  });

  app.get("/api/instructors/:id", function (req, res) {
    try {
      const id = req.params.id;
      const instructorsJSON = instructors.JSON();

      res.status(200).json({ id, ...instructorsJSON[id] });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  });

  app.put("/api/instructors/:id", function (req, res) {
    try {
      const id = req.params.id;

      instructors.set(id, { ...req.body });

      res.status(200).send("Success");
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  });

  //-------------------------------------------------------------------------
  // GRADE APIS
  //-------------------------------------------------------------------------
  app.post("/api/grades/:id", function (req, res) {
    try {
      const id = req.params.id;
      const gradesJSON = grades.JSON();

      const studentGrade = gradesJSON[id];
      const newGrade = {
        ...studentGrade,
        [req.body.term]: [...req.body.grades],
      };

      grades.set(id, newGrade);

      res.status(200).send("Success");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

  app.get("/api/grades", function (req, res) {
    try {
      const gradesJSON = grades.JSON();
      let data = [];

      Object.keys(gradesJSON).forEach((key) => {
        data.push({
          id: key,
          ...gradesJSON[key],
        });
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  });
};
