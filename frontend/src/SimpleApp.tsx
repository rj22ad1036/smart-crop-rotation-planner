
import { useState } from 'react';
import Login from './pages/login';
import './style.css';

interface User {
  name?: string;
  email?: string;
  picture?: string;
  [key: string]: any;
}

function SimpleApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    console.log('User authenticated:', userData);
    setIsAuthenticated(true);
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Show main app if authenticated
  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>🌱 Smart Crop Rotation Planner</h2>
        </div>
        <div className="nav-menu">
          <span>Welcome, {currentUser?.name || currentUser?.email || 'User'}</span>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </nav>
      
      <main className="main-content">
        <div className="page-content">
          <div className="hero-section">
            <h1>🌱 Welcome to Your Crop Planner!</h1>
            <p className="hero-subtitle">Successfully logged in to your account</p>
            
            <div className="features-grid">
              <div className="feature-card">
                <h3>🔄 Rotation Planning</h3>
                <p>Create optimal crop rotation schedules</p>
                <button className="btn btn-primary">Start Planning</button>
              </div>
              
              <div className="feature-card">
                <h3>📊 Analytics</h3>
                <p>Track your crop performance</p>
                <button className="btn btn-primary">View Analytics</button>
              </div>
              
              <div className="feature-card">
                <h3>🌿 Recommendations</h3>
                <p>Get AI-powered suggestions</p>
                <button className="btn btn-primary">Get Suggestions</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SimpleApp;
