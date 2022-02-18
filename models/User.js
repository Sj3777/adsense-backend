const mongoose = require("mongoose");
// const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      //   required: [true, "Please fill your email"],
      // unique: [true, "Email already exists"],
      lowercase: true,
      //   validate: [validator.isEmail, " Please provide a valid email"],
    },
    address: {
      type: String,
      trim: true,
    },
    dob: { type: String },
    username: {
      type: String,
      unique: [true, "Username already exists"],
      lowercase: true,
    },
    password: {
      type: String,
      //   required: [true, "Please fill your password"],
      minLength: 6,
    },
    profilePicture: { type: String },
    bio: { type: String, trim: true },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
      required: true,
    },
    dob: { type: String },
    phoneNumber: { type: Number },
    token : {type : String},
    // User: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

// encrypt the password using 'bcryptjs'
// Mongoose -> Document Middleware
// adminSchema.pre("save", async function (next) {
//   // check the password if it is modified
//   if (!this.isModified("password")) {
//     return next();
//   }

//   // Hashing the password
//   this.password = await bcrypt.hash(this.password, 12);

//   // Delete passwordConfirm field
//   // this.passwordConfirm = undefined;
//   next();
// });

// // This is Instance Method that is gonna be available on all documents in a certain collection
// adminSchema.methods.correctPassword = async function (
//   typedPassword,
//   originalPassword
// ) {
//   // return typedPassword===originalPassword?true:false
//   return await bcrypt.compare(typedPassword, originalPassword);
// };

const User = mongoose.model("User", userSchema);
module.exports = User;
