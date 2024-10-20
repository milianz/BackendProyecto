import Report from '../models/Report.js';
import Publication from '../models/Publication.js';
import AppError from '../utils/AppError.js';

export const reportPublication = async (req, res, next) => {
  try {
    const { publicationId } = req.params;
    const { reason } = req.body;
    const reporterId = req.user._id;

    const publication = await Publication.findById(publicationId);
    if (!publication) {
      return next(new AppError('Publicación no encontrada', 404));
    }

    const existingReport = await Report.findOne({ publication: publicationId, reporter: reporterId });
    if (existingReport) {
      return next(new AppError('Ya has denunciado esta publicación', 400));
    }

    const newReport = new Report({
      publication: publicationId,
      reporter: reporterId,
      reason
    });

    await newReport.save();

    publication.reportCount += 1;
    if (publication.reportCount >= 5) {
      publication.isReported = true;
    }
    await publication.save();

    res.status(201).json({ message: 'Denuncia registrada con éxito' });
  } catch (error) {
    next(new AppError('Error al registrar la denuncia', 500));
  }
};