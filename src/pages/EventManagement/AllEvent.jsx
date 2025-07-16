import React, { useState } from "react";
import AddEventForm from "../../components/Dashboard/AddEventForm";
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
    <main className="relative flex justify-center py-5 px-2 font-sans bg-gradient-to-tr from-sky-100 via-emerald-50 to-blue-100 overflow-hidden ml-0 min-h-screen">
      {/* Decorative background blur */}
      <div className="pointer-events-none absolute top-[-60px] right-[-60px] w-[200px] h-[200px] bg-[radial-gradient(circle_at_60%_40%,#2563eb33_0%,#16a34a22_80%,transparent_100%)] blur-[30px] z-0" />
      <section className="w-full max-w-3xl mx-auto px-1 relative z-10">
        <header className="flex justify-between items-center mb-4 flex-wrap">
          <h2 className="font-black text-xl text-gray-800 m-0 tracking-tight flex items-center gap-1">
            <FaCalendarAlt className="text-blue-600" />
            All Events
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-black  rounded-lg px-3 py-1 font-bold text-base shadow-md flex items-center gap-1 transition-all duration-200 hover:bg-green-600 hover:from-green-600 hover:to-green-700 focus:bg-green-600 scale-105"
          >
            <FaPlus /> Add Event
          </button>
        </header>
        <div className="bg-blue-600/10 text-blue-600 rounded-lg py-2 px-4 mb-4 font-medium text-base tracking-wide shadow-sm flex items-center gap-2">
          <FaInfoCircle className="text-lg" />
          Here you can view, add, and manage all events—past, present, and future. Stay organized and keep track of everything in one place!
        </div>
        <section className="bg-white rounded-xl shadow-lg p-4 overflow-x-auto transition-shadow duration-300 hover:shadow-2xl">
          <table className="w-full border-separate border-spacing-y-2 text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="py-2 px-3 text-green-700 font-extrabold text-base border-b-2 border-slate-200 text-left">Sr No.</th>
                <th className="py-2 px-3 text-green-700 font-extrabold text-base border-b-2 border-slate-200 text-left">Event</th>
                <th className="py-2 px-3 text-green-700 font-extrabold text-base border-b-2 border-slate-200 text-left">Agenda</th>
                <th className="py-2 px-3 text-green-700 font-extrabold text-base border-b-2 border-slate-200 text-left">Venue</th>
                <th className="py-2 px-3 text-green-700 font-extrabold text-base border-b-2 border-slate-200 text-left">Date & Time</th>
                <th className="py-2 px-3 text-green-700 font-extrabold text-base border-b-2 border-slate-200 text-left">View</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-slate-400 py-4 bg-slate-50 text-base italic rounded-md">No data available in table</td>
                </tr>
              ) : (
                events.map((ev, idx) => (
                  <tr key={ev.id} className="border-b border-slate-100 hover:bg-emerald-50 transition-colors">
                    <td className="py-2 px-3 text-slate-700 bg-white rounded-md">{idx + 1}</td>
                    <td className="py-2 px-3 text-slate-700 bg-white rounded-md">{ev.event}</td>
                    <td className="py-2 px-3 text-slate-700 bg-white rounded-md">{ev.agenda}</td>
                    <td className="py-2 px-3 text-slate-700 bg-white rounded-md">{ev.venue}</td>
                    <td className="py-2 px-3 text-slate-700 bg-white rounded-md">{ev.datetime && new Date(ev.datetime).toLocaleString()}</td>
                    <td className="py-2 px-3 bg-white rounded-md">
                      <button className="bg-gradient-to-r from-green-400 to-green-600 text-white border-none rounded-md px-3 py-1 font-semibold shadow-sm text-base transition-all duration-150 hover:bg-blue-600 hover:from-blue-600 hover:to-blue-700 focus:bg-blue-600 scale-105"><FaEye /></button>
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