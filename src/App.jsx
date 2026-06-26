import {
  Routes,
  Route
} from "react-router-dom";

import {
  useContext
} from "react";

import {
  AuthContext
} from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AccessDenied from "./pages/AccessDenied";
import NotFound from "./pages/NotFound";

import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import NoticeBoard from "./pages/NoticeBoard";
import NoticeDetails from "./pages/NoticeDetails";

import AIChat from "./pages/AIChat";
import Profile from "./pages/Profile";
import UserManagement from "./pages/UserManagement";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const { user } =
    useContext(AuthContext);

  return (

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute
            user={user}
            allowedRoles={["student"]}
          >
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty-dashboard"
        element={
          <ProtectedRoute
            user={user}
            allowedRoles={["faculty"]}
          >
            <FacultyDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute
            user={user}
            allowedRoles={["admin"]}
          >
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notice-board"
        element={<NoticeBoard />}
      />

      <Route
        path="/notice/:id"
        element={<NoticeDetails />}
      />

      <Route
        path="/chat"
        element={<AIChat />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute
            user={user}
            allowedRoles={["admin"]}
          >
            <UserManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute
            user={user}
            allowedRoles={["admin"]}
          >
            <Reports />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={<Settings />}
      />

      <Route
        path="/access-denied"
        element={<AccessDenied />}
      />

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>

  );
}

export default App;