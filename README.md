# 📝 Todo List App

A clean and responsive full-stack **Todo List** application built with:

- ⚛️ React (Vite) – Frontend  
- 🎨 Tailwind CSS – Styling  
- 🖥️ Node.js (Express) – Backend  
- 🗃️ SQLite – Embedded Database  

---

## ✨ Features

- 🔐 User authentication (Sign up / Login)
- ✅ Add, edit, and delete tasks
- 🗓️ View your list of todos
- 📱 Fully responsive design
- 💾 Lightweight and fast with SQLite backend

---

## 🧰 Tech Stack

| Layer       | Technology                |
|-------------|----------------------------|
| Frontend    | React (Vite), Tailwind CSS |
| Backend     | Node.js, Express           |
| Database    | SQLite                     |
| Styling     | Tailwind CSS               |

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v14+ recommended)
- npm (comes with Node)

---

### 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/Todo-List.git
cd Todo-List
```

Install frontend and backend dependencies:

```bash
# Install frontend
cd client
npm install

# Install backend
cd ../server
npm install
```

---

### 🛠️ Run the App

In two terminals, run the frontend and backend:

```bash
# Terminal 1 - Frontend
cd client
npm run dev
```

```bash
# Terminal 2 - Backend
cd server
node index.js
```

SQLite database (`todo.db`) will be created automatically when the server runs for the first time.

---

## 📂 Project Structure

```
Todo-List/
├── client/         # React (Vite) Frontend
│   └── src/
│       └── components/
│       └── pages/
├── server/         # Node.js + Express Backend
│   └── db/         # SQLite database and schema
│   └── routes/
│   └── controllers/
└── README.md
```

---

## 🧪 Example .env file (Optional)

If you use environment variables in your server, create a `.env` file in `/server`:

```
PORT=3001
DB_FILE=./db/todo.db
JWT_SECRET=your-secret-key
```

---

## 🧑‍💻 Author

**Sina Abarashi**  
📬 [GitHub](https://github.com/Synaab)

---

## 📄 License

This project is intended for educational purposes.  
Feel free to fork, use, or build upon it!
