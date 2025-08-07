Learning Platform 
A feature-rich, full-stack Learning Management System (LMS) built with modern web technologies. This project is a clone of platforms like Udemy or Coursera, allowing users to create, purchase, and consume online video courses.
The application features robust user authentication, payment processing, video streaming, course progress tracking, and dedicated dashboards for both students and teachers.
✨ Core Features
User Authentication: Secure sign-up and sign-in functionality for students and instructors powered by Clerk.
Course Creation & Management: A dedicated "Teacher mode" for instructors to create, update, and publish courses.
Rich Text Editor: A Notion-style markdown editor for writing detailed course and chapter descriptions.
Video Uploads & Streaming: Seamless video uploading, processing, and secure streaming handled by Mux.
Payment Processing: Secure one-time course purchases integrated with Stripe Checkout.
Course Progress Tracking: Automatic tracking of user progress through chapters and courses.
Advanced Database: Built with a powerful PostgreSQL database and the Drizzle ORM for type-safe database queries.
Search & Filtering: Functionality for students to browse and search for courses by category and title.
Responsive Design: A beautiful and responsive user interface built with Tailwind CSS and Shadcn/UI.
🚀 Tech Stack
Framework: Next.js (App Router)
Language: TypeScript
Styling: Tailwind CSS & Shadcn/UI
Authentication: Clerk
Database ORM: Drizzle ORM
Database: PostgreSQL
Payments: Stripe
Video Processing & Streaming: Mux
Schema Validation: Zod
📂 Folder Structure
This project uses a monolithic repository structure, where the client and server code co-exist within the Next.js App Router. Here is a logical breakdown of the key directories.
Generated code
job-board/
├── .next/              # Next.js build output
├── node_modules/       # Project dependencies
├── public/             # Static assets (images, fonts)
├── src/
│   ├── app/            # └─── CLIENT & SERVER LOGIC (App Router)
│   │   ├── (auth)/     # Clerk authentication routes (sign-in, sign-up)
│   │   ├── (dashboard)/# Protected routes and core application UI
│   │   │   ├── _components/ # UI components specific to the dashboard
│   │   │   ├── courses/     # Course consumption pages for students
│   │   │   ├── search/      # Course browsing and search page
│   │   │   └── layout.tsx   # Shared layout for all dashboard pages
│   │   ├── (teacher)/  # └─── "Teacher Mode" Routes
│   │   │   ├── courses/     # Teacher's dashboard for creating/editing courses
│   │   │   └── analytics/   # Analytics page for teachers
│   │   ├── api/        # └─── SERVER-SIDE API ROUTES
│   │   │   ├── courses/     # API endpoints for course logic
│   │   │   ├── uploadthing/ # API for file uploads
│   │   │   └── webhook/     # Webhooks for Stripe and Clerk
│   │   ├── layout.tsx  # Root layout of the application
│   │   └── page.tsx    # Landing/Home page
│   │
│   ├── components/     # └─── SHARED UI COMPONENTS
│   │   └── ui/         # Shadcn/UI components
│   │
│   ├── drizzle/        # └─── DATABASE SCHEMA
│   │   └── schema.ts   # Drizzle ORM schema definitions for all tables
│   │
│   ├── lib/            # └─── CORE SERVER UTILITIES
│   │   ├── db.ts       # Database connection instance
│   │   ├── stripe.ts   # Stripe client instance
│   │   ├── mux.ts      # Mux client instance
│   │   └── utils.ts    # Utility functions (e.g., cn for Tailwind)
│   │
│   └── scripts/        # └─── UTILITY SCRIPTS
│       └── seed.ts     # Script to seed the database with initial data
│
├── .env.local          # Environment variables (MUST BE CREATED)
├── drizzle.config.ts   # Configuration for Drizzle Kit
├── next.config.js      # Configuration for Next.js
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript compiler configuration
Use code with caution.
🚀 Getting Started
To run this project locally, follow these steps:
 Prerequisites
Node.js (v18 or later recommended)
npm or yarn
A PostgreSQL database (e.g., via Supabase, Vercel Postgres, or a local installation)

Install Dependencies
Generated bash
npm install
Use code with caution.
Bash
Set Up Environment Variables
Create a new file named .env.local in the root of the project and add the following variables. You will need to get these API keys from their respective services.
Generated env
# Database
DATABASE_URL="your_postgresql_connection_string"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Stripe Payments
STRIPE_API_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Mux Video Streaming
MUX_TOKEN_ID="..."
MUX_TOKEN_SECRET="..."

# UploadThing for File Uploads
UPLOADTHING_SECRET="..."
UPLOADTHING_APP_ID="..."
Use code with caution.
Env
Push Database Schema
Push the schema defined in src/drizzle/schema.ts to your PostgreSQL database.
Generated bash
npx drizzle-kit push:pg
Use code with caution.
Bash
6. Run the Development Server
Generated bash
npm run dev
Use code with caution.
Bash
The application should now be running at http://localhost:3000.
🌐 Deployment
This project is optimized for deployment on Vercel.
Step 1: Push to GitHub
Push your project code to a GitHub, GitLab, or Bitbucket repository.
Step 2: Import Project on Vercel
Sign up or log in to your Vercel account.
Click "Add New..." and select "Project".
Import the Git repository you just created. Vercel will automatically detect that it's a Next.js project.
Step 3: Configure Environment Variables
In the project configuration screen, navigate to the Environment Variables section.
Add all the variables from your .env.local file. Important: NEXT_PUBLIC_APP_URL must be updated to your production URL (Vercel will provide this after the first deployment).
Step 4: Deploy
Click the "Deploy" button. Vercel will build and deploy your application.
Step 5: Configure Webhooks (Post-Deployment)
After the first deployment, you will get a production URL (e.g., https://your-app.vercel.app). You must use this URL to set up your webhooks.
Stripe Webhook
Go to your Stripe Dashboard -> Developers -> Webhooks.
Click "Add an endpoint".
For the "Endpoint URL", use https://your-app.vercel.app/api/webhook.
For the events to listen to, select checkout.session.completed.
After creating the endpoint, copy the signing secret and add it as the STRIPE_WEBHOOK_SECRET environment variable in your Vercel project settings.
Clerk Webhook
Go to your Clerk Dashboard -> Webhooks.
Click "Add Endpoint".
For the "Endpoint URL", use https://your-app.vercel.app/api/webhook/clerk.
For the events to listen to, select user.created, user.updated, and user.deleted.
Create the endpoint. If Clerk provides a signing secret, add it as CLERK_WEBHOOK_SECRET in your Vercel environment variables.
Step 6: Redeploy
After adding or updating your environment variables (like the webhook secrets and the production URL), trigger a new deployment on Vercel from the "Deployments" tab to ensure all changes take effect.
44.1s
