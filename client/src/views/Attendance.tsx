//Only viewing attendance with any criteria to view (ex. By date; student; etc.)
//Add attendancelist and attendance by date here
import { AxiosInstance } from "axios";
import AttendanceList from "../components/AttendanceList";
import AttendanceForm from "../components/AttendanceForm";

interface Props {
  http: AxiosInstance;
}

const Attendance: React.FC<Props> = ({http}) => {
  return (
    <>
  <AttendanceList http={http}/>
  {/* <AttendanceForm http={http}/> */}
    </>
  )
};

export default Attendance;
