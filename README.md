📚 Learning Platform
A full-stack Learning Management System (LMS) similar to Udemy or Coursera. This application allows instructors to create and manage courses and students to purchase, view, and track their learning progress.

🚀 Features
🔐 User authentication with Clerk

📼 Video upload and playback with Mux

💳 Payments powered by Stripe

📊 Course progress tracking

🧑‍🏫 Instructor & Student dashboards

📁 File uploads via UploadThing

🛠️ Backend built with Node.js, PostgreSQL, and REST APIs

🎯 Frontend with Next.js (App Router), TypeScript, and TailwindCSS

📁 Project Structure
pgsql
Copy
Edit
/Learning-platform
├── client/               # Frontend (Next.js App Router)
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   ├── public/
│   └── package.json
├── server/               # Backend (Express.js + PostgreSQL)
│   ├── controllers/
│   ├── routes/
│   ├── prisma/ (if Prisma is used)
│   └── server.js
├── .env.local
└── README.md
🛠️ Tech Stack
Area	Tech
Frontend	Next.js (App Router), TypeScript, TailwindCSS
Backend	Node.js, Express.js, PostgreSQL
Auth	Clerk
Payments	Stripe
Media	Mux (video), UploadThing (files)
Deployment	Vercel (client), Render / Railway / Fly.io (server)

⚙️ Environment Variables
Create .env.local at both the client and server levels:

📦 Client (client/.env.local)
env
Copy
Edit
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
🔧 Server (server/.env)
env
Copy
Edit
PORT=5000
DATABASE_URL=postgresql://user:password@host:port/db
CLERK_SECRET_KEY=...
STRIPE_SECRET_KEY=sk_test_...
MUX_TOKEN_ID=...
MUX_TOKEN_SECRET=...
UPLOADTHING_SECRET=...
UPLOADTHING_APP_ID=...
🧑‍💻 Getting Started
.Set up the client
bash
Copy
Edit
cd client
npm install
# or yarn install
npm run dev
 Set up the server
bash
Copy
Edit
cd server
npm install
# Set up your PostgreSQL database and run schema SQL if required
npm start
🌐 Deployment Guide
✅ Deploy Client (Vercel)
Push the client/ folder to a GitHub repo.

Import into Vercel.

Add environment variables from .env.local.

Set root directory to client/.

Deploy!

✅ Deploy Server (Railway/Render)
Push the server/ folder to a new GitHub repo.

Import into Render or Railway.

Add environment variables from .env.

Connect PostgreSQL database (Render/Neon/Supabase).

Deploy server and get the API base URL.

Make sure CORS and production URLs are properly configured on both sides.

🧪 API Routes (Server)
Method	Endpoint	Description
GET	/courses	Get all courses
POST	/courses	Create a new course
POST	/webhook/stripe	Handle Stripe events
POST	/webhook/clerk	Handle Clerk user events

Exact endpoints may vary based on implementation. Update accordingly.

📷 Screenshots
You can add relevant screenshots or Loom walkthroughs here.

🤝 Contributing
Fork the repo

Create a new branch (git checkout -b feature/my-feature)

Commit your changes (git commit -m 'Add feature')

Push to the branch (git push origin feature/my-feature)

Open a Pull Request

🪪 License
MIT License — free to use, distribute, and modify.
