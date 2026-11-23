# Employee Directory

Employee Directory is a responsive React application for viewing, searching, filtering, and adding employee records. Existing users are loaded from the public DummyJSON API, while newly created employees are stored locally in the browser.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Application Workflow](#application-workflow)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Environment Notes](#environment-notes)
- [Data Sources and Persistence](#data-sources-and-persistence)
- [Routes](#routes)
- [Search and Filter Behavior](#search-and-filter-behavior)
- [Form Validation](#form-validation)
- [Development Workflow](#development-workflow)
- [Production Build](#production-build)
- [Troubleshooting](#troubleshooting)
- [Known Limitations](#known-limitations)
- [Future Enhancements](#future-enhancements)
- [Author](#author)

## Overview

The application has two main sections:

1. **Employee listing** - Displays a summary, department filters, search controls, employee cards, and a load-more control.
2. **Employee management** - Provides an add-employee form and a detail view for individual employees.

Redux Toolkit maintains employee and filter state. React Router controls page navigation. Vite provides the development server and production build.

## Features

- Loads employee records from DummyJSON.
- Displays employee cards with name, designation, department, and profile image.
- Searches by name, email, or designation.
- Filters employees by department.
- Clears active search and department filters.
- Loads additional employee records in batches.
- Adds locally persisted employees with a default profile image.
- Validates all required employee fields and reports inline errors.
- Shows employee details, personal information, and address.
- Handles loading, empty, API error, and employee-not-found states.
- Provides desktop, tablet, and mobile layouts.

## Tech Stack

| Area | Technology |
|---|---|
| UI | React 19 |
| Language | TypeScript |
| Routing | React Router 7 |
| State management | Redux Toolkit |
| React Redux bindings | React Redux |
| Styling | Tailwind CSS 4 |
| Build tool | Vite 8 |
| Linting | Oxlint |
| External employee data | DummyJSON Users API |
| Local persistence | Browser `localStorage` |

## Application Workflow

```text
Browser
  |
  | loads React application
  v
Redux Provider + BrowserRouter
  |
  +--> App
  |      |
  |      +--> fetchEmployees async thunk
  |      |      |
  |      |      +--> GET https://dummyjson.com/users?limit=20&skip=0
  |      |      |
  |      |      +--> merge locally saved employees with API users
  |      |
  |      +--> employee and filter state in Redux
  |
  +--> / ------------------------ Employee list
  |      |                         |
  |      |                         +--> debounced search
  |      |                         +--> department filter
  |      |                         +--> selector produces filtered list
  |      |                         +--> Load More fetches the next batch
  |
  +--> /add ---------------------- Add employee form
  |      |                         |
  |      |                         +--> field validation
  |      |                         +--> addEmployee async thunk
  |      |                         +--> save in localStorage
  |      |                         +--> redirect to home
  |
  +--> /employee/:id ------------ Employee details
                                   |
                                   +--> use Redux record if already loaded
                                   +--> otherwise fetch from DummyJSON
```

## Project Structure

```text
Employees-Directory/
|
|-- public/                         Static files served as-is
|   |-- default-user.svg
|   |-- favicon.svg
|   `-- icons.svg
|
|-- src/
|   |-- assets/                     Imported images
|   |   |-- hero.png
|   |   `-- user.png
|   |
|   |-- Components/                 Reusable presentation components
|   |   |-- Header.tsx
|   |   |-- SummarySection.tsx
|   |   |-- EmployeeSearchBox.tsx
|   |   |-- EmployeeList.tsx
|   |   `-- EmployeeCard.tsx
|   |
|   |-- Pages/                      Route-level pages
|   |   |-- Home.tsx
|   |   |-- AddEmployee.tsx
|   |   |-- EmployeeDetails.tsx
|   |   `-- NotFound.tsx
|   |
|   |-- features/
|   |   |-- employees/
|   |   |   |-- employeesSlice.ts
|   |   |   `-- employeeSelectors.ts
|   |   `-- filters/
|   |       `-- filtersSlice.ts
|   |
|   |-- hooks/
|   |   |-- useDebounce.ts
|   |   `-- useFetch.ts
|   |
|   |-- store/
|   |   `-- store.ts
|   |
|   |-- App.tsx                    Application routes
|   |-- api.ts                     Employee API and localStorage helpers
|   |-- db.json                    Local reference data
|   |-- index.css                  Global and Tailwind styles
|   |-- main.tsx                   React and Redux entry point
|   `-- types.ts                   Shared TypeScript interfaces
|
|-- index.html
|-- package.json
|-- package-lock.json
|-- tsconfig.json
|-- .gitignore
`-- README.md
```

Generated folders such as `node_modules/` and `dist/` should not be committed. The committed source of truth is the `src/` directory.

## Prerequisites

Install the following before running the project:

- Node.js 20 or a newer supported Node.js LTS release
- npm included with Node.js
- Internet access for the DummyJSON API
- A modern browser

Verify the installation:

```bash
node --version
npm --version
```

## Installation

From Windows PowerShell or Command Prompt:

```powershell
git clone <repository-url>
cd <repository-folder>\Employees-Directory
npm install
npm run dev
```

Open the URL printed by Vite, normally:

```text
http://localhost:5173/
```

Use the repository folder name and URL that match your GitHub clone.

## Available Scripts

Run these commands from the `Employees-Directory` directory:

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm start` | Alias for `npm run dev` |
| `npm run build` | Create an optimized production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint across the project |

Example:

```powershell
npm run lint
npm run build
```

## Environment Notes

This project does not require a `.env` file. API and storage configuration is currently defined directly in the source:

- API URL: `src/api.ts`
- Local storage key: `employees-directory:employees`
- Default profile image: `src/assets/user.png`

The DummyJSON API and browser local storage can change application behavior. The API is external and must remain reachable for remote employee data.

## Data Sources and Persistence

### Existing Employees

The application requests 20 employees first. Additional requests load 10 employees at a time. The API response supplies employee identity, name, contact details, company, address, age, and profile image.

### Locally Added Employees

The add form:

1. Validates the employee fields.
2. Creates a local ID beginning with `local-`.
3. Adds the default profile image.
4. Saves the employee array in browser `localStorage`.
5. Immediately prepends the employee to the Redux employee list.
6. Returns the user to the home page.

Locally added records are browser-specific and are not uploaded to DummyJSON. Clearing the browser's site data removes these records.

Employee data is not permanently shared across devices or browsers.

## Routes

| Route | Component | Purpose |
|---|---|---|
| `/` | `Home` | Employee summary, search, filters, and list |
| `/add` | `AddEmployee` | Add a new employee |
| `/employee/:id` | `EmployeeDetails` | View one employee |
| Any unmatched route | `NotFound` | Not-found page |

## Search and Filter Behavior

- Search text is debounced by 400 milliseconds.
- Search is case-insensitive and matches trimmed text.
- Search matches full name, email, or job designation.
- Department filtering matches the employee's company department.
- `All` removes the department constraint.
- Clearing filters resets search and department state.
- If no record matches, the application displays an empty-result message.

## Form Validation

The add-employee form validates the following fields:

| Field | Rules |
|---|---|
| First name | Required, minimum 3 letters, letters only |
| Last name | Required, minimum 3 letters, letters only |
| Email | Required, valid email format, must be unique |
| Phone | Required, exactly 10 digits |
| Designation | Required |
| Department | Required |
| Age | Required integer from 18 through 100 |
| Address | Required |
| City | Required |
| State | Required |
| Pincode | Required, exactly 6 digits |
| Country | Required |

Validation runs on blur and again at form submission. Invalid submission does not save or navigate.

## Development Workflow

1. Create or select a Git branch.
2. Start the app with `npm run dev`.
3. Make changes in `src/`.
4. Follow the existing Redux slice, selector, component, and page patterns.
5. Run `npm run lint`.
6. Run `npm run build`.
7. Review the UI at the Vite development URL.
8. Commit only source and configuration files.

```powershell
git switch -c feature/your-change
npm run dev
```

Before submitting a change, verify:

- The home page loads successfully.
- Search and department filters return expected records.
- Load More appends records.
- The add form rejects invalid values.
- A valid employee is saved and appears after navigation.
- The employee details page works for an API employee and a local employee.
- Browser navigation does not produce an unknown route.

## Production Build

Create the production bundle:

```powershell
npm run build
```

Preview it locally:

```powershell
npm run preview
```

Deploy the contents of `dist/` to a static web host. Configure the host to route browser paths such as `/add` and `/employee/1` back to `index.html` for client-side routing.

## Troubleshooting

### Development server does not start

```powershell
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

Use this only in the project directory.

### Employee data does not load

- Confirm internet connectivity.
- Open `https://dummyjson.com/users?limit=20&skip=0` in a browser.
- Check browser developer tools for failed network requests.
- Use the retry control on the home page.

### A local employee disappeared

Local employees are stored in the current browser profile. They may disappear if site storage is cleared, private browsing is closed, or browser data is reset.

### A production route shows a server 404

Configure the static host to rewrite unknown paths to `/index.html`.

### Build or lint fails

Run the commands separately to identify the exact source file:

```powershell
npm run lint
npm run build
```

## Known Limitations

- No backend database or shared employee API is implemented.
- Employee creation does not update a remote server.
- Employee editing and deletion are not implemented.
- Authentication and authorization are not implemented.
- Pagination is implemented as incremental loading rather than numbered pages.
- Department options on the home page come from currently loaded employees.
- The application depends on an external API for initial and paginated employee data.

## Future Enhancements

- Add create, edit, and delete APIs through a backend.
- Move persistence from browser local storage to a database.
- Add server-side authentication and role-based access.
- Add sorting and numbered pagination.
- Add image upload and profile image validation.
- Add automated unit, integration, and end-to-end tests.
- Add CI/CD and static-host deployment.
- Add dark mode and expanded accessibility testing.
- Replace the external demo API with organization-owned data.

## Author

**Hariharan**

IT Employee | Aspiring Full-Stack Developer

## License

This project is intended for learning and educational use.
