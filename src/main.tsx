import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';
import { HelmetProvider } from 'react-helmet-async';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

// Initialize Convex client
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      afterSignOutUrl="/"
      appearance={{
        variables: {
          colorPrimary: '#FF6B35',
          colorForeground: '#2E2E2E',
          colorPrimaryForeground: '#FFFFFF',
          colorBackground: '#FDF7F2',
          colorInput: '#FFF1E6',
          colorInputForeground: '#2E2E2E',
          colorMutedForeground: '#5A5A5A',
          colorSuccess: '#00A676',
          colorWarning: '#FFD23F',
          colorDanger: '#E85A2A',
        },
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <App />
      </ConvexProviderWithClerk>
    </ClerkProvider>
    </HelmetProvider>
  </React.StrictMode>,
)

