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
    if (!dish_name || !state || !price || !discount) {
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
    if (!dish_name || !state || !price || !discount) {
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

    isUpdatedDish = await Dish.findOneAndUpdate(
      dishUpdatePrice,
      updatedDIsh,
      { new: true }
    );

    if (!isUpdatedDish)
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

// @route GET api/dish/get_all_available_dish
// @desc Get all dish 
// @access Private
router.get("/get_all_available_dish", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user)
      return res.status(200).json({
        success: false,
        message: "User not found!",
      });
    // if (sys_ad.role != "Guest")
    //   return res.status(200).json({
    //     success: false,
    //     message: "Access denied!",
    //   });
    const dishs = await Dish.find({ state: 'true' });
    if (dishs.length === 0) {
      return res.json({ success: true, message: "There is no available dish" });
    }
    const availableDishs = dishs.map(dish => ({
      dish_name: dish.dish_name,
      description: dish.description,
      state: dish.state,
      price: dish.price,
      discount: dish.discount,
    }));

    res.json({ success: true, dishs: availableDishs });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route GET api/dish/get_all_dish
// @desc Get all dish 
// @access Private
router.get("/get_all_dish", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user)
      return res.status(200).json({
        success: false,
        message: "User not found!",
      });
    // if (sys_ad.role != "Guest")
    //   return res.status(200).json({
    //     success: false,
    //     message: "Access denied!",
    //   });
    const dishs = await Dish.find();
    if (dishs.length === 0) {
      return res.json({ success: true, message: "There is no available dish" });
    }
    const AllDishs = dishs.map(dish => ({
      dish_name: dish.dish_name,
      description: dish.description,
      state: dish.state,
      price: dish.price,
      discount: dish.discount,
    }));

    res.json({ success: true, dishs: AllDishs });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route DEL api/dish/:dish_name
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

    const deleteDish = await Dish.findOneAndDelete({
      dish_name: req.params.dish_name,
    });
    if (!deleteDish)
      return res
        .status(200)
        .json({ success: false, message: "Dish name is not found!" });

    return res.json({
      success: true,
      message: "Dish deleted successfully",
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