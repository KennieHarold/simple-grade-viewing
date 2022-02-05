import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//  Wrappers
import AdminAuthRedirect from "./wrappers/AdminAuthRedirect";
import RequireAdminAuth from "./wrappers/RequireAdminAuth";
import StudentAuthRedirect from "./wrappers/StudentAuthRedirect";
import RequireStudentAuth from "./wrappers/RequireStudentAuth";

//  Contexts
import { AuthContextProvider } from "./contexts/AuthContext";
import { MainContextProvider } from "./contexts/MainContext";

//  Component
import AdminLogin from "./components/AdminLogin";
import Adminpanel from "./components/AdminPanel";
import StudentLogin from "./components/StudentLogin";
import StudentView from "./components/StudentView";

const compose = (contexts, children) =>
  contexts.reduce((acc, Context) => <Context>{acc}</Context>, children);

const contexts = [AuthContextProvider, MainContextProvider];

const App = () => {
  return compose(
    contexts,
    <BrowserRouter>
      <Routes>
        {/************* Student Routes *************/}

        <Route
          path="/"
          element={
            <StudentAuthRedirect>
              <StudentLogin />
            </StudentAuthRedirect>
          }
        />

        <Route
          path="/student-view"
          element={
            <RequireStudentAuth>
              <StudentView />
            </RequireStudentAuth>
          }
        />

        {/************* Admin Routes *************/}

        <Route
          path="/admin-login"
          element={
            <AdminAuthRedirect>
              <AdminLogin />
            </AdminAuthRedirect>
          }
        />

        <Route
          path="/admin"
          element={
            <RequireAdminAuth>
              <Navigate to="/admin/dashboard" />
            </RequireAdminAuth>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <RequireAdminAuth>
              <Adminpanel />
            </RequireAdminAuth>
          }
        />

        <Route
          path="/admin/grades"
          element={
            <RequireAdminAuth>
              <Adminpanel />
            </RequireAdminAuth>
          }
        />

        <Route
          path="/admin/grades/view/:id"
          element={
            <RequireAdminAuth>
              <Adminpanel />
            </RequireAdminAuth>
          }
        />

        <Route
          path="/admin/grades/edit/:id"
          element={
            <RequireAdminAuth>
              <Adminpanel />
            </RequireAdminAuth>
          }
        />

        <Route
          path="/admin/students"
          element={
            <RequireAdminAuth>
              <Adminpanel />
            </RequireAdminAuth>
          }
        />

        <Route
          path="/admin/students/add"
          element={
            <RequireAdminAuth>
              <Adminpanel />
            </RequireAdminAuth>
          }
        />

        <Route
          path="/admin/students/edit/:id"
          element={
            <RequireAdminAuth>
              <Adminpanel />
            </RequireAdminAuth>
          }
        />

        <Route
          path="/admin/subjects"
          element={
            <RequireAdminAuth>
              <Adminpanel />
            </RequireAdminAuth>
          }
        />

        <Route
          path="/admin/subjects/add"
          element={
            <RequireAdminAuth>
              <Adminpanel />
            </RequireAdminAuth>
          }
        />

        <Route
          path="/admin/subjects/edit/:id"
          element={
            <RequireAdminAuth>
              <Adminpanel />
            </RequireAdminAuth>
          }
        />

        <Route
          path="/admin/instructors"
          element={
            <RequireAdminAuth>
              <Adminpanel />
            </RequireAdminAuth>
          }
        />

        <Route
          path="/admin/instructors/add"
          element={
            <RequireAdminAuth>
              <Adminpanel />
            </RequireAdminAuth>
          }
        />

        <Route
          path="/admin/instructors/edit/:id"
          element={
            <RequireAdminAuth>
              <Adminpanel />
            </RequireAdminAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
