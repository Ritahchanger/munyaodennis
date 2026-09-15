# munyaodennis

Dennis Munyao's personal developer portfolio — a full-stack site with a public-facing profile/projects/articles showcase and a private admin dashboard for managing that content.

## Stack

**Client** (`client/`)
- React 19 + TypeScript, Vite
- Redux Toolkit + RTK Query
- React Router 7
- Tailwind CSS 4
- PWA (installable, offline update prompt)

**Server** (`server/`)
- ASP.NET Core Web API (.NET)
- MongoDB (official .NET driver)
- JWT authentication (BCrypt-hashed passwords)
- Modular structure: one folder per domain (Auth, Profile, Projects, Works, Articles, SocialLinks), each with its own controller, service, repository, DTOs, and entity

## Features

- **Public site:** home/hero, projects, works (categorized, paginated, searchable), articles feed, and links out to GitHub, LinkedIn, Medium, and Substack.
- **Admin dashboard** (`/dashboard`, JWT-protected): manage projects, works, articles, social links, and profile; change password.
- Static file serving for uploaded images at `/uploads`, stored in the repo-root `uploads/` folder (shared by client and server, outside both app trees).

## Project structure

```
client/    React SPA (Vite)
server/    ASP.NET Core API (see server/src/PortfolioApi)
uploads/   Shared static file storage for project/article images
```

## Getting started

### Prerequisites

- Node.js 20+
- .NET SDK (matching `server/src/PortfolioApi/PortfolioApi.csproj`)
- MongoDB running locally (`mongodb://localhost:27017` by default)

### Server

```bash
cd server
make restore   # dotnet restore
make run       # http://localhost:5000
# or: make watch  for hot reload
```

Config lives in `server/src/PortfolioApi/appsettings.json` (Mongo connection, JWT issuer/audience/expiry) and `appsettings.Development.json` (JWT secret for local dev). On first run with an empty database, a demo admin user is seeded — see `Modules/Auth/Seed/AuthSeeder.cs`. **Replace the JWT secret and seeded admin credentials before deploying anywhere real.**

Swagger UI is available at `/swagger` in Development.

### Client

```bash
cd client
cp .env.example .env   # set VITE_API_BASE_URL if the API isn't on localhost:5000
npm install
npm run dev            # http://localhost:5173
```

Other scripts: `npm run build`, `npm run lint`, `npm run preview`.

## Notes

- The API's CORS policy currently allows only `http://localhost:5173`; update it before pointing a deployed client at a deployed API.
- Uploaded images go in `uploads/projects/` and `uploads/articles/`.
