import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { BADGE_TIERS } from '../data/mockData';
import { IoTrophy, IoMedal, IoArrowUp, IoArrowDown } from 'react-icons/io5';

export default function Leaderboard() {
  const { leaderboard, state } = useApp();

  const userRank = leaderboard.findIndex((u) => u.isUser) + 1;

  return (
    <div className="page leaderboard-page">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="page-title">Leaderboard</h1>
        <p className="page-subtitle">See how you rank among eco-conscious guests 🏅</p>

        {/* Top 3 Podium */}
        <div className="podium">
          {leaderboard.slice(0, 3).map((user, i) => {
            const badge = BADGE_TIERS.find((b) => b.id === user.badge) || BADGE_TIERS[0];
            const positions = [1, 0, 2];
            const order = positions[i];
            const heights = ['140px', '170px', '115px'];
            const colors = ['#c0c0c0', '#fbbf24', '#cd7f32'];
            const medals = ['🥈', '🥇', '🥉'];

            return (
              <motion.div
                key={user.id}
                className={`podium-item ${user.isUser ? 'is-user' : ''}`}
                style={{ order }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.15 }}
              >
                <div className="podium-avatar">{user.avatar}</div>
                <span className="podium-medal">{medals[i]}</span>
                <span className="podium-name">{user.isUser ? 'You' : user.name.split(' ')[0]}</span>
                <span className="podium-leaves">{user.leaves} 🍃</span>
                <div
                  className="podium-bar"
                  style={{ height: heights[i], background: `linear-gradient(to top, ${colors[i]}30, ${colors[i]}10)` }}
                >
                  <span className="podium-rank">#{i + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Your Rank */}
        {state.isLoggedIn && userRank > 0 && (
          <motion.div
            className="your-rank-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="your-rank-label">Your Rank</span>
            <span className="your-rank-number">#{userRank}</span>
            <span className="your-rank-of">of {leaderboard.length} guests</span>
          </motion.div>
        )}

        {/* Full Leaderboard */}
        <div className="leaderboard-list">
          {leaderboard.map((user, i) => {
            const badge = BADGE_TIERS.find((b) => b.id === user.badge) || BADGE_TIERS[0];
            return (
              <motion.div
                key={user.id}
                className={`leaderboard-row ${user.isUser ? 'is-user' : ''}`}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.04 }}
              >
                <span className="lb-rank">
                  {i < 3 ? ['🥇', '🥈', '🥉'][i] : `#${i + 1}`}
                </span>
                <div className="lb-avatar">{user.avatar}</div>
                <div className="lb-info">
                  <span className="lb-name">{user.isUser ? `${user.name} (You)` : user.name}</span>
                  <span className="lb-hotel">{user.hotel}</span>
                </div>
                <div className="lb-badge-mini">{badge.icon}</div>
                <div className="lb-leaves">
                  <span className="lb-leaves-count">{user.leaves}</span>
                  <span className="lb-leaves-label">🍃</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <style>{`
        .leaderboard-page { max-width: 100%; }

        .podium {
          display: flex; justify-content: center;
          align-items: flex-end; gap: var(--space-sm);
          margin-bottom: var(--space-xl);
          padding: var(--space-md) 0;
        }
        .podium-item {
          display: flex; flex-direction: column;
          align-items: center; gap: 4px;
          min-width: 90px;
        }
        .podium-item.is-user .podium-name { color: var(--accent-green); }
        .podium-avatar { font-size: 2rem; }
        .podium-medal { font-size: 1.2rem; }
        .podium-name {
          font-size: var(--font-sm); font-weight: 600;
          color: var(--text-primary);
        }
        .podium-leaves {
          font-size: var(--font-xs); color: var(--accent-green);
          font-weight: 700;
        }
        .podium-bar {
          width: 100%; border-radius: var(--radius-md) var(--radius-md) 0 0;
          display: flex; align-items: flex-end; justify-content: center;
          padding-bottom: var(--space-sm);
          border: 1px solid var(--border-card);
          border-bottom: none;
        }
        .podium-rank {
          font-size: var(--font-lg); font-weight: 800;
          color: var(--text-muted);
        }

        .your-rank-card {
          display: flex; align-items: center;
          justify-content: center; gap: var(--space-md);
          padding: var(--space-md);
          background: rgba(74, 222, 128, 0.08);
          border: 1px solid rgba(74, 222, 128, 0.2);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-xl);
        }
        .your-rank-label {
          font-size: var(--font-sm); color: var(--text-muted);
        }
        .your-rank-number {
          font-size: var(--font-2xl); font-weight: 800;
          color: var(--accent-green);
        }
        .your-rank-of {
          font-size: var(--font-sm); color: var(--text-muted);
        }

        .leaderboard-list {
          display: flex; flex-direction: column; gap: 4px;
        }
        .leaderboard-row {
          display: flex; align-items: center; gap: var(--space-sm);
          padding: var(--space-sm) var(--space-md);
          background: var(--gradient-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }
        .leaderboard-row:hover { border-color: rgba(74, 222, 128, 0.2); }
        .leaderboard-row.is-user {
          border-color: rgba(74, 222, 128, 0.3);
          background: rgba(74, 222, 128, 0.05);
        }
        .lb-rank {
          width: 36px; text-align: center;
          font-weight: 700; font-size: var(--font-sm);
          color: var(--text-muted);
        }
        .lb-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(74, 222, 128, 0.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
        }
        .lb-info { flex: 1; }
        .lb-name {
          font-size: var(--font-sm); font-weight: 600;
          color: var(--text-primary); display: block;
        }
        .lb-hotel {
          font-size: var(--font-xs); color: var(--text-muted);
        }
        .lb-badge-mini { font-size: 1.1rem; }
        .lb-leaves { text-align: right; }
        .lb-leaves-count {
          font-size: var(--font-md); font-weight: 700;
          color: var(--accent-green);
        }
        .lb-leaves-label { font-size: var(--font-sm); }
      `}</style>
    </div>
  );
}
