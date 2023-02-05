const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const locationRoutes = require('./routes/locations');
const userRoutes = require('./routes/user');

const app = express();
const port = process.env.PORT;
const corsOptions = {
  origin: process.env.CLIENT, // allow origin client
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/locations', locationRoutes);
app.use('/api/user', userRoutes);

//connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(port, () => {
      console.log(`connected to database and listening to port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
