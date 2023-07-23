import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPages/IndexPage";
import AboutPage from "./pages/IndexPages/AboutPage";
import SignInPage from "./pages/IndexPages/SignInPage";
import SignUpPage from "./pages/IndexPages/SignUpPage";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import HomePage from "./pages/HomePages/HomePage";
import ProfilePage from "./pages/HomePages/ProfilePage";
import CreateTask from "./pages/HomePages/CreateTaskPage";
import ManageTaskPage from "./pages/HomePages/ManageTaskPage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import EditTaskPage from "./pages/HomePages/EditTaskPage";
import TaskRemindersPage from "./pages/HomePages/TaskRemindersPage";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<IndexPage />}>
        <Route path="about" element={<AboutPage />} />
        <Route path="login" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>

      <Route path="/home" element={<ProtectedRoute />}>
        <Route index element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="create-task" element={<CreateTask />} />
        <Route path="edit-task/:id" element={<EditTaskPage />} />
        <Route path="task-reminders" element={<TaskRemindersPage />} />
        <Route
          path="task-management"
          element={
            <DndProvider backend={HTML5Backend}>
              <ManageTaskPage />
            </DndProvider>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
