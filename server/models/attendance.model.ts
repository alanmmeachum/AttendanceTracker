import {model, Schema} from 'mongoose';

const attendanceSchema = new Schema(
    {
        student: { type: Schema.Types.ObjectId, ref: 'Student'},
        date: { type: String, required: true }, //Changed to string so that ISO stops showing up; we just want the full date
        status: { type: String, enum: ['Present', 'Absent'], required: true },
    },
    {timestamps: true}
)

// Middleware to ensure date is saved in YYYY-MM-DD format
attendanceSchema.pre('save', function (next) {
    if (this.isModified('date')) {
      const date = new Date(this.date);
      // Format the date to YYYY-MM-DD
      const formattedDate = date.toISOString().split('T')[0];
      this.date = formattedDate;
    }
    next();
  });
  

const Attendance = model('Attendance', attendanceSchema);
export default Attendance;