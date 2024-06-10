import { model, Schema, Document } from 'mongoose';

interface IStudent extends Document {
  name: string;
  grade: number;
  studentId: number;
}

const studentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    grade: { type: Number, required: true },
    studentId: { type: Number, required: true, unique: true }
  },
  { timestamps: true }
);

const Student = model<IStudent>('Student', studentSchema);
export default Student;