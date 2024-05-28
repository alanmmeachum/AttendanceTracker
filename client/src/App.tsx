import AttendanceForm from "./components/AttendanceForm.tsx";
import AttendanceByDate from "./views/AttendanceByDate.tsx";
import AttendanceList from "./views/AttendanceList.tsx";
import axios, { AxiosInstance } from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";
import "./index.css";

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
        <Routes>
          <Route path="/" element={<AttendanceForm http={http} />} />
          <Route path="/attendance" element={<AttendanceList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
