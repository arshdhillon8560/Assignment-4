import { useState } from 'react';
import { Search, Filter, Plus, Mail, Phone, MapPin, Edit, Eye, UserCheck } from 'lucide-react';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 'USR-001',
      name: 'Arsh Dhillon',
      email: 'arshdhillon8560@email.com',
      phone: '+1 234-567-8901',
      address: '123 Main St, Downtown',
      joinDate: '2023-01-15',
      totalOrders: 45,
      totalSpent: 850.25,
      status: 'active',
      lastOrder: '2024-01-12',
      favoriteRestaurant: 'Pizza Palace',
      avatar: 'https://img.freepik.com/photos-gratuite/beau-portrait-demi-longueur-male-isole-fond-studio-blanc-jeune-homme-hindou-emotionnel-chemise-bleue-expression-faciale-emotions-humaines-concept-publicitaire-debout-souriant_155003-25250.jpg'
    },
    {
      id: 'USR-002',
      name: 'Anmol',
      email: 'anmolbrar23@email.com',
      phone: '+1 234-567-8902',
      address: '456 Oak Ave, Midtown',
      joinDate: '2023-02-20',
      totalOrders: 32,
      totalSpent: 620.80,
      status: 'active',
      lastOrder: '2024-01-10',
      favoriteRestaurant: 'Burger House',
      avatar: 'https://img.freepik.com/premium-photo/headshot-photos-indian-women-dynamic-professions-occassions-indian-girl_978786-295.jpg?w=2000'
    },
    {
      id: 'USR-003',
      name: 'Khushboo',
      email: 'bansalkhushboo@email.com',
      phone: '+1 234-567-8903',
      address: '789 Pine St, Eastside',
      joinDate: '2023-03-10',
      totalOrders: 67,
      totalSpent: 1250.40,
      status: 'premium',
      lastOrder: '2024-01-14',
      favoriteRestaurant: 'Sushi Bar',
      avatar: 'https://thumbs.dreamstime.com/b/smile-portrait-face-young-woman-home-arms-crossed-happiness-confidence-portrait-indian-female-smile-279895727.jpg'
    },
    {
      id: 'USR-004',
      name: 'Ravi',
      email: 'coolravi345@email.com',
      phone: '+1 234-567-8904',
      address: '321 Elm St, Westside',
      joinDate: '2023-04-05',
      totalOrders: 12,
      totalSpent: 180.75,
      status: 'inactive',
      lastOrder: '2023-12-20',
      favoriteRestaurant: 'Taco Express',
      avatar: 'https://img.freepik.com/premium-photo/image-25-year-old-indian-man-that-is-smiling-camera_878783-7216.jpg?w=1060'
    },
    {
      id: 'USR-005',
      name: 'Aman Deep',
      email: 'deepaman67854@email.com',
      phone: '+1 234-567-8905',
      address: '654 Cedar Ave, Northside',
      joinDate: '2023-05-12',
      totalOrders: 89,
      totalSpent: 1680.90,
      status: 'premium',
      lastOrder: '2024-01-13',
      favoriteRestaurant: 'Indian Spice',
      avatar: 'https://hairstylecamp.com/wp-content/uploads/short-wavy-pompadour.jpg'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const getUserTypeStats = () => {
    const stats = users.reduce((acc, user) => {
      acc[user.status] = (acc[user.status] || 0) + 1;
      return acc;
    }, {});
    return stats;
  };

  const stats = getUserTypeStats();

  return (
    <div className="users-page fade-in">
      <div className="page-header">
        <div className="header-content">
          <h1>Users Management</h1>
          <p>Manage customer accounts and track their activity</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">
            <Filter size={18} />
            Advanced Filter
          </button>
          <button className="btn btn-primary">
            <Plus size={18} />
            Add User
          </button>
        </div>
      </div>

      <div className="users-controls">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search users by name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="premium">Premium</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="users-stats">
        <div className="stat-item">
          <span className="stat-label">Total Users</span>
          <span className="stat-value">{users.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Active</span>
          <span className="stat-value">{stats.active || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Premium</span>
          <span className="stat-value">{stats.premium || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Spent</span>
          <span className="stat-value">${users.reduce((sum, u) => sum + u.totalSpent, 0).toLocaleString()}</span>
        </div>
      </div>

      <div className="users-grid">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-header">
              <div className="user-avatar">
                <img src={user.avatar} alt={user.name} />
                <div className={`status-indicator ${user.status}`}></div>
              </div>
              <div className="user-basic-info">
                <h3>{user.name}</h3>
                <span className={`status-badge status-${user.status}`}>
                  {user.status}
                </span>
              </div>
            </div>
            
            <div className="user-content">
              <div className="contact-info">
                <div className="info-item">
                  <Mail size={16} />
                  <span>{user.email}</span>
                </div>
                <div className="info-item">
                  <Phone size={16} />
                  <span>{user.phone}</span>
                </div>
                <div className="info-item">
                  <MapPin size={16} />
                  <span>{user.address}</span>
                </div>
              </div>
              
              <div className="user-stats">
                <div className="stat">
                  <span className="stat-number">{user.totalOrders}</span>
                  <span className="stat-label">Orders</span>
                </div>
                <div className="stat">
                  <span className="stat-number">${user.totalSpent.toLocaleString()}</span>
                  <span className="stat-label">Spent</span>
                </div>
              </div>
              
              <div className="user-meta">
                <p><strong>Joined:</strong> {user.joinDate}</p>
                <p><strong>Last Order:</strong> {user.lastOrder}</p>
                <p><strong>Favorite:</strong> {user.favoriteRestaurant}</p>
              </div>
              
              <div className="user-actions">
                <button 
                  className="action-btn view-btn"
                  onClick={() => setSelectedUser(user)}
                  title="View Profile"
                >
                  <Eye size={16} />
                </button>
                <button className="action-btn edit-btn" title="Edit User">
                  <Edit size={16} />
                </button>
                <select
                  value={user.status}
                  onChange={(e) => handleStatusChange(user.id, e.target.value)}
                  className={`status-select status-${user.status}`}
                >
                  <option value="active">Active</option>
                  <option value="premium">Premium</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>User Profile - {selectedUser.name}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedUser(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="user-profile">
                <div className="profile-header">
                  <div className="profile-avatar">
                    <img src={selectedUser.avatar} alt={selectedUser.name} />
                    <div className={`status-indicator ${selectedUser.status}`}></div>
                  </div>
                  <div className="profile-info">
                    <h3>{selectedUser.name}</h3>
                    <span className={`status-badge status-${selectedUser.status}`}>
                      {selectedUser.status}
                    </span>
                  </div>
                </div>
                
                <div className="profile-details">
                  <div className="detail-section">
                    <h4>Contact Information</h4>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Phone:</strong> {selectedUser.phone}</p>
                    <p><strong>Address:</strong> {selectedUser.address}</p>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Account Information</h4>
                    <p><strong>User ID:</strong> {selectedUser.id}</p>
                    <p><strong>Join Date:</strong> {selectedUser.joinDate}</p>
                    <p><strong>Account Status:</strong> 
                      <span className={`status-badge status-${selectedUser.status}`}>
                        {selectedUser.status}
                      </span>
                    </p>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Order Statistics</h4>
                    <p><strong>Total Orders:</strong> {selectedUser.totalOrders}</p>
                    <p><strong>Total Spent:</strong> ${selectedUser.totalSpent.toLocaleString()}</p>
                    <p><strong>Average Order Value:</strong> ${(selectedUser.totalSpent / selectedUser.totalOrders).toFixed(2)}</p>
                    <p><strong>Last Order:</strong> {selectedUser.lastOrder}</p>
                    <p><strong>Favorite Restaurant:</strong> {selectedUser.favoriteRestaurant}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;