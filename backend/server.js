
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// =========================
// MongoDB connection
// =========================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// =========================
// Food Schema
// =========================
const foodSchema = new mongoose.Schema(
  {
    foodId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    cuisine: {
      type: String,
      trim: true,
    },
    ingredients: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: "foods",
  }
);

const Food = mongoose.model("Food", foodSchema);

// =========================
// Home route
// =========================
app.get("/", (req, res) => {
  res.json({
    message: "Food Management API is running!",
  });
});

// =========================
// GET: Get all foods
// =========================
app.get("/api/foods", async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: foods.length,
      data: foods,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// =========================
// GET: Get food by MongoDB ID
// =========================
app.get("/api/foods/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid food ID",
      });
    }

    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).json({
      success: true,
      data: food,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// =========================
// POST: Create a new food
// =========================
app.post("/api/foods", async (req, res) => {
  try {
    const food = await Food.create(req.body);

    res.status(201).json({
      success: true,
      message: "Food created successfully",
      data: food,
    });
  } catch (err) {
    const status = err.code === 11000 ? 409 : 400;

    res.status(status).json({
      success: false,
      message:
        err.code === 11000
          ? "foodId already exists"
          : err.message,
    });
  }
});

// =========================
// PUT: Update a food
// =========================
app.put("/api/foods/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid food ID",
      });
    }

    const food = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food updated successfully",
      data: food,
    });
  } catch (err) {
    const status = err.code === 11000 ? 409 : 400;

    res.status(status).json({
      success: false,
      message:
        err.code === 11000
          ? "foodId already exists"
          : err.message,
    });
  }
});

// =========================
// DELETE: Delete a food
// =========================
app.delete("/api/foods/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid food ID",
      });
    }

    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food deleted successfully",
      data: food,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// =========================
// Start server
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});