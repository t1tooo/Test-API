import express from 'express';
import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: String,
  attractions: [String],
  hotels: [String],
  transports: [String],
  weather: {
    temperature: Number,
    conditions: String,
  },
  cuisine: [String],
});

const Destination = mongoose.model('Destination', destinationSchema);


const app = express();
const PORT = 3000;


app.use(express.json());


mongoose.connect('mongodb+srv://titoguapo9:paswordFortesting@cluster0.3h52txt.mongodb.net/Dest', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.get('/api/destination', async (req, res) => {
  try {
    const destinations = await Destination.find(); 
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/api/destination/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.json(destination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post('/api/destination', async (req, res) => {
  try {
    const newDestination = new Destination(req.body); 
    const savedDestination = await newDestination.save(); 
    res.status(201).json(savedDestination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.put('/api/destination/:id', async (req, res) => {
  try {
    const updatedDestination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDestination) return res.status(404).json({ message: 'Destination not found' });
    res.json(updatedDestination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.delete('/api/destination/:id', async (req, res) => {
  try {
    const deletedDestination = await Destination.findByIdAndDelete(req.params.id);
    if (!deletedDestination) return res.status(404).json({ message: 'Destination not found' });
    res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
