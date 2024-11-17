
import user from "../model/User.js";


export const LoginData = async(request , response)=>{
  try {
    const { email, password } = request.body;
    console.log(email, password);

    // Find the user by email
    const User = await user.findOne({ email });

    // Check if user exists
    if (!User) {
      return response.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored password (assuming plain text password comparison)
    if (User.password !== password) {
      return response.status(401).json({ message: 'Invalid credentials' });
    }

    // If credentials are correct, return the user data (you may also return a token here)
    response.status(200).json({ message: 'Login successful', User: User });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Server error, please try again later' });
  }
}

export const RegistrationData = async (request, response) => {
  try {
    const { email , name , password} = request.body;

    // Check if the email already exists in the database
    const existingUser = await user.findOne({ email: email });
    
    if (existingUser) {
      // If the email exists, return an error message
      return response.status(409).json({ message: 'Email already exists' });
    }

    const person = new user({
      name,
      email,
      password, // Use the hashed password
    });

    // If the email doesn't exist, create a new user
    const result = await person.save();
    
    // Return the newly created user as a response
    response.status(201).json(result);

  } catch (error) {
    // Catch any other errors and return a response
    response.status(409).json({ message: error.message });
  }
};




