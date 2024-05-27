import {model, Schema} from 'mongoose';

const attendanceSchema = new Schema(
    {
        name:{ type: String, required: true},
        date: { type: Date, required: true},
        status: { type: String, enum: ['Present', 'Absent'], required: true}
    },
    {timestamps: true}
)

const Attendance = model('Attendance', attendanceSchema);
export default Attendance;