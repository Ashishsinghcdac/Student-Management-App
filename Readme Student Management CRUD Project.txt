Student Management CRUD Project
--------------------------------

(React + Node.js + Express + MySQL)

-------Project Overview-------------

This project is a Full Stack CRUD Application designed to manage student records.
Users can Add, View, Edit, and Delete student information through a React-based frontend, with Node.js/Express serving as the backend API, and MySQL as the database.

Tech Stack
-----------

Frontend: React (Axios, React Router, Bootstrap)

Backend: Node.js + Express

Database: MySQL

HTTP Library: Axios (for REST API communication)

CORS Enabled: Yes (for frontend-backend connection)

 Approach
----------

Frontend (React)

The React app consists of three main components:

AddStudent.js — Allows users to add a new student record.

StudentList.js — Displays all students in a table with options to edit or delete.

EditStudent.js — Fetches existing data for a selected student and allows editing.

State Management:

React’s useState hook stores form and data table state, while useEffect triggers data fetching when the component mounts.

Routing:
react-router-dom is used to navigate between /, /add, and /edit/:rollno.

API Integration:
Axios instance (api.js) communicates with the Express backend to perform CRUD operations using:

GET /student

POST /student

PUT /student/:rollno

DELETE /student/:rollno



 Backend (Node.js + Express)
-----------------------------
The backend provides RESTful APIs that connect to a MySQL database.

Routes:

HTTP Method	Endpoint		
GET		/student		Fetch all students
POST		/student		Add a new student
PUT		/student/:rollno	Update an existing student
DELETE		/student/:rollno	Delete a student

Middleware Used:

express.json() – to parse incoming JSON payloads

cors() – to allow requests from React frontend (port 3000)

Database Connection:
Using mysql2:

var conn = createConnection({
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "app"
});


Server Start:

app.listen(7800, () => console.log("Server running on port 7800"));



MySQL Database Setup
---------------------
Database Schema
CREATE DATABASE app;
USE app;

CREATE TABLE student (
  Rollno INT PRIMARY KEY,
  Name VARCHAR(100),
  Course VARCHAR(100)
);


Setup Backend
cd backend
npm install
node index.js


Backend will start on http://localhost:7800

Setup Frontend
cd frontend
npm install
npm start


Frontend will start on http://localhost:3000

API Endpoints Test 

GET All Students

GET http://localhost:7800/student


POST Add Student
-----------------
POST http://localhost:7800/student
Body (JSON):
{
  "rollno": 3,
  "name": "Ashish Singh",
  "course": "Information Technology"
}


PUT Update Student
-------------------
PUT http://localhost:7800/student/3
Body (JSON):
{
  "name": "Ashish Kumar",
  "course": "Computer Science"
}


DELETE Student
----------------
DELETE http://localhost:7800/student/3



  Assumptions
--------------

Roll numbers are unique (used as primary key).

React app and backend run on different ports (CORS enabled).

Axios instance uses base URL: http://localhost:7800.


 Application Flow 
------------------

StudentList.js loads on app start → calls backend /student to fetch all records.

AddStudent.js form submits → sends a POST request → backend inserts into DB.

EditStudent.js loads existing data → updates using PUT request.

Delete button sends a DELETE request → backend removes record.

React refreshes list automatically via state update and navigation.