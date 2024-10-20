
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const googleCallback = async (req, res) => {
  try {
   
    const { _id, name, email } = req.user;
    
    const token = jwt.sign({ id: _id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
   
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 
    });

  
    res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    console.error('Error en googleCallback:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const checkAuth = (req, res) => {
  res.json({
    authenticated: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    }
  });
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout exitoso' });
};