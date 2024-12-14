import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const TaskDetail = () => {
  // State to store task details
  const [input, setInput] = useState({});
  // State to store user details
  const [user, setUser] = useState();
  // Get task ID from URL params
  const { _id } = useParams();
  // Redux selector to check if the current user is an admin
  const isAdmin = useSelector((state) => state.isAdmin);
  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Fetch task details when component mounts
  useEffect(() => {
    getData();
  }, []);

  // Function to fetch task details from the API
  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/task/gettask/?_id=${_id}`);
      // Set task details to state
      setInput(res.data[0]);
      // Set user details to state
      setUser(res.data[0].assign.name);
    } catch (err) {
      console.log(err);
    }
  };

  // Render component based on admin status
  if (isAdmin) {
    return (
      <div className="background_container">
        <section className="add-employee-section">
          <h3>Task Details</h3>
          <form className="form">
            <div className="input_container">
              <label>Task Title </label>
              <input
                type="text"
                name="title"
                minLength="1"
                maxLength="50"
                value={input.title}
                readOnly
                style={{ cursor: "none" }}
              />
            </div>

            <div className="input_container">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={input.description}
                readOnly
                style={{ cursor: "none" }}
              />
            </div>
            <div className="input_container">
              <label>Assigned to </label>

              <input
                type="text"
                name=""
                value={user}
                readOnly
                style={{ cursor: "none" }}
              />
            </div>
            <div className="input_container">
              <label>Priority</label>
              <input
                type="text"
                name="description"
                value={input.priority}
                readOnly
                style={{ cursor: "none" }}
              />
            </div>
            <div className="input_container">
              <label>Status</label>
              <input
                type="text"
                name="description"
                value={input.status}
                readOnly
                style={{ cursor: "none" }}
              />
            </div>
            <div className="input_container">
              <label>Start date</label>
              <input
                type="text"
                name="description"
                value={input.startdate}
                readOnly
                style={{ cursor: "none" }}
              />
            </div>

            <div className="input_container">
              <label>End Date</label>

              <input
                type="text"
                name="description"
                value={input.enddate}
                readOnly
                style={{ cursor: "none" }}
              />
            </div>
          </form>
        </section>
      </div>
    );
  } else {
    // If not admin, navigate to home page
    navigate("/");
    return null;
  }
};

export default TaskDetail;
