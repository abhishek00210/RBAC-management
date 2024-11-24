# RBAC Managment

## API Documentation

### /admin
- **GET** `/admin/users`  
  _Get all users_
- **DELETE** `/admin/users/{userId}`  
  _Delete a user_

---

### Authentication
- **POST** `/register`  
  _Register a new user_
- **POST** `/login`  
  _Login a user_

---

### /doctors
- **GET** `/doctors/{doctorId}/appointments`  
  _Get all appointments for a specific doctor_
- **GET** `/doctors/{doctorId}/patients`  
  _Get all patients assigned to a specific doctor_

---

### /patients
- **POST** `/patients/{patientId}/appointments`  
  _Create an appointment for a specific patient_
- **GET** `/patients/{patientId}/appointments`  
  _Get all appointments for a specific patient_
- **GET** `/patients/{patientId}/records`  
  _Get all medical records for a specific patient_
- **POST** `/patients/{patientId}/records`  
  _Write a medical record for a specific patient_

---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data.
- **mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **express-validator**: Server-side validation for input fields.
- **bcrypt**: Library for hashing passwords.
- **JSON Web Tokens (JWT)**: Standard for creating secure access tokens.

---


## Installation
  1. Clone the repository
  
  ```bash
    git clone https://github.com/abhishek00210/RBAC-managment
  ```
  
  2. Navigate to the project directory:
  
   ```bash
    cd rbac-healthcare-system
   ```

  3. Install required dependencies
  
  ```bash
   npm install
  ```
<br>

## Configuration

1. Creat a `.env` file on the root of the project and add the following environment variables

```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

<br>

## Running the Application

1. To start the server, run the following command on the root of the project path;

```
npm start
```

For the development purpose;
```
npm run dev
```

2. The application will be running on  `http://localhost:3000`

<br>
