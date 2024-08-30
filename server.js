import express from 'express';
import mongoose from 'mongoose';
import destinationRoutes from './api/destination.js';


const mongoURI = 'mongodb+srv://username:password@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority';


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const PORT = 3000;  


app.use(express.json());


app.use('/api/destination.js', destinationRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
