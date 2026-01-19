import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/DB.js";
import { protect } from "../middleware/auth.js";
import {
  validateEmail,
  validatePassword,
  validateName,
  sanitizeInput,
} from "../utils/validation.js";

const router = express.Router();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Register

router.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Sanitize inputs
    name = sanitizeInput(name);
    email = sanitizeInput(email).toLowerCase();

    // Validate name
    const nameValidation = validateName(name);
    if (!nameValidation.valid) {
      return res.status(400).json({ message: nameValidation.message });
    }

    // Validate email
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Please provide a valid email" });
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({ message: passwordValidation.message });
    }

    // Check if user exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    // Generate token
    const token = generateToken(newUser.rows[0].id);

    // Set cookie
    res.cookie("token", token, cookieOptions);

    return res.status(201).json({ user: newUser.rows[0] });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Server error during registration" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Sanitize email
    email = sanitizeInput(email).toLowerCase();

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Please provide a valid email" });
    }

    // Find user
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userData = user.rows[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(userData.id);

    // Set cookie
    res.cookie("token", token, cookieOptions);

    res.json({
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
});

// Me
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
  // return info of the logged in user from protect middleware
});

// Logout
router.post("/logout", (req, res) => {
  res.cookie("token", "", { ...cookieOptions, maxAge: 1 });
  res.json({ message: "Logged out successfully" });
});

export default router;