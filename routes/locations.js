const express = require('express');
const {
  createLocation,
  getSingleLocation,
  getLocations,
  deleteLocation,
  updateLocation,
} = require('../controllers/locationController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// GET all locations
router.get('/', getLocations);

// GET a single location
router.get('/:id', getSingleLocation);

// add middleware here to only allow with auth access
router.use(requireAuth);

// POST a new location
router.post('/', createLocation);

// DELETE a single location
router.delete('/:id', deleteLocation);

// UPDATE a single location
router.patch('/:id', updateLocation);

module.exports = router;
