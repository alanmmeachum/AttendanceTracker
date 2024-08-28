import { model, Schema, Document } from 'mongoose';

interface IStudent extends Document {
  name: string;
  grade: number;
  studentId: number;
  birthday: string;
  school: string;
}

const studentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    grade: { type: Number, required: true },
    studentId: { type: Number, required: true, unique: true },
    birthday: {type: String, required: true}, //Just added; need to update other parts of my code to reflect the added birthday changes
    school: {type: String, required: true}
  },
  { timestamps: true }
);


const Student = model<IStudent>('Student', studentSchema);
export default Student;