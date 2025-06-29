import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Store, 
  Users, 
  Calendar,
  Package,
  Settings,
  Home,
  TrendingUp
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/orders', icon: ShoppingBag, label: 'Orders' },
    { path: '/restaurants', icon: Store, label: 'Restaurants' },
    { path: '/users', icon: Users, label: 'Users' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/kanban', icon: Package, label: 'Pipeline' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo" onClick={onToggle} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">
            <TrendingUp size={isOpen ? 28 : 24} />
          </div>
          {isOpen && <span className="logo-text">Foodmato</span>}
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path} className="nav-item">
                <Link 
                  to={item.path} 
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  title={!isOpen ? item.label : ''}
                >
                  <div className={`nav-icon ${isActive ? 'active' : ''}`}>
                    <Icon size={20} />
                  </div>
                  {isOpen && <span className="nav-label">{item.label}</span>}
                  {isActive && <div className="active-indicator"></div>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {isOpen && (
        <div className="sidebar-footer">
          <div className="user-card">
            <div className="user-avatar">
              <div className="avatar-gradient"></div>
              <span>A</span>
            </div>
            <div className="user-info">
              <span className="user-name">Admin</span>
              <span className="user-status">Online</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
