# Employee Directory

Employee Directory is a responsive web application for viewing and managing employee information. It loads employee records from the public DummyJSON Users API and allows users to search, filter, add, and view employee details.

The project was created to practice React, TypeScript, Redux Toolkit, React Router, Tailwind CSS, API integration, and browser data storage.

## Features

- View a summary of loaded employees and departments
- Load employee records from the DummyJSON Users API
- Search employees by name, email, or job designation
- Filter employees by department
- Clear search and department filters
- Load more employees in batches
- Add a new employee using a validated form
- Save newly added employees in browser `localStorage`
- View personal, company, and address details
- Use responsive layouts on desktop, tablet, and mobile screens
- View loading, error, empty, and employee-not-found states

## Technologies Used

| Area | Technology |
|---|---|
| Frontend | React 19 |
| Language | TypeScript |
| Routing | React Router DOM 7 |
| State Management | Redux Toolkit and React Redux |
| Styling | Tailwind CSS 4 |
| Build Tool | Vite 8 |
| Linter | Oxlint |
| Employee API | DummyJSON Users API |
| Local Storage | Browser `localStorage` |
| Icons | Font Awesome |
| Font | Google Fonts - Poppins |

## Project Folder Structure

```text
Employees-Directory/
├── public/
│   ├── default-user.svg
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   ├── user.png
│   │   └── vite.svg
│   ├── Components/
│   │   ├── EmployeeCard.tsx
│   │   ├── EmployeeList.tsx
│   │   ├── EmployeeSearchBox.tsx
│   │   ├── Header.tsx
│   │   └── SummarySection.tsx
│   ├── Pages/
│   │   ├── AddEmployee.tsx
│   │   ├── EmployeeDetails.tsx
│   │   ├── Home.tsx
│   │   └── NotFound.tsx
│   ├── features/
│   │   ├── employees/
│   │   │   ├── employeesSlice.ts
│   │   │   └── employeeSelectors.ts
│   │   └── filters/
│   │       └── filtersSlice.ts
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   └── useFetch.ts
│   ├── store/
│   │   └── store.ts
│   ├── App.tsx
│   ├── api.ts
│   ├── db.json
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

Folders such as `node_modules/` and `dist/` are generated locally and are not included in the source structure.

## Prerequisites

Before starting, install:

- Node.js 20.19 or newer LTS, or Node.js 22.12 or newer
- npm
- A modern browser
- Internet access to load employee data from DummyJSON

Check the installations:

```bash
node --version
npm --version
```

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/hariharan-hsl/employees-directory.git
   ```

2. Open the project folder:

   ```bash
   cd employees-directory/Employees-Directory
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal. Vite normally uses:

   ```text
   http://localhost:5173/
   ```

## Environment Variables

This project does not currently use a `.env` file or environment variables.

The following values are configured directly in the source code:

| Setting | Location | Current Value |
|---|---|---|
| Employee API URL | `src/api.ts` | `https://dummyjson.com/users` |
| Local employee storage key | `src/api.ts` | `employees-directory:employees` |
| Default employee image | `src/api.ts` | `src/assets/user.png` |

If environment variables are added later, create a `.env` file in the project root, for example:

```env
VITE_API_BASE_URL=https://dummyjson.com/users
```

No such variable is required by the current implementation.

## How to Run the Project

Run commands from the `Employees-Directory` folder.

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm start` | Start the development server using the npm start alias |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

```bash
npm run dev
```

To create and preview a production build:

```bash
npm run build
npm run preview
```

## Application Routes

| Route | Page | Purpose |
|---|---|---|
| `/` | `Home` | Employee summary, search, department filter, and employee list |
| `/add` | `AddEmployee` | Add a new employee |
| `/employee/:id` | `EmployeeDetails` | View one employee |
| Any unmatched URL | `NotFound` | Show a not-found page |

## API Endpoints

There is no custom backend in this project. The frontend directly calls the public DummyJSON API.

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `https://dummyjson.com/users?limit=20&skip=0` | Load the first 20 employees |
| `GET` | `https://dummyjson.com/users?limit=10&skip=<number>` | Load the next 10 employees |
| `GET` | `https://dummyjson.com/users/<id>` | Load one employee by ID |

### Local Data

New employees are not sent to DummyJSON. They are stored only in the browser using this key:

```text
employees-directory:employees
```

The locally saved employee remains available in the same browser and only until browser site data is cleared.

## Search and Add Behavior

- Employee search waits 400 milliseconds after typing before filtering.
- Search is not case-sensitive.
- Search checks the full name, email, and job designation.
- Department filtering uses the employee's company department.
- The add form requires and validates names, email, phone, designation, department, age, address, city, state, pincode, and country.
- Names must contain at least 3 letters.
- Phone numbers must contain exactly 10 digits.
- Age must be an integer from 18 to 100.
- Pincode must contain exactly 6 digits.
- Duplicate email addresses are rejected.
- Added employees receive a local ID beginning with `local-` and use the default profile image.

## Screenshots 

## Destop

### Home Page
<img width="1580" height="739" alt="image" src="https://github.com/user-attachments/assets/797ac073-8669-44d9-b3c9-c1618bf18177" />


### Add Employee Page
<img width="775" height="520" alt="image" src="https://github.com/user-attachments/assets/3ebec726-30be-4127-ae27-8f80e543d443" />
<img width="1583" height="741" alt="image" src="https://github.com/user-attachments/assets/bcaea918-9863-4fb3-bfbb-81a7ff686e89" />


### Employee Details Page

<img width="765" height="396" alt="image" src="https://github.com/user-attachments/assets/4af0b0ce-5bbb-4db2-9c24-26d54ee7c55f" />

### Not Found Page

<img width="761" height="371" alt="image" src="https://github.com/user-attachments/assets/7d8418a4-6112-469e-ac20-7e047971eb60" />


## Mobile

### Home Page

<img width="446" height="655" alt="image" src="https://github.com/user-attachments/assets/7f11e90c-b7c2-431d-baa0-a1344eb29fa1" />

### Add Employee Page

<img width="375" height="604" alt="image" src="https://github.com/user-attachments/assets/4184e6b6-b073-4608-b8fc-2f356ec489b2" />
<img width="349" height="602" alt="image" src="https://github.com/user-attachments/assets/b8cce14e-f835-462c-a26c-7becc5ada9c9" />

### Employee Details Page

<img width="410" height="639" alt="image" src="https://github.com/user-attachments/assets/a6e4fdff-6625-4278-99fb-cc5a805faf6a" />





## Future Improvements

- Add a real backend and database
- Add employee edit and delete functions
- Move employee creation to a shared server API
- Add authentication and role-based access
- Add numbered pagination and sorting
- Allow users to upload profile images
- Add automated unit and end-to-end tests
- Add a CI/CD pipeline
- Add dark mode
- Improve accessibility testing
- Replace DummyJSON with a project-owned API

## Author

**Hariharan**

- GitHub: [hariharan-hsl](https://github.com/hariharan-hsl)
- Email: [harihsl356@gmail.com](mailto:harihsl356@gmail.com)

## License

No license file is currently included in this repository. Therefore, reuse and distribution rights are not granted until the project owner adds a license.
