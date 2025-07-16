import React, { useState } from "react";

const roles = [
  "Development",
  "Admin",
  "Editor",
  "Viewer"
];

const modules = [
  "Group Settings",
  "SMTP Settings",
  "User Roles",
  "Role Management",
  "System Accounts",
  "Account Password Change",
  "Message Settings",
  "Membership Plans",
  "Membership Management",
  "Contacts Management",
  "Events Management"
];

const permissions = ["View", "Add", "Edit", "Delete"];

const initialPermissions = () => {
  const perms = {};
  modules.forEach((mod) => {
    perms[mod] = { View: false, Add: false, Edit: false, Delete: false };
  });
  return perms;
};

const RoleManagement = () => {
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [rolePermissions, setRolePermissions] = useState(initialPermissions());

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setRolePermissions(initialPermissions()); // Reset permissions on role change (or load from backend if available)
  };

  const handleCheckboxChange = (module, perm) => {
    setRolePermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [perm]: !prev[module][perm],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send rolePermissions to your backend
    alert(`Permissions for role '${selectedRole}' saved!`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        <span className="text-gray-700">User Management</span> - <span className="text-gray-500">Role Management</span>
      </h1>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold text-orange-500 mb-4">Role Management</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">User Roles</label>
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {roles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Module</th>
                  {permissions.map((perm) => (
                    <th key={perm} className="px-4 py-2 text-center">{perm}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {modules.map((mod) => (
                  <tr key={mod} className="border-t">
                    <td className="px-4 py-2 font-semibold text-gray-700">{mod}</td>
                    {permissions.map((perm) => (
                      <td key={perm} className="px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={rolePermissions[mod][perm]}
                          onChange={() => handleCheckboxChange(mod, perm)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleManagement;
