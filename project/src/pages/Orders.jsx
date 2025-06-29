import { useState } from 'react';
import {
  Search, Plus, Eye, Edit, Download, Clock, MapPin, X
} from 'lucide-react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'Khushboo',
      restaurant: 'Pizza Palace',
      items: ['Margherita Pizza', 'Garlic Bread'],
      amount: 24.99,
      status: 'delivered',
      orderTime: '12:30 PM',
      deliveryTime: '1:05 PM',
      driver: 'Ali Hussain',
      rating: 4.5,
      address: '123 Main St',
      phone: '+1 234-567-8901',
    },
    {
      id: 'ORD-002',
      customer: 'Anmol',
      restaurant: 'Burger House',
      items: ['Classic Burger', 'Fries', 'Coke'],
      amount: 18.5,
      status: 'processing',
      orderTime: '12:45 PM',
      deliveryTime: null,
      driver: 'Raj Kumar',
      rating: null,
      address: '456 Oak Ave',
      phone: '+1 234-567-8902',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);
  const [newOrder, setNewOrder] = useState({
    id: '',
    customer: '',
    restaurant: '',
    items: '',
    amount: '',
    status: 'pending',
    orderTime: '',
    deliveryTime: '',
    driver: '',
    rating: '',
    address: '',
    phone: '',
  });

  const [editingOrder, setEditingOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleNewOrderSubmit = () => {
    if (!newOrder.id || !newOrder.customer) return alert("ID and Customer required");
    const items = newOrder.items.split(',').map((item) => item.trim());
    setOrders([...orders, { ...newOrder, items }]);
    setNewOrder({
      id: '',
      customer: '',
      restaurant: '',
      items: '',
      amount: '',
      status: 'pending',
      orderTime: '',
      deliveryTime: '',
      driver: '',
      rating: '',
      address: '',
      phone: '',
    });
    setShowNewOrderForm(false);
  };

  const handleEditOrder = () => {
    const items = editingOrder.items.split(',').map((i) => i.trim());
    setOrders((prev) =>
      prev.map((order) =>
        order.id === editingOrder.id ? { ...editingOrder, items } : order
      )
    );
    setEditingOrder(null);
  };

  return (
    <div className="orders-page fade-in">
      <div className="page-header">
        <div className="header-content">
          <h1>Orders Management</h1>
          <p>Manage and track all food delivery orders in real-time</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">
            <Download size={18} /> Export Data
          </button>
          <button className="btn btn-primary" onClick={() => setShowNewOrderForm(true)}>
            <Plus size={18} /> New Order
          </button>
        </div>
      </div>

      <div className="orders-controls">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search orders, customers, restaurants..."
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
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="orders-grid">
        {filteredOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-id">{order.id}</div>
              <span className={`status-badge status-${order.status}`}>{order.status}</span>
            </div>
            <div className="order-content">
              <div className="customer-info">
                <h3>{order.customer}</h3>
                <p className="restaurant">{order.restaurant}</p>
              </div>
              <div className="order-details">
                <div className="detail-item"><Clock size={16} /><span>{order.orderTime}</span></div>
                <div className="detail-item"><MapPin size={16} /><span>{order.address}</span></div>
              </div>
              <div className="order-items">
                {order.items.slice(0, 2).map((item, index) => (
                  <span key={index} className="item-tag">{item}</span>
                ))}
                {order.items.length > 2 && (
                  <span className="more-items">+{order.items.length - 2} more</span>
                )}
              </div>
              <div className="order-footer">
                <div className="order-amount">${order.amount}</div>
                <div className="order-actions">
                  <button className="action-btn view-btn" onClick={() => setSelectedOrder(order)}><Eye size={16} /></button>
                  <button className="action-btn edit-btn" onClick={() => setEditingOrder({ ...order, items: order.items.join(', ') })}><Edit size={16} /></button>
                  <select value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value)}>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order Details - {selectedOrder.id}</h3>
              <button className="close-btn" onClick={() => setSelectedOrder(null)}><X /></button>
            </div>
            <div className="modal-body">
              <p><strong>Customer:</strong> {selectedOrder.customer}</p>
              <p><strong>Phone:</strong> {selectedOrder.phone}</p>
              <p><strong>Address:</strong> {selectedOrder.address}</p>
              <p><strong>Items:</strong> {selectedOrder.items.join(', ')}</p>
              <p><strong>Amount:</strong> ${selectedOrder.amount}</p>
            </div>
          </div>
        </div>
      )}

      {showNewOrderForm && (
        <div className="modal-overlay" onClick={() => setShowNewOrderForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>New Order</h3>
              <button className="close-btn" onClick={() => setShowNewOrderForm(false)}><X /></button>
            </div>
            <div className="modal-body">
              <input placeholder="Order ID" value={newOrder.id} onChange={(e) => setNewOrder({ ...newOrder, id: e.target.value })} />
              <input placeholder="Customer" value={newOrder.customer} onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })} />
              <input placeholder="Restaurant" value={newOrder.restaurant} onChange={(e) => setNewOrder({ ...newOrder, restaurant: e.target.value })} />
              <input placeholder="Items (comma-separated)" value={newOrder.items} onChange={(e) => setNewOrder({ ...newOrder, items: e.target.value })} />
              <input placeholder="Amount" type="number" value={newOrder.amount} onChange={(e) => setNewOrder({ ...newOrder, amount: parseFloat(e.target.value) })} />
              <button className="btn btn-primary" onClick={handleNewOrderSubmit}>Add Order</button>
            </div>
          </div>
        </div>
      )}

      {editingOrder && (
        <div className="modal-overlay" onClick={() => setEditingOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Order - {editingOrder.id}</h3>
              <button className="close-btn" onClick={() => setEditingOrder(null)}><X /></button>
            </div>
            <div className="modal-body">
              <input placeholder="Customer" value={editingOrder.customer} onChange={(e) => setEditingOrder({ ...editingOrder, customer: e.target.value })} />
              <input placeholder="Items (comma-separated)" value={editingOrder.items} onChange={(e) => setEditingOrder({ ...editingOrder, items: e.target.value })} />
              <input placeholder="Amount" type="number" value={editingOrder.amount} onChange={(e) => setEditingOrder({ ...editingOrder, amount: parseFloat(e.target.value) })} />
              <button className="btn btn-primary" onClick={handleEditOrder}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
