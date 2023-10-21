import { getAllTransections } from "../models/transectionModel.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    // Perform your authentication logic here, for example, check for a valid token or session
    const isAuthenticated = true; // Replace this with your actual authentication logic

    if (isAuthenticated) {
      // If authenticated, proceed to the next middleware
      const user = await getAllTransections(authorization);

      if (user?._id) {
        // Check the role
        user.password = undefined;
       
        return next();
      }

      // If the user does not have the necessary permissions
      return res.json({
        status: "error",
        message: "Sorry, you do not have permission to access this API",
      });
    } else {
      return res.status(401).json({ message: "Unauthorized access" });
    }
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};
