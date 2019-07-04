const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    require: true,
    trim: true
  },
  cel: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_At: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  }
};

module.exports = mongoose.model("Users", UserSchema);
