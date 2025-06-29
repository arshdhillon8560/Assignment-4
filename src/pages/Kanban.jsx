import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, MoreHorizontal, Clock, User, DollarSign, MapPin, Star, Phone } from 'lucide-react';
import './Kanban.css';

const initialColumns = {
  pending: {
    id: 'pending',
    title: 'Pending Orders',
    color: '#F39C12',
    orders: []
  },
  preparing: {
    id: 'preparing',
    title: 'Preparing',
    color: '#3498DB',
    orders: []
  },
  ready: {
    id: 'ready',
    title: 'Ready for Pickup',
    color: '#9B59B6',
    orders: []
  },
  'out-for-delivery': {
    id: 'out-for-delivery',
    title: 'Out for Delivery',
    color: '#E67E22',
    orders: []
  },
  delivered: {
    id: 'delivered',
    title: 'Delivered',
    color: '#2ECC71',
    orders: []
  }
};

const Kanban = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    customer: '',
    restaurant: '',
    items: '',
    amount: '',
    orderTime: '',
    address: '',
    phone: '',
    priority: 'normal'
  });

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const draggedOrder = sourceColumn.orders[source.index];

    if (source.droppableId === destination.droppableId) {
      const reordered = [...sourceColumn.orders];
      reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, draggedOrder);
      setColumns({ ...columns, [source.droppableId]: { ...sourceColumn, orders: reordered } });
    } else {
      const newSource = [...sourceColumn.orders];
      newSource.splice(source.index, 1);
      const newDest = [...destColumn.orders];
      newDest.splice(destination.index, 0, draggedOrder);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, orders: newSource },
        [destination.droppableId]: { ...destColumn, orders: newDest }
      });
    }
  };

  const handleAddOrder = () => {
    const newOrder = {
      ...formData,
      id: `ORD-${Date.now()}`,
      items: formData.items.split(',').map(i => i.trim()),
      amount: parseFloat(formData.amount)
    };
    setColumns(prev => ({
      ...prev,
      pending: {
        ...prev.pending,
        orders: [newOrder, ...prev.pending.orders]
      }
    }));
    setShowOrderForm(false);
    setFormData({
      id: '',
      customer: '',
      restaurant: '',
      items: '',
      amount: '',
      orderTime: '',
      address: '',
      phone: '',
      priority: 'normal'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#E74C3C';
      case 'medium': return '#F39C12';
      case 'low': return '#2ECC71';
      default: return '#95A5A6';
    }
  };

  return (
    <div className="kanban-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Order Processing Pipeline</h1>
          <p>Track and manage orders through their delivery lifecycle with drag & drop</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={() => setShowOrderForm(true)}>
            <MoreHorizontal size={18} />
            Options
          </button>
          <button className="btn btn-primary" onClick={() => setShowOrderForm(true)}>
            <Plus size={18} />
            New Order
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {Object.values(columns).map(column => (
            <div key={column.id} className="kanban-column">
              <div className="column-header" style={{ borderTopColor: column.color }}>
                <div className="column-title">
                  <h3>{column.title}</h3>
                  <span className="order-count">{column.orders.length}</span>
                </div>
                <button className="add-order-btn" onClick={() => setShowOrderForm(true)}>
                  <Plus size={16} />
                </button>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`column-content ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                  >
                    {column.orders.map((order, index) => (
                      <Draggable key={order.id} draggableId={order.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`order-card ${snapshot.isDragging ? 'dragging' : ''}`}
                            onClick={() => setSelectedOrder(order)}
                          >
                            <div className="order-header">
                              <div className="order-id">{order.id}</div>
                              <div className="priority-indicator" style={{ backgroundColor: getPriorityColor(order.priority) }}></div>
                            </div>
                            <div className="order-customer"><User size={14} />{order.customer}</div>
                            <div className="order-restaurant">{order.restaurant}</div>
                            <div className="order-items">{order.items.map((item, i) => <span key={i} className="item-tag">{item}</span>)}</div>
                            <div className="order-details">
                              <div className="order-amount"><DollarSign size={14} />${order.amount}</div>
                              <div className="order-time"><Clock size={14} />{order.orderTime}</div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="modal-overlay" onClick={() => setShowOrderForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Order</h3>
              <button className="close-btn" onClick={() => setShowOrderForm(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <input type="text" placeholder="Customer Name" value={formData.customer} onChange={e => setFormData({ ...formData, customer: e.target.value })} />
                <input type="text" placeholder="Restaurant Name" value={formData.restaurant} onChange={e => setFormData({ ...formData, restaurant: e.target.value })} />
                <input type="text" placeholder="Items (comma separated)" value={formData.items} onChange={e => setFormData({ ...formData, items: e.target.value })} />
                <input type="number" placeholder="Amount" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} />
                <input type="text" placeholder="Order Time" value={formData.orderTime} onChange={e => setFormData({ ...formData, orderTime: e.target.value })} />
                <input type="text" placeholder="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                <input type="text" placeholder="Phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                <select value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value })}>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <button className="btn btn-primary full-width" onClick={handleAddOrder}>Add Order</button>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order Details - {selectedOrder.id}</h3>
              <button className="close-btn" onClick={() => setSelectedOrder(null)}>×</button>
            </div>
            <div className="modal-body">
              <p><strong>Customer:</strong> {selectedOrder.customer}</p>
              <p><strong>Phone:</strong> {selectedOrder.phone}</p>
              <p><strong>Restaurant:</strong> {selectedOrder.restaurant}</p>
              <p><strong>Items:</strong> {selectedOrder.items.join(', ')}</p>
              <p><strong>Amount:</strong> ${selectedOrder.amount}</p>
              <p><strong>Address:</strong> {selectedOrder.address}</p>
              <p><strong>Priority:</strong> {selectedOrder.priority}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kanban;
