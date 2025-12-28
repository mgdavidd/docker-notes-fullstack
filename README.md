````md
# Docker Notes Fullstack

Aplicación fullstack de notas construida con **React + Vite**, **Node.js**, **PostgreSQL** y **Docker Compose**.

## 🧱 Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: PostgreSQL
- Infraestructura: Docker & Docker Compose

## 🚀 Características
- Editor de notas con formato tipo Notion
- Persistencia en PostgreSQL
- Hot reload en frontend y backend
- Comunicación entre servicios mediante red interna de Docker
- Proxy en Vite para evitar CORS

## 📦 Requisitos
- Docker
- Docker Compose

## ▶️ Uso

```bash
docker compose up --build
````

* Frontend (host): [http://localhost:5173](http://localhost:5173)
* Backend (host): [http://localhost:3000](http://localhost:3000)
* Backend (Docker network): [http://backend:3000](http://backend:3000)

## 🗂️ Estructura del proyecto

```
.
├── backend
│   ├── Dockerfile
│   └── index.js
├── frontend
│   ├── Dockerfile
│   └── src
├── docker-compose.yml
└── README.md
```

## 🎯 Objetivo

Proyecto de aprendizaje enfocado en:

* Desarrollo fullstack con Docker
* Comunicación entre contenedores
* Flujo real frontend ↔ backend ↔ database

```

**Nombre del repositorio:** `docker-notes-fullstack`
```
