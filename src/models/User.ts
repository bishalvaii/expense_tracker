import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the User model
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// Define the schema for the User model
const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the model and export it
const User = mongoose.model<IUser>("users", UserSchema);

export default User;
