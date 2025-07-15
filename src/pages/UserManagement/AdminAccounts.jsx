import React, { useState } from 'react';
import { FiPlus, FiSearch, FiEye, FiX } from 'react-icons/fi';
import '../../components/Dashboard/ImportantContacts.css';

const userRoles = [
  'Admin',
  'Development',
  'Finance',
  'HR',
  'Marketing',
  'Member',
];

const initialUsers = [
  { id: 1, name: 'Rohit Arya', contact: '7017064745', email: 'rohit@30days.in', address: 'Shiv Murti Gandhi Chowk Shamli', city: 'Shamli', district: 'Shamli', state: 'Uttar Pradesh', country: 'India', role: 'Admin' },
  { id: 2, name: 'Parveen', contact: '7017064745', email: 'parveen@30dats.in', address: 'Shiv Murti Gandhi Chowk Shamli', city: 'Shamli', district: 'Shamli', state: 'Uttar Pradesh', country: 'India', role: 'Admin' },
  { id: 3, name: 'Rohit Arya', contact: '7017064745', email: 'arya.rohi13@gmail.com', address: 'Shiv Murti Gandhi Chowk Shamli', city: 'Shamli', district: 'Shamli', state: 'Uttar Pradesh', country: 'India', role: 'Admin' },
  { id: 4, name: 'naman', contact: '9876543220', email: 'namanjain@30days.in', address: 'nangloi', city: 'delhi', district: 'nangloi', state: 'Gujarat', country: 'India', role: 'Member' },
];

const initialForm = {
  role: '',
  name: '',
  contact: '',
  email: '',
  password: '',
  confirmPassword: '',
  address: '',
  city: '',
  district: '',
  state: '',
  country: '',
  pincode: '',
};

