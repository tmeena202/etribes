import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

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
  }
];

function isSameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const eventsForDate = sampleEvents.filter(ev => isSameDay(ev.date, date));

  const tileClassName = ({ date: tileDate, view }) => {
    if (view !== 'month') return '';
    const isToday = isSameDay(tileDate, new Date());
    const events = sampleEvents.filter(ev => isSameDay(ev.date, tileDate));
    if (isToday) return 'react-calendar__tile today-gold';
    if (events.length > 0) {
      if (events.some(ev => ev.type === 'today')) return 'react-calendar__tile today-event';
      if (events.some(ev => ev.type === 'past')) return 'react-calendar__tile past-event';
      if (events.some(ev => ev.type === 'upcoming')) return 'react-calendar__tile upcoming-event';
    }
    return '';
  };

  return (
    <>
      <div className="calendar-bg">
        <div className="calendar-header">
          <h1>Event Calendar</h1>
          <div className="live-time">{time.toLocaleString()}</div>
        </div>
        <div className="calendar-main-content">
    
          {/* Calendar */}
          <div className="calendar-glass-card">
            <Calendar
              onChange={setDate}
              value={date}
              tileClassName={tileClassName}
            />
            <div className="calendar-selected-date">
              📅 <strong>Selected:</strong> {date.toDateString()}
            </div>
          </div>

          {/* Events */}
          <div className="event-details-card">
            <h2>Event Details</h2>
            {eventsForDate.length === 0 ? (
              <div className="no-events">No events for this date.</div>
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


           {/* Legend */}
          <div className="calendar-legend-card">
            <h3>Legend</h3>
            <div className="legend-item"><span className="legend-dot past"></span> Past</div>
            <div className="legend-item"><span className="legend-dot upcoming"></span> Upcoming</div>
            <div className="legend-item"><span className="legend-dot today-event"></span> Today’s Event</div>
            <div className="legend-item"><span className="legend-dot today-gold"></span> Today</div>
          </div>

        </div>
  </div>
    </>
);
};

export default CalendarPage;
