import mongoose from 'mongoose';

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    // required: true,
    // unique: true,  // Ensure uniqueness of the email
    // trim: true,
    // lowercase: true,
    // match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'], // Valid roles
    default: 'user'
  }
}, {
  timestamps: true  // Mongoose will handle `createdAt` and `updatedAt` automatically
});

// Export the User model
const user = mongoose.model('User', UserSchema);
export default user;
