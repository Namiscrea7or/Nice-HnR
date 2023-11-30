const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingTableSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  table_type: {
    type: Schema.Types.ObjectId,
    ref: "tables",
  },
  table_date: {
    type: Date,
  },
  pay: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    enum: ['true', 'false'],
    default: 'false',
    required: true
  }
});

module.exports = mongoose.model("bookings", BookingTableSchema);