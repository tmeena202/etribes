import React, { useState } from "react";
import AddEventForm from "../../components/Dashboard/AddEventForm";
import styles from "./AllEvent.module.css";
import { FaCalendarAlt, FaPlus, FaInfoCircle, FaEye } from "react-icons/fa";

const AllEvent = () => {
  // Hardcoded sample events for demonstration
  const [events, setEvents] = useState([
    {
      id: 1,
      event: "Office Anniversary",
      agenda: "Celebration for 7 years completeletion.",
      venue: "Raddision Delhi",
      datetime: "2023-08-23T11:00"
    },
    {
      id: 2,
      event: "Plantation",
      agenda: "Enviornment Preservation",
      venue: "Office Ground Floor",
      datetime: "2023-08-25T10:00"
    },
    {
      id: 3,
      event: "testing",
      agenda: "This is a test event",
      venue: "online",
      datetime: "2023-08-26T16:00"
    },
    {
      id: 4,
      event: "Test Event",
      agenda: "This is a test event",
      venue: "Online",
      datetime: "2023-08-26T16:00"
    },
    {
      id: 5,
      event: "Award Distribution Ceremony",
      agenda: "Congratulate and appreciate our employees for their hardwork and dedication and successful completion of defined tasks",
      venue: "Office 2nd Floor",
      datetime: "2023-08-31T14:00"
    },
    {
      id: 6,
      event: "Diwali Celebration",
      agenda: "Celebrate the festival of victory and welcoming blessings in life",
      venue: "Office 1st Floor",
      datetime: "2023-11-09T13:00"
    },
    {
      id: 7,
      event: "Tushar's birthday",
      agenda: "Tushar's birthday",
      venue: "30 days",
      datetime: "2025-11-05T14:35"
    }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    event: "",
    agenda: "",
    venue: "",
    datetime: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    setEvents([
      ...events,
      { ...form, id: events.length + 1 }
    ]);
    setForm({ event: "", agenda: "", venue: "", datetime: "" });
    setShowModal(false);
  };

  return (
    <main className={styles.mainContent}>
      <section className={styles.container}>
        <header className={styles.headerRow}>
          <h2 className={styles.title}>
            <FaCalendarAlt style={{ color: "#2563eb" }} />
            All Events
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className={styles.addBtn}
          >
            <FaPlus /> Add Event
          </button>
        </header>
        <div className={styles.infoText}>
          <FaInfoCircle style={{ fontSize: "1.2em" }} />
          Here you can view, add, and manage all events—past, present, and future. Stay organized and keep track of everything in one place!
        </div>
        <section className={styles.card}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Sr No.</th>
                <th className={styles.th}>Event</th>
                <th className={styles.th}>Agenda</th>
                <th className={styles.th}>Venue</th>
                <th className={styles.th}>Date & Time</th>
                <th className={styles.th}>View</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan="6" className={styles.emptyRow}>No data available in table</td>
                </tr>
              ) : (
                events.map((ev, idx) => (
                  <tr key={ev.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td className={styles.td}>{idx + 1}</td>
                    <td className={styles.td}>{ev.event}</td>
                    <td className={styles.td}>{ev.agenda}</td>
                    <td className={styles.td}>{ev.venue}</td>
                    <td className={styles.td}>{ev.datetime && new Date(ev.datetime).toLocaleString()}</td>
                    <td className={styles.td}>
                      <button className={styles.viewBtn}><FaEye /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </section>
      <AddEventForm
        open={showModal}
        form={form}
        onChange={handleChange}
        onSubmit={handleAddEvent}
        onClose={() => setShowModal(false)}
      />
    </main>
  );
};

export default AllEvent; 