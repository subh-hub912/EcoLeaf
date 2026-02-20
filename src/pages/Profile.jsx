import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getCurrentBadge, BADGE_TIERS, getProgressToNextBadge } from '../data/mockData';
import {
  IoPersonCircle, IoLogOutOutline, IoSettings, IoLeaf,
  IoRibbon, IoTrophy, IoFlame, IoCalendar, IoLocationOutline
} from 'react-icons/io5';

export default function Profile() {
  const { state, dispatch, currentBadge, nextBadge } = useApp();
  const navigate = useNavigate();
  const progress = getProgressToNextBadge(state.totalLeavesEarned);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const stats = [
    { icon: <IoLeaf size={18} />, label: 'Total Earned', value: `${state.totalLeavesEarned} 🍃`, color: '#4ade80' },
    { icon: <IoTrophy size={18} />, label: 'Actions', value: state.completedActions.length, color: '#fbbf24' },
    { icon: <IoFlame size={18} />, label: 'Streak', value: `${state.streak} days`, color: '#f59e0b' },
    { icon: <IoRibbon size={18} />, label: 'Rewards', value: state.redeemedRewards.length, color: '#a78bfa' },
  ];

  // Badges earned
  const earnedBadges = BADGE_TIERS.filter((b) => state.totalLeavesEarned >= b.requiredLeaves);

  return (
    <div className="page profile-page">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Profile Header */}
        <motion.div
          className="profile-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div
            className="profile-avatar-lg"
            whileHover={{ scale: 1.05 }}
          >
            {state.user.avatar}
          </motion.div>
          <h1 className="profile-name">{state.user.name}</h1>
          <div className="profile-badge-display">
            <span>{currentBadge.icon}</span>
            <span className="profile-badge-name">{currentBadge.name}</span>
          </div>
          <div className="profile-meta">
            <span><IoLocationOutline size={14} /> {state.user.hotel}</span>
            <span><IoCalendar size={14} /> Room {state.user.roomNumber}</span>
          </div>
        </motion.div>

        {/* Balance Bar */}
        <motion.div
          className="profile-balance"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="profile-balance-top">
            <div>
              <span className="pb-label">Available</span>
              <span className="pb-value">{state.leaves} 🍃</span>
            </div>
            {nextBadge && (
              <div style={{ textAlign: 'right' }}>
                <span className="pb-label">Next Badge</span>
                <span className="pb-next">{nextBadge.icon} {nextBadge.name}</span>
              </div>
            )}
          </div>
          {nextBadge && (
            <div className="progress-bar">
              <motion.div
                className="progress-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
          )}
        </motion.div>

        {/* Stats Grid */}
        <div className="profile-stats">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="profile-stat"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              style={{ '--stat-color': stat.color }}
            >
              <div className="ps-icon" style={{ color: stat.color }}>{stat.icon}</div>
              <span className="ps-value">{stat.value}</span>
              <span className="ps-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Badge Showcase */}
        <div className="profile-section">
          <h3 className="section-title"><IoRibbon /> Badges Earned</h3>
          <div className="badge-showcase">
            {BADGE_TIERS.map((badge, i) => {
              const earned = state.totalLeavesEarned >= badge.requiredLeaves;
              return (
                <motion.div
                  key={badge.id}
                  className={`showcase-badge ${earned ? 'earned' : 'locked'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  whileHover={earned ? { scale: 1.1 } : {}}
                >
                  <span className="showcase-icon">{earned ? badge.icon : '🔒'}</span>
                  <span className="showcase-name">{badge.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Logout */}
        <motion.button
          className="btn btn-secondary profile-logout"
          onClick={handleLogout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <IoLogOutOutline size={18} />
          Sign Out
        </motion.button>
      </motion.div>

      <style>{`
        .profile-page { max-width: 100%; }

        .profile-header {
          text-align: center;
          margin-bottom: var(--space-xl);
        }
        .profile-avatar-lg {
          width: 80px; height: 80px;
          border-radius: 50%;
          background: rgba(74, 222, 128, 0.1);
          border: 3px solid var(--border-card);
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 2.5rem;
          margin-bottom: var(--space-sm);
        }
        .profile-name {
          font-size: var(--font-2xl); font-weight: 800;
          color: var(--text-primary); margin-bottom: 4px;
        }
        .profile-badge-display {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 14px;
          background: rgba(74, 222, 128, 0.1);
          border-radius: var(--radius-full);
          margin-bottom: var(--space-sm);
        }
        .profile-badge-name {
          font-size: var(--font-sm); font-weight: 600;
          color: var(--accent-green);
        }
        .profile-meta {
          display: flex; justify-content: center; gap: var(--space-lg);
          font-size: var(--font-xs); color: var(--text-muted);
        }
        .profile-meta span {
          display: flex; align-items: center; gap: 4px;
        }

        .profile-balance {
          padding: var(--space-lg);
          background: var(--gradient-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-xl);
        }
        .profile-balance-top {
          display: flex; justify-content: space-between;
          margin-bottom: var(--space-sm);
        }
        .pb-label {
          font-size: var(--font-xs); color: var(--text-muted);
          display: block; margin-bottom: 2px;
        }
        .pb-value {
          font-size: var(--font-xl); font-weight: 800;
          color: var(--accent-green); display: block;
        }
        .pb-next {
          font-size: var(--font-sm); font-weight: 600;
          color: var(--text-secondary); display: block;
        }

        .profile-stats {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: var(--space-sm);
          margin-bottom: var(--space-xl);
        }
        .profile-stat {
          text-align: center;
          padding: var(--space-md);
          background: var(--gradient-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
        }
        .ps-icon { margin-bottom: 4px; }
        .ps-value {
          font-size: var(--font-lg); font-weight: 700;
          color: var(--text-primary); display: block;
        }
        .ps-label {
          font-size: var(--font-xs); color: var(--text-muted);
        }

        .profile-section { margin-bottom: var(--space-xl); }
        .badge-showcase {
          display: flex; gap: var(--space-sm); flex-wrap: wrap;
        }
        .showcase-badge {
          display: flex; flex-direction: column;
          align-items: center; gap: 4px;
          padding: var(--space-sm) var(--space-md);
          background: var(--gradient-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          min-width: 70px;
        }
        .showcase-badge.locked { opacity: 0.4; }
        .showcase-badge.earned {
          border-color: rgba(74, 222, 128, 0.2);
        }
        .showcase-icon { font-size: 1.5rem; }
        .showcase-name {
          font-size: var(--font-xs); color: var(--text-muted);
          font-weight: 500;
        }

        .profile-logout {
          width: 100%;
          margin-top: var(--space-md);
          padding: var(--space-md);
        }

        @media (max-width: 480px) {
          .profile-stats { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
