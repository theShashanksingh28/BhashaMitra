# BhashaMitra - Language Learning Platform

A comprehensive language learning platform built with React, Vite, and Firebase.

## 🚀 Deployment on Netlify

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Netlify Deployment

1. **Connect your repository to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub/GitLab/Bitbucket repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

3. **Environment Variables (Optional)**
   If you want to use your own Firebase configuration, add these environment variables in Netlify:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Deploy**
   - Netlify will automatically build and deploy your site
   - The site will be available at a Netlify subdomain
   - You can configure a custom domain later

### Troubleshooting

If the build fails:
1. Check that all dependencies are properly listed in `package.json`
2. Ensure all files are committed to the repository
3. Verify that the Node.js version is set to 18 in Netlify
4. Check the build logs for specific error messages

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **UI Components**: Radix UI, Tailwind CSS, Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **Backend**: Firebase (Authentication, Firestore)
- **Deployment**: Netlify

## 📁 Project Structure

```
src/
├── components/     # React components
├── pages/         # Page components
├── contexts/      # React contexts
├── hooks/         # Custom hooks
├── lib/           # Utility libraries
├── data/          # Static data
└── styles/        # CSS styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run generate-levels` - Generate level components 