const express = require("express");
const router = express.Router();

const Roles = require("../db/models/Roles");
const RolesPrivileges = require("../db/models/RolePrivileges");
const Response = require("../lib/Response");
const CustomError = require("../lib/Error");
const Enum = require("../config/Enum");
const role_privileges = require("../config/role_privileges");

router.get("/", async (req, res) => {
  try {
    let roles = await Roles.find({});
    res.json(Response.successResponse(roles));
  } catch (error) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.post("/add", async (req, res) => {
  let body = req.body;
  try {
    if (!body.role_name) {
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        "VALİDATİON ERROR!",
        "role_name field must be filled"
      );
    }
    if (
      !body.permissions ||
      !Array.isArray(body.permissions) ||
      body.permissions == 0
    ) {
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        "VALİDATİON ERROR!",
        "permissions field must be filled and an array"
      );
    }
    let role = new Roles({
      role_name: body.role_name,
      is_active: true,
      created_by: req.user?.id,
    });
    await role.save();

    for (let i = 0; i < body.permissions.length; i++) {
      let priv = new RolesPrivileges({
        role_id: role._id,
        permissions: body.permissions[i],
        created_by: req.user?.id,
      });

      await priv.save();
    }
    res.json(Response.successResponse({ success: true }));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.post("/update", async (req, res) => {
  let body = req.body;
  try {
    if (!body._id)
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        "VALİDATİON ERROR!",
        "_id field must be filled"
      );
    let updates = {};
    if (body.role_name) updates.role_name = body.role_name;
    if (typeof body.is_active === "boolean") updates.is_active = body.is_active;

    if (
      body.permissions &&
      Array.isArray(body.permissions) &&
      body.permissions.length > 0
    ) {
      let permissions = await RolesPrivileges.find({ role_id: body._id });

      // body.permissions => ["category_view", "user_add"]
      // permissions => [{role_id: "abc", permission: "user_add", _id: "bcd"}];

      let removedPermissions = permissions.filter(
        (x) => !body.permissions.includes(x.permissions)
      );
      let newPermissions = body.permissions.filter(
        (x) => !permissions.map((p) => p.permissions).includes(x)
      );

      if (removedPermissions.length > 0) {
        await RolesPrivileges.deleteOne({
          _id: { $in: removedPermissions.map((x) => x._id) },
        });
      }

      if (newPermissions.length > 0) {
        for (let i = 0; i < newPermissions.length; i++) {
          let priv = new RolesPrivileges({
            role_id: body._id,
            permissions: newPermissions[i],
            created_by: req.user?.id,
          });

          await priv.save();
        }
      }
    }

    await Roles.updateOne({ _id: body._id }, updates);
    res.json(Response.successResponse({ success: true }));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.post("/delete", async (req, res) => {
  let body = req.body;
  try {
    if (!body._id)
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        "VALİDATİON ERROR!",
        "_id field must be filled"
      );

    await Roles.deleteOne({ _id: body._id });
    res.json(Response.successResponse({ success: true }));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.get("/role_privileges", async (req, res) => {
  res.json(role_privileges);
});

module.exports = router;
