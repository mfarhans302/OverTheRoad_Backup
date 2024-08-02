const User = require("../models/user");
const UserInfo = require("../models/userInfo");
const { generateAccessToken } = require("../middlewares/auth");
const { encryptPassword, comparePassword } = require("../lib/encryption");
const makeApiResponse = require("../lib/response");
const sendOtpEmail = require("../lib/otpConfirmation");

module.exports = {
  signUp: async function (req, res, next) {
    try {
      let { email, name, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        const errorResponse = makeApiResponse(
          "Password and confirm password should be same",
          1,
          401
        );
        return res.status(401).json(errorResponse);
      }

      password = await encryptPassword(req.body.password);

      let user = await User.findOne({ email });

      if (user) {
        if (user.verified) {
          const errorResponse = makeApiResponse("User already exists", 1, 409);
          return res.status(409).json(errorResponse);
        }

        if (user.otpExpiry && Date.now() < user.otpExpiry) {
          const otp = Math.floor(100000 + Math.random() * 900000);
          const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

          user.otp = otp;
          user.otpExpiry = otpExpiry;

          const otpEmailContent = `
      <p>【authentication code】<strong>${otp}</strong></p>
      <p>The verification code will be valid for 10 minutes from the time this email is sent.</p>
      <hr>
      <p>This email is sent from a designated email address using an automatic distribution system. Please note that we will not be able to respond even if you reply to this email. If you have any questions, please contact our support desk.</p>
      <p>Support Desk：<a href="mailto:kraysistest@gmail.com">kraysistest@gmail.com</a></p>
      <hr>
      <p>【Publisher】OverTheRoad</p>
   `;
          await user.save();

          await sendOtpEmail({
            html: otpEmailContent,
            subject: "【OverTheRoad】Sending the verification code",
            email: email,
          });

          const successResponse = makeApiResponse(
            "Please enter the new OTP sent to your email",
            0,
            200
          );
          return res.status(200).json(successResponse);
        }
      }

      const otp = Math.floor(100000 + Math.random() * 900000);
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

      const otpEmailContent = `
      <p>【authentication code】<strong>${otp}</strong></p>
      <p>The verification code will be valid for 10 minutes from the time this email is sent.</p>
      <hr>
      <p>This email is sent from a designated email address using an automatic distribution system. Please note that we will not be able to respond even if you reply to this email. If you have any questions, please contact our support desk.</p>
      <p>Support Desk：<a href="mailto:kraysistest@gmail.com">kraysistest@gmail.com</a></p>
      <hr>
      <p>【Publisher】OverTheRoad</p>
   `;

      user = new User({
        email,
        name,
        password,
        otp,
        otpExpiry,
      });

      await user.save();

      await sendOtpEmail({
        html: otpEmailContent,
        subject: "【OverTheRoad】Sending the verification code",
        email: email,
      });

      const successResponse = makeApiResponse(
        "Otp has been sent to your email",
        0,
        200
      );
      return res.status(200).json(successResponse);
    } catch (err) {
      const errorResponse = makeApiResponse(
        err?.message || "Internal Server Error",
        1,
        500
      );
      return res.status(500).json(errorResponse);
    }
  },

  verifyOtp: async function (req, res, next) {
    try {
      const { otp, email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        const errorResponse = makeApiResponse("User not found", 1, 404);
        return res.status(404).json(errorResponse);
      }

      if (user.otp !== otp || Date.now() > user.otpExpiry) {
        const errorResponse = makeApiResponse(
          "Invalid OTP or OTP expired",
          1,
          401
        );
        return res.status(401).json(errorResponse);
      }

      user.verified = true;
      user.otp = undefined;
      user.otpExpiry = undefined;

      // Create a new UserInfo document with the user's name, email, and userId
      const userInfo = new UserInfo({
        user: user._id,
        name: user.name,
        email: user.email,
      });
      await userInfo.save();

      const { password: pw, ...restAll } = user._doc;

      const accessToken = await generateAccessToken({ user });

      await user.save();

      const successResponse = makeApiResponse(
        "User verified successfully",
        0,
        200,
        { user: restAll, accessToken }
      );
      return res.status(200).json(successResponse);
    } catch (err) {
      const errorResponse = makeApiResponse(
        err?.message || "Internal Server Error",
        1,
        500
      );
      console.log("error", err.message);
      return res.status(500).json(errorResponse);
    }
  },

  login: async function (req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).exec();

      if (!user) {
        const errorResponse = makeApiResponse("User not found", 1, 404);
        return res.status(404).json(errorResponse);
      }

      if (!user.verified) {
        const errorResponse = makeApiResponse("User is not verified", 1, 401);
        return res.status(401).json(errorResponse);
      }

      const isMatch = await comparePassword(password, user.password);

      if (!isMatch) {
        const errorResponse = makeApiResponse(
          "Invalid email or password",
          1,
          401
        );
        return res.status(401).json(errorResponse);
      }

      const { password: pw, ...restAll } = user._doc;

      const accessToken = await generateAccessToken({ user });

      const successResponse = makeApiResponse("Login successful", 0, 200, {
        user: restAll,
        accessToken,
      });

      return res.status(200).json(successResponse);
    } catch (err) {
      const errorResponse = makeApiResponse(
        err?.message || "Internal Server Error",
        1,
        500
      );
      return res.status(500).json(errorResponse);
    }
  },

  list: async function (req, res, next) {
    try {
      const users = await User.find().exec();
      const successResponse = makeApiResponse(
        "Users fetched successfully",
        0,
        200,
        { users }
      );
      return res.status(200).json(successResponse);
    } catch (err) {
      const errorResponse = makeApiResponse(
        err?.message || "Internal Server Error",
        1,
        500
      );
      return res.status(500).json(errorResponse);
    }
  },

  specificUser: async function (req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findById(id).exec();

      if (!user) {
        const errorResponse = makeApiResponse("User not found", 1, 404);
        return res.status(404).json(errorResponse);
      }

      const { password: pw, ...restAll } = user._doc;

      const successResponse = makeApiResponse(
        "User fetched successfully",
        0,
        200,
        { user: restAll }
      );
      return res.status(200).json(successResponse);
    } catch (err) {
      const errorResponse = makeApiResponse(
        err?.message || "Internal Server Error",
        1,
        500
      );
      return res.status(500).json(errorResponse);
    }
  },

  updateUser: async function (req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findById(id).exec();

      if (!user) {
        const errorResponse = makeApiResponse("User not found", 1, 404);
        return res.status(404).json(errorResponse);
      }

      const { email, name } = req.body;

      user.email = email;
      user.name = name;

      await user.save();

      const { password: pw, ...restAll } = user._doc;

      const successResponse = makeApiResponse(
        "User updated successfully",
        0,
        200,
        { user: restAll }
      );
      return res.status(200).json(successResponse);
    } catch (err) {
      const errorResponse = makeApiResponse(
        err?.message || "Internal Server Error",
        1,
        500
      );
      return res.status(500).json(errorResponse);
    }
  },

  deleteUser: async function (req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id).exec();

      if (!user) {
        const errorResponse = makeApiResponse("User not found", 1, 404);
        return res.status(404).json(errorResponse);
      }

      const successResponse = makeApiResponse(
        "User deleted successfully",
        0,
        200
      );
      return res.status(200).json(successResponse);
    } catch (err) {
      const errorResponse = makeApiResponse(
        err?.message || "Internal Server Error",
        1,
        500
      );
      return res.status(500).json(errorResponse);
    }
  },
};
