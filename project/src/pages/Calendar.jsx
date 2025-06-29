import { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Plus, Filter, Calendar as CalendarIcon, Clock, User, MapPin } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [shifts, setShifts] = useState([
    {
      id: 1,
      title: 'Naveen - Morning Shift',
      driver: 'Ali Hussain',
      start: new Date(2024, 0, 15, 8, 0),
      end: new Date(2024, 0, 15, 16, 0),
      zone: 'Downtown',
      status: 'confirmed',
      vehicle: 'Bike #12'
    },
    {
      id: 2,
      title: 'Jay Singh - Evening Shift',
      driver: 'Ram Kumar',
      start: new Date(2024, 0, 15, 16, 0),
      end: new Date(2024, 0, 16, 0, 0),
      zone: 'Midtown',
      status: 'confirmed',
      vehicle: 'Scooter #8'
    },
    {
      id: 3,
      title: 'Anil Raj - Night Shift',
      driver: 'Ravi Dubey',
      start: new Date(2024, 0, 16, 0, 0),
      end: new Date(2024, 0, 16, 8, 0),
      zone: 'Eastside',
      status: 'pending',
      vehicle: 'Car #3'
    },
    {
      id: 4,
      title: 'Jassi - Lunch Rush',
      driver: 'Neeraj Rai',
      start: new Date(2024, 0, 16, 11, 0),
      end: new Date(2024, 0, 16, 15, 0),
      zone: 'Downtown',
      status: 'confirmed',
      vehicle: 'Bike #7'
    },
    {
      id: 5,
      title: 'Deep Biswas- Weekend Morning',
      driver: 'Aman Deep',
      start: new Date(2024, 0, 17, 9, 0),
      end: new Date(2024, 0, 17, 17, 0),
      zone: 'Westside',
      status: 'confirmed',
      vehicle: 'Scooter #15'
    }
  ]);

  const [selectedShift, setSelectedShift] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewType, setViewType] = useState('week');

  const drivers = [
    'Ali Hussain',
    'Ram Kumar',
    'Ravi Dubey',
    'Emma Davis',
    'Neeraj Rai',
    'Aman Deep',
    'Sanjay Singh',
    'Anirudh Kala' 
  ];

  const zones = ['Downtown', 'Midtown', 'Eastside', 'Westside', 'Northside', 'Southside'];
  const vehicles = ['Bike #12', 'Bike #7', 'Scooter #8', 'Scooter #15', 'Car #3', 'Car #5'];

  const handleSelectEvent = (event) => {
    setSelectedShift(event);
    setShowModal(true);
  };

  const handleSelectSlot = ({ start, end }) => {
    const newShift = {
      id: Date.now(),
      title: 'New Shift',
      driver: '',
      start,
      end,
      zone: '',
      status: 'pending',
      vehicle: ''
    };
    setSelectedShift(newShift);
    setShowModal(true);
  };

  const handleSaveShift = (shiftData) => {
    if (shiftData.id && shifts.find(s => s.id === shiftData.id)) {
      setShifts(shifts.map(shift => 
        shift.id === shiftData.id 
          ? { ...shiftData, title: `${shiftData.driver} - ${shiftData.zone}` }
          : shift
      ));
    } else {
      const newShift = {
        ...shiftData,
        id: Date.now(),
        title: `${shiftData.driver} - ${shiftData.zone}`
      };
      setShifts([...shifts, newShift]);
    }
    setShowModal(false);
    setSelectedShift(null);
  };

  const handleDeleteShift = (shiftId) => {
    setShifts(shifts.filter(shift => shift.id !== shiftId));
    setShowModal(false);
    setSelectedShift(null);
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = '#3174ad';
    
    switch (event.status) {
      case 'confirmed':
        backgroundColor = '#2ECC71';
        break;
      case 'pending':
        backgroundColor = '#F39C12';
        break;
      case 'cancelled':
        backgroundColor = '#E74C3C';
        break;
      default:
        backgroundColor = '#3174ad';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  const upcomingShifts = shifts
    .filter(shift => shift.start >= new Date())
    .sort((a, b) => a.start - b.start)
    .slice(0, 5);

  const todayShifts = shifts.filter(shift => 
    moment(shift.start).isSame(moment(), 'day')
  );

  return (
    <div className="calendar-page fade-in">
      <div className="page-header">
        <div className="header-content">
          <h1>Delivery Schedule</h1>
          <p>Manage delivery driver shifts and scheduling</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">
            <Filter size={18} />
            Filter
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setSelectedShift({
                id: null,
                title: 'New Shift',
                driver: '',
                start: new Date(),
                end: new Date(Date.now() + 8 * 60 * 60 * 1000),
                zone: '',
                status: 'pending',
                vehicle: ''
              });
              setShowModal(true);
            }}
          >
            <Plus size={18} />
            New Shift
          </button>
        </div>
      </div>

      <div className="calendar-stats">
        <div className="stat-item">
          <span className="stat-label">Today's Shifts</span>
          <span className="stat-value">{todayShifts.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">This Week</span>
          <span className="stat-value">{shifts.filter(s => moment(s.start).isSame(moment(), 'week')).length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Active Drivers</span>
          <span className="stat-value">{new Set(shifts.map(s => s.driver)).size}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Coverage Zones</span>
          <span className="stat-value">{new Set(shifts.map(s => s.zone)).size}</span>
        </div>
      </div>

      <div className="calendar-layout">
        <div className="calendar-main card">
          <div className="calendar-controls">
            <div className="view-controls">
              <button 
                className={`view-btn ${viewType === 'day' ? 'active' : ''}`}
                onClick={() => setViewType('day')}
              >
                Day
              </button>
              <button 
                className={`view-btn ${viewType === 'week' ? 'active' : ''}`}
                onClick={() => setViewType('week')}
              >
                Week
              </button>
              <button 
                className={`view-btn ${viewType === 'month' ? 'active' : ''}`}
                onClick={() => setViewType('month')}
              >
                Month
              </button>
            </div>
          </div>
          
          <div className="calendar-container">
            <BigCalendar
              localizer={localizer}
              events={shifts}
              startAccessor="start"
              endAccessor="end"
              view={viewType}
              onView={setViewType}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              eventPropGetter={eventStyleGetter}
              style={{ height: 600 }}
            />
          </div>
        </div>

        <div className="calendar-sidebar">
          <div className="upcoming-shifts card">
            <div className="section-header">
              <h3>Upcoming Shifts</h3>
            </div>
            <div className="shifts-list">
              {upcomingShifts.map((shift) => (
                <div key={shift.id} className="shift-item">
                  <div className="shift-time">
                    <Clock size={16} />
                    <span>{moment(shift.start).format('MMM DD, HH:mm')}</span>
                  </div>
                  <div className="shift-driver">
                    <User size={16} />
                    <span>{shift.driver}</span>
                  </div>
                  <div className="shift-zone">
                    <MapPin size={16} />
                    <span>{shift.zone}</span>
                  </div>
                  <span className={`status-badge status-${shift.status}`}>
                    {shift.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="shift-legend card">
            <div className="section-header">
              <h3>Status Legend</h3>
            </div>
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-color confirmed"></div>
                <span>Confirmed</span>
              </div>
              <div className="legend-item">
                <div className="legend-color pending"></div>
                <span>Pending</span>
              </div>
              <div className="legend-item">
                <div className="legend-color cancelled"></div>
                <span>Cancelled</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedShift && (
        <ShiftModal
          shift={selectedShift}
          drivers={drivers}
          zones={zones}
          vehicles={vehicles}
          onSave={handleSaveShift}
          onDelete={handleDeleteShift}
          onClose={() => {
            setShowModal(false);
            setSelectedShift(null);
          }}
        />
      )}
    </div>
  );
};

const ShiftModal = ({ shift, drivers, zones, vehicles, onSave, onDelete, onClose }) => {
  const [formData, setFormData] = useState({
    id: shift.id,
    driver: shift.driver,
    start: moment(shift.start).format('YYYY-MM-DDTHH:mm'),
    end: moment(shift.end).format('YYYY-MM-DDTHH:mm'),
    zone: shift.zone,
    status: shift.status,
    vehicle: shift.vehicle
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      start: new Date(formData.start),
      end: new Date(formData.end)
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content shift-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{shift.id ? 'Edit Shift' : 'New Shift'}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label>Driver</label>
            <select
              value={formData.driver}
              onChange={(e) => setFormData({...formData, driver: e.target.value})}
              required
            >
              <option value="">Select Driver</option>
              {drivers.map(driver => (
                <option key={driver} value={driver}>{driver}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Time</label>
              <input
                type="datetime-local"
                value={formData.start}
                onChange={(e) => setFormData({...formData, start: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>End Time</label>
              
              <input
                type="datetime-local"
                value={formData.end}
                onChange={(e) => setFormData({...formData, end: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Zone</label>
              <select
                value={formData.zone}
                onChange={(e) => setFormData({...formData, zone: e.target.value})}
                required
              >
                <option value="">Select Zone</option>
                {zones.map(zone => (
                  <option key={zone} value={zone}>{zone}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Vehicle</label>
              <select
                value={formData.vehicle}
                onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
                required
              >
                <option value="">Select Vehicle</option>
                {vehicles.map(vehicle => (
                  <option key={vehicle} value={vehicle}>{vehicle}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="modal-actions">
            {shift.id && (
              <button 
                type="button" 
                className="btn btn-error"
                onClick={() => onDelete(shift.id)}
              >
                Delete
              </button>
            )}
            <div className="action-group">
              <button type="button" className="btn btn-outline" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {shift.id ? 'Update' : 'Create'} Shift
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Calendar;