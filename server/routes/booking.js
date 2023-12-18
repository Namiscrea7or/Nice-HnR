const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const User = require("../models/User")
const Booking = require("../models/Booking");
const Room = require("../models/Room");
const Table = require("../models/Table");
const BookingRoom = require("../models/BookingRoom");
const BookingTable = require("../models/BookingTable");

// @route POST api/booking/
// @desc Create booking information
// @access Private
router.post("/", verifyToken, async (req, res) => {
  try {
    const bookingRooms = await BookingRoom.find({ user: req.userId, state: 'false' });
    const bookingTables = await BookingTable.find({ user: req.userId, state: 'false' });

    // Get the IDs of all rooms and tables
    const roomBookingIds = bookingRooms.map((booking) => booking._id);
    const tableBookingIds = bookingTables.map((booking) => booking._id);
    const tableTypeIds = bookingTables.map((booking) => booking.table_type);

    // Retrieve all rooms and tables with their prices
    const rooms = await Room.find({ _id: { $in: tableTypeIds } });
    const tables = await Table.find({ _id: { $in: tableTypeIds } });

    // Create a detailed list of rooms with prices
    const detailedRooms = rooms.map((room) => ({
      roomType: room.room_type,
      roomNumber: room.room_number,
      description: room.description,
      price: room.price,
    }));

    // Create a detailed list of tables with prices
    const detailedTables = tables.map((table) => ({
      tableType: table.table_type,
      tableNumber: table.table_number,
      price: table.price,
    }));

    // Calculate the sum of prices for all rooms and tables
    const totalRoomPrice = rooms.reduce((sum, room) => sum + room.price, 0);
    const totalTablePrice = tables.reduce((sum, table) => sum + table.price, 0);
    const total = totalRoomPrice + totalTablePrice;

    // Create a new Booking instance and save it to the database
    const newBooking = new Booking({
      user: req.userId,
      table_bookings: tableBookingIds,
      room_bookings: roomBookingIds,
      pay: total,
      state: 'false',
    });

    const savedBooking = await newBooking.save();

    res.json({
      success: true,
      user: req.userId,
      detailedRooms,
      detailedTables,
      totalRoomPrice,
      totalTablePrice,
      total,
      booking: savedBooking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


// @route GET api/booking/
// @desc Create booking information
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const bookingRooms = await BookingRoom.find({ user: req.userId, state: 'false' });
    const bookingTables = await BookingTable.find({ user: req.userId, state: 'false' });

    // Get the IDs of all rooms and tables
    const roomBookingIds = bookingRooms.map((booking) => booking._id);
    const tableBookingIds = bookingTables.map((booking) => booking._id);
    const tableTypeIds = bookingTables.map((booking) => booking.table_type);

    // Retrieve all rooms and tables with their prices
    const rooms = await Room.find({ _id: { $in: tableTypeIds } });
    const tables = await Table.find({ _id: { $in: tableTypeIds } });

    // Create a detailed list of rooms with prices
    const detailedRooms = rooms.map((room) => ({
      roomType: room.room_type,
      roomNumber: room.room_number,
      description: room.description,
      price: room.price,
    }));

    // Create a detailed list of tables with prices
    const detailedTables = tables.map((table) => ({
      tableType: table.table_type,
      tableNumber: table.table_number,
      price: table.price,
    }));

    // Calculate the sum of prices for all rooms and tables
    const totalRoomPrice = rooms.reduce((sum, room) => sum + room.price, 0);
    const totalTablePrice = tables.reduce((sum, table) => sum + table.price, 0);
    const total = totalRoomPrice + totalTablePrice;

    // // Create a new Booking instance and save it to the database
    // const newBooking = new Booking({
    //   user: req.userId,
    //   table_bookings: tableBookingIds,
    //   room_bookings: roomBookingIds,
    //   pay: total,
    //   state: 'false',
    // });

    // const savedBooking = await newBooking.save();

    res.json({
      success: true,
      user: req.userId,
      detailedRooms,
      detailedTables,
      totalRoomPrice,
      totalTablePrice,
      total
      // booking: savedBooking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


// // @route GET api/bookings/
// // @desc Get list of bookings for a user
// // @access Private
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const userId = req.userId;

//     // Find bookings for the user
//     const userBookings = await Booking.find({ user: userId });

//     // Optionally, you can populate the referenced fields (e.g., table_bookings, room_bookings, table_types)
//     // using Mongoose's populate method
//     await Booking.populate(userBookings, { path: "table_bookings room_bookings table_types" });

//     res.json({
//       success: true,
//       user: userId,
//       bookings: userBookings,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// });


// @route PUT api/bookings/payment/
// @desc Process payment and update booking statuses
// @access Private
router.put("/payment", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Update state of all booking rooms to 'true'
    await BookingRoom.updateMany({ user: userId, state: 'false' }, { $set: { state: 'true' } });

    // Update state of all booking tables to 'true'
    await BookingTable.updateMany({ user: userId, state: 'false' }, { $set: { state: 'true' } });

    // Update state of the main booking to 'true'
    await Booking.updateOne({ user: userId, state: 'false' }, { $set: { state: 'true' } });

    res.json({
      success: true,
      message: "Payment successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
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
