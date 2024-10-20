import User from '../models/User.js';
import Publication from '../models/Publication.js';
import AppError from '../utils/AppError.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-__v -password');
    res.json(users);
  } catch (error) {
    next(new AppError('Error al obtener la lista de usuarios', 500));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return next(new AppError('Usuario no encontrado', 404));
    }
    res.json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    next(new AppError('Error al eliminar el usuario', 500));
  }
};

export const getReportedPublications = async (req, res, next) => {
  try {
    const reportedPublications = await Publication.find({ isReported: true })
      .populate('seller', 'name email')
      .select('-__v');
    res.json(reportedPublications);
  } catch (error) {
    next(new AppError('Error al obtener publicaciones denunciadas', 500));
  }
};

export const changePublicationStatus = async (req, res, next) => {
  try {
    const { publicationId } = req.params;
    const { status } = req.body;

    if (!['active', 'inactive', 'rejected'].includes(status)) {
      return next(new AppError('Estado de publicación inválido', 400));
    }

    const publication = await Publication.findByIdAndUpdate(
      publicationId,
      { status, isReported: false, reportCount: 0 },
      { new: true }
    );

    if (!publication) {
      return next(new AppError('Publicación no encontrada', 404));
    }

    res.json(publication);
  } catch (error) {
    next(new AppError('Error al cambiar el estado de la publicación', 500));
  }
};