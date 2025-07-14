import React, { useState } from "react";
import AddEventForm from "../../components/Dashboard/AddEventForm";
import styles from "./UpcomingEvent.module.css";
import { FaCalendarAlt, FaPlus, FaInfoCircle, FaEye } from "react-icons/fa";

const UpcomingEvent = () => {
  // Hardcoded sample event for demonstration
  const [events, setEvents] = useState([
    {
      id: 1,
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
    <div className={styles.mainContent}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>
            <FaCalendarAlt style={{ color: "#2563eb" }} />
            Upcoming Events
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className={styles.addBtn}
          >
            <FaPlus /> Add Event
          </button>
        </div>
        <div className={styles.infoText}>
          <FaInfoCircle style={{ fontSize: "1.2em" }} />
          Here you can view, add, and manage all upcoming events. Plan ahead and never miss an important date!
        </div>
        <div className={styles.card}>
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
        </div>
      </div>
      <AddEventForm
        open={showModal}
        form={form}
        onChange={handleChange}
        onSubmit={handleAddEvent}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default UpcomingEvent; 