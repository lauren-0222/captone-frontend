# Live Site
https://captone-frontend.onrender.com

# API Endpoints (Consumed by the Frontend)
Endpoints are implemented by the backend. They’re listed here so reviewers understand what the frontend calls. All protected endpoints require the header:
```Authorization: Bearer <token>```

### Auth

**POST** ```/api/auth/register```

- **Body**: ```{ "name": "Alice", "email": "alice@example.com", "password": "StrongP@ss1" }```

- **Returns**: ```{ "token": "…", "user": { "id": "...", "name": "Alice", "email": "alice@example.com" } }```

- Used by: Register form

**POST** ```/api/auth/login```

- **Body**: { "email": "alice@example.com", "password": "StrongP@ss1" }

- **Returns**: { "token": "…", "user": { "id": "...", "name": "Alice", "email": "alice@example.com" } }

- Used by: Login form

**Projects**

**GET** ```/api/projects``` (protected)

- **Description**: List projects owned by the logged-in user.

- **Returns**: ```[{ _id, name, description, status, createdAt, updatedAt, ... }, ...]```

- Used by: Dashboard (group by ```status```)

**POST** /api/projects (protected)

- **Body**: ```{ "name": "Capstone", "description": "MERN app", "status": "To Do" }```

- **Returns**: The created Project object.

- Used by: “Create Project” form

**GET** ```/api/projects/:id``` (protected; owner only)

- **Description**: Get a single project.

- **Returns**: ```{ _id, name, description, status, ... }```

- Used by: Project page header/details

**PUT** ```/api/projects/:id``` (protected; owner only)

- **Body** ```(any subset): { "name"?, "description"?, "status"?: "To Do"|"In Progress"|"Done" }```

- **Returns**: Updated Project object.

- Used by: Project edit (inline), status dropdown on cards

**DELETE** ```/api/projects/:id``` (protected; owner only)

- **Description**: Delete a project.

- **Returns**: ```{ "message": "Deleted" }```

- Used by: Project delete button

## Tasks (nested under a project)

**GET** ```/api/projects/:projectId/tasks``` (protected; owner of parent project)

- **Description**: List tasks for a project.

- **Returns**: ```[{ _id, project, title, description, status, ... }, ...]```

- Used by: Project page 

**POST** ```/api/projects/:projectId/tasks ```(protected; owner of parent)

- **Body**: ```{ "title": "Build login UI", "description": "…", "status": "To Do" }```

- **Returns**: Created Task object.

- Used by: “Add Task” form

**PUT** ```/api/projects/:projectId/tasks/:taskId ```(protected; owner of parent)

- **Body (any subset)**: ``{ "title"?, "description"?, "status"?: "To Do"|"In Progress"|"Done" }``

- **Returns**: Updated Task object.

- Used by: Task edit (inline) and **status dropdown** per task

**DELETE** ```/api/projects/:projectId/tasks/:taskId``` (protected; owner of parent)

- **Description**: Delete a task.

- **Returns**: ```{ "message": "Deleted" }```

- Used by: Task delete button