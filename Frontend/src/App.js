import React from "react";// React core
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";// routing components
import StudentList from "./components/StudentList";// StudentList component
import AddStudent from "./components/AddStudent";// AddStudent component
import EditStudent from "./components/EditStudent";// EditStudent component
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h2 className="text-center mb-4">🎓 Student CRUD App</h2>

        <nav className="mb-3">
          <Link to="/" className="btn btn-primary me-2">View Students</Link>
          <Link to="/add" className="btn btn-success">Add Student</Link>
        </nav>

        <Routes>// define routes
          <Route path="/" element={<StudentList />} />    
          <Route path="/add" element={<AddStudent />} />     
          <Route path="/edit/:rollno" element={<EditStudent />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
