import React, { useState } from "react";
import GoogleLoginButton from '../components/GoogleLoginButton';

interface User {
    name?: string;
    email?: string;
    picture?: string;
    [key: string]: any;
}

interface LoginProps {
    onLogin?: (userData: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState<User | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Replace with actual authentication logic
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }
        setError("");
        
        // TODO: Call login API here
        // For now, create a user object from email/password login
        const userData: User = {
            email: email,
            name: email.split('@')[0] // Use part before @ as name
        };
        
        // Call parent's onLogin function
        if (onLogin) {
            onLogin(userData);
        } else {
            alert("Logged in!");
        }
    };

    const handleGoogleLoginSuccess = (userData: User) => {
        console.log('Google User:', userData);
        setUser(userData);
        // Call parent's onLogin function to authenticate user
        if (onLogin) {
            onLogin(userData);
        }
    };

    const handleGoogleLoginFailure = () => {
        console.error('Google login failed');
    };

    return (
        <div className="login-page">
            <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #ddd", borderRadius: 8 }}>
                <h2>Login</h2>
                
                {/* Google Sign-In Button */}
                <div style={{ marginBottom: 20 }}>
                    <GoogleLoginButton
                        onLoginSuccess={handleGoogleLoginSuccess}
                        onLoginFailure={handleGoogleLoginFailure}
                    />
                </div>

                <div style={{ textAlign: 'center', margin: '20px 0', color: '#666' }}>
                    or continue with email
                </div>

                {/* Email/Password Login Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{ width: "100%", padding: 8, marginTop: 4 }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{ width: "100%", padding: 8, marginTop: 4 }}
                            required
                        />
                    </div>
                    {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
                    <button type="submit" style={{ width: "100%", padding: 10 }}>Login</button>
                </form>

                {/* Display user info after Google login */}
                {user && (
                    <div style={{ marginTop: 20, padding: 16, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
                        <p>Signed in as: {user.name || user.email || 'User'}</p>
                        {user.picture && (
                            <img 
                                src={user.picture} 
                                alt="Profile" 
                                style={{ width: 50, height: 50, borderRadius: '50%' }}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;