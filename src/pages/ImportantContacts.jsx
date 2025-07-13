import React, { useState, useEffect } from "react";
import "../components/Dashboard/ImportantContacts.css";

const mockFetchContacts = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 1, department: "HR", name: "Riya", contact: "7056321321", email: "riya@30days.in", address: "Rohtak" },
        { id: 2, department: "CEO", name: "Rohit Arya", contact: "9548830505", email: "rohit@30days.in", address: "Omaxe City" },
        { id: 3, department: "Managing Director", name: "Parveen Mittal", contact: "9355321321", email: "mittal@30days.in", address: "Omaxe City" },
        { id: 4, department: "HR", name: "Deepak", contact: "9817672386", email: "deepak@30days.in", address: "bahadurgarh" },
        { id: 5, department: "Trainee", name: "Charu", contact: "9991021321", email: "charu@30days.in", address: "Sampla" },
        { id: 6, department: "Sales", name: "Shiv", contact: "7988862840", email: "shiv@30days.in", address: "Delhi" },
        { id: 7, department: "Development", name: "Naman", contact: "7428424525", email: "naman@30days.in", address: "Nangloi" },
      ]);
    }, 1000);
  });

const initialForm = {
  department: "",
  name: "",
  contact: "",
  email: "",
  address: ""
};

function ImportantContacts() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    mockFetchContacts()
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load contacts.");
        setLoading(false);
      });
  }, []);

  const filteredContacts = contacts.filter(
    (c) =>
      c.department.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.contact.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddContact = (e) => {
    e.preventDefault();
    // Simple validation
    if (!form.department || !form.name || !form.contact || !form.email || !form.address) {
      setFormError("All fields are required.");
      return;
    }
    // Add new contact
    setContacts([
      ...contacts,
      {
        id: contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 1,
        ...form
      }
    ]);
    setShowAddModal(false);
    setForm(initialForm);
    setFormError("");
  };

  return (
    <div className="important-contacts-container">
      <h2>Contact List</h2>
      <div className="important-contacts-card">
        <div className="important-contacts-header">
          <span className="important-contacts-title">Contact List</span>
          <button className="important-contacts-add-btn" onClick={() => setShowAddModal(true)}>+ Add Contact</button>
        </div>
        <div className="important-contacts-toolbar">
          <input
            type="text"
            placeholder="Type to filter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="important-contacts-search"
          />
          <div className="important-contacts-export-btns">
            <button>Copy</button>
            <button>Excel</button>
            <button>CSV</button>
            <button>PDF</button>
          </div>
        </div>
        {loading ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>Loading contacts...</div>
        ) : error ? (
          <div style={{ color: "#e74c3c", textAlign: "center", padding: "32px 0" }}>{error}</div>
        ) : (
          <table className="important-contacts-table">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Department</th>
                <th>Contact Person Name</th>
                <th>Contact No</th>
                <th>Email Id</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((c, idx) => (
                <tr key={c.id}>
                  <td>{idx + 1}</td>
                  <td>{c.department}</td>
                  <td>{c.name}</td>
                  <td>{c.contact}</td>
                  <td>{c.email}</td>
                  <td>{c.address}</td>
                  <td>
                    <button className="important-contacts-edit-btn">✏️</button>
                    <button className="important-contacts-delete-btn">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="important-contacts-footer">
          Showing {filteredContacts.length} of {contacts.length} entries
        </div>
      </div>
      {showAddModal && (
        <div className="add-contact-modal-bg">
          <div className="add-contact-modal">
            <div className="add-contact-header">
              <h3>Add New Contact</h3>
              <button className="close-btn" onClick={() => { setShowAddModal(false); setFormError(""); }}>&times;</button>
            </div>
            <form className="add-contact-form" onSubmit={handleAddContact}>
              <label>
                Department
                <input type="text" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
              </label>
              <label>
                Contact Person Name
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </label>
              <label>
                Contact No
                <input type="text" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
              </label>
              <label>
                Email Id
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </label>
              <label>
                Address
                <input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
              </label>
              {formError && <div style={{ color: "#e74c3c", marginBottom: 8 }}>{formError}</div>}
              <button type="submit" className="btn-primary">Add Contact</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImportantContacts; 