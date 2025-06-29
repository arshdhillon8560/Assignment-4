import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Save, Palette, Globe } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const { theme, themes, changeTheme } = useTheme();

  const [settings, setSettings] = useState({
    siteName: 'FoodFlow Dashboard',
    timezone: 'America/New_York',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-page fade-in">
      <div className="page-header">
        <div className="header-content">
          <h1>Settings</h1>
          <p>Configure your food delivery platform settings</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={handleSave}>
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="settings-content">
        {/* General Settings */}
        <div className="settings-section">
          <div className="section-header">
            <Globe className="section-icon" />
            <div>
              <h2>General Settings</h2>
              <p>Basic configuration for your platform</p>
            </div>
          </div>

          <div className="settings-grid">
            <div className="setting-item">
              <label>Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
              />
            </div>

            <div className="setting-item">
              <label>Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
            </div>

            <div className="setting-item">
              <label>Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div className="setting-item">
              <label>Date Format</label>
              <select
                value={settings.dateFormat}
                onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="settings-section">
          <div className="section-header">
            <Palette className="section-icon" />
            <div>
              <h2>Appearance</h2>
              <p>Customize the look and feel of your dashboard</p>
            </div>
          </div>

          <div className="settings-grid">
            <div className="setting-item theme-setting">
              <label>Theme</label>
              <div className="theme-selector">
                {Object.entries(themes).map(([key, themeData]) => (
                  <div
                    key={key}
                    className={`theme-option ${theme === key ? 'active' : ''}`}
                    onClick={() => changeTheme(key)}
                  >
                    <div className={`theme-preview ${themeData.class}`}>
                      <div className="preview-header"></div>
                      <div className="preview-content">
                        <div className="preview-sidebar"></div>
                        <div className="preview-main"></div>
                      </div>
                    </div>
                    <span>{themeData.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
