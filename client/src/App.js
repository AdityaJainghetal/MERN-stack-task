import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Authentication/Login";
import "./App.css";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import AddEmployee from "./components/Admin/pages/AddEmployee";
import AddTask from "./components/Admin/pages/AddTask";
import AllTasks from "./components/Admin/pages/AllTasks";
import AllUsers from "./components/Admin/pages/AllUsers";
import UpdateTask from "./components/Admin/pages/UpdateTask";
import TaskDetail from "./components/Admin/pages/TaskDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />}>
          {/* Define nested routes for admin section */}
          <Route index element={<AllUsers />} /> {/* Default route for admin */}
          <Route path="add-user" element={<AddEmployee />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="all-tasks" element={<AllTasks />} />
          <Route path="add-task" element={<AddTask />} />
          <Route path="updatetask/:_id" element={<UpdateTask />} />
          <Route path="taskdetail/:_id" element={<TaskDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
