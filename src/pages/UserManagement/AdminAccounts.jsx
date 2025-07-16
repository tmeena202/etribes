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
        <div onClick={() => setShowModal(false)} className="fixed inset-0 bg-black/40 flex justify-center items-center z-[2000]">
          <form onClick={e => e.stopPropagation()} onSubmit={handleAddUser} className="w-[95vw] max-w-3xl bg-white p-8 rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-5 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
            <h3 className="md:col-span-2 text-2xl font-bold text-blue-900 m-0">Add New User</h3>
            <button type="button" onClick={() => setShowModal(false)} className="absolute top-4 right-4 bg-transparent border-none text-2xl text-slate-400 hover:text-blue-600 transition-colors"><FiX /></button>
            {['role', 'name', 'contact', 'email', 'password', 'confirmPassword', 'address', 'city', 'district', 'pincode', 'country', 'state'].map((field) => {
              const isFullWidth = field === 'address';
              const label = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
              const isError = formError && !form[field] && field !== 'pincode';
              return (
                <label key={field} className={`${isFullWidth ? 'md:col-span-2' : ''} flex flex-col font-medium text-slate-700 text-base`}>
                  {label}
                  {field === 'role' || field === 'country' || field === 'state' ? (
                    <select name={field} value={form[field]} onChange={handleFormChange} required className={`mt-1 px-3 py-2 rounded-md border ${isError ? 'border-red-400' : 'border-slate-300'} bg-slate-50 text-slate-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition`}>
                      <option value="">Select {label}</option>
                      {field === 'role' && userRoles.map(role => <option key={role}>{role}</option>)}
                      {field === 'country' && <option>India</option>}
                      {field === 'state' && ['Uttar Pradesh', 'Gujarat', 'Delhi'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  ) : field === 'address' ? (
                    <textarea name={field} rows={2} value={form[field]} onChange={handleFormChange} required className={`mt-1 px-3 py-2 rounded-md border ${isError ? 'border-red-400' : 'border-slate-300'} bg-slate-50 text-slate-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition`} />
                  ) : (
                    <input name={field} type={field.toLowerCase().includes('password') ? 'password' : 'text'} value={form[field]} onChange={handleFormChange} required={field !== 'pincode'} className={`mt-1 px-3 py-2 rounded-md border ${isError ? 'border-red-400' : 'border-slate-300'} bg-slate-50 text-slate-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition`} />
                  )}
                </label>
              );
            })}
            <div className="md:col-span-2 flex justify-end gap-4 mt-2">
              <button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-7 py-2 rounded-md font-bold shadow-md transition-all duration-200 hover:bg-green-600 hover:from-green-600 hover:to-green-700 focus:bg-green-600 scale-105">Submit</button>
              <button type="button" onClick={() => setShowModal(false)} className="bg-slate-200 text-slate-800 px-7 py-2 rounded-md font-semibold transition hover:bg-slate-300 hover:text-blue-600">Cancel</button>
            </div>
            {formError && <div className="md:col-span-2 text-red-500 font-semibold mt-1">{formError}</div>}
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
