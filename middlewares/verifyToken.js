import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import ApiError from "../shared/apiError.js";
import httpStatusCodes from "../shared/httpstatuscodes.js";
import pool from "../config/db.config.js";

dotenv.config();

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  const loggedOut = await pool.query("SELECT * FROM logout_tokens WHERE token = $1", [token])
  if (loggedOut.rowCount > 0) {
    return next(new ApiError("access denied, expired token, please login", httpStatusCodes.FORBIDDEN));
  }
  
  if(!token){
    return next(new ApiError("access denied, no token, please login", httpStatusCodes.FORBIDDEN));
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if(!verified){
    return next(new ApiError("invalid token, please login", httpStatusCodes.BAD_REQUSEST));
  }

  req.user = verified;
  next();
}

export default verifyToken;