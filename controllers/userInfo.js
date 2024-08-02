const UserInfo = require("../models/userInfo");
const User = require("../models/user");
const makeApiResponse = require("../lib/response");

module.exports = {
  getUserInfo: async (req, res) => {
    try {
      const userId = req.user._id;
      const userInfo = await UserInfo.findOne({ user: userId });

      if (!userInfo) {
        return res
          .status(404)
          .json(makeApiResponse("User information not found", 1, 404));
      }

      return res.status(200).json(
        makeApiResponse("User information retrieved successfully", 0, 200, {
          userInfo,
        })
      );
    } catch (err) {
      return res
        .status(500)
        .json(makeApiResponse(err.message || "Internal Server Error", 1, 500));
    }
  },

  createOrUpdateUserInfo: async (req, res) => {
    try {
      const userId = req.user._id;
      const { name, email, address, phone, mc, dot, support } = req.body;

      // Update the user's name and email in the 'user' collection
      await User.findByIdAndUpdate(userId, { name, email }, { new: true });

      let userInfo = await UserInfo.findOne({ user: userId });

      if (!userInfo) {
        userInfo = new UserInfo({
          user: userId,
          name,
          email,
          address,
          phone,
          mc,
          dot,
          support,
        });
      } else {
        userInfo.name = name;
        userInfo.email = email;
        userInfo.address = address;
        userInfo.phone = phone;
        userInfo.mc = mc;
        userInfo.dot = dot;
        userInfo.support = support;
      }

      await userInfo.save();

      return res.status(200).json(
        makeApiResponse("User information updated successfully", 0, 200, {
          userInfo,
        })
      );
    } catch (err) {
      return res
        .status(500)
        .json(makeApiResponse(err.message || "Internal Server Error", 1, 500));
    }
  },
};
