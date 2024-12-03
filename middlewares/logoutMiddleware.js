import ApiError from "../shared/apiError.js";
import httpStatusCodes from "../shared/httpstatuscodes.js";

const logoutMiddleware = (req, res, next) =>{
  const token = req.headers["authorization"]?.split(" ")[1];
  if(!token){
    throw new ApiError("no token", httpStatusCodes.BAD_REQUSEST);
  }
  req.token = token;
  next();
}

export default logoutMiddleware;