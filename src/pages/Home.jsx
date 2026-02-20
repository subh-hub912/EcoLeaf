import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getProgressToNextBadge, SUSTAINABLE_ACTIONS, DAILY_CHALLENGES, IMPACT_FACTS } from '../data/mockData';
import {
    IoLeaf, IoFlame, IoTrophy, IoArrowForward,
    IoSparkles, IoEarth, IoGift, IoRibbon
} from 'react-icons/io5';
import { useState, useEffect } from 'react';

export default function Home() {
    const { state, currentBadge, nextBadge, getTotalImpact } = useApp();
    const progress = getProgressToNextBadge(state.totalLeavesEarned);
    const impact = getTotalImpact();
    const [fact, setFact] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setFact((f) => (f + 1) % IMPACT_FACTS.length), 5000);
        return () => clearInterval(timer);
    }, []);

    const quickActions = SUSTAINABLE_ACTIONS.slice(0, 4);
    const todayChallenges = DAILY_CHALLENGES.slice(0, 2);

    return (
        <div className="page home-page">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                {/* Greeting */}
                <motion.div
                    className="home-greeting"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div>
                        <p className="greeting-text">Good {getTimeOfDay()} 👋</p>
                        <h1 className="greeting-name">{state.user.name}</h1>
                        <p className="greeting-hotel">{state.user.hotel} • Room {state.user.roomNumber}</p>
                    </div>
                    <Link to="/profile" className="home-avatar">
                        <span>{state.user.avatar}</span>
                    </Link>
                </motion.div>

                {/* Leaf Balance Card */}
                <motion.div
                    className="home-balance-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.01 }}
                >
                    <div className="balance-top">
                        <div className="balance-info">
                            <span className="balance-label-sm">Your EcoLeaves</span>
                            <div className="balance-value">
                                <motion.span
                                    key={state.leaves}
                                    initial={{ scale: 1.3, color: '#4ade80' }}
                                    animate={{ scale: 1, color: '#ecfdf5' }}
                                    transition={{ duration: 0.4 }}
                                    className="balance-number"
                                >
                                    {state.leaves}
                                </motion.span>
                                <span className="balance-leaf">🍃</span>
                            </div>
                        </div>
                        <div className="balance-badge">
                            <span className="badge-icon-lg">{currentBadge.icon}</span>
                            <span className="badge-name-sm">{currentBadge.name}</span>
                        </div>
                    </div>

                    {nextBadge && (
                        <div className="balance-progress">
                            <div className="progress-info">
                                <span>Next: {nextBadge.icon} {nextBadge.name}</span>
                                <span>{state.totalLeavesEarned}/{nextBadge.requiredLeaves} 🍃</span>
                            </div>
                            <div className="progress-bar">
                                <motion.div
                                    className="progress-bar-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                                />
                            </div>
                        </div>
                    )}

                    {state.streak > 0 && (
                        <div className="balance-streak">
                            <IoFlame size={16} color="#f59e0b" />
                            <span>{state.streak} day streak!</span>
                        </div>
                    )}

                    {state.multiplier > 1 && (
                        <div className="balance-multiplier">
                            <IoSparkles size={16} color="#a78bfa" />
                            <span>{state.multiplier}x multiplier active!</span>
                        </div>
                    )}
                </motion.div>

                {/* Quick Actions Grid */}
                <div className="home-section">
                    <div className="section-header">
                        <h2 className="section-title"><IoLeaf /> Quick Actions</h2>
                        <Link to="/actions" className="section-link">View All <IoArrowForward size={14} /></Link>
                    </div>
                    <div className="home-quick-grid">
                        {quickActions.map((action, i) => (
                            <motion.div
                                key={action.id}
                                className="quick-action-card"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.08 }}
                                whileHover={{ scale: 1.03, borderColor: 'rgba(74, 222, 128, 0.3)' }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Link to="/actions" className="quick-action-link">
                                    <span className="quick-action-icon">{action.icon}</span>
                                    <span className="quick-action-name">{action.title}</span>
                                    <span className="quick-action-leaves">+{action.leaves} 🍃</span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Today's Challenges */}
                <div className="home-section">
                    <div className="section-header">
                        <h2 className="section-title"><IoFlame /> Today's Challenges</h2>
                        <Link to="/challenges" className="section-link">View All <IoArrowForward size={14} /></Link>
                    </div>
                    {todayChallenges.map((challenge, i) => (
                        <motion.div
                            key={challenge.id}
                            className="home-challenge-card"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                        >
                            <span className="challenge-icon">{challenge.icon}</span>
                            <div className="challenge-info">
                                <span className="challenge-title">{challenge.title}</span>
                                <span className="challenge-desc">{challenge.description}</span>
                            </div>
                            <span className="challenge-reward">+{challenge.reward} 🍃</span>
                        </motion.div>
                    ))}
                </div>

                {/* Quick Links */}
                <div className="home-section">
                    <div className="home-links-grid">
                        {[
                            { to: '/rewards', icon: <IoGift size={22} />, label: 'Rewards', color: '#fbbf24' },
                            { to: '/badges', icon: <IoRibbon size={22} />, label: 'Badges', color: '#a78bfa' },
                            { to: '/leaderboard', icon: <IoTrophy size={22} />, label: 'Ranks', color: '#38bdf8' },
                            { to: '/impact', icon: <IoEarth size={22} />, label: 'Impact', color: '#2dd4bf' },
                        ].map((link, i) => (
                            <motion.div
                                key={link.to}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + i * 0.08 }}
                            >
                                <Link to={link.to} className="home-link-card" style={{ '--link-color': link.color }}>
                                    <span className="home-link-icon">{link.icon}</span>
                                    <span className="home-link-label">{link.label}</span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Impact Fact Ticker */}
                <motion.div
                    className="home-fact-card"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <IoEarth size={18} color="var(--accent-teal)" />
                    <motion.span
                        key={fact}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fact-text"
                    >
                        {IMPACT_FACTS[fact]}
                    </motion.span>
                </motion.div>
            </motion.div>

            <style>{`
        .home-page { max-width: 100%; }
        .home-greeting {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: var(--space-lg);
        }
        .greeting-text { font-size: var(--font-sm); color: var(--text-muted); }
        .greeting-name {
          font-size: var(--font-2xl);
          font-weight: 700;
          color: var(--text-primary);
          margin: 2px 0;
        }
        .greeting-hotel { font-size: var(--font-xs); color: var(--text-muted); }
        .home-avatar {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: rgba(74, 222, 128, 0.1);
          border: 2px solid var(--border-card);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
          text-decoration: none;
        }

        .home-balance-card {
          background: var(--gradient-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-xl);
          padding: var(--space-lg);
          margin-bottom: var(--space-xl);
        }
        .balance-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-md);
        }
        .balance-label-sm { font-size: var(--font-xs); color: var(--text-muted); }
        .balance-value { display: flex; align-items: baseline; gap: 8px; }
        .balance-number { font-size: var(--font-4xl); font-weight: 800; }
        .balance-leaf { font-size: 2rem; }
        .balance-badge { text-align: center; }
        .badge-icon-lg { font-size: 2.5rem; display: block; }
        .badge-name-sm {
          font-size: var(--font-xs);
          color: var(--text-secondary);
          font-weight: 600;
        }
        .balance-progress { margin-top: var(--space-sm); }
        .progress-info {
          display: flex;
          justify-content: space-between;
          font-size: var(--font-xs);
          color: var(--text-muted);
          margin-bottom: 6px;
        }
        .balance-streak, .balance-multiplier {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: var(--space-sm);
          font-size: var(--font-xs);
          color: var(--accent-gold);
          font-weight: 600;
        }
        .balance-multiplier { color: var(--accent-purple); }

        .home-section { margin-bottom: var(--space-xl); }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-md);
        }
        .section-link {
          font-size: var(--font-xs);
          color: var(--accent-green);
          display: flex; align-items: center; gap: 4px;
          font-weight: 500;
        }

        .home-quick-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-sm);
        }
        .quick-action-card {
          background: var(--gradient-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: all var(--transition-normal);
        }
        .quick-action-link {
          display: flex; flex-direction: column;
          align-items: center; gap: 6px;
          padding: var(--space-md);
          text-decoration: none; color: inherit;
        }
        .quick-action-icon { font-size: 1.8rem; }
        .quick-action-name {
          font-size: var(--font-sm); font-weight: 600;
          color: var(--text-primary); text-align: center;
        }
        .quick-action-leaves {
          font-size: var(--font-xs); color: var(--accent-green);
          font-weight: 700;
        }

        .home-challenge-card {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-md);
          background: var(--gradient-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-sm);
        }
        .challenge-icon { font-size: 1.5rem; }
        .challenge-info { flex: 1; display: flex; flex-direction: column; }
        .challenge-title { font-size: var(--font-sm); font-weight: 600; }
        .challenge-desc { font-size: var(--font-xs); color: var(--text-muted); }
        .challenge-reward {
          font-size: var(--font-sm); color: var(--accent-green);
          font-weight: 700; white-space: nowrap;
        }

        .home-links-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-sm);
        }
        .home-link-card {
          display: flex; flex-direction: column;
          align-items: center; gap: 8px;
          padding: var(--space-md);
          background: var(--gradient-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: all var(--transition-normal);
        }
        .home-link-card:hover {
          border-color: var(--link-color, var(--accent-green));
          box-shadow: 0 0 16px color-mix(in srgb, var(--link-color, var(--accent-green)) 20%, transparent);
        }
        .home-link-icon { color: var(--link-color, var(--accent-green)); }
        .home-link-label {
          font-size: var(--font-xs); font-weight: 600;
          color: var(--text-secondary);
        }

        .home-fact-card {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-md);
          background: rgba(45, 212, 191, 0.05);
          border: 1px solid rgba(45, 212, 191, 0.15);
          border-radius: var(--radius-md);
        }
        .fact-text {
          font-size: var(--font-xs);
          color: var(--text-secondary);
          line-height: 1.4;
        }

        @media (max-width: 480px) {
          .home-links-grid { grid-template-columns: repeat(2, 1fr); }
          .home-quick-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 768px) {
          .home-quick-grid { grid-template-columns: repeat(4, 1fr); }
          .home-links-grid { grid-template-columns: repeat(5, 1fr); }
        }
      `}</style>
        </div>
    );
}

function getTimeOfDay() {
    const h = new Date().getHours();
    if (h < 12) return 'Morning';
    if (h < 17) return 'Afternoon';
    return 'Evening';
}
