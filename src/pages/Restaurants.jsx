import { useState } from 'react';
import { Search, Star, MapPin, Phone, Edit, Eye } from 'lucide-react';
import './Restaurants.css';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([
    {
      id: 'REST-001',
      name: 'Pizza Palace',
      cuisine: 'Italian',
      rating: 4.5,
      totalOrders: 1250,
      revenue: 25600,
      status: 'active',
      address: '123 Main St, Downtown',
      phone: '+1 234-567-8901',
      owner: 'Manoj',
      joinDate: '2023-01-15',
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'REST-002',
      name: 'Burger House',
      cuisine: 'American',
      rating: 4.2,
      totalOrders: 890,
      revenue: 18400,
      status: 'active',
      address: '456 Oak Ave, Midtown',
      phone: '+1 234-567-8902',
      owner: 'Deep Oberoi',
      joinDate: '2023-02-20',
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'REST-003',
      name: 'Sushi Bar',
      cuisine: 'Japanese',
      rating: 4.8,
      totalOrders: 650,
      revenue: 32500,
      status: 'active',
      address: '789 Pine St, Eastside',
      phone: '+1 234-567-8903',
      owner: 'Yuki Noi',
      joinDate: '2023-03-10',
      image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'REST-004',
      name: 'Taco Express',
      cuisine: 'Mexican',
      rating: 4.0,
      totalOrders: 540,
      revenue: 12800,
      status: 'inactive',
      address: '321 Elm St, Westside',
      phone: '+1 234-567-8904',
      owner: 'Tata Group',
      joinDate: '2023-04-05',
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'REST-005',
      name: 'Indian Spice',
      cuisine: 'Indian',
      rating: 4.6,
      totalOrders: 780,
      revenue: 19600,
      status: 'active',
      address: '654 Cedar Ave, Northside',
      phone: '+1 234-567-8905',
      owner: 'Priya Sharma',
      joinDate: '2023-05-12',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const cuisineTypes = [...new Set(restaurants.map(r => r.cuisine))];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = cuisineFilter === 'all' || restaurant.cuisine === cuisineFilter;
    const matchesStatus = statusFilter === 'all' || restaurant.status === statusFilter;
    return matchesSearch && matchesCuisine && matchesStatus;
  });

  const handleStatusChange = (restaurantId, newStatus) => {
    setRestaurants(restaurants.map(restaurant => 
      restaurant.id === restaurantId ? { ...restaurant, status: newStatus } : restaurant
    ));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < Math.floor(rating) ? 'star-filled' : 'star-empty'}
        fill={index < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  return (
    <div className="restaurants-page fade-in">
      <div className="page-header">
        <div className="header-content">
          <h1>Restaurants Management</h1>
          <p>Manage restaurant partners and track their performance</p>
        </div>
        {/* Removed header-actions */}
      </div>

      <div className="restaurants-controls">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search restaurants, owners, cuisine..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <select
            value={cuisineFilter}
            onChange={(e) => setCuisineFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Cuisines</option>
            {cuisineTypes.map(cuisine => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="restaurants-stats">
        <div className="stat-item">
          <span className="stat-label">Total Restaurants</span>
          <span className="stat-value">{restaurants.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Active</span>
          <span className="stat-value">{restaurants.filter(r => r.status === 'active').length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Average Rating</span>
          <span className="stat-value">{(restaurants.reduce((sum, r) => sum + r.rating, 0) / restaurants.length).toFixed(1)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Revenue</span>
          <span className="stat-value">${restaurants.reduce((sum, r) => sum + r.revenue, 0).toLocaleString()}</span>
        </div>
      </div>

      <div className="restaurants-grid">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card card">
            <div className="restaurant-image">
              <img src={restaurant.image} alt={restaurant.name} />
              <div className={`status-indicator ${restaurant.status}`}></div>
            </div>
            
            <div className="restaurant-content">
              <div className="restaurant-header">
                <h3>{restaurant.name}</h3>
                <div className="rating">
                  {renderStars(restaurant.rating)}
                  <span className="rating-value">{restaurant.rating}</span>
                </div>
              </div>
              
              <div className="restaurant-info">
                <div className="info-item">
                  <span className="cuisine-tag">{restaurant.cuisine}</span>
                </div>
                <div className="info-item">
                  <MapPin size={16} />
                  <span>{restaurant.address}</span>
                </div>
                <div className="info-item">
                  <Phone size={16} />
                  <span>{restaurant.phone}</span>
                </div>
              </div>
              
              <div className="restaurant-stats">
                <div className="stat">
                  <span className="stat-number">{restaurant.totalOrders}</span>
                  <span className="stat-label">Orders</span>
                </div>
                <div className="stat">
                  <span className="stat-number">${restaurant.revenue.toLocaleString()}</span>
                  <span className="stat-label">Revenue</span>
                </div>
              </div>
              
              <div className="restaurant-actions">
                <button 
                  className="action-btn view-btn"
                  onClick={() => setSelectedRestaurant(restaurant)}
                  title="View Details"
                >
                  <Eye size={16} />
                </button>
                <button className="action-btn edit-btn" title="Edit Restaurant">
                  <Edit size={16} />
                </button>
                <select
                  value={restaurant.status}
                  onChange={(e) => handleStatusChange(restaurant.id, e.target.value)}
                  className={`status-select status-${restaurant.status}`}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRestaurant && (
        <div className="modal-overlay" onClick={() => setSelectedRestaurant(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Restaurant Details - {selectedRestaurant.name}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedRestaurant(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="restaurant-details">
                <div className="detail-section">
                  <img 
                    src={selectedRestaurant.image} 
                    alt={selectedRestaurant.name}
                    className="detail-image"
                  />
                </div>
                
                <div className="detail-section">
                  <h4>Basic Information</h4>
                  <p><strong>Name:</strong> {selectedRestaurant.name}</p>
                  <p><strong>Cuisine:</strong> {selectedRestaurant.cuisine}</p>
                  <p><strong>Owner:</strong> {selectedRestaurant.owner}</p>
                  <p><strong>Join Date:</strong> {selectedRestaurant.joinDate}</p>
                  <div className="rating-detail">
                    <strong>Rating:</strong>
                    <div className="rating">
                      {renderStars(selectedRestaurant.rating)}
                      <span>{selectedRestaurant.rating}/5</span>
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Contact Information</h4>
                  <p><strong>Address:</strong> {selectedRestaurant.address}</p>
                  <p><strong>Phone:</strong> {selectedRestaurant.phone}</p>
                </div>
                
                <div className="detail-section">
                  <h4>Performance Metrics</h4>
                  <p><strong>Total Orders:</strong> {selectedRestaurant.totalOrders}</p>
                  <p><strong>Revenue:</strong> ${selectedRestaurant.revenue.toLocaleString()}</p>
                  <p><strong>Status:</strong> 
                    <span className={`status-badge status-${selectedRestaurant.status}`}>
                      {selectedRestaurant.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
