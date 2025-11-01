# 🔄 Frontend to Backend Data Flow

Complete data flow documentation for the Student CRUD Application showing how data moves from React frontend through the backend API to the MySQL database.

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         REACT FRONTEND                              │
│                      (localhost:3000)                               │
│                                                                     │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐        │
│  │ StudentList  │    │ AddStudent   │    │ EditStudent  │        │
│  │ Component    │    │ Component    │    │ Component    │        │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘        │
│         │                    │                    │                 │
│         └────────────────────┴────────────────────┘                 │
│                              │                                      │
│                    ┌─────────▼─────────┐                           │
│                    │   Axios API       │                           │
│                    │ (services/api.js) │                           │
│                    └─────────┬─────────┘                           │
└──────────────────────────────┼──────────────────────────────────────┘
                               │
                       HTTP Request (JSON)
                               │
┌──────────────────────────────▼──────────────────────────────────────┐
│                    EXPRESS.JS BACKEND                               │
│                      (localhost:7800)                               │
│                                                                     │
│  ┌────────────────────────────────────────────────────┐            │
│  │  Routes: GET, POST, PUT, DELETE /student           │            │
│  └────────────────────┬───────────────────────────────┘            │
│                       │                                             │
│  ┌────────────────────▼───────────────────────────────┐            │
│  │  MySQL2 Connection & SQL Query Execution           │            │
│  └────────────────────┬───────────────────────────────┘            │
└─────────────────────────┼───────────────────────────────────────────┘
                          │
                   SQL Query
                          │
┌─────────────────────────▼───────────────────────────────────────────┐
│                      MYSQL DATABASE                                 │
│                                                                     │
│  ┌───────────────────────────────────────────────────┐             │
│  │  Database: app                                    │             │
│  │  Table: student (Rollno, name, Course)           │             │
│  └───────────────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔀 Complete Flow Diagrams

### 1. **VIEW STUDENTS** (GET Request)

```
USER CLICKS "View Students"
         │
         ▼
┌────────────────────────────────────────┐
│ StudentList.js Component               │
│ - useEffect() hook triggers on mount   │
│ - Calls loadStudents()                 │
└────────────┬───────────────────────────┘
             │
             ▼
┌────────────────────────────────────────┐
│ api.get("/student")                    │
│ File: services/api.js                  │
│ - Axios instance with baseURL          │
│ - Sends: GET http://localhost:7800/student │
└────────────┬───────────────────────────┘
             │
    HTTP GET Request
             │
             ▼
┌────────────────────────────────────────┐
│ Backend: index.js                      │
│ app.get("/student", (req, res) => {    │
│   const qry = "SELECT Rollno as        │
│     rollno, name, Course as course     │
│     FROM student";                     │
│   conn.query(qry, callback);           │
│ })                                     │
└────────────┬───────────────────────────┘
             │
      SQL Query
             │
             ▼
┌────────────────────────────────────────┐
│ MySQL Database                         │
│ - Executes SELECT query                │
│ - Returns all student records          │
└────────────┬───────────────────────────┘
             │
    Result Set
             │
             ▼
┌────────────────────────────────────────┐
│ Backend Response                       │
│ res.status(200).send(result)           │
│ JSON: [                                │
│   {rollno: 1, name: "John", course:..} │
│ ]                                      │
└────────────┬───────────────────────────┘
             │
    HTTP Response
             │
             ▼
┌────────────────────────────────────────┐
│ React Component                        │
│ - res.data received                    │
│ - setStudents(res.data)                │
│ - Component re-renders                 │
│ - Table displays student data          │
└────────────────────────────────────────┘
```

---

### 2. **ADD STUDENT** (POST Request)

```
USER FILLS FORM & CLICKS "Add Student"
         │
         ▼
┌────────────────────────────────────────┐
│ AddStudent.js Component                │
│ - handleSubmit() triggered             │
│ - Prevents default form submission     │
│ - Collects form data:                  │
│   { rollno: 4, name: "...", course: "..."}│
└────────────┬───────────────────────────┘
             │
             ▼
┌────────────────────────────────────────┐
│ api.post("/student", data)             │
│ File: services/api.js                  │
│ - POST http://localhost:7800/student   │
│ - Headers: Content-Type: application/json│
│ - Body: {rollno, name, course}         │
└────────────┬───────────────────────────┘
             │
    HTTP POST Request
    (JSON Payload)
             │
             ▼
┌────────────────────────────────────────┐
│ Backend: index.js                      │
│ app.post("/student", (req, res) => {   │
│   const data = req.body;               │
│   const qry = `INSERT INTO student     │
│     (Rollno, name, Course) VALUES      │
│     (${data.rollno}, '${data.name}',   │
│      '${data.course}')`;               │
│   conn.query(qry, callback);           │
│ })                                     │
└────────────┬───────────────────────────┘
             │
      SQL INSERT
             │
             ▼
┌────────────────────────────────────────┐
│ MySQL Database                         │
│ - Executes INSERT query                │
│ - Creates new record                   │
│ - Returns result.affectedRows          │
└────────────┬───────────────────────────┘
             │
    Success/Error
             │
             ▼
┌────────────────────────────────────────┐
│ Backend Response                       │
│ res.status(200).send({                 │
│   message: "Student Registered         │
│            Successfully!"              │
│ })                                     │
└────────────┬───────────────────────────┘
             │
    HTTP Response
             │
             ▼
┌────────────────────────────────────────┐
│ React Component                        │
│ - alert("Student Added Successfully!") │
│ - navigate("/") redirects to list      │
└────────────────────────────────────────┘
```

