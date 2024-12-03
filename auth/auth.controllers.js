import ApiError from "../shared/apiError.js";
import httpStatusCodes from "../shared/httpstatuscodes.js";
import AuthServices from "./auth.servives.js";

const authServices = new AuthServices();

class AuthControllers {

  // @desc    Register new user
  // @route   POST /api/v1/register
  // @access  Public 
  async registerController(req, res, next){
    const {name, email, username, password} = req.body;
    if(!name || !email || !username || !password){
      return next(new ApiError("Please fill all fields", httpStatusCodes.UNPROCESSABLE_ENTITY));
    }

    try {
      const user = await authServices.createUser(name, email, username, password);
      res.status(httpStatusCodes.RESOURCE_CREATED).json(user);
    } catch (err) {
      if(err instanceof ApiError){
        return next(new ApiError(err.message, err.status));
      }
    }
  }

  // @desc    Login user
  // @route   POST /api/v1/login
  // @access  public
  async loginController(req, res, next){
    const {username, password} = req.body;

    if(!username || !password){
      return next(new ApiError("Please fill all fields", httpStatusCodes.UNPROCESSABLE_ENTITY));
    }

    try {
      const loginUser = await authServices.login(username, password);
      res.status(httpStatusCodes.OK).json(loginUser);
    } catch (err) {
      if (err instanceof ApiError) {
        return next(new ApiError(err.message, err.status));
      }
    }
  }

  // @desc    logout user
  // @route   post /api/v1/profile
  // @access  Private
  async logoutController(req, res, next){
    const token = req.token;
    try {
      const loggedOut = await authServices.logoutUser(token);
      res.status(httpStatusCodes.OK).json(loggedOut);
    } catch (err) {
      if (err instanceof ApiError) {
        return next(new ApiError(err.message, err.status));
      }
    }     
  }

  // @desc    Get user profile
  // @route   GET /api/v1/profile
  // @access  Private
  async userProfileController(req, res, next){
    const id = req.user.id;
    try {
      const profile = await authServices.profile(id);
      res.status(httpStatusCodes.OK).json(profile);
    } catch (err) {
      if(err instanceof ApiError){
        return next(new ApiError(err.message, err.status));
      }
    }
  }

  // @desc    Update user info
  // @route   PUT /api/v1/profile
  // @access  Private
  async updateProfileController(req, res, next){
    const id = req.user.id;
    const { newName, newEmail, newUsername, newPassword } = req.body;
    try {
      const updated = await authServices.updateUserInfo(id, newName, newEmail, newUsername, newPassword);
      res.status(httpStatusCodes.OK).json(updated);
    } catch (err) {
      if (err instanceof ApiError) {
        return next(new ApiError(err.message, err.status));
      }
    }
  }

  // @desc    Delete user profile
  // @route   DELETE /api/v1/profile
  // @access  Private
  async deleteProfileController(req, res, next){
    const id = req.user.id;
    try {
      const delUser = await authServices.deletProfile(id);
      res.status(httpStatusCodes.OK).json(delUser);
    } catch (err) {
      if (err instanceof ApiError) {
        return next(new ApiError(err.message, err.status));
      }
    }
  }
}

export default AuthControllers;