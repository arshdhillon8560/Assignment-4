import { Search, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import './Header.css';

const Header = ({ onToggleSidebar }) => {
  const { theme, themes, changeTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-left">
        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-right">
        <div className="theme-selector">
          <select 
            value={theme} 
            onChange={(e) => changeTheme(e.target.value)}
            className="theme-select"
          >
            {Object.entries(themes).map(([key, theme]) => (
              <option key={key} value={key}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="user-profile">
          <div className="user-avatar">
            <User size={16} />
          </div>
          <div className="user-info">
            <span className="user-name">Admin</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
