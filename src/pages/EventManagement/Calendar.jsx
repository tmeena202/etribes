import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

// -- date-fns localizer setup ------------------------------------------------
const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// -- Sample events -------------------------------------------------------------
const initialEvents = [
  {
    name: "Annual Meetup",
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    attendees: 120,
    description: "A gathering of all community members for networking and fun.",
    type: "past",
  },
  {
    name: "Tech Workshop",
    date: new Date(),
    attendees: 45,
    description: "Hands-on workshop on the latest web technologies.",
    type: "today",
  },
  {
    name: "Charity Run",
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    attendees: 200,
    description: "A 5K run to raise funds for local charities.",
    type: "upcoming",
  },
  {
    name: "Board Meeting",
    date: new Date(new Date().setDate(new Date().getDate() - 10)),
    attendees: 15,
    description: "Quarterly board meeting to discuss progress and plans.",
    type: "past",
  },
  {
    name: "Community Picnic",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    attendees: 80,
    description: "A fun picnic for families and friends in the park.",
    type: "upcoming",
  },
  {
    name: "Today’s Green Event",
    date: new Date(),
    attendees: 60,
    description: "A special event happening today!",
    type: "today",
  },
  {
    name: "Sprint Planning",
    date: new Date(new Date().setDate(new Date().getDate() + 7)),
    attendees: 10,
    description: "Plan the next sprint tasks and priorities.",
    type: "upcoming",
  },
  {
    name: "Retrospective",
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    attendees: 11,
    description: "Team retrospective for the last sprint.",
    type: "past",
  },
];

// -- Map to react-big-calendar format ------------------------------------------
function mapToBigCalendarEvents(events) {
  return events.map((ev) => ({
    title: ev.name,
    start: new Date(ev.date),
    end: new Date(ev.date),
    allDay: true,
    resource: ev,
  }));
}

// -- Helpers ------------------------------------------------------------------
function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function getEventDotColor(events) {
  if (events.some((ev) => ev.type === "today")) return "bg-green-500";
  if (events.some((ev) => ev.type === "upcoming")) return "bg-blue-500";
  return "bg-red-500";
}

