import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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

destinationSchema.plugin(mongoosePaginate);

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;
