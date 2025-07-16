// AdminAccounts.jsx
import React, { useState } from 'react';
import { FiPlus, FiSearch, FiEye, FiX } from 'react-icons/fi';

const userRoles = ['Admin', 'Development', 'Finance', 'HR', 'Marketing', 'Member'];

const initialUsers = [
  { id: 1, name: 'Rohit Arya', contact: '7017064745', email: 'rohit@30days.in', address: 'Shiv Murti Gandhi Chowk Shamli', city: 'Shamli', district: 'Shamli', state: 'Uttar Pradesh', country: 'India', role: 'Admin' },
  { id: 2, name: 'Parveen', contact: '7017064745', email: 'parveen@30dats.in', address: 'Shiv Murti Gandhi Chowk Shamli', city: 'Shamli', district: 'Shamli', state: 'Uttar Pradesh', country: 'India', role: 'Admin' },
  { id: 3, name: 'Rohit Arya', contact: '7017064745', email: 'arya.rohi13@gmail.com', address: 'Shiv Murti Gandhi Chowk Shamli', city: 'Shamli', district: 'Shamli', state: 'Uttar Pradesh', country: 'India', role: 'Admin' },
  { id: 4, name: 'naman', contact: '9876543220', email: 'namanjain@30days.in', address: 'nangloi', city: 'delhi', district: 'nangloi', state: 'Gujarat', country: 'India', role: 'Member' },
];

const initialForm = {
  role: '', name: '', contact: '', email: '', password: '', confirmPassword: '',
  address: '', city: '', district: '', state: '', country: '', pincode: '',
};

const AdminAccounts = () => {
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('');
  const [showCount, setShowCount] = useState(50);
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState('');

  const filteredUsers = users.filter(u =>
    Object.values(u).some(val => String(val).toLowerCase().includes(filter.toLowerCase()))
  );

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setFormError('');
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!form.role || !form.name || !form.contact || !form.email || !form.password || !form.confirmPassword || !form.address || !form.city || !form.district || !form.state || !form.country) {
      setFormError('All fields except pincode are required.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }
    setUsers([
      ...users,
      { id: users.length + 1, ...form },
    ]);
    setShowModal(false);
    setForm(initialForm);
    setFormError('');
  };

  return (
    <div style={{ padding: 24, background: '#f4f7fe', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h2 style={{ color: '#1e3a8a', fontSize: 28, marginBottom: 4 }}>System Users</h2>
          <p style={{ color: '#64748b', fontSize: 16 }}>Manage and view system user accounts</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            background: '#10b981', color: '#fff', border: 'none', padding: '10px 20px',
            borderRadius: 8, fontWeight: 600, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: '0 2px 6px rgba(16,185,129,0.2)'
          }}
        >
          <FiPlus /> Add User
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{
            background: '#f1f5f9', padding: '6px 12px', borderRadius: 8,
            display: 'flex', alignItems: 'center', gap: 8
          }}>
            <FiSearch style={{ color: '#3b82f6' }} />
            <input
              type="text"
              placeholder="Search user..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 15 }}
            />
          </div>
          <select
            value={showCount}
            onChange={e => setShowCount(Number(e.target.value))}
            style={{ border: '1px solid #e2e8f0', padding: '6px 10px', borderRadius: 6, fontSize: 14 }}
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#e0f2fe', color: '#0f172a', fontWeight: 600 }}>
              {['SN', 'Role', 'Name', 'Contact', 'Email', 'Address', 'City', 'District', 'State', 'Country', 'Action'].map(h => (
                <th key={h} style={{ padding: '10px 8px', borderBottom: '1px solid #cbd5e1' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr><td colSpan={11} style={{ textAlign: 'center', padding: 24, color: '#64748b' }}>No users found.</td></tr>
            ) : (
              filteredUsers.slice(0, showCount).map((user, idx) => (
                <tr key={user.id} style={{ background: idx % 2 ? '#f9fafb' : '#fff' }}>
                  <td style={{ padding: 10 }}>{idx + 1}</td>
                  <td>{user.role}</td>
                  <td>{user.name}</td>
                  <td>{user.contact}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.city}</td>
                  <td>{user.district}</td>
                  <td>{user.state}</td>
                  <td>{user.country}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button style={{ background: '#e0f7ec', border: 'none', color: '#059669', padding: 6, borderRadius: 6 }}>
                      <FiEye />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div onClick={() => setShowModal(false)} style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.35)', display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 2000
        }}>
          <form onClick={e => e.stopPropagation()} onSubmit={handleAddUser} style={{
            width: '90%', maxWidth: 880, background: '#fff', padding: 32,
            borderRadius: 12, boxShadow: '0 6px 32px rgba(0,0,0,0.15)', display: 'grid',
            gridTemplateColumns: '1fr 1fr', gap: 20, position: 'relative'
          }}>
            <h3 style={{ gridColumn: '1/3', color: '#1e3a8a', margin: 0 }}>Add New User</h3>

            <button type="button" onClick={() => setShowModal(false)} style={{
              position: 'absolute', top: 16, right: 16, background: 'transparent',
              border: 'none', fontSize: 20, color: '#64748b'
            }}><FiX /></button>

            {['role', 'name', 'contact', 'email', 'password', 'confirmPassword', 'address', 'city', 'district', 'pincode', 'country', 'state'].map((field, idx) => {
              const isFullWidth = field === 'address';
              const label = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
              return (
                <label key={field} style={{ gridColumn: isFullWidth ? '1/3' : 'auto' }}>
                  {label}
                  {field === 'role' || field === 'country' || field === 'state' ? (
                    <select name={field} value={form[field]} onChange={handleFormChange} required style={inputStyle(formError && !form[field])}>
                      <option value="">Select {label}</option>
                      {field === 'role' && userRoles.map(role => <option key={role}>{role}</option>)}
                      {field === 'country' && <option>India</option>}
                      {field === 'state' && ['Uttar Pradesh', 'Gujarat', 'Delhi'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  ) : field === 'address' ? (
                    <textarea name={field} rows={2} value={form[field]} onChange={handleFormChange} required style={inputStyle(formError && !form[field])} />
                  ) : (
                    <input name={field} type={field.toLowerCase().includes('password') ? 'password' : 'text'} value={form[field]} onChange={handleFormChange} required={field !== 'pincode'} style={inputStyle(formError && !form[field] && field !== 'pincode')} />
                  )}
                </label>
              );
            })}
            <div style={{ gridColumn: '1/3', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button type="submit" style={{ background: '#2563eb', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: 6 }}>Submit</button>
              <button type="button" onClick={() => setShowModal(false)} style={{ background: '#e2e8f0', color: '#1e293b', padding: '10px 20px', border: 'none', borderRadius: 6 }}>Cancel</button>
            </div>
            {formError && <div style={{ gridColumn: '1/3', color: '#ef4444', fontWeight: 500 }}>{formError}</div>}
          </form>
        </div>
      )}
    </div>
  );
};

const inputStyle = (isError) => ({
  width: '100%',
  marginTop: 6,
  padding: '10px 12px',
  fontSize: 15,
  borderRadius: 6,
  border: isError ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
  background: '#f9fafb',
  color: '#1e293b'
});

export default AdminAccounts;
