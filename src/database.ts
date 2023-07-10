import mongoose from 'mongoose';

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(`mongodb+srv://johbirger:${process.env.MONGOKEY}@cluster0.ddwvlsd.mongodb.net/`);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}