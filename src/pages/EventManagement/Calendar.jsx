import React, { useState, useEffect } from "react";
import {
  Calendar,
  dateFnsLocalizer
} from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay
} from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales
});

// Sample events
const sampleEvents = [
  {
    name: "Annual Meetup",
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    attendees: 120,
    description: "A gathering of all community members for networking and fun.",
    type: "past"
  },
  {
    name: "Tech Workshop",
    date: new Date(),
    attendees: 45,
    description: "Hands-on workshop on the latest web technologies.",
    type: "today"
  },
  {
    name: "Charity Run",
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    attendees: 200,
    description: "A 5K run to raise funds for local charities.",
    type: "upcoming"
  },
  {
    name: "Board Meeting",
    date: new Date(new Date().setDate(new Date().getDate() - 10)),
    attendees: 15,
    description: "Quarterly board meeting to discuss progress and plans.",
    type: "past"
  },
  {
    name: "Community Picnic",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    attendees: 80,
    description: "A fun picnic for families and friends in the park.",
    type: "upcoming"
  },
  {
    name: "Today’s Green Event",
    date: new Date(),
    attendees: 60,
    description: "A special event happening today!",
    type: "today"
  },
  {
    name: "Sprint Planning",
    date: new Date(new Date().setDate(new Date().getDate() + 7)),
    attendees: 10,
    description: "Plan the next sprint tasks and priorities.",
    type: "upcoming"
  },
  {
    name: "Retrospective",
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    attendees: 11,
    description: "Team retrospective for the last sprint.",
    type: "past"
  }
];

const bigCalendarEvents = sampleEvents.map(ev => ({
  title: ev.name,
  start: new Date(ev.date),
  end: new Date(ev.date),
  allDay: true,
  resource: ev
}));

function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const eventsForDate = sampleEvents.filter(ev =>
    isSameDay(ev.date, selectedDate)
  );

  const CustomDateCell = ({ value, children }) => {
    const eventsForDay = sampleEvents.filter(ev => isSameDay(ev.date, value));
    const isSelected = isSameDay(value, selectedDate);
    return (
      <div
        className={`relative cursor-pointer rounded-lg transition bg-white/0 hover:bg-emerald-50 ${isSelected ? 'ring-2 ring-emerald-400 bg-emerald-50' : ''}`}
        aria-label={eventsForDay.length > 0 ? `Events: ${eventsForDay.map(ev => ev.name).join(', ')}` : undefined}
        tabIndex={0}
        onClick={() => setSelectedDate(value)}
      >
        {children}
        {eventsForDay.length > 0 && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow" />}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Decorative SVG Pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
        <defs>
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#a7f3d0" fillOpacity="0.25" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      <div className="relative z-10 bg-gradient-to-br from-green-200 via-blue-100 to-emerald-100 min-h-screen py-6 px-2 sm:px-6">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100 mb-6 rounded-b-xl shadow-sm flex flex-col sm:flex-row items-center justify-between px-4 py-3">
          <h1 className="text-xl sm:text-2xl font-bold text-emerald-700 flex items-center gap-2">📆 Event Calendar</h1>
          <div className="flex flex-col items-end">
            <span className="text-base font-semibold text-blue-700">{time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="text-sm text-emerald-500 flex items-center gap-1">⏰ {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start justify-center max-w-5xl mx-auto">
          {/* Calendar */}
          <div className="flex-1 min-w-[320px] bg-white/80 rounded-2xl shadow-xl p-4 md:p-6 backdrop-blur border border-emerald-100">
            <Calendar
              localizer={localizer}
              events={bigCalendarEvents}
              startAccessor="start"
              endAccessor="end"
              views={["month"]}
              defaultView="month"
              style={{ height: 340 }}
              onSelectEvent={(event) => setSelectedDate(event.start)}
              onSelectSlot={({ start }) => setSelectedDate(start)}
              selectable
              popup
              components={{
                event: ({ event }) => (
                  <span className={`px-2 py-1 rounded text-xs font-semibold
                    ${event.resource.type === 'today'
                      ? 'bg-green-500 text-white'
                      : event.resource.type === 'upcoming'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                    {event.title}
                  </span>
                ),
                dateCellWrapper: (props) => <CustomDateCell {...props} />
              }}
            />
            <div className="mt-3 text-sm text-gray-600 flex items-center gap-2">
              📅 <span className="font-semibold">Selected:</span> {selectedDate.toDateString()}
            </div>
            {/* Legend */}
            <div className="flex gap-4 mt-4 items-center bg-white/60 rounded-lg px-3 py-2 border border-gray-200 shadow-sm text-sm">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Today
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-blue-400 inline-block" /> Upcoming
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-400 inline-block" /> Past
              </span>
            </div>
          </div>

          {/* Event Details */}
          <div className="flex-1 min-w-[260px] max-w-md bg-white/80 rounded-2xl shadow-xl p-4 md:p-6 border border-emerald-100">
            <h2 className="text-lg font-bold text-emerald-700 mb-2 flex items-center gap-2">Event Details</h2>
            {eventsForDate.length === 0 ? (
              <div className="text-gray-400 text-sm">No events for this date.</div>
            ) : (
              <ul className="space-y-3">
                {eventsForDate.map((ev, idx) => (
                  <li key={idx} className="bg-emerald-50/60 border border-emerald-100 rounded-lg p-3 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-emerald-800">{ev.name}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold 
                        ${ev.type === 'today'
                          ? 'bg-green-500 text-white'
                          : ev.type === 'upcoming'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                        {ev.type.charAt(0).toUpperCase() + ev.type.slice(1)}
                      </span>
                    </div>
                    <div className="text-gray-600 text-xs mb-1">{ev.date.toLocaleDateString()} | {ev.attendees} Attendees</div>
                    <div className="text-gray-700 text-sm">{ev.description}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
