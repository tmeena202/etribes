import React, { useState } from 'react';
import { FiEdit2, FiPlus, FiX, FiTrash2, FiSearch } from 'react-icons/fi';
import '../../components/Dashboard/ImportantContacts.css';

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

  const filteredRoles = roles.filter(r => r.role.toLowerCase().includes(filter.toLowerCase()));

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
    <div className="contacts-container" style={{ padding: 40, maxWidth: 900, margin: '0 auto', fontFamily: 'Inter, Segoe UI, Arial, sans-serif', background: '#f6f8fa', minHeight: '100vh' }}>
      <div className="contacts-header-row" style={{ marginBottom: 18, alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, margin: 0, color: '#1a4d3a', letterSpacing: 0.5 }}>User Roles</h2>
          <div style={{ color: '#7bb86f', fontSize: 18, marginTop: 6, fontWeight: 500 }}>Manage user roles for your organization. Add, filter, edit, or delete roles as needed.</div>
        </div>
        <button className="add-contact-btn" style={{ background: 'linear-gradient(90deg, #7bb86f 0%, #43c97f 100%)', color: '#fff', fontWeight: 700, fontSize: 17, boxShadow: '0 2px 8px rgba(67,201,127,0.10)', border: 'none', padding: '12px 28px', borderRadius: 10 }} onClick={() => setShowModal(true)}>
          <FiPlus className="add-icon" /> Add Role
        </button>
      </div>
      <div className="contacts-table-card" style={{ borderRadius: 18, boxShadow: '0 6px 32px rgba(67,201,127,0.08)', background: '#fff', padding: 0, overflow: 'hidden' }}>
        <div className="contacts-table-toolbar" style={{ marginBottom: 0, padding: '24px 32px 0 32px', display: 'flex', alignItems: 'center', gap: 18 }}>
          <div className="contacts-filter" style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#f6f8fa', borderRadius: 8, padding: '8px 16px', border: '1.5px solid #e2e8f0' }}>
            <FiSearch style={{ color: '#7bb86f', fontSize: 20, marginRight: 10 }} />
            <input
              type="text"
              placeholder="Type to filter..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              style={{ minWidth: 220, border: 'none', outline: 'none', background: 'transparent', fontSize: 17, color: '#1a4d3a' }}
            />
          </div>
          <div className="contacts-export-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <label style={{ color: '#64748b', fontWeight: 500 }}>Show:</label>
            <select style={{ borderRadius: 6, border: '1px solid #e2e8f0', padding: '6px 12px', fontSize: 16, background: '#f8fafc', color: '#1a4d3a' }}>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <button className="export-btn" style={{ background: '#f6f8fa', color: '#7bb86f', border: '1px solid #e2e8f0', borderRadius: 6, fontWeight: 600 }}>Copy</button>
            <button className="export-btn" style={{ background: '#f6f8fa', color: '#7bb86f', border: '1px solid #e2e8f0', borderRadius: 6, fontWeight: 600 }}>Excel</button>
            <button className="export-btn" style={{ background: '#f6f8fa', color: '#7bb86f', border: '1px solid #e2e8f0', borderRadius: 6, fontWeight: 600 }}>CSV</button>
            <button className="export-btn" style={{ background: '#f6f8fa', color: '#7bb86f', border: '1px solid #e2e8f0', borderRadius: 6, fontWeight: 600 }}>PDF</button>
          </div>
        </div>
        <div className="contacts-table-wrapper" style={{ padding: '0 32px 32px 32px' }}>
          <table className="contacts-table" style={{ borderRadius: 14, overflow: 'hidden', fontSize: 16, marginTop: 24 }}>
            <thead>
              <tr style={{ background: '#f6f8fa', color: '#1a4d3a', fontWeight: 700, fontSize: 17 }}>
                <th style={{ width: 60 }}>SN</th>
                <th>Role</th>
                <th style={{ textAlign: 'center', width: 140 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', color: '#64748b', padding: 32, fontSize: 18 }}>
                    No roles found.
                  </td>
                </tr>
              ) : (
                filteredRoles.map((role, idx) => (
                  <tr key={role.id} style={{ background: idx % 2 === 1 ? '#f8fafc' : '#fff', transition: 'background 0.2s', borderBottom: '1.5px solid #f1f5f9' }}>
                    <td>{idx + 1}</td>
                    <td style={{ fontWeight: 500 }}>{role.role}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button className="action-btn edit" title="Edit" style={{ background: '#e8f7ef', color: '#43c97f', borderRadius: 8, fontSize: 18, padding: 8, border: 'none', marginRight: 8, boxShadow: '0 1px 4px rgba(67,201,127,0.07)' }}>
                        <FiEdit2 />
                      </button>
                      <button className="action-btn delete" title="Delete" style={{ background: '#fef2f2', color: '#ef4444', borderRadius: 8, fontSize: 18, padding: 8, border: 'none', boxShadow: '0 1px 4px rgba(239,68,68,0.07)' }} onClick={() => setDeleteId(role.id)}>
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
      {showModal && (
        <div className="add-contact-modal-bg" style={{ zIndex: 3000 }} onClick={() => { setShowModal(false); setError(''); }}>
          <div className="add-contact-modal" style={{ minWidth: 340, maxWidth: 400, borderRadius: 14, boxShadow: '0 8px 32px rgba(37,99,235,0.13)' }} onClick={e => e.stopPropagation()}>
            <div className="add-contact-header">
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1a4d3a' }}>Add New Role</h3>
              <button className="close-btn" onClick={() => { setShowModal(false); setError(''); }}><FiX /></button>
            </div>
            <form className="add-contact-form" onSubmit={handleAddRole}>
              <label style={{ fontWeight: 500, color: '#334155' }}>
                Name
                <input
                  type="text"
                  value={newRole}
                  onChange={e => { setNewRole(e.target.value); setError(''); }}
                  required
                  autoFocus
                  style={{ borderColor: error ? '#ef4444' : undefined }}
                />
              </label>
              {error && <div style={{ color: '#ef4444', fontSize: 14, marginTop: -10, marginBottom: 8 }}>{error}</div>}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button className="btn-primary" type="submit" style={{ background: '#2563eb', minWidth: 100 }}>Submit</button>
                <button className="btn-secondary" type="button" style={{ background: '#f1f5f9', color: '#2563eb', border: '1px solid #e2e8f0' }} onClick={() => { setShowModal(false); setError(''); }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteId !== null && (
        <div className="add-contact-modal-bg" style={{ zIndex: 3100 }} onClick={() => setDeleteId(null)}>
          <div className="add-contact-modal" style={{ minWidth: 320, maxWidth: 380, borderRadius: 14, boxShadow: '0 8px 32px rgba(239,68,68,0.13)' }} onClick={e => e.stopPropagation()}>
            <div className="add-contact-header">
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#ef4444' }}>Delete Role</h3>
              <button className="close-btn" onClick={() => setDeleteId(null)}><FiX /></button>
            </div>
            <div style={{ fontSize: 16, color: '#334155', marginBottom: 18 }}>Are you sure you want to delete this role?</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button className="btn-secondary" type="button" style={{ background: '#f1f5f9', color: '#2563eb', border: '1px solid #e2e8f0' }} onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-primary" type="button" style={{ background: '#ef4444', minWidth: 100 }} onClick={() => handleDeleteRole(deleteId)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRoles; 