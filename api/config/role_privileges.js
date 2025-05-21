module.exports = {
  privGroups: [
    {
      id: "USERS",
      name: "User permissions",
    },
    {
      id: "ROLES",
      name: "Roles permissions",
    },
    {
      id: "CATEGORİES",
      name: "Categories permissions",
    },
    {
      id: "AUDİTLOGS",
      name: "AuditLogs permissions",
    },
  ],

  privileges: [
    {
      key: "user_view",
      name: "User_view",
      group: "USERS",
      description: "user view",
    },
    {
      key: "user_add",
      name: "User_add",
      group: "USERS",
      description: "user add",
    },
    {
      key: "user_update",
      name: "User_update",
      group: "USERS",
      description: "user update",
    },
    {
      key: "user_delete",
      name: "User_delete",
      group: "USERS",
      description: "user delete",
    },

    {
      key: "role_view",
      name: "Role_view",
      group: "ROLES",
      description: "Role view",
    },
    {
      key: "role_add",
      name: "Role_add",
      group: "Roles",
      description: "role add",
    },
    {
      key: "role_update",
      name: "Role_update",
      group: "ROLES",
      description: "role update",
    },
    {
      key: "role_delete",
      name: "Role_delete",
      group: "ROLES",
      description: "role delete",
    },
    {
      key: "category_view",
      name: "category_view",
      group: "CATEGORİES",
      description: "category view",
    },
    {
      key: "category_add",
      name: "category_add",
      group: "CATEGORİES",
      description: "category add",
    },
    {
      key: "category_update",
      name: "category_update",
      group: "CATEGORİES",
      description: "category update",
    },
    {
      key: "category_delete",
      name: "category_delete",
      group: "CATEGORİES",
      description: "category delete",
    },

    {
      key: "auditlogs_view",
      name: "auditlogs_view",
      group: "AUDİTLOGS",
      description: "auditlogs view",
    },
  ],
};
