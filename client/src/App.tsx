import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios, { AxiosInstance } from "axios";
import AttendanceForm from "./components/AttendanceForm.tsx";
import AttendanceList from "./views/AttendanceList.tsx";
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
          <Route path="/attendance" element={<AttendanceList http={http} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
