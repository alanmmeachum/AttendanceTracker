import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios, { AxiosInstance } from "axios";
import { useState } from "react";
import Attendance from "./views/Attendance.tsx";
import Dashboard from "./views/Dashboard.tsx";
import Students from "./views/Students.tsx";
import AddStudent from "./components/AddStudent.tsx";
import EditStudent from "./components/EditStudent.tsx";
import "./css/App.css";
import "./css/index.css";

function App() {
  function createHttpClient(): AxiosInstance {
    return axios.create({
      baseURL: "http://localhost:8000/api",
    });
  }

  const http = createHttpClient();

  const [studentID, setStudentID] = useState<Number>()

  return (
    <>
      <BrowserRouter>
        <Dashboard />
        <Routes>
          <Route path="/popup" element={<AddStudent http={http}/>} />
          <Route path="/students/:id" element={<EditStudent http={http}/>} />
          <Route path="/students" element={<Students http={http} />} />
          <Route path="/attendance" element={<Attendance http={http} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
