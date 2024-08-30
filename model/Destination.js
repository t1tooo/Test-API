import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  CityName: String,
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

export default Destination;
