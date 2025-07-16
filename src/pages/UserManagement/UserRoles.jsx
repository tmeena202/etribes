import React, { useState } from 'react';
import { FiEdit2, FiPlus, FiX, FiTrash2, FiSearch } from 'react-icons/fi';

const initialRoles = [
  { id: 1, role: 'Admin' },
  { id: 2, role: 'Development' },
  { id: 3, role: 'Finance' },
  { id: 4, role: 'HR' },
  { id: 5, role: 'Marketing' },
  { id: 6, role: 'Member' },
];

const UserRoles = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [showModal, setShowModal] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const filteredRoles = roles.filter(r =>
    r.role.toLowerCase().includes(filter.toLowerCase())
  );

  const handleAddRole = (e) => {
    e.preventDefault();
    if (!newRole.trim()) {
      setError('Role name is required.');
      return;
    }
    setRoles([...roles, { id: roles.length + 1, role: newRole }]);
    setNewRole('');
    setShowModal(false);
    setError('');
  };

  const handleDeleteRole = (id) => {
    setRoles(roles.filter(role => role.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="p-6 font-sans min-h-screen bg-[#f9fafb]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-[#1a1a1a]">User Roles</h2>
          <p className="text-sm text-gray-500">Manage the different user roles in your system.</p>
        </div>
        <button
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white px-4 py-2 rounded-md shadow hover:scale-105 transition"
          onClick={() => setShowModal(true)}
        >
          <FiPlus /> Add Role
        </button>
      </div>

      {/* Filter & Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b">
          <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded">
            <FiSearch className="text-emerald-500 mr-2" />
            <input
              type="text"
              placeholder="Search role..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-emerald-100 text-emerald-900 font-semibold">
              <tr>
                <th className="px-4 py-2 w-16">SN</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2 text-center w-32">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-gray-400 py-6">No roles found.</td>
                </tr>
              ) : (
                filteredRoles.map((role, idx) => (
                  <tr
                    key={role.id}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2 font-medium">{role.role}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200 rounded px-2 py-1 text-sm font-semibold mr-2"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="bg-red-100 text-red-600 hover:bg-red-200 rounded px-2 py-1 text-sm font-semibold"
                        title="Delete"
                        onClick={() => setDeleteId(role.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Role Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Add New Role</h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setError('');
                }}
                className="text-gray-400 hover:text-red-500 text-xl"
              >
                <FiX />
              </button>
            </div>
            <form onSubmit={handleAddRole} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Role name"
                value={newRole}
                onChange={(e) => {
                  setNewRole(e.target.value);
                  setError('');
                }}
                className={`border rounded px-3 py-2 text-sm ${
                  error ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setError('');
                  }}
                  className="px-4 py-1.5 text-sm bg-gray-100 border border-gray-200 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-red-500">Delete Role</h3>
              <button
                onClick={() => setDeleteId(null)}
                className="text-gray-400 hover:text-red-500 text-xl"
              >
                <FiX />
              </button>
            </div>
            <p className="text-sm text-gray-700 mb-4">Are you sure you want to delete this role?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-1.5 text-sm bg-gray-100 border border-gray-200 rounded hover:bg-gray-200"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDeleteRole(deleteId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRoles;
