import { useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/Popup.css";

interface Props {
  http: AxiosInstance;
}

const EditStudent: React.FC<Props> = ({ http }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [updateStudent, setUpdateStudent] = useState<any>({
    name: String,
    grade: Number,
    studentId: Number,
    birthday: String,
    school: String
  });

  useEffect(() => {
    http
      .get(`/students/${id} `)
      .then((res) => {
        console.log(res.data);
        setUpdateStudent({
          name: res.data.name,
          grade: res.data.grade,
          studentId: res.data.studentId,
          birthday: res.data.birthday,
          school: res.data.school
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    http
      .patch(`/students/${id}`, updateStudent)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/students");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeHandler = (e: { target: { name: any; value: any } }) => {
    setUpdateStudent({ ...updateStudent, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    navigate("/students");
  };

  return (
    <div className="popup-container ">
      <div className="popup form-style-8">
        <h2>Edit Student Details</h2>
        <form action="submit" className="flex flex-col" onSubmit={onSubmitHandler}>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" value={updateStudent.name} onChange={onChangeHandler} />
          <label htmlFor="grade">Grade: </label>
          <input type="number" name="grade" value={updateStudent.grade} onChange={onChangeHandler} />
          <label htmlFor="studentId">StudentId: </label>
          <input type="number" name="studentId" value={updateStudent.studentId} onChange={onChangeHandler} />
          <label htmlFor="birthday">Birthday: </label>
          <input type="text" name="studentId" value={updateStudent.birthday} onChange={onChangeHandler} />
          <label htmlFor="school">School: </label>
          <input type="text" name="school" value={updateStudent.school} onChange={onChangeHandler} />
          <div className="flex flex-row justify-around">
            <button className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Submit
            </button>
            <button
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
