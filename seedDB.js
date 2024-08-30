import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Destination from './model/Destination.js';

const mongoURI = 'mongodb+srv://titoguapo9:paswordFortesting@cluster0.3h52txt.mongodb.net/Dest';


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


function generateRandomWeather() {
  const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Windy'];
  return {
    temperature: faker.number.int({ min: -30, max: 50 }),
    conditions: conditions[faker.number.int({ min: 0, max: conditions.length - 1 })],
  };
}

function generateRandomTransport() {
  const transports = [
    'Taxi', 'Tram', 'Train', 'Metro', 'Bolt',
    'Uber', 'Cabify', 'Lime Scooters', 'Voi', 'Ferry'
  ];
  return transports[faker.number.int({ min: 0, max: transports.length - 1 })];
}

function generateRandomCuisine() {
const cuisines = [
  'Italian', 'Chinese', 'Mexican', 'Indian', 'Japanese',
  'French', 'Thai', 'Greek', 'Spanish', 'Vietnamese'
];
return cuisines[faker.number.int({ min: 0, max: cuisines.length - 1 })];
}


function generateMockDestination() {
  return {
    CityName: faker.location.city(),
    attractions: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.lorem.sentence()),
    hotels: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.company.name()),
    transports: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, generateRandomTransport),
    weather: generateRandomWeather(),
    cuisine: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, generateRandomCuisine),
  };
}

// Seed database
async function seedDB() {
  try {
    const mockData = Array.from({ length: 10}, generateMockDestination);
    await Destination.insertMany(mockData);
    console.log('Database seeded successfully.');
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
  } finally {
    mongoose.disconnect();
  }
}

seedDB(100);
