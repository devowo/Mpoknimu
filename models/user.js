const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    email: {
      type: String
    },
    username: String,
    password: String
  },
  {
    timestamps: {}
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
module.exports.hashPassword = async password => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new error("Hashing failed", error);
  }
};
module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    throw new error("Comparing failed", error);
  }
};
