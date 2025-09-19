# Frontend
## Stack & Dependencies

- **react + react-dom** – UI components and rendering.

- **react-router-dom** – Client-side routing (SPA) and guards (private routes).

- **tailwindcss** – Utility-first CSS for clean, responsive design.

- **postcss + autoprefixer** – Tailwind processing and cross-browser CSS.

- **vite + @vitejs/plugin-react** – Fast dev server and production build.
  <br>
  <br>

**1) Create App & Install**
 ```  
_from the repo root_ <br>
npm create vite@latest client -- --template react
cd client
npm i
npm i react-router-dom
npm i -D tailwindcss postcss autoprefixer @vitejs/plugin-react
npx tailwindcss init -p
```

**2) Configure Tailwind**

``client/tailwind.config.js``
```
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {} },
  plugins: []
}
```

```client/postcss.config.js```
```
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}
```

```client/src/index.css```
```
@tailwind base;
@tailwind components;
@tailwind utilities;

/* small design primitives used across the app */
.btn { @apply px-4 py-2 rounded-xl shadow font-medium hover:opacity-90 transition; }
.card { @apply rounded-2xl shadow p-4 bg-white border; }
.input { @apply border rounded-xl px-3 py-2 w-full; }
.label { @apply text-sm font-medium text-gray-700; }
```
**3) Dev Proxy (avoids CORS in development)**

```client/vite.config.js```
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { '/api': 'http://localhost:5000' }
  }
})
```

In dev, all calls to ```/api/*``` are proxied to the backend at ```http://localhost:5000.```

**4) Run the Frontend**
```
npm run dev
open http://localhost:5173
```
**5) What the Frontend Does**

1. **Routing & access**

- Public Home page.

- Projects (Dashboard) and Project details are private (guarded with a ```<PrivateRoute>```).

- Navbar always shows a Projects tab; when not logged in, clicking it redirects to Login with a friendly “Please log in to view your Projects” message.

2. **Auth flow**

- Register/Login pages perform client-side validation (email format; password strength: length + character classes).

- On success, the client stores the JWT in ```localStorage``` and sets global user state via a Context (```AuthContext```).

- Logout clears the token and redirects to Login.
<br>

3. **Projects & Tasks UI**

- Dashboard groups Projects by status (To Do / In Progress / Done).

- You can create, edit, delete, and change status for projects (status dropdown).

- Project page displays Kanban columns (To Do / In Progress / Done).

- Each Task has a status dropdown, plus edit/delete actions.

- All API calls automatically include the JWT in an Authorization header.

6) Build for Production
```
npm run build
output is in client/dist/
```


(If deploying to Render: deploy the backend as a Web Service and the frontend as a Static Site. Add Static Site Redirects/Rewrites so ```/api/*``` rewrites to your backend’s ```/api/:splat```, and ```/*``` rewrites to ```/index.html```.)

# Quick Start (Both Together)
```
1) Backend
cd server
npm i
# ensure .env is filled (PORT, MONGO_URI, JWT_SECRET)
npm run dev

2) Frontend (new terminal)
cd client
npm i
npm run dev

# Visit http://localhost:5173
# Register a user, then explore Projects and a Project’s tasks.
```
