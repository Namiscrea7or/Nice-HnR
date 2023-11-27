const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const User = require("../models/User");
const Dish = require("../models/Dish");

// @route POST api/dish/add_dish
// @desc add a dish 
// @access Private (only for system admin)
router.post("/add_dish", verifyToken, async (req, res) => {
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
    const { dish_name, description, state, price, discount } =
      req.body;
    if (!dish_name  || !state || !price || !discount) {
      res.status(200).json({
        success: false,
        message: "Missing information!",
      });
    }
    let dish = await Dish.findOne({
      dish_name: dish_name,
    });

    if (dish)
      return res.status(200).json({
        success: false,
        message: "Dish has already existed!",
      });

    const newDish = new Dish({
      dish_name,
      description,
      state,
      price,
      discount,
    });
    await newDish.save();

    res.json({
      success: true,
      message: "New dish created successfully",
      newDish,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route PUT api/dish/update_dish
// @desc Update a dish price with specific price
// @access Private (only for system admin)
router.put("/update_dish", verifyToken, async (req, res) => {
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

    const { dish_name, description, state, price, discount } =
      req.body;
    if (!dish_name  || !state || !price || !discount) {
      res.status(200).json({
        success: false,
        message: "Missing information!",
      });
    }

    let updatedDIsh = {
      dish_name,
      description,
      state,
      price,
      discount,
    };

    const dishUpdatePrice = {
      dish_name: dish_name,
    };

    updatedUser = await Dish.findOneAndUpdate(
      dishUpdatePrice,
      updatedDIsh,
      { new: true }
    );

    if (!updatedUser)
      return res.status(200).json({
        success: false,
        message: "Dish name is not found!",
      });

    res.json({
      success: true,
      message: "Dish updated successfully",
      updatedDIsh,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route DEL api/dish/update_dish
// @desc Delete a specific dish
// @access Private (only for system admin)
router.delete("/:dish_name", verifyToken, async (req, res) => {
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

    const deleteDish = await Room.findOneAndDelete({
      dish_name: req.params.room_number,
    });
    if (!deleteDish)
      return res
        .status(200)
        .json({ success: false, message: "Dish name is not found!" });

    return res.json({
      success: true,
      message: "Room deleted successfully",
      deleteDish,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;