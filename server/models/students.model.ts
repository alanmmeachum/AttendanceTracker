import {model, Schema} from 'mongoose';

const studentSchema = new Schema(
    {
        name:{ type: String, required: true},
        grade: { type: String, required: true},
        studentId: {type: String, required: true, unique: true}
    },
    {timestamps: true}
)

const Student = model('Students', studentSchema);
export default Student;