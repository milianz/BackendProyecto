import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Exitos al conectar la base de datos!');
  } catch (error) {
    console.error('Error al conectar la base de datos', error);
    process.exit(1);
  }
};