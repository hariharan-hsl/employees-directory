# 👥 Employees Directory

A modern and responsive **Employee Directory Web Application** built using React.js. This application helps users view, search, and filter employee information through a clean and user-friendly interface.

## 📌 Project Overview

The Employees Directory is designed to organize employee information in one place. Users can view employee details, search for employees by name, and filter employees based on their departments.

This project demonstrates React component-based architecture, state management, reusable components, and dynamic rendering.

## ✨ Features

- **Employee Listing** – Display employee details in a structured card layout.
- **Add Employees** – Save new employees, addresses, and pincodes in browser local storage with a default profile photo. DummyJSON simulates writes and does not persist them on its server.
- **Search Employees** – Find employees by name using the search functionality.
- **Department Filter** – Filter employees based on their departments.
- **Summary Section** – Display employee statistics and summary information.
- **Reusable Components** – Build the application using reusable React components.
- **Dynamic Rendering** – Render employee data dynamically using the JavaScript `map()` method.
- **State Management** – Manage employee data and filters with Redux Toolkit, async thunks, and selectors.
- **Responsive Design** – Provide a user-friendly experience across desktop, tablet, and mobile devices.
- **Clean UI** – Simple and professional interface for managing employee information.

## 🛠️ Technologies Used

- **React.js** – Build the user interface using reusable components.
- **JavaScript (ES6+)** – Implement application logic and interactive functionality.
- **HTML5** – Structure the application.
- **CSS3** – Style the interface and create responsive layouts.
- **Vite** – Development server and build tool.
- **Git & GitHub** – Version control and source code management.

## 📂 Project Structure

```text
Employees-Directory/
│
├── public/
│
├── src/
│   ├── Components/
│   │   ├── Header.jsx
│   │   ├── SummarySection.jsx
│   │   ├── EmployeeSearchBox.jsx
│   │   └── EmployeeList.jsx
│   │
│   ├── data.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
└── README.md
```

*Note: The folder structure above is a reference. Update it if your actual project structure is different.*

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Folder

```bash
cd Employees-Directory
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the Application

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## 💻 How It Works

1. Existing employee information is loaded from DummyJSON. Employees added through the form are saved in browser local storage and remain available in that browser after refresh.
2. Redux Toolkit loads employees with `fetchEmployees` and saves new employees from the add form.
3. The filters slice stores search and department values; selectors calculate filtered employees and department counts.
4. React components read state with `useSelector` and update it with `useDispatch`.
6. The employee list updates automatically when the search or department selection changes.

## 🎯 Learning Outcomes

By building this project, you can gain practical experience in:

- React functional components.
- Props and component communication.
- React `useState` hook.
- JavaScript array methods such as `map()` and `filter()`.
- Search and filtering functionality.
- Dynamic rendering with unique React keys.
- Component-based project organization.
- Responsive web design.
- Managing project dependencies with npm.
- Version control using Git and GitHub.

## 🚀 Future Enhancements

The application can be extended with the following features:

- Add new employees through a form.
- Edit existing employee information.
- Delete employee records.
- Connect a backend API using Node.js and Express.js.
- Store employee data in MongoDB.
- Add authentication and role-based access control.
- Implement pagination and sorting.
- Add employee profile pages.
- Introduce dark mode.

## 🔮 Future Scope

The project can be developed into a full-stack employee management system using the MERN stack:

- **MongoDB** – Store employee records.
- **Express.js** – Create backend API endpoints.
- **React.js** – Build the frontend interface.
- **Node.js** – Handle server-side operations.

This would allow employee information to be managed through a database instead of static JavaScript data.

## 👨‍💻 Author

**Hariharan**

IT Student | Aspiring Full-Stack Developer

## 📄 License

This project is developed for learning and educational purposes. You may adapt it for personal projects and further development.
