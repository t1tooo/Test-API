import express from 'express';
import mongoose from 'mongoose';
import Destination from './model/Destination.js';
import { rateLimit } from 'express-rate-limit'
let connected = true

const app = express();
const PORT = 3000;



const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 100, 
    standardHeaders: 'draft-7',
    legacyHeaders: false, 
    
})


app.use(limiter)

app.use(express.json());

mongoose.connect('mongodb+srv://titoguapo9:paswordFortesting@cluster0.3h52txt.mongodb.net/Dest', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/destination', async (req, res) => {
  try {
    let query = {};
    if (req.query.hotels) {
      query.hotels = req.query.hotels;
    }

    if (req.query.disconnect === 'true') {
      if (connected) {
        await mongoose.disconnect();
        connected = false;
        console.log("Database connection is offline.");
      }
    } else {
      if (!connected) {
        await mongoose.connect('mongodb+srv://titoguapo9:paswordFortesting@cluster0.3h52txt.mongodb.net/Dest');
        connected = true;
        console.log("Database connection is online.");
      }
    }
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const destinations = await Destination.find(query).skip(skip).limit(limit);


    const total = await Destination.countDocuments(query);
    res.json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: destinations
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred on the server while fetching" });
  }
});

app.get('/api/destination/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ message: "Destination not found" });
    res.json(destination);
  } catch (error) {
    res.status(500).json({ message: "An error occurred on the server while fetching" });
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
