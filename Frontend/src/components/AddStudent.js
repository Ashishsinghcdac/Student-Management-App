import React, { useState } from "react"; //  usesState store and update data
import api from "../services/api";  // api for backend communication
import { useNavigate } from "react-router-dom";// navigate between routes

function AddStudent() {// AddStudent component
  const [student, setStudent] = useState({ rollno: "", name: "", course: "" });// state for student data
  const [error, setError] = useState("");// state for error messages
  const navigate = useNavigate();// “navigate will be used to redirect the user back to the home page after successfully adding a student

  const handleChange = (e) => {// handle input changes
    setStudent({ ...student, [e.target.name]: e.target.value });// update student state
  };

  const handleSubmit = async (e) => {// handle form submission
    e.preventDefault();// prevent default form behavior
    setError("");// reset error state

    try {
      // POST to backend
      await api.post("/student", {// send student data
        rollno: parseInt(student.rollno),// convert rollno to integer
        name: student.name,// student name
        course: student.course,// student course
      });

      alert(" Student Added Successfully!");// success message
      navigate("/");// navigate to home
    } catch (err) {// catch errors
      console.error("Error adding student:", err);// log error
      setError(" Failed to add student. Check backend console or DB connection.");// set error message
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="text-center mb-3">Add Student</h4>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Roll No</label>
          <input
            type="number"
            name="rollno"
            className="form-control"
            value={student.rollno}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Course</label>
          <input
            type="text"
            name="course"
            className="form-control"
            value={student.course}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-success w-100">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
