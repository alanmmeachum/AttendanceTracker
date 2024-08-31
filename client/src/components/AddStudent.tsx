import {  useState } from "react";
import { AxiosInstance } from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Popup.css";

interface Props {
  http: AxiosInstance;
}

const AddStudent: React.FC<Props> = ({ http }) => {
  const navigate = useNavigate();

  const [newStudent, setNewStudent] = useState<any>({
    name: String,
    grade: Number,
    studentId: Number,
    birthday: String,
    school: String
  });

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await http
      .post("/students", newStudent)
      .then((res) => {
        console.log(res.data);
        navigate("/students");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeHandler = (e: { target: { name: any; value: any } }) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    navigate('/students')
  }

  return (
    <div className="popup-container ">
      <div className="popup form-style-8">
            <h2>Add a Student</h2>
        <form action="submit" className="flex flex-col " onSubmit={onSubmitHandler}>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" onChange={onChangeHandler} />
          <label htmlFor="grade">Grade: </label>
          <input type="number" name="grade" onChange={onChangeHandler} />
          <label htmlFor="studentId">StudentId: </label>
          <input type="number" name="studentId" onChange={onChangeHandler} />
          <label htmlFor="birthday">Birthday: </label>
          <input type="text" name="birthday" onChange={onChangeHandler} />
          <label htmlFor="school">School: </label>
          <input type="text" name="school" onChange={onChangeHandler} />
          <div className="flex flex-row justify-around">
            <button className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Submit</button>
            <button className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={handleClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