---

### 3. **UPDATE STUDENT** (PUT Request)

```
USER CLICKS "Edit" BUTTON → Navigates to /edit/:rollno
         │
         ▼
┌────────────────────────────────────────┐
│ EditStudent.js Component               │
│ STEP 1: Load Existing Data             │
│ - useEffect() triggers                 │
│ - useParams() gets rollno from URL     │
│ - Calls api.get("/student")            │
└────────────┬───────────────────────────┘
             │
             ▼
┌────────────────────────────────────────┐
│ Backend GET Request                    │
│ - Fetches all students                 │
│ - Frontend filters by rollno           │
│ - Pre-fills form with student data     │
└────────────┬───────────────────────────┘
             │
USER MODIFIES FORM & CLICKS "Update"
             │
             ▼
┌────────────────────────────────────────┐
│ EditStudent.js Component               │
│ STEP 2: Submit Update                  │
│ - handleSubmit() triggered             │
│ - Collects updated data:               │
│   { name: "...", course: "..." }       │
└────────────┬───────────────────────────┘
             │
             ▼
┌────────────────────────────────────────┐
│ api.put(`/student/${rollno}`, data)    │
│ File: services/api.js                  │
│ - PUT http://localhost:7800/student/4  │
│ - Body: {name, course}                 │
└────────────┬───────────────────────────┘
             │
    HTTP PUT Request
    (JSON Payload)
             │
             ▼
┌────────────────────────────────────────┐
│ Backend: index.js                      │
│ app.put("/student/:rollno", (req,res)=>│
│   const rollno = req.params.rollno;    │
│   const data = req.body;               │
│   const qry = `UPDATE student SET      │
│     name='${data.name}',               │
│     Course='${data.course}'            │
│     WHERE Rollno=${rollno}`;           │
│   conn.query(qry, callback);           │
│ })                                     │
└────────────┬───────────────────────────┘
             │
      SQL UPDATE
             │
             ▼
┌────────────────────────────────────────┐
│ MySQL Database                         │
│ - Executes UPDATE query                │
│ - Modifies existing record             │
│ - Returns result.affectedRows          │
└────────────┬───────────────────────────┘
             │
    Success/Error
             │
             ▼
┌────────────────────────────────────────┐
│ Backend Response                       │
│ if (result.affectedRows === 0)         │
│   → 404: "Student not found"           │
│ else                                   │
│   → 200: "Student Updated Successfully"│
└────────────┬───────────────────────────┘
             │
    HTTP Response
             │
             ▼
┌────────────────────────────────────────┐
│ React Component                        │
│ - alert("Student updated successfully!")│
│ - navigate("/") redirects to list      │
└────────────────────────────────────────┘
```

---

### 4. **DELETE STUDENT** (DELETE Request)

```
USER CLICKS "Delete" BUTTON
         │
         ▼
┌────────────────────────────────────────┐
│ StudentList.js Component               │
│ - deleteStudent(rollno) triggered      │
│ - window.confirm() asks for confirmation│
│ - If confirmed, proceed                │
└────────────┬───────────────────────────┘
             │
             ▼
┌────────────────────────────────────────┐
│ api.delete(`/student/${rollno}`)       │
│ File: services/api.js                  │
│ - DELETE http://localhost:7800/student/4│
│ - No body required                     │
└────────────┬───────────────────────────┘
             │
    HTTP DELETE Request
             │
             ▼
┌────────────────────────────────────────┐
│ Backend: index.js                      │
│ app.delete("/student/:rollno",         │
│   (req, res) => {                      │
│   const rollno = req.params.rollno;    │
│   const qry = `DELETE FROM student     │
│     WHERE Rollno = ${rollno}`;         │
│   conn.query(qry, callback);           │
│ })                                     │
└────────────┬───────────────────────────┘
             │
      SQL DELETE
             │
             ▼
┌────────────────────────────────────────┐
│ MySQL Database                         │
│ - Executes DELETE query                │
│ - Removes record from table            │
│ - Returns result.affectedRows          │
└────────────┬───────────────────────────┘
             │
    Success/Error
             │
             ▼
┌────────────────────────────────────────┐
│ Backend Response                       │
│ if (result.affectedRows === 0)         │
│   → 404: "Student not found"           │
│ else                                   │
│   → 200: "Student Deleted Successfully"│
└────────────┬───────────────────────────┘
             │
    HTTP Response
             │
             ▼
┌────────────────────────────────────────┐
│ React Component                        │
│ - alert("Student deleted successfully!")│
│ - loadStudents() refreshes the list    │
│ - Table updates without deleted record │
└────────────────────────────────────────┘
```

