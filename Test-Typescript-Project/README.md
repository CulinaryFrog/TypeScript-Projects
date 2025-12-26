 A small test full-stack application where applications can be submitted to programs by applicants. Applications can then be viewed and accepted/rejected.


 ### **Current functionality**:
    
-Can check current submissions.
-Can submit an example application.
-Can approve/reject applications.

Todo:
- paginate view 
- have page to put in custom values for applications
### Backend
- Express
- TypeScript (Node.js)
- PostgreSQL
- `pg` (Postgres client)
### Frontend
- React
- TypeScrip
- Vite
- Fetch API
##  Repository Structure
```
.
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   ├── db.ts
│   │   └── routes/
│   │       ├── applications.ts
│   │       └── programs.ts
│   ├── sql/
│   │   ├── 001_schema.sql
│   │   └── 002_seed.sql
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── api.ts
│   │   └── main.tsx
│   ├── index.html
│   └── package.json
│
└── README.md
```
---
Schema is defined in:
```
backend/sql/001_schema.sql
```
### Backend Setup
```bash
cd backend
npm install```

Create a `.env` file:
```env
DATABASE_URL=postgres://username:password@localhost:5432/aidkit
PORT=3000
```
Create and apply seed to the database:
```bash
createdb aidkit
psql -d aidkit -f sql/001_schema.sql
psql -d aidkit -f sql/002_seed.sql
```
Run the backend:
```bash
npm run dev
```
Backend runs at:
```
http://localhost:3000
```
---
### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at:
```
http://localhost:5173
```
---
##  API Endpoints

### Programs

- `GET /programs`  
    Fetch all programs
- `POST /programs`  
    Create a new program
### Applications

- `POST /applications`  
    Submit a new application
    
- `GET /programs/:programId/applications`  
    Fetch applications for a program
    
- `PATCH /applications/:applicationId/status`  
    Approve or reject an application
    
