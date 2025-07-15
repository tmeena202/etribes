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
import "./Calendar.css";
import { Tooltip } from "react-tooltip";

// Setup localizer
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
  // Additional sample events
  {
    name: "Yoga Morning",
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
    attendees: 25,
    description: "Start your day with a relaxing yoga session.",
    type: "past"
  },
  {
    name: "Team Lunch",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    attendees: 12,
    description: "Lunch with the product team at the new cafe.",
    type: "upcoming"
  },
  {
    name: "Design Review",
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    attendees: 8,
    description: "Review the new app design mockups.",
    type: "upcoming"
  },
  {
    name: "Sprint Planning",
    date: new Date(new Date().setDate(new Date().getDate() + 7)),
    attendees: 10,
    description: "Plan the next sprint tasks and priorities.",
    type: "upcoming"
  },
  {
    name: "Birthday Bash",
    date: new Date(new Date().setDate(new Date().getDate())),
    attendees: 30,
    description: "Celebrate Alex's birthday with cake and games!",
    type: "today"
  },
  {
    name: "Hackathon",
    date: new Date(new Date().setDate(new Date().getDate() + 14)),
    attendees: 50,
    description: "24-hour coding marathon with prizes.",
    type: "upcoming"
  },
  {
    name: "Book Club",
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
    attendees: 9,
    description: "Discuss this month's book selection.",
    type: "past"
  },
  {
    name: "Wellness Webinar",
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    attendees: 100,
    description: "Online session on mental health and wellness.",
    type: "upcoming"
  },
  {
    name: "Finance Review",
    date: new Date(new Date().setDate(new Date().getDate() - 7)),
    attendees: 6,
    description: "Monthly review of financial statements.",
    type: "past"
  },
  {
    name: "Marketing Sync",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    attendees: 18,
    description: "Align on marketing campaigns and goals.",
    type: "upcoming"
  },
  {
    name: "Code Review",
    date: new Date(new Date().setDate(new Date().getDate())),
    attendees: 5,
    description: "Peer review of the latest code changes.",
    type: "today"
  },
  {
    name: "Customer Demo",
    date: new Date(new Date().setDate(new Date().getDate() + 10)),
    attendees: 20,
    description: "Demo the new features to key customers.",
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

// Convert events for react-big-calendar
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

  // Custom date cell for event dots and selected highlight (moved inside CalendarPage)
  const CustomDateCell = ({ value, children }) => {
    const eventsForDay = sampleEvents.filter(ev => isSameDay(ev.date, value));
    const isSelected = isSameDay(value, selectedDate);
    return (
      <div
        className={`custom-date-cell${isSelected ? ' selected' : ''}`}
        aria-label={eventsForDay.length > 0 ? `Events: ${eventsForDay.map(ev => ev.name).join(', ')}` : undefined}
        tabIndex={0}
        onClick={() => setSelectedDate(value)}
        style={{ position: 'relative', cursor: 'pointer', borderRadius: 8, transition: 'background 0.2s' }}
      >
        {children}
        {eventsForDay.length > 0 && <span className="event-dot" />}
      </div>
    );
  };

  return (
    <div className="calendar-bg">
      <div className="calendar-header">
        <h1>📆 Event Calendar</h1>
        <div className="calendar-header-datetime">
          <span className="calendar-header-date">{time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span className="calendar-header-time"><span role="img" aria-label="clock">⏰</span> {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
        </div>
      </div>

      <div className="calendar-main-content compact-calendar">
        {/* Calendar */}
        <div className="calendar-glass-card">
          <Calendar
            localizer={localizer}
            events={bigCalendarEvents}
            startAccessor="start"
            endAccessor="end"
            views={["month"]}
            defaultView="month"
            style={{ height: 320 }}
            onSelectEvent={(event) => setSelectedDate(event.start)}
            onSelectSlot={({ start }) => setSelectedDate(start)}
            selectable
            popup
            components={{
              event: ({ event }) => (
                <span className={`event-label ${event.resource.type}`}>
                  {event.title}
                </span>
              ),
              dateCellWrapper: (props) => <CustomDateCell {...props} />
            }}
          />
          <div className="calendar-selected-date">
            📅 <strong>Selected:</strong> {selectedDate.toDateString()}
          </div>
          {/* Legend directly below calendar */}
          <div className="calendar-legend-card legend-inline">
            <span className="legend-item legend-pill" title="Days with past events"><span className="legend-dot past"></span> Past</span>
            <span className="legend-item legend-pill" title="Days with upcoming events"><span className="legend-dot upcoming"></span> Upcoming</span>
            <span className="legend-item legend-pill" title="Days with today's events"><span className="legend-dot today"></span> Today’s Event</span>
          </div>
        </div>

        {/* Events */}
        <div className="event-details-card">
          <h2>Event Details</h2>
          <button className="create-event-btn" aria-label="Create Event">+ Create Event</button>
          {eventsForDate.length === 0 ? (
            <div className="no-events">
              <span role="img" aria-label="No events" style={{ fontSize: 32, display: 'block', marginBottom: 8 }}>📭</span>
              No events for this day!
            </div>
          ) : (
            eventsForDate.map((ev, idx) => (
              <div className="event-item" key={idx}>
                <div className="event-title">{ev.name}</div>
                <div className="event-meta">{ev.date.toDateString()}</div>
                <div className="event-desc">{ev.description}</div>
                <div className="event-attendees">👥 {ev.attendees} Attendees</div>
                <div className="event-meta">Type: {ev.type}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
