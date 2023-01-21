const Location = require('../models/locationModel');
const mongoose = require('mongoose');

// Get all locations
const getLocations = async (req, res) => {
  const locations = await Location.find({});
  res.status(200).json(locations);
};

// Get a single location
const getSingleLocation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such location' });
  }

  const location = await Location.findById(id);

  if (!location) {
    return res.status(404).json({ error: 'No such location' });
  }

  return res.status(200).json(location);
};

// Create a new location
const createLocation = async (req, res) => {
  const { title, category, description, borough, neighborhood, coordinates, images, rating } =
    req.body;

  // add doc to db
  try {
    const location = await Location.create({
      title,
      category,
      description,
      borough,
      neighborhood,
      coordinates,
      images,
      rating,
    });
    res.status(200).json(location);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Delete a location
const deleteLocation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such location' });
  }

  const location = await Location.findOneAndDelete({ _id: id });

  if (!location) {
    return res.status(404).json({ error: 'No such location' });
  }

  res.status(200).json(location);
};

// update a location
const updateLocation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such location' });
  }

  const location = await Location.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
  );

  if (!location) {
    return res.status(404).json({ error: 'No such location' });
  }

  res.status(200).json(location);
};

module.exports = {
  getSingleLocation,
  getLocations,
  createLocation,
  deleteLocation,
  updateLocation,
};
