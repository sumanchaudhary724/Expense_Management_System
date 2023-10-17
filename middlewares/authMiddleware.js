import { getAllTransections } from "../models/transectionModel.js";

export const auth = async (req, res, next) => {
  try {
    // every request have userId
    const { authorization } = req.headers;

    //get the user from database,

    const user = await getAllTransections(authorization);

    if (user?._id) {
      //check the role
      user.password = undefined;

      req.userInfo = user;
      // let it go to next router
      return next();
    }

    // stop here and response to client

    res.json({
      status: "error",
      message: "sorry , you do not have permission to this api",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};
