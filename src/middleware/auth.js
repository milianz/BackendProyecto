import passport from '../config/passport.js';
import AppError from '../utils/AppError.js';

export const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.log('Error en autenticación:', err);
      return next(new AppError('Error en la autenticación', 500));
    }
    if (!user) {
      console.log('Usuario no encontrado o token inválido');
      return next(new AppError('No autorizado', 401));
    }
    console.log('Usuario autenticado:', user);
    req.user = user;
    next();
  })(req, res, next);
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    next(new AppError('Acceso denegado. Se requieren privilegios de administrador.', 403));
  }
};