import Publication from '../models/Publication.js';
import AppError from '../utils/AppError.js';

export const createPublication = async (req, res, next) => {
  try {
    const publication = new Publication({
      ...req.body,
      seller: req.user._id
    });
    await publication.save();
    res.status(201).json(publication);
  } catch (error) {
    next(new AppError('Error creating publication', 400));
  }
};

export const deletePublication = async (req, res, next) => {
  try {
    const { publicationId } = req.params;
    const userId = req.user._id;

    const publication = await Publication.findOne({ _id: publicationId, seller: userId });

    if (!publication) {
      return next(new AppError('Publicación no encontrada o no tienes permiso para eliminarla', 404));
    }

    await Publication.findByIdAndDelete(publicationId);

    res.status(200).json({ message: 'Publicación eliminada con éxito' });
  } catch (error) {
    next(new AppError('Error al eliminar la publicación', 500));
  }
};

export const updatePublication = async (req, res, next) => {
  try {
    const { publicationId } = req.params;
    const userId = req.user._id;
    const updateData = req.body;


    delete updateData.seller;
    delete updateData.reportCount;
    delete updateData.isReported;
    delete updateData.status;

    const publication = await Publication.findOne({ _id: publicationId, seller: userId });

    if (!publication) {
      return next(new AppError('Publicación no encontrada o no tienes permiso para modificarla', 404));
    }

  
    const updatedPublication = await Publication.findByIdAndUpdate(
      publicationId,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedPublication);
  } catch (error) {
    next(new AppError('Error al actualizar la publicación', 500));
  }
};