const AdminAccounts = () => {
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('');
  const [showCount, setShowCount] = useState(100);
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
    // Validation
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
      {
        id: users.length + 1,
        name: form.name,
        contact: form.contact,
        email: form.email,
        address: form.address,
        city: form.city,
        district: form.district,
        state: form.state,
        country: form.country,
        role: form.role,
        pincode: form.pincode,
      },
    ]);
    setShowModal(false);
    setForm(initialForm);
    setFormError('');
  };

  return (
    <div className="contacts-container" style={{ padding: 32, maxWidth: 1200, margin: '0 auto' }}>
      <div className="contacts-header-row" style={{ marginBottom: 8 }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: '#1a4d3a' }}>System Users</h2>
          <div style={{ color: '#64748b', fontSize: 16, marginTop: 4 }}>Manage system users. Add, filter, and view user details.</div>
        </div>
        <button className="add-contact-btn" style={{ background: '#2563eb', color: '#fff', fontWeight: 600 }} onClick={() => setShowModal(true)}>
          <FiPlus className="add-icon" /> Add System User
        </button>
      </div>
      <div className="contacts-table-card" style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(37,99,235,0.07)' }}>
        <div className="contacts-table-toolbar" style={{ marginBottom: 18 }}>
          <div className="contacts-filter" style={{ flex: 1 }}>
            <FiSearch style={{ color: '#64748b', fontSize: 18, marginRight: 8 }} />
            <input
              type="text"
              placeholder="Type to filter..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              style={{ minWidth: 220 }}
            />
          </div>
          <div className="contacts-export-group">
            <label>Show:</label>
            <select value={showCount} onChange={e => setShowCount(Number(e.target.value))}>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <button className="export-btn">Copy</button>
            <button className="export-btn">Excel</button>
            <button className="export-btn">CSV</button>
            <button className="export-btn">PDF</button>
          </div>
        </div>
        <div className="contacts-table-wrapper">
          <table className="contacts-table" style={{ borderRadius: 12, overflow: 'hidden' }}>
            <thead>
              <tr>
                <th>SN</th>
                <th>User Role</th>
                <th>Name</th>
                <th>Contact No.</th>
                <th>Email Address</th>
                <th>Address</th>
                <th>City</th>
                <th>District</th>
                <th>State</th>
                <th>Country</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={11} style={{ textAlign: 'center', color: '#64748b', padding: 32, fontSize: 18 }}>
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.slice(0, showCount).map((user, idx) => (
                  <tr key={user.id} style={{ background: idx % 2 === 1 ? '#f8fafc' : '#fff', transition: 'background 0.2s' }}>
                    <td>{idx + 1}</td>
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
                      <button className="action-btn edit" title="View" style={{ background: '#e0e7ef', color: '#2563eb', borderRadius: 6, fontSize: 18, padding: 6 }}>
                        <FiEye />
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
        <div className="add-contact-modal-bg" style={{ zIndex: 3000 }} onClick={() => { setShowModal(false); setFormError(''); setForm(initialForm); }}>
          <div className="add-contact-modal" style={{ minWidth: 340, maxWidth: 700, borderRadius: 16, boxShadow: '0 8px 32px rgba(37,99,235,0.13)', padding: 0, overflowY: 'auto', maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
            <div className="add-contact-header" style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '24px 32px 12px 32px', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#1a4d3a', margin: 0 }}>Add System User</h3>
                <div style={{ color: '#64748b', fontSize: 15, marginTop: 2 }}>Fill in the details to add a new system user.</div>
              </div>
              <button className="close-btn" style={{ top: 18, right: 18 }} onClick={() => { setShowModal(false); setFormError(''); setForm(initialForm); }}><FiX /></button>
            </div>
            <form className="add-contact-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, padding: 32, background: '#fff', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }} onSubmit={handleAddUser}>
              <label style={{ fontWeight: 500, color: '#334155' }}>User Role
                <select name="role" value={form.role} onChange={handleFormChange} required style={{ padding: '10px 12px', borderRadius: 6, border: formError && !form.role ? '1.5px solid #ef4444' : '1px solid #e2e8f0', fontSize: 16, background: '#f8fafc', color: '#1e293b', marginTop: 6 }}>
                  <option value="">Select Role</option>
                  {userRoles.map(role => <option key={role} value={role}>{role}</option>)}
                </select>
              </label>
              <label style={{ fontWeight: 500, color: '#334155' }}>Name
                <input name="name" type="text" value={form.name} onChange={handleFormChange} required style={{ padding: '10px 12px', borderRadius: 6, border: formError && !form.name ? '1.5px solid #ef4444' : '1px solid #e2e8f0', fontSize: 16, background: '#f8fafc', color: '#1e293b', marginTop: 6 }} />
              </label>
              <label style={{ fontWeight: 500, color: '#334155' }}>Contact No.
                <input name="contact" type="text" value={form.contact} onChange={handleFormChange} required style={{ padding: '10px 12px', borderRadius: 6, border: formError && !form.contact ? '1.5px solid #ef4444' : '1px solid #e2e8f0', fontSize: 16, background: '#f8fafc', color: '#1e293b', marginTop: 6 }} />
              </label>
              <label style={{ fontWeight: 500, color: '#334155' }}>Email
                <input name="email" type="email" value={form.email} onChange={handleFormChange} required style={{ padding: '10px 12px', borderRadius: 6, border: formError && !form.email ? '1.5px solid #ef4444' : '1px solid #e2e8f0', fontSize: 16, background: '#f8fafc', color: '#1e293b', marginTop: 6 }} />
              </label>
              <label style={{ fontWeight: 500, color: '#334155' }}>Password
                <input name="password" type="password" value={form.password} onChange={handleFormChange} required style={{ padding: '10px 12px', borderRadius: 6, border: formError && !form.password ? '1.5px solid #ef4444' : '1px solid #e2e8f0', fontSize: 16, background: '#f8fafc', color: '#1e293b', marginTop: 6 }} />
              </label>
              <label style={{ fontWeight: 500, color: '#334155' }}>Confirm Password
                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleFormChange} required style={{ padding: '10px 12px', borderRadius: 6, border: formError && !form.confirmPassword ? '1.5px solid #ef4444' : '1px solid #e2e8f0', fontSize: 16, background: '#f8fafc', color: '#1e293b', marginTop: 6 }} />
              </label>
              <label style={{ fontWeight: 500, color: '#334155', gridColumn: '1/3' }}>Address
                <textarea name="address" rows={2} value={form.address} onChange={handleFormChange} required style={{ padding: '10px 12px', borderRadius: 6, border: formError && !form.address ? '1.5px solid #ef4444' : '1px solid #e2e8f0', fontSize: 16, background: '#f8fafc', color: '#1e293b', marginTop: 6, resize: 'vertical' }} />
              </label>
              <label style={{ fontWeight: 500, color: '#334155' }}>City
                <input name="city" type="text" value={form.city} onChange={handleFormChange} required style={{ padding: '10px 12px', borderRadius: 6, border: formError && !form.city ? '1.5px solid #ef4444' : '1px solid #e2e8f0', fontSize: 16, background: '#f8fafc', color: '#1e293b', marginTop: 6 }} />
              </label>
              <label style={{ fontWeight: 500, color: '#334155' }}>District
                <input name="district" type="text" value={form.district} onChange={handleFormChange} required style={{ padding: '10px 12px', borderRadius: 6, border: formError && !form.district ? '1.5px solid #ef4444' : '1px solid #e2e8f0', fontSize: 16, background: '#f8fafc', color: '#1e293b', marginTop: 6 }} />
              </label>
              <label style={{ fontWeight: 500, color: '#334155' }}>Pincode
                <input name="pincode" type="text" value={form.pincode} onChange={handleFormChange} style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 16, background: '#f8fafc', color: '#1e293b', marginTop: 6 }} />
              </label>
              <label style={{ fontWeight: 500, color: '#334155' }}>Country
                <select name="country" value={form.country} onChange={handleFormChange} required style={{ padding: '10px 12px', borderRadius: 6, border: formError && !form.country ? '1.5px solid #ef4444' : '1px solid #e2e8f0', fontSize: 16, background: '#f8fafc', color: '#1e293b', marginTop: 6 }}>
                  <option value="">Select Country</option>
                  <option>India</option>
                </select>
              </label>
              <label style={{ fontWeight: 500, color: '#334155' }}>State
                <select name="state" value={form.state} onChange={handleFormChange} required style={{ padding: '10px 12px', borderRadius: 6, border: formError && !form.state ? '1.5px solid #ef4444' : '1px solid #e2e8f0', fontSize: 16, background: '#f8fafc', color: '#1e293b', marginTop: 6 }}>
                  <option value="">Select State</option>
                  <option>Uttar Pradesh</option>
                  <option>Gujarat</option>
                  <option>Delhi</option>
                </select>
              </label>
              <div style={{ gridColumn: '1/3', display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
                <button className="btn-primary" type="submit" style={{ background: '#2563eb', minWidth: 100, fontSize: 17, padding: '10px 0' }}>Submit</button>
                <button className="btn-secondary" type="button" style={{ background: '#f1f5f9', color: '#2563eb', border: '1px solid #e2e8f0', fontSize: 17, padding: '10px 0' }} onClick={() => { setShowModal(false); setFormError(''); setForm(initialForm); }}>Cancel</button>
              </div>
              {formError && <div style={{ gridColumn: '1/3', color: '#ef4444', fontSize: 15, marginTop: -10 }}>{formError}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAccounts; 