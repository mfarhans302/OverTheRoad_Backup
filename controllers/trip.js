const Trip = require("../models/trip");
const makeApiResponse = require("../lib/response");

module.exports = {
  // Add Trip
  addTrip: async (req, res) => {
    try {
      const userId = req.user._id;
      console.log(userId);
      const {
        companyName,
        driverName,
        startLocation,
        endLocation,
        startDate,
        endDate,
        tripIncome,
        odoMeterStart,
        odoMeterEnd,
        notes,
        tripExpenses,
      } = req.body;

      const trip = new Trip({
        user: userId,
        companyName,
        driverName,
        startLocation,
        endLocation,
        startDate,
        endDate,
        tripIncome,
        odoMeterStart,
        odoMeterEnd,
        notes,
        tripExpenses,
      });

      await trip.save();

      const successResponse = makeApiResponse(
        "Trip added successfully",
        0,
        200,
        {
          trip,
        }
      );
      return res.status(200).json(successResponse);
    } catch (err) {
      const errorResponse = makeApiResponse(
        err?.message || "Internal Server Error",
        1,
        500
      );
      return res.status(500).json(errorResponse);
    }
  },

  // Get All Trips for a User
  getUserTrips: async (req, res) => {
    try {
      const userId = req.user._id;
      const trips = await Trip.find({ user: userId });

      const successResponse = makeApiResponse(
        "Trips fetched successfully",
        0,
        200,
        { trips }
      );
      return res.status(200).json(successResponse);
    } catch (err) {
      const errorResponse = makeApiResponse(
        err?.message || "Internal Server Error",
        1,
        500
      );
      return res.status(500).json(errorResponse);
    }
  },

  // Get a Specific Trip
  getTrip: async (req, res) => {
    try {
      const tripId = req.params.tripId;
      const trip = await Trip.findById(tripId);

      if (!trip) {
        const errorResponse = makeApiResponse("Trip not found", 1, 404);
        return res.status(404).json(errorResponse);
      }

      const successResponse = makeApiResponse(
        "Trip fetched successfully",
        0,
        200,
        { trip }
      );
      return res.status(200).json(successResponse);
    } catch (err) {
      const errorResponse = makeApiResponse(
        err?.message || "Internal Server Error",
        1,
        500
      );
      return res.status(500).json(errorResponse);
    }
  },

  // Update a Trip
  updateTrip: async (req, res) => {
    try {
      const tripId = req.params.tripId;
      const {
        companyName,
        driverName,
        startLocation,
        endLocation,
        startDate,
        endDate,
        tripIncome,
        odoMeterStart,
        odoMeterEnd,
        notes,
        tripExpenses,
      } = req.body;

      const trip = await Trip.findByIdAndUpdate(
        tripId,
        {
          companyName,
          driverName,
          startLocation,
          endLocation,
          startDate,
          endDate,
          tripIncome,
          odoMeterStart,
          odoMeterEnd,
          notes,
          tripExpenses,
        },
        { new: true }
      );

      if (!trip) {
        const errorResponse = makeApiResponse("Trip not found", 1, 404);
        return res.status(404).json(errorResponse);
      }

      const successResponse = makeApiResponse(
        "Trip updated successfully",
        0,
        200,
        { trip }
      );
      return res.status(200).json(successResponse);
    } catch (err) {
      const errorResponse = makeApiResponse(
        err?.message || "Internal Server Error",
        1,
        500
      );
      return res.status(500).json(errorResponse);
    }
  },

  // Delete a Trip
  deleteTrip: async (req, res) => {
    try {
      const tripId = req.params.tripId;
      const trip = await Trip.findByIdAndDelete(tripId);

      if (!trip) {
        const errorResponse = makeApiResponse("Trip not found", 1, 404);
        return res.status(404).json(errorResponse);
      }

      const successResponse = makeApiResponse(
        "Trip deleted successfully",
        0,
        200
      );
      return res.status(200).json(successResponse);
    } catch (err) {
      const errorResponse = makeApiResponse(
        err?.message || "Internal Server Error",
        1,
        500
      );
      return res.status(500).json(errorResponse);
    }
  },
};
