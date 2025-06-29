import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import {
  TrendingUp, TrendingDown, Users, ShoppingBag, Clock, DollarSign,
  Package, Star, Activity
} from 'lucide-react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const chartRef = useRef(null);
  const orderRef = useRef(null);
  const navigate = useNavigate();

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const revenueData = [
    { month: 'Jan', revenue: 12000, orders: 245, growth: 12 },
    { month: 'Feb', revenue: 19000, orders: 380, growth: 18 },
    { month: 'Mar', revenue: 15000, orders: 320, growth: -8 },
    { month: 'Apr', revenue: 22000, orders: 450, growth: 25 },
    { month: 'May', revenue: 28000, orders: 580, growth: 35 },
    { month: 'Jun', revenue: 35000, orders: 720, growth: 42 }
  ];

  const deliveryTimeData = [
    { day: 'Mon', avg: 28, target: 30, satisfaction: 4.2 },
    { day: 'Tue', avg: 32, target: 30, satisfaction: 4.0 },
    { day: 'Wed', avg: 25, target: 30, satisfaction: 4.5 },
    { day: 'Thu', avg: 29, target: 30, satisfaction: 4.3 },
    { day: 'Fri', avg: 35, target: 30, satisfaction: 3.8 },
    { day: 'Sat', avg: 40, target: 30, satisfaction: 3.5 },
    { day: 'Sun', avg: 38, target: 30, satisfaction: 3.7 }
  ];

  const orderStatusData = [
    { name: 'Completed', value: 65, color: '#2ECC71' },
    { name: 'Processing', value: 20, color: '#3498DB' },
    { name: 'Pending', value: 10, color: '#F39C12' },
    { name: 'Cancelled', value: 5, color: '#E74C3C' }
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '$131,000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'success',
      description: 'vs last month'
    },
    {
      title: 'Total Orders',
      value: '2,695',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'primary',
      description: 'this month'
    },
    {
      title: 'Active Users',
      value: '1,247',
      change: '-2.1%',
      trend: 'down',
      icon: Users,
      color: 'secondary',
      description: 'registered users'
    },
    {
      title: 'Avg Delivery',
      value: '32 min',
      change: '+5.4%',
      trend: 'up',
      icon: Clock,
      color: 'warning',
      description: 'delivery time'
    }
  ];

  const recentOrders = [
    { id: '#12345', customer: 'Arsh Dhillon', restaurant: 'Pizza Palace', amount: '$24.99', status: 'delivered', time: '2 min ago', rating: 5 },
    { id: '#12346', customer: 'Khushboo', restaurant: 'Burger House', amount: '$18.50', status: 'processing', time: '5 min ago', rating: null },
    { id: '#12347', customer: 'Aniket', restaurant: 'Sushi Bar', amount: '$45.00', status: 'pending', time: '8 min ago', rating: null },
    { id: '#12348', customer: 'Anmol', restaurant: 'Taco Express', amount: '$12.75', status: 'delivered', time: '12 min ago', rating: 4 },
    { id: '#12349', customer: 'Jass', restaurant: 'Indian Spice', amount: '$32.25', status: 'cancelled', time: '15 min ago', rating: null }
  ];

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Dashboard Overview</h1>
          <p>Welcome back! Here's what's happening with your food delivery platform today.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={() => scrollToSection(chartRef)}>
            <Activity size={18} />
            Analytics
          </button>
          <button className="btn btn-primary" onClick={() => scrollToSection(orderRef)}>
            <Package size={18} />
            New Order
          </button>
        </div>
      </div>

      {/* STATS + CHARTS */}
      <div ref={chartRef}>
        <div className="stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`stat-card ${stat.color}`}>
                <div className="stat-background"></div>
                <div className="stat-content">
                  <div className="stat-header">
                    <div className="stat-info">
                      <h3>{stat.title}</h3>
                      <p className="stat-description">{stat.description}</p>
                    </div>
                    <div className="stat-icon">
                      <Icon size={24} />
                    </div>
                  </div>
                  <div className="stat-value">{stat.value}</div>
                  <div className={`stat-change ${stat.trend}`}>
                    {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span>{stat.change}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="charts-grid">
          <div className="chart-card revenue-chart">
            <div className="chart-header">
              <div>
                <h3>Revenue & Growth</h3>
                <p>Monthly revenue trends and growth rate</p>
              </div>
              <div className="chart-actions">
                <button className="chart-btn active">6M</button>
                <button className="chart-btn">1Y</button>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="var(--text-secondary)" />
                  <YAxis stroke="var(--text-secondary)" />
                  <Tooltip contentStyle={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#FF6B35"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card delivery-chart">
            <div className="chart-header">
              <div>
                <h3>Delivery Performance</h3>
                <p>Average delivery time vs target</p>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={deliveryTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="var(--text-secondary)" />
                  <YAxis stroke="var(--text-secondary)" />
                  <Tooltip contentStyle={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }} />
                  <Line type="monotone" dataKey="avg" stroke="#4ECDC4" strokeWidth={3} dot={{ fill: '#4ECDC4', strokeWidth: 2, r: 6 }} />
                  <Line type="monotone" dataKey="target" stroke="#FFE66D" strokeDasharray="5 5" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card status-chart">
            <div className="chart-header">
              <div>
                <h3>Order Status Distribution</h3>
                <p>Current order status breakdown</p>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="pie-legend">
              {orderStatusData.map((entry, index) => (
                <div key={index} className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: entry.color }}></div>
                  <span>{entry.name}</span>
                  <span className="legend-value">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div ref={orderRef}>
        <div className="recent-orders">
          <div className="section-header">
            <div>
              <h3>Recent Orders</h3>
              <p>Latest order activity and status updates</p>
            </div>
            <button className="btn btn-outline" onClick={() => navigate('/orders')}>
              View All Orders
            </button>
          </div>
          <div className="orders-list">
            {recentOrders.map((order) => (
              <div key={order.id} className="order-item">
                <div className="order-info">
                  <div className="order-header">
                    <span className="order-id">{order.id}</span>
                    <span className={`status-badge status-${order.status}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <span className="customer-name">{order.customer}</span>
                    <span className="restaurant-name">{order.restaurant}</span>
                  </div>
                </div>
                <div className="order-meta">
                  <div className="order-amount">{order.amount}</div>
                  <div className="order-time">{order.time}</div>
                  {order.rating && (
                    <div className="order-rating">
                      <Star size={14} fill="#FFD700" color="#FFD700" />
                      <span>{order.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
