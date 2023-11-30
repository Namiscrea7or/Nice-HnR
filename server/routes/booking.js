const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Room = require("../models/Room");
const Table = require("../models/Table");
const Booking = require("../models/Booking");

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


// @route GET api/available_rooms
// @desc Get available rooms (state = True)
// @access Private
router.get("/available_rooms", verifyToken, async (req, res) => {
  try {
    const sys_ad = await User.findOne({ _id: req.userId });
    if (!sys_ad)
      return res.status(200).json({
        success: false,
        message: "System admin not found!",
      });
    if (sys_ad.role != "System_Admin")
      return res.status(200).json({
        success: false,
        message: "Access denied!",
      });

    const rooms = await Room.find({ state: 'true' });
    if (rooms.length === 0) {
      return res.json({ success: true, message: "There is no available room" });
    }
    const availableRooms = rooms.map(room => ({
      room_type: room.room_type,
      room_number: room.room_number,
      description: room.description,
      state: room.state,
      price: room.price,
      discount: room.discount,
    }));

    res.json({ success: true, rooms: availableRooms });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
});



// @route GET api/available_tables
// @desc Get available tables (state = True)
// @access Private
router.get("/available_tables", verifyToken, async (req, res) => {
  try {
    const sys_ad = await User.findOne({ _id: req.userId });
    if (!sys_ad)
      return res.status(200).json({
        success: false,
        message: "System admin not found!",
      });
    if (sys_ad.role != "System_Admin")
      return res.status(200).json({
        success: false,
        message: "Access denied!",
      });

    const tables = await Table.find({ state: 'true' });
    if (tables.length === 0) {
      return res.json({ success: true, message: "There is no available table" });
    }
    const availableTables = tables.map(table => ({
      table_type: table.table_type,
      table_number: table.table_number,
      state: table.state,
      price: table.price,
    }));

    res.json({ success: true, rooms: availableTables });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route POST api/booking_room
// @desc Book available room
// @access Public

router.post("/book_room", verifyToken, async (req, res) => {
  const {
    table_type,
    table_date,
    room_type,
    room_date,
    pay
  } = req.body;
  try {
    const guest = await User.findOne({ _id: req.userId });
    if (!guest)
      return res.status(200).json({
        success: false,
        message: "Guest not found!",
      });
    if (sys_ad.role != "Guest")
      return res.status(200).json({
        success: false,
        message: "Access denied!",
      });
    const existingBookings = await Booking.find({
      room_type: room_type,
      "room_date.start_room_date": {
        $lte: room_date.end_room_date
      },
      "room_date.end_room_date": {
        $gte: room_date.start_room_date
      }
    });
    if (existingBookings === 0) 
      return res.status(200).json({
        success: false,
        message: "Room is not available in these date!",
      });
    const newBooking = new Booking({
      user: guest,
      table_type: table_type,
      table_date: table_date,
      room_type: room_type,
      room_date: room_date,
      pay: pay,
      state: 'false',
    });
    await newBooking.save();
    res.json({
      success: true,
      message: "Room booked successfully."
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
