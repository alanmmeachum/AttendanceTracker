import { useState } from "react";
import { AxiosInstance } from "axios";

interface Props {
  http: AxiosInstance;
}

const AttendanceForm: React.FC<Props> = ({ http }) => {
  const [studentId, setStudentId] = useState<String>("");
  const [status, setStatus] = useState<String>("Present"); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting attendance for student:", studentId, "with status:", status);
    try {
      const response = await http.post("/attendance", {
        student: studentId,
        status: status,
      });
      console.log("Response Data:", response.data);
      alert("Attendance recorded");
    } catch (err) {
      console.error("Error marking attendance:", err);
      alert("Errors Marking Attendance");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-80">
      <label>
        Student ID:
        <input type="text" onChange={(e) => setStudentId(e.target.value)} required />
      </label>
      <label>
        Status:
        <select onChange={(e) => setStatus(e.target.value)}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AttendanceForm;
