import React, { useState } from "react";
import AddEventForm from "../../components/Dashboard/AddEventForm";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-white py-6 px-2 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h2 className="flex items-center text-2xl font-bold text-emerald-700 gap-2">
            <FaCalendarAlt className="text-blue-600 text-2xl" />
            Upcoming Events
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white font-semibold px-4 py-2 rounded-md shadow hover:scale-105 transition"
          >
            <FaPlus /> Add Event
          </button>
        </div>
        <div className="flex items-center bg-blue-50 text-blue-700 rounded-lg px-4 py-2 mb-4 shadow-sm text-sm">
          <FaInfoCircle className="mr-2 text-lg" />
          Here you can view, add, and manage all upcoming events. Plan ahead and never miss an important date!
        </div>
        <div className="bg-white rounded-xl shadow p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-emerald-100 text-emerald-900 font-semibold">
              <tr>
                <th className="px-4 py-2">Sr No.</th>
                <th className="px-4 py-2">Event</th>
                <th className="px-4 py-2">Agenda</th>
                <th className="px-4 py-2">Venue</th>
                <th className="px-4 py-2">Date & Time</th>
                <th className="px-4 py-2">View</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-gray-400 py-6">No data available in table</td>
                </tr>
              ) : (
                events.map((ev, idx) => (
                  <tr key={ev.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 text-center">{idx + 1}</td>
                    <td className="px-4 py-2">{ev.event}</td>
                    <td className="px-4 py-2">{ev.agenda}</td>
                    <td className="px-4 py-2">{ev.venue}</td>
                    <td className="px-4 py-2">{ev.datetime && new Date(ev.datetime).toLocaleString()}</td>
                    <td className="px-4 py-2 text-center">
                      <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition text-xs font-semibold"><FaEye /></button>
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