const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingRoomSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  room_type: {
    type: Schema.Types.ObjectId,
    ref: "rooms",
  },
  room_date: {
    start_room_date: {
      type: Date,
    },
    end_room_date: {
      type: Date,
    },
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

module.exports = mongoose.model("bookingrooms", BookingRoomSchema);