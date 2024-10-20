import User from '../models/User.js';
import AppError from '../utils/AppError.js';

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    res.json(user);
  } catch (error) {
    next(new AppError('Error fetching user', 500));
  }
};