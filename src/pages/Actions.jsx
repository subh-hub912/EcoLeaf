import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { SUSTAINABLE_ACTIONS } from '../data/mockData';
import { IoLeaf, IoCheckmarkCircle, IoTimeOutline, IoFilter } from 'react-icons/io5';

const categories = ['All', 'Room', 'Dining', 'Activity', 'General'];

export default function Actions() {
  const { state, dispatch, isActionOnCooldown } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [completingId, setCompletingId] = useState(null);

  const filtered = selectedCategory === 'All'
    ? SUSTAINABLE_ACTIONS
    : SUSTAINABLE_ACTIONS.filter((a) => a.category === selectedCategory);

  const handleComplete = (action) => {
    if (isActionOnCooldown(action.id, action.cooldown)) return;
    setCompletingId(action.id);
    setTimeout(() => {
      dispatch({
        type: 'COMPLETE_ACTION',
        payload: {
          actionId: action.id,
          leaves: action.leaves,
          impact: action.impact,
        },
      });
      setCompletingId(null);
    }, 600);
  };

  return (
    <div className="page actions-page">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="page-title">Eco Actions</h1>
        <p className="page-subtitle">Make sustainable choices, earn EcoLeaves 🍃</p>

        {/* Category Filter */}
        <div className="actions-filter">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Actions List */}
        <div className="actions-list">
          <AnimatePresence mode="wait">
            {filtered.map((action, i) => {
              const onCooldown = isActionOnCooldown(action.id, action.cooldown);
              const isCompleting = completingId === action.id;

              return (
                <motion.div
                  key={action.id}
                  className={`action-card ${onCooldown ? 'cooldown' : ''} ${isCompleting ? 'completing' : ''}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.05 }}
                  layout
                >
                  <div className="action-icon-wrap">
                    <span className="action-icon">{action.icon}</span>
                  </div>

                  <div className="action-content">
                    <div className="action-header">
                      <h3 className="action-title">{action.title}</h3>
                      <span className="badge badge-green">+{action.leaves} 🍃</span>
                    </div>
                    <p className="action-desc">{action.description}</p>
                    <p className="action-nudge">💡 {action.nudge}</p>
                    <div className="action-impact">
                      {action.impact.water > 0 && <span>💧 {action.impact.water}L saved</span>}
                      {action.impact.co2 > 0 && <span>🌱 {action.impact.co2}kg CO₂ reduced</span>}
                    </div>
                  </div>

                  <div className="action-cta">
                    {onCooldown ? (
                      <div className="action-done">
                        <IoCheckmarkCircle size={20} color="var(--accent-green)" />
                        <span>Done</span>
                      </div>
                    ) : (
                      <motion.button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleComplete(action)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isCompleting}
                      >
                        {isCompleting ? (
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                          >
                            🍃
                          </motion.span>
                        ) : (
                          <>
                            <IoLeaf size={14} />
                            Earn
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      <style>{`
        .actions-page { max-width: 100%; }
        .actions-filter {
          display: flex; gap: 8px; flex-wrap: wrap;
          margin-bottom: var(--space-lg);
        }
        .filter-chip {
          padding: 6px 16px;
          border-radius: var(--radius-full);
          font-size: var(--font-xs);
          font-weight: 600;
          background: rgba(74, 222, 128, 0.08);
          color: var(--text-muted);
          border: 1px solid var(--border-card);
          transition: all var(--transition-fast);
        }
        .filter-chip.active {
          background: rgba(74, 222, 128, 0.15);
          color: var(--accent-green);
          border-color: rgba(74, 222, 128, 0.3);
        }
        .filter-chip:hover:not(.active) {
          border-color: rgba(74, 222, 128, 0.2);
          color: var(--text-secondary);
        }

        .actions-list { display: flex; flex-direction: column; gap: var(--space-sm); }
        .action-card {
          display: flex;
          align-items: flex-start;
          gap: var(--space-md);
          padding: var(--space-lg);
          background: var(--gradient-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          transition: all var(--transition-normal);
        }
        .action-card:hover {
          border-color: rgba(74, 222, 128, 0.25);
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }
        .action-card.cooldown { opacity: 0.6; }
        .action-card.completing {
          border-color: rgba(74, 222, 128, 0.5);
          box-shadow: var(--shadow-glow-green);
        }
        .action-icon-wrap {
          width: 48px; height: 48px;
          border-radius: var(--radius-md);
          background: rgba(74, 222, 128, 0.1);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .action-icon { font-size: 1.5rem; }
        .action-content { flex: 1; min-width: 0; }
        .action-header {
          display: flex; align-items: center;
          justify-content: space-between;
          gap: var(--space-sm);
          margin-bottom: 4px;
        }
        .action-title {
          font-size: var(--font-md); font-weight: 700;
          color: var(--text-primary);
        }
        .action-desc {
          font-size: var(--font-sm); color: var(--text-secondary);
          margin-bottom: 4px;
        }
        .action-nudge {
          font-size: var(--font-xs); color: var(--text-muted);
          font-style: italic;
          margin-bottom: 6px;
        }
        .action-impact {
          display: flex; gap: var(--space-md);
          font-size: var(--font-xs); color: var(--text-muted);
        }
        .action-cta {
          display: flex; align-items: center;
          flex-shrink: 0;
        }
        .action-done {
          display: flex; flex-direction: column;
          align-items: center; gap: 2px;
          font-size: var(--font-xs); color: var(--accent-green);
          font-weight: 600;
        }

        @media (max-width: 480px) {
          .action-card { flex-wrap: wrap; }
          .action-cta { width: 100%; justify-content: flex-end; margin-top: var(--space-xs); }
        }
        @media (min-width: 768px) {
          .actions-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-md);
          }
        }
      `}</style>
    </div>
  );
}
