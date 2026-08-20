require("dotenv").config();
const Organizer = require("./models/Organizer");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Event = require("./models/Event");
const app = express();
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const allowedOrigins = [
    "http://localhost:5173",
    process.env.CLIENT_URL,
  ].filter(Boolean);
  
  app.use(
    cors({
      origin: allowedOrigins,
    })
  );

  function requireOrganizerAuth(req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.organizer = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token.",
      });
    }
  }

  app.get("/events", async (req, res) => {
    try {
      const events = await Event.find();
  
      res.json(events);
    } catch (error) {
      res.status(500).json({
        message: "Error loading events.",
      });
    }
  });

  app.post("/events", requireOrganizerAuth, async (req, res) => {    try {
      const newEvent = new Event(req.body);
  
      await newEvent.save();
  
      res.json({
        message: "Event saved successfully!",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error saving event.",
      });
    }
  });

  app.put("/events/:title", requireOrganizerAuth, async (req, res) => {    try {
      const eventTitle = req.params.title;
  
      const updatedEvent = await Event.findOneAndUpdate(
        { title: eventTitle },
        req.body,
        { new: true }
      );
      if (!updatedEvent) {
        return res.status(404).json({
          message: "Event not found.",
        });
      }
      res.json(updatedEvent);
    } catch (error) {
      res.status(500).json({
        message: "Error updating event.",
      });
    }
  });

  app.delete("/events/:title", requireOrganizerAuth, async (req, res) => {    try {
      const eventTitle = req.params.title;
  
      const deletedEvent = await Event.findOneAndDelete({
        title: eventTitle,
      });
      
      if (!deletedEvent) {
        return res.status(404).json({
          message: "Event not found.",
        });
      }
      
      res.json({
        message: "Event deleted successfully!",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting event.",
      });
    }
  });
  async function createOrganizer() {
    const existingOrganizer = await Organizer.findOne({
      email: process.env.ORGANIZER_EMAIL,
    });
  
    if (existingOrganizer) {
      return;
    }
  
    const hashedPassword = await bcrypt.hash(
      process.env.ORGANIZER_PASSWORD,
      10
    );
  
    await Organizer.create({
      email: process.env.ORGANIZER_EMAIL,
      password: hashedPassword,
    });
  
    console.log("Organizer account created.");
  }

  app.post("/organizer/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const organizer = await Organizer.findOne({ email });
  
      if (!organizer) {
        return res.status(401).json({
          message: "Invalid email or password.",
        });
      }
  
      const passwordMatches = await bcrypt.compare(
        password,
        organizer.password
      );
  
      if (!passwordMatches) {
        return res.status(401).json({
          message: "Invalid email or password.",
        });
      }
  
      const token = jwt.sign(
        {
          organizerId: organizer._id,
          email: organizer.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      
      res.json({
        message: "Login successful!",
        token,
      });

    } catch (error) {
      res.status(500).json({
        message: "Login failed.",
      });
    }
  });

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB!");
    await createOrganizer();
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
