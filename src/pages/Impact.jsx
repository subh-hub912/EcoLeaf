import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { IoWater, IoLeaf, IoEarth, IoFlash, IoTrendingUp } from 'react-icons/io5';

export default function Impact() {
  const { state, getTotalImpact } = useApp();
  const impact = getTotalImpact();

  const stats = [
    {
      icon: <IoWater size={28} />,
      value: impact.water,
      unit: 'Litres',
      label: 'Water Saved',
      color: '#38bdf8',
      detail: `That's ${Math.round(impact.water / 150)} bathtubs of water!`,
    },
    {
      icon: <IoLeaf size={28} />,
      value: impact.co2.toFixed(1),
      unit: 'kg',
      label: 'CO₂ Reduced',
      color: '#4ade80',
      detail: `Equivalent to ${impact.trees} tree${impact.trees !== 1 ? 's' : ''} absorbing CO₂ for a year`,
    },
    {
      icon: <IoFlash size={28} />,
      value: impact.actions,
      unit: 'Actions',
      label: 'Eco Actions Taken',
      color: '#fbbf24',
      detail: 'Every small choice makes a big difference',
    },
    {
      icon: <IoEarth size={28} />,
      value: impact.trees,
      unit: 'Trees',
      label: 'Tree Equivalent',
      color: '#2dd4bf',
      detail: 'Trees worth of environmental benefit',
    },
  ];

  return (
    <div className="page impact-page">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="page-title">Your Impact</h1>
        <p className="page-subtitle">The real difference your choices are making 🌍</p>

        {/* Impact Hero */}
        <motion.div
          className="impact-hero"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="impact-earth"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            🌍
          </motion.div>
          <div className="impact-hero-text">
            <h2>You're making a difference!</h2>
            <p>Every sustainable choice helps protect our planet for future generations.</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="impact-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="impact-stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.02, borderColor: `${stat.color}40` }}
              style={{ '--stat-color': stat.color }}
            >
              <div className="stat-icon" style={{ color: stat.color, background: `${stat.color}15` }}>
                {stat.icon}
              </div>
              <div className="stat-value-wrap">
                <motion.span
                  className="stat-value"
                  style={{ color: stat.color }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                >
                  {stat.value}
                </motion.span>
                <span className="stat-unit">{stat.unit}</span>
              </div>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-detail">{stat.detail}</span>
            </motion.div>
          ))}
        </div>

        {/* Impact Timeline / Recent Activity */}
        {state.completedActions.length > 0 && (
          <div className="impact-activity">
            <h3 className="section-title"><IoTrendingUp /> Recent Activity</h3>
            <div className="activity-list">
              {state.completedActions.slice(-5).reverse().map((action, i) => (
                <motion.div
                  key={action.timestamp}
                  className="activity-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                >
                  <div className="activity-dot" />
                  <div className="activity-info">
                    <span className="activity-name">{action.actionId.replace(/-/g, ' ')}</span>
                    <span className="activity-time">{getTimeAgo(action.timestamp)}</span>
                  </div>
                  <span className="activity-leaves">+{action.leaves} 🍃</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {state.completedActions.length === 0 && (
          <motion.div
            className="impact-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span style={{ fontSize: '3rem' }}>🌱</span>
            <h3>Start Your Green Journey</h3>
            <p>Complete sustainable actions to see your environmental impact grow!</p>
          </motion.div>
        )}
      </motion.div>

      <style>{`
        .impact-page { max-width: 100%; }

        .impact-hero {
          display: flex; align-items: center; gap: var(--space-lg);
          padding: var(--space-xl);
          background: radial-gradient(ellipse at center, rgba(45, 212, 191, 0.08) 0%, transparent 70%);
          border: 1px solid rgba(45, 212, 191, 0.15);
          border-radius: var(--radius-xl);
          margin-bottom: var(--space-xl);
        }
        .impact-earth { font-size: 4rem; flex-shrink: 0; }
        .impact-hero-text h2 {
          font-size: var(--font-xl); font-weight: 700;
          color: var(--text-primary); margin-bottom: 4px;
        }
        .impact-hero-text p {
          font-size: var(--font-sm); color: var(--text-muted);
        }

        .impact-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: var(--space-md); margin-bottom: var(--space-xl);
        }
        .impact-stat-card {
          background: var(--gradient-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          display: flex; flex-direction: column;
          gap: 6px;
          transition: all var(--transition-normal);
        }
        .stat-icon {
          width: 48px; height: 48px;
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: var(--space-xs);
        }
        .stat-value-wrap { display: flex; align-items: baseline; gap: 6px; }
        .stat-value {
          font-size: var(--font-3xl); font-weight: 800;
        }
        .stat-unit {
          font-size: var(--font-sm); color: var(--text-muted);
          font-weight: 500;
        }
        .stat-label {
          font-size: var(--font-sm); font-weight: 600;
          color: var(--text-secondary);
        }
        .stat-detail {
          font-size: var(--font-xs); color: var(--text-muted);
          line-height: 1.4;
        }

        .impact-activity { margin-bottom: var(--space-xl); }
        .activity-list { display: flex; flex-direction: column; gap: 2px; }
        .activity-item {
          display: flex; align-items: center; gap: var(--space-sm);
          padding: var(--space-sm) var(--space-md);
          background: var(--gradient-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-sm);
        }
        .activity-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--accent-green);
          flex-shrink: 0;
        }
        .activity-info { flex: 1; }
        .activity-name {
          font-size: var(--font-sm); font-weight: 500;
          color: var(--text-primary); display: block;
          text-transform: capitalize;
        }
        .activity-time {
          font-size: var(--font-xs); color: var(--text-muted);
        }
        .activity-leaves {
          font-size: var(--font-sm); color: var(--accent-green);
          font-weight: 700;
        }

        .impact-empty {
          text-align: center; padding: var(--space-3xl);
          color: var(--text-muted);
        }
        .impact-empty h3 {
          font-size: var(--font-lg); color: var(--text-secondary);
          margin: var(--space-sm) 0;
        }
        .impact-empty p { font-size: var(--font-sm); }

        @media (max-width: 480px) {
          .impact-grid { grid-template-columns: 1fr; }
          .impact-hero { flex-direction: column; text-align: center; }
        }
        @media (min-width: 768px) {
          .impact-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </div>
  );
}

function getTimeAgo(timestamp) {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
