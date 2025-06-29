# 🍽️ Foodmato Admin Panel

**Foodmato** is a modern React-based admin panel designed for food delivery management. It features modules for managing orders, restaurants, users, and settings — all within a sleek, customizable dashboard UI.

---

## 📁 Folder Structure

```
src/
├── assets/                 # Static images, icons, or data
├── components/
│   └── layout/             # Layout components (Header, Sidebar, Layout)
│       ├── Header.jsx / .css
│       ├── Sidebar.jsx / .css
│       └── Layout.jsx / .css
├── contexts/               # Context providers (e.g., ThemeContext)
├── pages/                  # Application views
│   ├── Calendar.jsx / .css
│   ├── Dashboard.jsx / .css
│   ├── Kanban.jsx / .css
│   ├── Orders.jsx / .css
│   ├── Restaurants.jsx / .css
│   ├── Settings.jsx / .css
│   └── Users.jsx / .css
├── App.css                 # Global styles
└── App.jsx                 # Main app component
```

---

## 🚀 Features

- 🧩 **Modular Component-Based Structure**
- 🧭 **Sidebar Navigation + Header Layout**
- 🗂️ **Kanban Board** for managing order status with drag & drop
- 🎨 **Dynamic Theme Switching** (Light, Dark, Food themes)
- 🛠️ **Settings Page** for configuring basic site settings
- 📅 **Calendar View**, **User Management**, **Restaurant List** modules

---

## 🛠️ Getting Started

1. **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/foodmato-admin.git
    cd foodmato-admin
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Run the App**
    ```bash
    npm run dev
    ```
    By default, it will run on: [http://localhost:5173](http://localhost:5173)

---

## 🧑‍💻 Built With

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Lucide React](https://lucide.dev/)
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
- CSS Modules / Custom styles

---

## ⚙️ Theme System

Theme is managed using a `ThemeContext` and saved in `localStorage`. Available themes:

- Light
- Dark (default)
- Food Delivery

Switch themes via **Settings → Appearance**.

---

## 📸 Preview

_Add screenshots or GIFs here to show the layout, Kanban board, and theme switcher._

---

## 📦 Deployment

You can deploy this project to:


---

## 📝 License

This project is licensed under the [MIT License](LICENSE).