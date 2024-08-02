const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  startLocation: {
    type: String,
    required: true,
  },
  endLocation: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  tripIncome: {
    type: Number,
    required: true,
  },
  odoMeterStart: {
    type: Number,
    required: true,
  },
  odoMeterEnd: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
  tripExpenses: [
    {
      expenseType: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      vendor: {
        name: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        phoneNo: {
          type: String,
          required: true,
        },
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zip: {
        type: String,
        required: true,
      },
      expenseDate: {
        type: Date,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      notes: {
        type: String,
      },
    },
  ],
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
