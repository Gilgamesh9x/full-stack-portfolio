const mongoose = require("mongoose");

const formsSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  emailSubject: {
    type: String,
    required: true,
  },
  formNumber: Number,
});

module.exports = mongoose.model("Form", formsSchema);
