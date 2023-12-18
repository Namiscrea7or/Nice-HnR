const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const User = require("../models/User")
const Booking = require("../models/Booking");
const Room = require("../models/Room");
const Table = require("../models/Table");
const BookingRoom = require("../models/BookingRoom");
const BookingTable = require("../models/BookingTable");

// @route GET api/booking/:bookingId
// @desc Get booking information by ID
// @access Private
router.get("/:bookingId", verifyToken, async (req, res) => {
  try {
    // Lấy thông tin booking và populate các trường user, table_type, room_type
    const booking = await Booking.findById(req.params.bookingId)
      .populate({
        path: "user",
        select: [
          "email",
          "full_name",
          "phone_number",
          "address",
          "birthday",
          "user_id",
          "role",
        ],
      })
      .populate({
        path: "table_type",
        select: ["table_type", "table_number", "price"],
      })
      .populate({
        path: "room_type",
        select: [
          "room_type",
          "room_number",
          "description",
          "price",
          "discount",
        ],
      });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // if (booking.room_date) {
    //   booking.room_date = {
    //     start_room_date: booking.room_date.start_room_date,
    //     end_room_date: booking.room_date.end_room_date,
    //   };
    // }

    res.json({ success: true, booking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route PUT api/booking/:bookingId/pay
// @desc Update the state of a booking to true (paid)
// @access Private
router.put("/:bookingId/pay", verifyToken, async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    const updatedBooking = await Booking.updateOne(
      { _id: bookingId },
      { $set: { state: "true" } }
    );

    if (updatedBooking.nModified === 0) {
      return res.status(200).json({
        success: false,
        message: "Booking not found or already paid",
      });
    }

    res.json({
      success: true,
      message: "Booking state updated to true",
      updatedBooking,
    });
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
});



// @route POST api/book_room
// @desc Book available room
// @access Public

router.post("/book_room", verifyToken, async (req, res) => {
  const {
    room_number,
    room_date,
    number_adults,
    number_child
  } = req.body;
  try {
    const guest = await User.findOne({ _id: req.userId });
    if (!guest)
      return res.status(200).json({
        success: false,
        message: "Guest not found!",
      });
    if (guest.role != "Guest")
      return res.status(200).json({
        success: false,
        message: "Access denied!",
      });
    const room = await Room.findOne({ room_number: room_number });
    if (!room) {
      return res.status(200).json({
        success: false,
        message: "Room is not found",
      });
    }
    const existingBookingRooms = await BookingRoom.find({
      room_type: room._id,
      "room_date.start_room_date": {
        $gte: room_date.start_room_date
      },
      "room_date.end_room_date": {
        $gte: room_date.start_room_date
      }
    });
    if (existingBookingRooms.length !== 0) {
      return res.status(200).json({
        success: false,
        message: "Room is booked in these dates",
      });
    }
    const newBookingRoom = new BookingRoom({
      user: guest._id,
      room_type: room._id,
      room_date: room_date,
      number_adults: number_adults,
      number_child: number_child,
      state: 'false',
    });
    await newBookingRoom.save();
    return res.status(200).json({
      success: true,
      message: "Room is booked successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
})

// @route POST api/booking/book_table
// @desc Book available table
// @access Public

router.post("/book_table", verifyToken, async (req, res) => {
  const {
    table_number,
    full_name,
    phone_number,
    table_date,
  } = req.body;
  try {
    const guest = await User.findOne({ _id: req.userId });
    if (!guest)
      return res.status(200).json({
        success: false,
        message: "Guest not found!",
      });
    if (guest.role != "Guest")
      return res.status(200).json({
        success: false,
        message: "Access denied!",
      });
    const table = await Table.findOne({ table_number: table_number });
    if (!table) {
      return res.status(200).json({
        success: false,
        message: "Table is not found",
      });
    }
    const existingBookingTables = await BookingTable.find({
      table_type: table._id,
      table_date: table_date,
    });
    if (existingBookingTables.length !== 0)
      return res.status(200).json({
        success: false,
        message: "Table is not available in these date!",
      });
    const newBookingTable = new BookingTable({
      user: guest._id,
      table_type: table,
      table_date: table_date,
      state: 'false',
    });
    await newBookingTable.save();
    return res.status(200).json({
      success: true,
      message: "Table is booked successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
})
module.exports = router;
