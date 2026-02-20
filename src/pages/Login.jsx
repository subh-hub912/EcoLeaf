import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { IoLeaf, IoEye, IoEyeOff } from 'react-icons/io5';

export default function Login() {
    const { dispatch } = useApp();
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        hotel: 'Green Valley Resort',
        roomNumber: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: 'LOGIN',
            payload: {
                name: form.name || 'Guest',
                email: form.email,
                hotel: form.hotel,
                roomNumber: form.roomNumber || '204',
                avatar: '🧑',
            },
        });
        navigate('/home');
    };

    return (
        <div className="login-page">
            <motion.div
                className="login-container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="login-header">
                    <motion.div
                        className="login-logo"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        🍃
                    </motion.div>
                    <h1 className="login-title">
                        {isSignup ? 'Join EcoLeaf' : 'Welcome Back'}
                    </h1>
                    <p className="login-subtitle">
                        {isSignup
                            ? 'Start earning rewards for sustainable choices'
                            : 'Continue your green journey'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {isSignup && (
                        <motion.div
                            className="input-group"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                        >
                            <label>Full Name</label>
                            <input
                                className="input-field"
                                type="text"
                                placeholder="Your full name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </motion.div>
                    )}

                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            className="input-field"
                            type="email"
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                className="input-field"
                                type={showPass ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                                style={{ width: '100%', paddingRight: '44px' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    color: 'var(--text-muted)',
                                    padding: 0,
                                    display: 'flex',
                                }}
                            >
                                {showPass ? <IoEyeOff size={18} /> : <IoEye size={18} />}
                            </button>
                        </div>
                    </div>

                    {isSignup && (
                        <>
                            <motion.div
                                className="input-group"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <label>Hotel / Resort</label>
                                <select
                                    className="input-field"
                                    value={form.hotel}
                                    onChange={(e) => setForm({ ...form, hotel: e.target.value })}
                                >
                                    <option value="Green Valley Resort">Green Valley Resort</option>
                                    <option value="Taj Lakefront">Taj Lakefront</option>
                                    <option value="Marriott Green">Marriott Green</option>
                                    <option value="ITC Grand">ITC Grand</option>
                                    <option value="Oberoi Eco">Oberoi Eco</option>
                                </select>
                            </motion.div>

                            <motion.div
                                className="input-group"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <label>Room Number</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    placeholder="e.g., 204"
                                    value={form.roomNumber}
                                    onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
                                />
                            </motion.div>
                        </>
                    )}

                    <motion.button
                        className="btn btn-primary btn-lg login-submit"
                        type="submit"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <IoLeaf size={20} />
                        {isSignup ? 'Create Account' : 'Sign In'}
                    </motion.button>
                </form>

                <div className="login-toggle">
                    <span className="login-toggle-text">
                        {isSignup ? 'Already have an account?' : "Don't have an account?"}
                    </span>
                    <button
                        className="login-toggle-btn"
                        onClick={() => setIsSignup(!isSignup)}
                    >
                        {isSignup ? 'Sign In' : 'Sign Up'}
                    </button>
                </div>
            </motion.div>

            <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-xl) var(--space-md);
        }
        .login-container {
          width: 100%;
          max-width: 420px;
          background: var(--gradient-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-xl);
          padding: var(--space-2xl);
          backdrop-filter: blur(16px);
        }
        .login-header {
          text-align: center;
          margin-bottom: var(--space-xl);
        }
        .login-logo {
          font-size: 3rem;
          display: inline-block;
          margin-bottom: var(--space-sm);
        }
        .login-title {
          font-size: var(--font-3xl);
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: var(--space-xs);
        }
        .login-subtitle {
          font-size: var(--font-sm);
          color: var(--text-muted);
        }
        .login-form { margin-bottom: var(--space-lg); }
        .login-submit {
          width: 100%;
          margin-top: var(--space-sm);
        }
        .login-toggle {
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-xs);
        }
        .login-toggle-text {
          font-size: var(--font-sm);
          color: var(--text-muted);
        }
        .login-toggle-btn {
          background: none;
          color: var(--accent-green);
          font-weight: 600;
          font-size: var(--font-sm);
        }
        .login-toggle-btn:hover { text-decoration: underline; }
      `}</style>
        </div>
    );
}
