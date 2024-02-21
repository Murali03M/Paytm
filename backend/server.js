const mongoose = require('mongoose');
const app = require('./index');

const mongoURI = "mongodb+srv://murali732000:DRNELJ77humGTQIU@cluster0.8pglltf.mongodb.net/Paytm";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: false,
});

// Event listeners for Mongoose connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});


const port = 8080 || 3000;



app.listen(port, () => {
    console.log(`Port is running ${port}`);
});


