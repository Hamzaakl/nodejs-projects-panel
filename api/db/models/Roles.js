const mongoose = require("mongoose");
const RolesPrivileges = require("./RolePrivileges");

const schema = mongoose.Schema(
  {
    role_name: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    created_by: {
      type: mongoose.SchemaTypes.ObjectId,
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdat: "created_At",
      updatedAt: "updated_At",
    },
  }
);

class Roles extends mongoose.Model {
  static async deleteOne(query) {
    if (query._id) {
      await RolesPrivileges.deleteMany({ role_id: query._id });
    }

    await super.deleteOne(query);
  }
}

schema.loadClass(Roles);
module.exports = mongoose.model("roles", schema);
