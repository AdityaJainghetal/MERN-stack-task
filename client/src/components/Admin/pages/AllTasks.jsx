import { useEffect, useState } from "react";
import { MdDeleteForever } from 'react-icons/md';
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "../Admin.css"

const AllTasks = () => {
  // State variables to manage task data and confirmation box visibility
  const [task, setTask] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [taskId, setTaskid] = useState("");
  
  // React Router hook for navigation
  const navigate = useNavigate();
  
  // Redux selector to check if the user is an admin
  const isAdmin = useSelector((state) => state.isAdmin);

  // Function to toggle the visibility of the confirmation box
  const toggleClass = () => {
    setIsActive(!isActive);
  };

  // Function to fetch all tasks
  const getTask = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/task/gettask");
      setTask(res.data);
      console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  // Effect hook to fetch tasks when the component mounts
  useEffect(() => {
    getTask();
  }, []);

  // Function to delete a task
  const deleteTask = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/task/deletetask/${taskId}`
      );
      toggleClass();
      getTask();
    } catch (err) {
      console.log(err);
    }
  };

  // Render the task list
  return (
    <>
      <div className="alltaskdiv">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Assigned To</th>
              <th>Task Title</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {task.map((key, index) => {
              console.log(key.priority)
              let priorityClass = '';
              if (key.priority === 'High') priorityClass = 'high-priority';
              if (key.priority === 'Medium') priorityClass = 'medium-priority';
              if (key.priority === 'Low') priorityClass = 'low-priority';
              return (
                <tr className={priorityClass} key={key._id}>
                  <td data-column="S.No">{index + 1}</td>
                  <td data-column="Assigned To">{key.assign.name}</td>
                  <td data-column="Task Title">{key.title}</td>
                  <td data-column="Due Date">{key.enddate}</td>
                  <td data-column="Status">{key.status}</td>
                  <td data-column="Action">
                    {/* Delete Task Icon */}
                    <MdDeleteForever
                      style={{ color: "darkred", cursor: "pointer" }}
                      fontSize="25px"
                      onClick={() => {
                        setTaskid(key._id);
                        toggleClass();
                      }}
                    />
                    {/* Edit Task Icon */}
                    <CiEdit
                      style={{
                        color: "blue",
                        fontSize: "25px",
                        marginLeft: "30px",
                        cursor: "pointer",
                        fontWeight: "700",
                      }}
                      onClick={() => {
                        navigate("/admin/updatetask/" + key._id);
                      }}
                    />
                    {/* View Task Icon */}
                    <FaEye
                      style={{
                        color: "green",
                        fontSize: "25px",
                        marginLeft: "30px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/admin/taskdetail/" + key._id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {/* Confirmation Box */}
        {isActive && (
          <div className="confirmation-box">
            <h2>Confirm Deletion</h2>
            <hr />
            <p>Are you sure you want to delete this task?</p>
            <div className="confirmation-box-buttons">
              <button className="yes" onClick={deleteTask}>
                Yes
              </button>
              <button className="no" onClick={toggleClass}>
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllTasks;