const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bugRoutes = require('./routes/bugs');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/bugs', bugRoutes);
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/bugtracker')
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.error(err));