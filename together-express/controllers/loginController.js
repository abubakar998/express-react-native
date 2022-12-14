// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// internal imports
const User = require("../models/People");

// get login page
// function getLogin(req, res, next) {
//   res.render("index");
// }

// do login
async function login(req, res, next) {
  try {
    // find a user who has this email/username
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        // prepare the user object to generate token
        // const userObject = {
        //   userid: user._id,
        //   username: user.name,
        //   email: user.email,
        //   avatar: user.avatar || null,
        //   role: user.role || "user",
        // };

        // generate token
        const token = jwt.sign({userid: user._id}, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        res.status(200).send({
          userid: user._id,
          username: user.name,
          email: user.email,
          avatar: user.avatar || null,
          role: user.role || "user",
          accessToken: token
        });
        // set cookie
        // res.cookie(process.env.COOKIE_NAME, token, {
        //   maxAge: process.env.JWT_EXPIRY,
        //   httpOnly: true,
        //   signed: true,
        // });

        // set logged in user local identifier
        // res.locals.loggedInUser = userObject;

        // res.redirect("inbox");
        res.end();
      } else {
        throw createError("Login failed! Please try again.");
      }
    } else {
      throw createError("Login failed! Please try again.");
    }
  } catch (err) {
    res.json({
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

// do logout
function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged out");
}

module.exports = {
  // getLogin,
  login,
  logout,
};