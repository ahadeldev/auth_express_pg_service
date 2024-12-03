import bcrypt from "bcryptjs";
import ApiError from "../shared/apiError.js";
import httpStatusCodes from "../shared/httpstatuscodes.js";
import hashPassword from "../utils/hashPassword.js";
import generateToken from "../utils/generateToken.js";
import pool from "../config/db.config.js";


class AuthServices{

  // Register new user handler
  async createUser(name, email, username, password){
    const hashedPassword = await hashPassword(password);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, username, hashedPassword]
    );

    if(!newUser){
      throw new ApiError("Error creating new user", httpStatusCodes.INTERNAL_SERVER_ERROR);
    }

    return newUser.rows;
  }

  // User login handler
  async login(username, password){
    const checkUser = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    if(checkUser.rows.length === 0){
      throw new ApiError("username not found", httpStatusCodes.BAD_REQUSEST);
    }

    const checkPassword = await bcrypt.compare(password, checkUser.rows[0].password);
    if(!checkPassword){
      throw new ApiError("wrong password", httpStatusCodes.BAD_REQUSEST);
    }

    // console.log(checkUser.rows[0])
    const token = generateToken(checkUser.rows[0]);

    return {user: checkUser.rows[0], token};
  }

  // Logout user handler
  async logoutUser(token){
    const logOutToken = await pool.query("INSERT INTO logout_tokens (token) VALUES ($1) RETURNING *", [token]);
    if(logOutToken.rowCount === 0) {
      throw new ApiError("Error logging out", httpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    return "logged out successfully";
  }

  // User profile handler
  async profile(id){
    const userProfile = await pool.query("SELECT name, email, username FROM users WHERE id = $1", [id]);
    
    if (userProfile.rows.length === 0) {
      throw new ApiError("user not found", httpStatusCodes.NOT_FOUND);
    }

    return userProfile.rows[0];
  }

  // Update user info handler
  async updateUserInfo(id, newName, newEmail, newUsername, newPassword){
    const user = await pool.query("SELECT * FROM users WHERE id = $1 ", [id]);
    if(user.rows.length === 0){
      throw new ApiError("user not found", httpStatusCodes.NOT_FOUND);
    }

    const newhashedPassword = newPassword ? await hashPassword(newPassword) : user.rows[0].password; // Hash only if a new password is provided
    const name = newName || user.rows[0].name;
    const email = newEmail || user.rows[0].email;
    const username = newUsername || user.rows[0].username;
    const password = newhashedPassword || user.rows[0].password;

    const updatedUser = await pool.query(
      "UPDATE users SET name = $1, email = $2, username = $3, password = $4, updatedAt = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *",
      [name, email, username, password, id]
    )

    const newUser = await pool.query("SELECT * FROM users WHERE id = $1 ", [id]);

    if(!newUser){
      throw new ApiError("Error saving data", httpStatusCodes.INTERNAL_SERVER_ERROR);
    }

    return newUser.rows[0];
  }

  // Delete profile handler
  async deletProfile(id){
    const user = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    if(user.rowCount === 0){
      throw new ApiError("user not found", httpStatusCodes.NOT_FOUND);
    }
    return user.rows[0];
  }
}

export default AuthServices;