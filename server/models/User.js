// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, unique: true, required: true },
//     password: { type: String, required: true },

//     isVerified: { type: Boolean, default: false },
//     verifyOtp: String,
//     verifyOtpExpireAt: Date,

//     resetOtp: String,
//     resetOtpExpireAt: Date,
//   },
//   { timestamps: true },
// );

// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },

    profile: { type: String, default: "" },

    // Make password optional (required only for email/password users)
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },

    // Google OAuth field
    googleId: { type: String, sparse: true, unique: true },

    isVerified: { type: Boolean, default: false },
    verifyOtp: String,
    verifyOtpExpireAt: Date,

    resetOtp: String,
    resetOtpExpireAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
