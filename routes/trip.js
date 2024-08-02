const express = require("express");
const router = express.Router();
const tripController = require("../controllers/trip.js");
const { verifyAccessToken } = require("../middlewares/auth.js");

// Add a new trip
router.post("/", verifyAccessToken, tripController.addTrip);

// Get all trips for a user
router.get("/", verifyAccessToken, tripController.getUserTrips);

// get a trip
router.get("/:tripId", verifyAccessToken, tripController.getTrip);

// Edit an existing trip
router.put("/:tripId", verifyAccessToken, tripController.updateTrip);

// Delete a trip
router.delete("/:tripId", verifyAccessToken, tripController.deleteTrip);

module.exports = router;
