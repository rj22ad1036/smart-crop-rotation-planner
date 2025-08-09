import ReactDOM from 'react-dom/client';
import SimpleApp from './SimpleApp';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './style.css';




ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID_HERE">
      <SimpleApp />
    </GoogleOAuthProvider>
  
);
