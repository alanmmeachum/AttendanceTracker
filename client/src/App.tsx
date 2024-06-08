import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios, { AxiosInstance } from "axios";
import AttendanceList from "./views/AttendanceList.tsx";
import Dashboard from "./views/Dashboard.tsx";
import Students from "./views/Students.tsx";
import "./css/App.css";
import "./css/index.css";

function App() {
  function createHttpClient(): AxiosInstance {
    return axios.create({
      baseURL: "http://localhost:8000/api",
    });
  }

  const http = createHttpClient();

  return (
    <>
      <BrowserRouter>
        <Dashboard />
        <Routes>
          <Route path="/students" element={<Students http={http}/>}/>
          <Route path="/attendance" element={<AttendanceList http={http} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