// -- Custom date cell with colored dot & tooltip --------------------------------
const CustomDateCell = ({ value, children, onClick, events }) => {
  const eventsForDay = events.filter((ev) => isSameDay(ev.date, value));
  const isSelected = isSameDay(value, onClick.selectedDate);
  const dotColor = getEventDotColor(eventsForDay);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick.setSelectedDate(value)}
      className={`group relative cursor-pointer rounded-lg transition
        ${isSelected ? "ring-2 ring-emerald-400 bg-emerald-50" : "hover:bg-emerald-50"}
      `}
    >
      {children}
      {eventsForDay.length > 0 && (
        <>
          <span
            className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full shadow ${dotColor}`}
          />
          <div className="pointer-events-none absolute -top-6 left-1/2 hidden w-max -translate-x-1/2 
                          rounded bg-gray-700 px-2 py-1 text-xs text-white group-hover:block">
            {eventsForDay.map((ev) => ev.name).join(", ")}
          </div>
        </>
      )}
    </div>
  );
};

// -- Main Calendar Page --------------------------------------------------------
const CalendarPage = () => {
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    date: '',
    attendees: '',
    description: '',
    type: 'upcoming',
  });
  const [formError, setFormError] = useState('');

  // live clock update
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // filter events on the selected date
  const eventsForDate = events.filter((ev) =>
    isSameDay(ev.date, selectedDate)
  );

  // Map events for calendar
  const bigCalendarEvents = mapToBigCalendarEvents(events);

  // Handle form input
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!form.name || !form.date || !form.attendees || !form.description) {
      setFormError('All fields are required.');
      return;
    }
    const eventDate = new Date(form.date);
    let type = 'upcoming';
    const today = new Date();
    today.setHours(0,0,0,0);
    eventDate.setHours(0,0,0,0);
    if (isSameDay(eventDate, today)) type = 'today';
    else if (eventDate < today) type = 'past';
    const newEvent = {
      name: form.name,
      date: eventDate,
      attendees: Number(form.attendees),
      description: form.description,
      type,
    };
    setEvents((prev) => [...prev, newEvent]);
    setShowForm(false);
    setForm({ name: '', date: '', attendees: '', description: '', type: 'upcoming' });
    setSelectedDate(eventDate);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Decorative SVG Pattern */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="1.5"
              cy="1.5"
              r="1.5"
              fill="#a7f3d0"
              fillOpacity="0.25"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <div className="relative z-10 bg-gradient-to-br from-green-200 via-blue-100 to-emerald-100 min-h-screen py-6 px-4 sm:px-6">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100 mb-6 rounded-b-xl shadow-sm flex flex-col sm:flex-row items-center justify-between px-4 py-3">
          <h1 className="text-xl sm:text-2xl font-bold text-emerald-700 flex items-center gap-2">
            📆 Event Calendar
          </h1>
          <div className="flex flex-col items-end">
            <span className="text-base font-semibold text-blue-700">
              {time.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-sm text-emerald-500 flex items-center gap-1">
              ⏰ {time.toLocaleTimeString([], { hour12: false })}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start justify-center max-w-5xl mx-auto">
          {/* Calendar + Add Event */}
          <div className="flex-1 min-w-[320px] bg-white/80 rounded-2xl shadow-xl p-4 md:p-6 backdrop-blur border border-emerald-100">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-emerald-700 text-lg">Event Calendar</span>
              <button
                className="px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition text-sm"
                onClick={() => setShowForm((v) => !v)}
              >
                {showForm ? 'Close' : '+ Add Event'}
              </button>
            </div>
            {showForm && (
              <form onSubmit={handleFormSubmit} className="mb-4 bg-emerald-50/80 p-4 rounded-lg border border-emerald-200 shadow">
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">Event Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleFormChange} className="w-full px-2 py-1 border rounded focus:ring-emerald-400 focus:outline-none" />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input type="date" name="date" value={form.date} onChange={handleFormChange} className="w-full px-2 py-1 border rounded focus:ring-emerald-400 focus:outline-none" />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">Attendees</label>
                  <input type="number" name="attendees" value={form.attendees} onChange={handleFormChange} className="w-full px-2 py-1 border rounded focus:ring-emerald-400 focus:outline-none" min="1" />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea name="description" value={form.description} onChange={handleFormChange} className="w-full px-2 py-1 border rounded focus:ring-emerald-400 focus:outline-none" rows={2} />
                </div>
                {formError && <div className="text-red-500 text-xs mb-2">{formError}</div>}
                <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition">Add Event</button>
              </form>
            )}
            <Calendar
              localizer={localizer}
              events={bigCalendarEvents}
              startAccessor="start"
              endAccessor="end"
              views={["month"]}
              defaultView="month"
              style={{ height: 340 }}
              onSelectEvent={(evt) => setSelectedDate(evt.start)}
              onSelectSlot={({ start }) => setSelectedDate(start)}
              selectable
              popup
              components={{
                event: ({ event }) => {
                  const { type } = event.resource;
                  const bg =
                    type === "today"
                      ? "bg-green-600"
                      : type === "upcoming"
                      ? "bg-blue-500"
                      : "bg-red-600";
                  return (
                    <span
                      className={`${bg} text-white px-2 py-1 rounded text-xs font-semibold`}
                    >
                      {event.title}
                    </span>
                  );
                },
                dateCellWrapper: (props) => (
                  <CustomDateCell
                    {...props}
                    onClick={{ setSelectedDate, selectedDate }}
                    events={events}
                  />
                ),
              }}
            />
            <div className="mt-3 text-sm text-gray-600 flex items-center gap-2">
              📅 <span className="font-semibold">Selected:</span>{" "}
              {selectedDate.toDateString()}
            </div>
            {/* Legend */}
            <div className="flex gap-4 mt-4 items-center bg-white/60 rounded-lg px-3 py-2 border border-gray-200 shadow-sm text-sm">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-600 inline-block" />{" "}
                Today
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />{" "}
                Upcoming
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-600 inline-block" />{" "}
                Past
              </span>
            </div>
          </div>

          {/* Event Details */}
          <aside className="flex-1 min-w-[260px] max-w-md bg-white/80 rounded-2xl shadow-xl p-4 md:p-6 border border-emerald-100 sticky top-24">
            <h2 className="text-lg font-bold text-emerald-700 mb-2 flex items-center gap-2">
              📋 Event Details
            </h2>

            {eventsForDate.length === 0 ? (
              <div className="text-gray-400 text-sm">
                No events for this date.
              </div>
            ) : (
              <ul className="space-y-3">
                {eventsForDate.map((ev, idx) => {
                  const tagBg =
                    ev.type === "today"
                      ? "bg-green-600 text-white"
                      : ev.type === "upcoming"
                      ? "bg-blue-500 text-white"
                      : "bg-red-600 text-white";
                  return (
                    <li
                      key={idx}
                      className="bg-emerald-50/60 border border-emerald-100 rounded-lg p-3 shadow-sm hover:shadow-md hover:shadow-emerald-300 transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-emerald-800">
                          {ev.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold ${tagBg}`}
                        >
                          {ev.type.charAt(0).toUpperCase() +
                            ev.type.slice(1)}
                        </span>
                      </div>
                      <div className="text-gray-600 text-xs mb-1">
                        {ev.date.toLocaleDateString()} | {ev.attendees} Attendees
                      </div>
                      <div className="text-gray-700 text-sm">
                        {ev.description}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;