const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  phone: {
    type: String,
    // required: true,
  },
  mc: {
    type: String,
  },
  dot: {
    type: String,
  },
  support: {
    type: String,
  },
});

module.exports = mongoose.model("UserInfo", userInfoSchema);