---

## 📝 Detailed Component Breakdown

### **Frontend Layer**

#### 1. **services/api.js** (Axios Configuration)
```javascript
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:7800",
  headers: { "Content-Type": "application/json" }
});
```
**Purpose:** Centralized API configuration
- Sets base URL for all requests
- Configures default headers
- Returns configured axios instance

#### 2. **StudentList.js** (View & Delete)
```javascript
// Key Functions:
- loadStudents() → api.get("/student")
- deleteStudent(rollno) → api.delete(`/student/${rollno}`)
- useEffect(() => loadStudents(), [])
```

#### 3. **AddStudent.js** (Create)
```javascript
// Key Functions:
- handleSubmit() → api.post("/student", data)
- useState() manages form inputs
- navigate("/") redirects after success
```

#### 4. **EditStudent.js** (Update)
```javascript
// Key Functions:
- useParams() gets rollno from URL
- useEffect() loads student data
- handleSubmit() → api.put(`/student/${rollno}`, data)
```

---

### **Backend Layer**

#### **index.js** (Express Server)

**1. Database Connection:**
```javascript
const conn = createConnection({
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "app"
});
```

**2. Middleware:**
```javascript
app.use(express.json());  // Parse JSON bodies
app.use(cors());           // Enable CORS
```

**3. Route Handlers:**
- `GET /student` → SELECT query
- `POST /student` → INSERT query
- `PUT /student/:rollno` → UPDATE query
- `DELETE /student/:rollno` → DELETE query

---

### **Database Layer**

#### **MySQL Schema:**
```sql
Database: app
Table: student
Columns:
  - Rollno INT (Primary Key)
  - name VARCHAR(100)
  - Course VARCHAR(100)
```

---

## 🔄 Request/Response Flow Summary

| Operation | HTTP Method | Frontend Call | Backend Route | SQL Query | Response |
|-----------|-------------|---------------|---------------|-----------|----------|
| **View All** | GET | `api.get("/student")` | `app.get("/student")` | `SELECT * FROM student` | Array of students |
| **Create** | POST | `api.post("/student", data)` | `app.post("/student")` | `INSERT INTO student` | Success message |
| **Update** | PUT | `api.put("/student/:id", data)` | `app.put("/student/:rollno")` | `UPDATE student WHERE...` | Success message |
| **Delete** | DELETE | `api.delete("/student/:id")` | `app.delete("/student/:rollno")` | `DELETE FROM student WHERE...` | Success message |

---

## 🌐 Network Communication

### **Request Headers (Frontend → Backend):**
```http
Content-Type: application/json
Origin: http://localhost:3000
```

### **Response Headers (Backend → Frontend):**
```http
Content-Type: application/json
Access-Control-Allow-Origin: *
```

### **Example JSON Payloads:**

**POST /student:**
```json
{
  "rollno": 4,
  "name": "Alice Brown",
  "course": "Chemistry"
}
```

**PUT /student/4:**
```json
{
  "name": "Alice Updated",
  "course": "Biochemistry"
}
```

---

## ⚠️ Error Handling Flow

```
Frontend Error
     │
     ▼
try-catch block
     │
     ├─→ Network Error (500)
     │   └─→ Display: "Failed to connect"
     │
     ├─→ Server Error (500)
     │   └─→ Display: "Problem in database"
     │
     └─→ Not Found (404)
         └─→ Display: "Student not found"
```

---

## 🚀 State Management Flow

```
User Action
     │
     ▼
Component State Update (useState)
     │
     ▼
API Call (async/await)
     │
     ▼
Backend Processing
     │
     ▼
Database Operation
     │
     ▼
Response Received
     │
     ▼
State Update (setState)
     │
     ▼
React Re-render
     │
     ▼
UI Update
```

---

## 🔐 CORS Configuration

**Backend (index.js):**
```javascript
app.use(cors());  // Allows all origins
```

**Why needed?**
- Frontend runs on `localhost:3000`
- Backend runs on `localhost:7800`
- Different ports = Cross-Origin Request
- CORS middleware allows this communication

---

## 📊 Complete Data Flow Sequence

```
┌─────────┐  User Input   ┌──────────┐  HTTP Req   ┌─────────┐  SQL Query  ┌──────────┐
│  USER   │ ────────────→ │  REACT   │ ──────────→ │ EXPRESS │ ──────────→ │  MYSQL   │
│ Browser │               │ Frontend │             │ Backend │             │ Database │
└─────────┘  UI Update   └──────────┘  JSON Res   └─────────┘  Result Set └──────────┘
     ↑                         ↑                        ↑                        │
     └─────────────────────────┴────────────────────────┴────────────────────────┘
                              Data flows back through chain
```

---

**Created for:** Student CRUD Application  
**Last Updated:** 2025-11-01
