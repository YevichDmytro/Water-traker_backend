import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: 'female',
    },
    waterRate: {
      type: Number,
      default: 50,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const UsersCollection = model('students', userSchema);
export default UsersCollection;
