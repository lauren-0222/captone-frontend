# Live Site
https://captone-frontend.onrender.com

# API Endpoints
All protected routes require ``` Authorization: Bearer <token> ```. <br>
Ownership enforced, users can only access their projects and their tasks.

### Auth

- **POST** ```/api/auth/register``` <br>
Body: ```{ name, email, password }``` <br>
→ ```{ token, user: { id, name, email } }```

- **POST** ```/api/auth/login```<br>
Body: ```{ email, password }```<br>
→ ```{ token, user: { id, name, email } }```

### Projects

- **GET** ```/api/projects``` (protected)<br>
List my projects.

- **POST** ```/api/projects``` (protected)
Body: ```{ name, description?, status? }```(status: ```'To Do'|'In Progress'|'Done'```, default ```'To Do'```)
Create a project.

- **GET** ```/api/projects/:id``` (protected, owner-only)
Get a single project.

- **PUT** ```/api/projects/:id``` (protected, owner-only)
Body (any subset): ```{ name?, description?, status? }```
Update a project.

- **DELETE** ```/api/projects/:id``` (protected, owner-only)
Delete a project.

### Tasks (nested)

- **GET** ```/api/projects/:projectId/tasks``` (protected, owner of parent)
List tasks for the project.

- **POST** ```/api/projects/:projectId/tasks``` (protected, owner of parent)
Body: ```{ title, description?, status? }``` (default ```'To Do'```)
Create a task.

- **PUT** ```/api/projects/:projectId/tasks/:taskId``` (protected, owner of parent)
Body (any subset): ```{ title?, description?, status? }```
Update a task.

- **DELETE** ```/api/projects/:projectId/tasks/:taskId``` (protected, owner of parent)
Delete a task.

### Models

- **User**: ```{ name, email(unique), password(hashed) }```

- **Project**: ```{ owner:UserRef, name, description, status }```

- **Task**: ```{ project:ProjectRef, title, description, status }```

### Render Deployment 

- **Service Type**: Web Service

- **Root Directory**: ```server```

- **Build Command**: ```npm install```

- **Start Command**: ```npm start```

- **Environment**: set ```MONGO_URI``` and ```JWT_SECRET``` (Render provides ```PORT``` automatically)

### Troubleshooting

- **“Failed to fetch” from client** → API not reachable; confirm logs show “MongoDB connected / API running”.

- **401 Unauthorized** → Missing/invalid ```Authorization: Bearer <token>```.

- **Mongo connection errors** → Check ```MONGO_URI```, Atlas IP allowlist, URL-encoded password.