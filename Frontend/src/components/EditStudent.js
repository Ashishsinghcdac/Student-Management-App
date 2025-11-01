import React, { useEffect, useState } from "react";// useEffect fetch data on mount, useState store and update data 
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";// navigate between routes, useParams get route params

function EditStudent() {
  const { rollno } = useParams();// get rollno from route params
  const navigate = useNavigate();// navigate to other routes
  const [student, setStudent] = useState({ name: "", course: "" });// state for student data

  useEffect(() => {
    const fetchStudent = async () => {
      if (!rollno) {
        console.error("No rollno provided");
        navigate("/");
        return;
      }
      try {
        const res = await api.get("/student");// fetch all students
        const found = res.data.find((s) => s.rollno === parseInt(rollno));// find student by rollno
        if (found) {// if student found
          setStudent(found);// set student data
        } else {
          alert("Student not found");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching student:", error);
        alert("Error loading student data");
      }
    };
    fetchStudent();
  }, [rollno, navigate]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });// update student state
  };

  const handleSubmit = async (e) => {// handle form submission
    e.preventDefault();
    if (!rollno) {
      alert("Invalid roll number");
      return;
    }
    try {
      await api.put(`/student/${rollno}`, student);
      alert("Student updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update student. Please try again.");
    }
  };

  return (
    <div>
      <h4>Edit Student</h4>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" value={student.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Course</label>
          <input type="text" name="course" className="form-control" value={student.course} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default EditStudent;
