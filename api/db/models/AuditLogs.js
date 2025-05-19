const mongoose = require("mongoose");
const { version } = require("react");

const schema = mongoose.Schema(
  {
    level: String,
    email: String,
    location: String,
    proc_types: String,
    log: String,
  },
  {
    versionKey: false,
    timestamps: {
      createdat: "created_At",
      updatedAt: "updated_At",
    },
  }
);

class AuditLogs extends mongoose.Model {}

schema.loadClass(AuditLogs);
module.exports = mongoose.model("audit_logs", schema);
