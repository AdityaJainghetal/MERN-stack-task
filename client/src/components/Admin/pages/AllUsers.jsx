import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDeleteForever } from 'react-icons/md';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../Admin.css";

const AllUsers = () => {
  // State to store the list of users
  const [user, setUser] = useState([]);
  // State to toggle the confirmation box for deletion
  const [isActive, setIsActive] = useState(false);
  // State to store the id of the user to be deleted
  const [taskId, setTaskid] = useState("");
  // Redux selector to check if the current user is an admin
  const isAdmin = useSelector((state) => state.isAdmin);
  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Function to toggle the confirmation box
  const toggleClass = () => {
    setIsActive(!isActive);
  };

  // Function to fetch the list of users from the API
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/getuser");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Effect hook to fetch users when the component mounts
  useEffect(() => {
    getUser();
  }, []);

  // Function to delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/user/deleteuser/${taskId}`
      );
      toast.success("User deleted successfully");
      toggleClass();
      getUser(); // Fetch users again after deletion
    } catch (err) {
      console.log(err);
    }
  };

  // Render component based on admin status
  if (isAdmin) {
    return (
      <div className="alltaskdiv">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Title</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user, index) => {
              return (
                <tr key={index}>
                  <td data-column="S.No">{index + 1}</td>
                  <td data-column="Name">{user.name}</td>
                  <td data-column="Title">{user.title}</td>
                  <td data-column="Email">{user.email}</td>
                  <td data-column="Action" style={{ cursor: "pointer" }}>
                    <MdDeleteForever
                      style={{ color: "darkred", fontSize: "25px" }}
                      onClick={() => {
                        setTaskid(user._id);
                        toggleClass();
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Confirmation box for deletion */}
        {isActive && (
          <div className="confirmation-box">
            <h2>Confirm Deletion</h2>
            <hr />
            <p>Are you sure you want to delete this user?</p>
            <div className="confirmation-box-buttons">
              <button className="yes" onClick={deleteUser}>
                Yes
              </button>
              <button className="no" onClick={toggleClass}>
                No
              </button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    // If not admin, navigate to home page
    navigate("/");
    return null;
  }
};

export default AllUsers;
