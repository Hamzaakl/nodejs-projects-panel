const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    first_name: String,
    last_name: String,
    phone_number: String,
  },
  {
    timestamps: {
      createdat: "created_At",
      updatedAt: "updated_At",
    },
  }
);

class Users extends mongoose.Model {}

schema.loadClass(Users);
module.exports = mongoose.model("users", schema);
