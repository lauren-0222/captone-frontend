# Full-Stack MERN Application
### Overview
For my capstone project, I will be building Pro-Tasker, a modern project management tool designed for both individual users and small teams. The application will be a full-stack MERN app (MongoDB, Express, React, Node.js) that integrates secure authentication, robust backend APIs, dynamic frontend features, and full deployment.
The goal of this project is to demonstrate mastery of the entire MERN stack, bringing together everything I have learned — backend architecture, API development, database modeling, frontend state management, and deployment pipelines — into one polished, real-world application.
## Features & Functionality
The application will focus on three major areas:
1. User Management
- Create accounts, log in, and manage sessions securely.
- Secure password handling (bcrypt) and JWT-based authentication.


2. Project & Task Management

- Users can create, update, and delete projects they own.
- Each project contains tasks that can be organized by status (To Do, In Progress, Done).
- Users can view dashboards and project details dynamically.


3. Planned Features <br>
   
**User Management**
- User registration and secure login
- JWT-based session handling
- Secure password hashing with bcrypt
- Logout functionality


**Project Management**
- Create, read, update, and delete (CRUD) projects
- Dashboard view of all user projects
- Individual project detail pages
- Ownership-based authorization (users can only manage their own projects)

**Task Management**
- Add tasks to a project with title, description, and status (“To Do”, “In Progress”, “Done”)
- View all tasks for a given project
- Update task details and status
- Delete tasks from a project

**Frontend User Experience**
- Responsive UI (desktop, tablet, and mobile)
- Component-based design with React
- Context API for authentication and global state
- Client-side routing with react-router-dom
- Clear loading and error feedback for users

**Deployment**
- Backend deployed on Render with MongoDB Atlas connection
- Frontend deployed on Render as a static site
- Live communication between frontend and backend


## Technologies
- **Frontend**: React, Vite, Tailwind CSS (for responsive UI), react-router-dom, Context API

- **Backend**: Node.js, Express.js, MongoDB Atlas, Mongoose


- **Authentication & Security**: JWT, bcrypt, middleware for protected routes


- **Deployment**: Render (backend web service + frontend static site)


