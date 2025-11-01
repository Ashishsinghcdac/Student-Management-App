import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    const res = await api.get("/student");
    setStudents(res.data);
  };

  const deleteStudent = async (rollno) => {
    if (window.confirm("Delete this student?")) {
      try {
        await api.delete(`/student/${rollno}`);
        alert("Student deleted successfully!");
        loadStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student. Please try again.");
      }
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div>
      <h4>Student Records</h4>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.rollno}>
              <td>{s.rollno}</td>
              <td>{s.name}</td>
              <td>{s.course}</td>
              <td>
                <Link to={`/edit/${s.rollno}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button onClick={() => deleteStudent(s.rollno)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
