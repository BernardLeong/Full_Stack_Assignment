# Full Stack Assignment – School Management Mock App

This repository contains a **full-stack school management mock application** consisting of two directories:

* `backend` – A TypeScript + Express API
* `frontend` – A ReactJS frontend using Material UI

The live version is deployed at: **[http://34.1.136.254:8080](http://34.1.136.254:8080)**

---

## 🛠️ Running Locally

### 🧰 Prerequisite: Install Node.js & npm (Linux)

If you're on a Debian/Ubuntu-based Linux system, run:

```bash
sudo apt update
sudo apt install -y nodejs npm
```

Check versions to confirm:

```bash
node -v
npm -v
```

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
nvm install --lts
```

### 🧾 Environment Assumption

This guide assumes you're running a **Linux-based local development environment** (e.g., Ubuntu, Debian).
For macOS or Windows users, installation steps will differ slightly (e.g., use Homebrew).

### 1. Clone the Repository

```bash
git clone https://github.com/BernardLeong/Full_Stack_Assignment.git
cd Full_Stack_Assignment
```

---

### 2. Backend Setup

Navigate to the `backend` directory:

```bash
cd backend
```

#### Create a `.env` file with the following content:

```env
API_TEACHER_PREFIX=/api/teachers
API_CLASSES_PREFIX=/api/classes
API_VERSION=v1
PORT=8080
DB_CONNECTION=mysql
DB_HOST=34.27.242.215
DB_PORT=3306
DB_DATABASE=school_db
DB_USERNAME=Teachers
DB_PASSWORD=1k9tPydwB0TB4bmoU1a2
```

#### Install dependencies:

```bash
npm install
```

#### Run the backend server:

For development (with hot reload):

```bash
npm run dev
```

For production:

```bash
npm run build
npm run start
```

---

### 3. Frontend Setup

Navigate to the `frontend` directory:

```bash
cd ../frontend
```

#### Install dependencies:

```bash
npm install
```

#### Start the React app:

```bash
npm start
```

By default, the app runs on: `http://localhost:3000`

Make sure the backend server is accessible at `http://localhost:8080`.

To change the backend URL, update `API_BASE_URL` in `school-app-frontend/src/config.ts`.

---

## 🔍 Assumptions

1. **Node.js & npm Installed**

   * It is assumed the user has Node.js (v18+) and npm already installed on their machine.


2. **Port Availability**

   * Port `8080` (backend) and `3000` (frontend) are free and not blocked or used by other applications.

4. **Network Access**

   * The user has internet access to install npm dependencies or access the hosted backend at `http://34.1.136.254:8080`.

5. **Environment File**

   * The `.env` file is correctly placed in the backend root folder and recommended to not committed to any repository service (Git, Azure DevOps etc).

6. **Frontend API Proxy**

   * The React frontend assumes the backend is available at `http://localhost:8080` or uses the hosted endpoint unless configured otherwise.

7. **No SSL**

   * HTTP (not HTTPS) is used for local development and deployment; secure communication is not required for testing, also it is a matter of finacial cost on my part to get a personal domain.

7. **Local Development Environment**

   * It is recommended to run and test the application in a Linux-based environment for better compatibility and ease of setup.

---

## 📁 Folder Structure

```
Full_Stack_Assignment/
├── school-app-backend/         # Node.js + Express + Sequelize API
├── school-app-frontend/        # React frontend (Material UI)
└── README.md                   # You're here!
└── .gitignore                  # ignore git commits for large folders and senstive creditials
└── school_management_apis.json # an overview on how the api works
```

---

## 📫 Questions?

Feel free to raise an issue or reach out directly if you encounter any setup problems.


## ⚠️ Disclaimer

Hosted VMs and MYSQL instance 30 days from now which is 9 June 2025


## 💡 Suggestions to make app better

Instead of showing the full list of teachers in the dropdown, the API could return only those **available teachers** (i.e., teachers not yet assigned to a class), making the selection cleaner and preventing accidental double assignments.