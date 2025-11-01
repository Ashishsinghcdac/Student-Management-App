
import express from 'express';                       // Express framework for building web applications
import { StatusCodes } from 'http-status-codes';    // Standard HTTP status codes
import { createConnection } from 'mysql2';         // MySQL database connection
import cors from "cors";                          // Middleware for enabling CORS


// Database connection 
var conn = createConnection({         // Database connection configuration
    host: "localhost",               // Database host
    user: "root",                    // Database user
    password: "cdac",               // Database password
    database: "app"                // Database name
});

conn.connect((error) => {                        // Connect to the database
    if (error) {                                // If there is an error during connection
        console.log(error);                    // show the error
    } else {
        console.log("DB Connected...!");      // show  successful connection
    }
});

// Server setup
const PORT = 7800;                           // Server port number
const app = express();                      // Create an Express application
app.use(express.json());                   // Middleware to parse JSON request bodies
app.use(cors());                          // Enable CORS for all routes

// Default route
app.get("/", (request, response) => {      // Handle GET request to the root URL
    response.status(StatusCodes.OK).send({ message: "Welcome to Student CRUD App" }); 
});

// ------------------ GET (Fetch all students) ------------------
app.get("/student", (request, response) => {            // Handle GET request to fetch all students
    const qry = "SELECT Rollno as rollno, name, Course as course FROM student";  
    conn.query(qry, (error, result) => {                // Execute the query
        if (error) {                                   // If there is an error during query execution
            console.log(error);                       // shoiw   the error
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Problem in fetching data' });
        } else {
            response.status(StatusCodes.OK).send(result);   // Send the fetched student data
        }
    });
});

// ------------------ POST (Create student) ------------------
app.post("/student", (request, response) => {
    try {
        const data = request.body;
        const qry = `INSERT INTO student (Rollno, name, Course) VALUES (${data.rollno}, '${data.name}', '${data.course}')`;

        conn.query(qry, (error, result) => {
            if (error) {
                console.log(error);
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Problem in inserting data" });
            } else {
                response.status(StatusCodes.OK).send({ message: "Student Registered Successfully!" });
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Something went wrong" });
    }
});

// ------------------ DELETE (Delete student by rollno) ------------------
app.delete("/student/:rollno", (request, response) => {
    try {
        const rollno = parseInt(request.params.rollno);
        
        if (isNaN(rollno)) {
            return response.status(StatusCodes.BAD_REQUEST).send({ message: 'Invalid roll number' });
        }
        
        const qry = `DELETE FROM student WHERE Rollno = ${rollno}`;

        conn.query(qry, (error, result) => {
            if (error) {
                console.log(error);
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Problem in deleting data' });
            } else if (result.affectedRows === 0) {
                response.status(StatusCodes.NOT_FOUND).send({ message: 'Student not found' });
            } else {
                response.status(StatusCodes.OK).send({ message: 'Student Deleted Successfully!' });
            }
        });
    } catch (error) {
        console.log(error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Something went wrong' });
    }
});

// ------------------ PUT (Update student by rollno) ------------------
app.put("/student/:rollno", (request, response) => {
    try {
        const rollno = parseInt(request.params.rollno);
        const data = request.body;
        
        if (isNaN(rollno)) {
            return response.status(StatusCodes.BAD_REQUEST).send({ message: 'Invalid roll number' });
        }
        
        if (!data.name || !data.course) {
            return response.status(StatusCodes.BAD_REQUEST).send({ message: 'Name and course are required' });
        }
        
        const qry = `UPDATE student SET name='${data.name}', Course='${data.course}' WHERE Rollno=${rollno}`;

        conn.query(qry, (error, result) => {
            if (error) {
                console.log(error);
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Problem in updating data' });
            } else if (result.affectedRows === 0) {
                response.status(StatusCodes.NOT_FOUND).send({ message: 'Student not found' });
            } else {
                response.status(StatusCodes.OK).send({ message: 'Student Updated Successfully!' });
            }
        });
    } catch (error) {
        console.log(error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Something went wrong' });
    }
});

// ------------------ Server Start ------------------
app.listen(PORT, () => {// Start the server
    console.log(`Server is running on port ${PORT}`);// Log the server start message
});
