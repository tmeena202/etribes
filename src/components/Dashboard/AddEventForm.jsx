import React from "react";
import "./AddEventForm.css";
import { FaPlus } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEventForm = ({ open, form, onChange, onSubmit, onClose }) => {
  if (!open) return null;
  return (
    <div className="add-event-modal-overlay">
      <div className="add-event-modal">
        <button className="add-event-close" onClick={onClose} aria-label="Close">&times;</button>
        <h2 className="add-event-title">
          <FaPlus style={{ color: "#2563eb" }} /> Add Event
        </h2>
        <form className="add-event-form" onSubmit={onSubmit} autoComplete="off">
          <div className="add-event-field">
            <label htmlFor="event">Event Name</label>
            <input id="event" name="event" value={form.event} onChange={onChange} required placeholder="Enter event name" />
          </div>
          <div className="add-event-field">
            <label htmlFor="agenda">Agenda</label>
            <input id="agenda" name="agenda" value={form.agenda} onChange={onChange} required placeholder="Enter agenda" />
          </div>
          <div className="add-event-field">
            <label htmlFor="venue">Venue</label>
            <input id="venue" name="venue" value={form.venue} onChange={onChange} required placeholder="Enter venue" />
          </div>
          <div className="add-event-field">
            <label htmlFor="datetime">Date & Time</label>
            <DatePicker
              id="datetime"
              name="datetime"
              selected={form.datetime ? new Date(form.datetime) : null}
              onChange={date => onChange({ target: { name: "datetime", value: date } })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="Select date and time"
              className="add-event-datepicker"
              required
            />
          </div>
          <div className="add-event-actions">
            <button type="button" className="add-event-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="add-event-submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventForm; 