const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const request = require("request");
const config = require("config");

// @route   GET api/profile/me
// @desc    Get your own user profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const id = req.user.id;
    const profile = await Profile.findOne({ user: id }).populate("user", [
      "name",
      "avatar",
    ]);

    if (!profile) {
      return res.status(404).json({ msg: "There is no profile for this user" });
    }

    console.log("wth1");
    res.json(profile);
    console.log("wth1");
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/profile
// @desc    Get all user profiles
// @access  Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find({}).populate("user", [
      "name",
      "avatar",
    ]);
    res.json(profiles);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/profile/:id
// @desc    Get a user profile
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await Profile.findOne({ user: id }).populate("user", [
      "name",
      "avatar",
    ]);

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.send(profile);
  } catch (e) {
    console.error(e.message);
    if (e.kind == "ObjectId") {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   POST api/profile/me
// @desc    Create your own profile (and if profile already exists then update it)
// @access  Private
router.post(
  "/me",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile object
    let profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const id = req.user.id;
      let profile = await Profile.findOne({ user: id });
      if (profile) {
        // update
        profile = await Profile.findOneAndUpdate(
          { user: id },
          { profileFields },
          { new: true }
        );
        res.json(profile);
      } else {
        // create
        const userProfile = await new Profile(profileFields);
        await userProfile.save();
        res.send(userProfile);
      }
    } catch (e) {
      res.status(500).send({ errors: [{ msg: "Server Error" }] });
    }
  }
);

// @route   PUT api/profile/me
// @desc    Delete profile, user, posts
// @access  Private
router.delete("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({ user: req.user.id });
    if (profile) {
      await User.findByIdAndDelete(req.user.id);
      res.json({ msg: "profile deleted successfully!", profile });
    } else {
      res.json({ msg: "No profile found" });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company name is required").not().isEmpty(),
      check("from", "Starting date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;
    const newExp = { title, company, location, from, to, current, description };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json({ profile });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   DELETE api/profile/experience
// @desc    delete a profile experience
// @access  Private
router.delete("/experience/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.experience.map((item) => item.id).indexOf(id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldOfStudy", "Field of Study is required").not().isEmpty(),
      check("from", "Starting date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    } = req.body;
    const newEdu = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json({ profile });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   DELETE api/profile/education
// @desc    delete a profile education
// @access  Private
router.delete("/education/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education.map((item) => item.id).indexOf(id);
    profile.education.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/profile/github/:username
// @desc    Get a user's github repository
// @access  Public
router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientID"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (err, response, body) => {
      if (err) console.error(err);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No github profile found" });
      }

      res.json(JSON.parse(body));
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

// @route   PATCH api/profile/me
// @desc    Update your own profile
// @access  Private
// router.patch("/me", auth, async (req, res) => {
//   try {
//     const profile = await Profile.findOneAndUpdate(
//       { user: req.user.id },
//       req.body,
//       { useFindAndModify: false }
//     );
//     await profile.save();
//     res.send({ msg: "Profile updated successfully!" });
//   } catch (e) {
//     console.error(e.message);
//     res.status(500).send("Server error");
//   }
// });
