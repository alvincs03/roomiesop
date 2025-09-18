# RoomiesOp - Chore Accountability for Roommates

A modern web application built with React (Next.js) and Express.js, designed to help roommates stay accountable for household chores and maintain a clean, organized living space.

## 🚀 Features

- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Chore Management**: Add, assign, and track household tasks
- **Real-time Updates**: Mark chores as complete and see progress
- **Priority System**: Organize chores by importance (high, medium, low)
- **Category Organization**: Group chores by type (cleaning, kitchen, etc.)
- **Due Date Tracking**: Never miss a deadline again
- **Firebase Integration**: Secure backend with Firebase

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Firebase** - Authentication and database

### Backend
- **Express.js** - Node.js server
- **Firebase Admin SDK** - Backend Firebase integration
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project

## 🔧 Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install all dependencies (frontend + backend)
npm run install:all
```

### 2. Firebase Setup

#### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard

#### Step 2: Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider

#### Step 3: Create Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for your database

#### Step 4: Set up Firestore Collections
Create these collections in your Firestore database:
- `chores` - for storing household tasks
- `users` - for roommate profiles (optional)

#### Step 5: Get Web App Configuration
1. In Firebase Console, go to "Project Settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (`</>`)
4. Register your app with a nickname
5. Copy the Firebase configuration object

#### Step 6: Configure Frontend Firebase
1. Open `frontend/lib/firebase.js`
2. Replace the placeholder config with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

#### Step 7: Configure Backend Firebase
1. In Firebase Console, go to "Project Settings" > "Service Accounts"
2. Click "Generate new private key"
3. Download the JSON file
4. Copy the contents of the JSON file
5. Create a `.env` file in the `backend` directory:

```bash
# Copy the example file
cp backend/env.example backend/.env
```

6. Edit `backend/.env` and add your Firebase configuration:

```env
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"your-project-id",...}
FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com/
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

### 3. Run the Application

```bash
# Start both frontend and backend in development mode
npm run dev

# Or run them separately:
# Frontend only (runs on http://localhost:3000)
npm run dev:frontend

# Backend only (runs on http://localhost:5000)
npm run dev:backend
```

## 📁 Project Structure

```
roomiesop/
├── frontend/                 # Next.js frontend
│   ├── app/                 # App router pages
│   │   ├── components/      # React components
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── lib/                 # Utilities
│   │   └── firebase.js      # Firebase configuration
│   ├── package.json
│   └── tailwind.config.js
├── backend/                 # Express.js backend
│   ├── server.js           # Main server file
│   ├── package.json
│   └── env.example         # Environment variables template
├── package.json            # Root package.json
└── README.md
```

## 🎨 Customization

### Styling
- Modify `frontend/tailwind.config.js` to customize colors and themes
- Update `frontend/app/globals.css` for global styles
- Component styles are in individual component files

### Features
- Add new API endpoints in `backend/server.js`
- Create new React components in `frontend/app/components/`
- Update the database schema in Firebase Firestore

## 🔒 Security Notes

- Never commit your `.env` files to version control
- Use environment variables for sensitive configuration
- Enable Firebase security rules for production
- Implement proper authentication and authorization

## 🚀 Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Backend (Railway/Heroku)
1. Set environment variables in your hosting platform
2. Deploy your Express.js application
3. Update CORS settings for production domain

## 📞 Support

If you encounter any issues:
1. Check the Firebase configuration
2. Ensure all environment variables are set correctly
3. Verify that Firebase services are enabled
4. Check the browser console and server logs for errors

## 🎯 Next Steps

- [ ] Implement user authentication
- [ ] Add real-time messaging
- [ ] Create user profiles
- [ ] Add image upload functionality
- [ ] Implement search and filtering
- [ ] Add payment integration
- [ ] Create admin dashboard

---

Made with ❤️ for finding perfect roommates!
