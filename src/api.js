const api = {
  get token() { return localStorage.getItem('token'); },
  set token(v) { v ? localStorage.setItem('token', v) : localStorage.removeItem('token'); },

  async req(path, options = {}) {
    const res = await fetch(`/api${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        ...(options.headers || {})
      }
    });
    if (!res.ok) {
      let msg = 'Request failed';
      try { msg = (await res.json()).message || msg; } catch {}
      throw new Error(msg);
    }
    return res.json();
  },

  register: (data) => api.req('/auth/register', { method:'POST', body: JSON.stringify(data) }),
  login:    (data) => api.req('/auth/login', { method:'POST', body: JSON.stringify(data) }),

  projects: {
    list:   () => api.req('/projects'),
    create: (data) => api.req('/projects', { method:'POST', body: JSON.stringify(data) }),
    get:    (id) => api.req(`/projects/${id}`),
    update: (id, data) => api.req(`/projects/${id}`, { method:'PUT', body: JSON.stringify(data) }),
    remove: (id) => api.req(`/projects/${id}`, { method:'DELETE' })
  },

  tasks: {
    list:   (projectId) => api.req(`/projects/${projectId}/tasks`),
    create: (projectId, data) => api.req(`/projects/${projectId}/tasks`, { method:'POST', body: JSON.stringify(data) }),
    update: (projectId, taskId, data) => api.req(`/projects/${projectId}/tasks/${taskId}`, { method:'PUT', body: JSON.stringify(data) }),
    remove: (projectId, taskId) => api.req(`/projects/${projectId}/tasks/${taskId}`, { method:'DELETE' })
  }
};

export default api;