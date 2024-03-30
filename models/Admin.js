const { model, Schema } = require("mongoose");

const adminSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
    // Add additional fields specific to admin users if needed
    // For example, permissions, access levels, etc.
  },
  {
    timestamps: true,
  }
);

module.exports = model("Admin", adminSchema);