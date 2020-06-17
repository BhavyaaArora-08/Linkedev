const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const auth = require("../../middleware/auth");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    // add custom validations in middleware
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      // Grab errors from validation middleware
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      // Look if user with this email id already exists
      const { name, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Grab user's avatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      // Generate a token for the user
      const newUser = await new User({ name, email, password, avatar });
      const token = await newUser.generateAuthToken();

      // Register user
      await newUser.save();

      // Send msg to client
      res.status(201).send({ user: newUser, token });
    } catch (e) {
      res.status(500).send({ errors: [{ msg: "Unable to Register" }] });
    }
  }
);

// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "User doesn't exist" }] });
      }

      const token = await user.generateAuthToken();
      res
        .status(200)
        .json({ msg: "User logged in successfully!", user, token });
    } catch (e) {
      res
        .status(500)
        .send({ errors: [{ msg: "Incorrect usernam/password field" }] });
    }
  }
);

// @route   GET api/users
// @desc    Get yourself
// @access  Private
router.get("/", auth, (req, res) => {
  res.send(req.user);
});

// @route   POST api/users/logout
// @desc    Logout user
// @access  Private
router.post("/logout", auth, async (req, res) => {
  try {
    const user = req.user;
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await user.save();
    res.json({ msg: "User logged out successfully!" });
  } catch (e) {
    res.status(500).send({ error: e || "Server error" });
  }
});

module.exports = router;
