import ReactDOM from 'react-dom/client';
import SimpleApp from './SimpleApp';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './style.css';





ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <SimpleApp />
    </GoogleOAuthProvider>
  
);
