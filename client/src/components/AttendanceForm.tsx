import { useState } from "react";
import { AxiosInstance } from "axios";

interface Props {
  http: AxiosInstance;
}

const AttendanceForm: React.FC<Props> = ({ http }) => {
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("Present");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await http.post("/api/attendance", { studentId, status });
      alert("Attendance recorded");
    } catch (error) {
      alert("Error recording attendance");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Student ID:
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
      </label>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AttendanceForm;
