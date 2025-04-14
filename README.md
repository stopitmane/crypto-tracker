## 🛠️ Setup Instructions

1. Clone the Repo

bash
git clone https://github.com/stopitmane/crypto-tracker.git
cd crypto-tracker
2. Install Frontend & Backend Dependencies
bash
Copy code
# Frontend
cd client
npm install

# Backend
cd ../server
npm install


2. In the root (crypto-tracker/), create a package.json script or run manually:

bash
Copy code
# Terminal 1 - Backend
cd server
node index.js

# Terminal 2 - Frontend
cd client
npm run dev
Frontend: http://localhost:5173
Backend API: http://localhost:5000/api/coins

