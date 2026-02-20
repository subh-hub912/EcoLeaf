import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { DAILY_CHALLENGES } from '../data/mockData';
import { IoFlame, IoCheckmarkCircle, IoTimeOutline, IoTrophy } from 'react-icons/io5';

export default function Challenges() {
    const { state, dispatch } = useApp();

    const handleComplete = (challenge) => {
        if (state.completedChallenges.includes(challenge.id)) return;
        dispatch({
            type: 'COMPLETE_CHALLENGE',
            payload: { challengeId: challenge.id, reward: challenge.reward },
        });
    };

    return (
        <div className="page challenges-page">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="page-title">Daily Challenges</h1>
                <p className="page-subtitle">Complete challenges for bonus EcoLeaves 🔥</p>

                {/* Streak Card */}
                <motion.div
                    className="streak-card"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="streak-flames">
                        {[...Array(Math.min(state.streak, 7))].map((_, i) => (
                            <motion.span
                                key={i}
                                animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }}
                                transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity }}
                            >
                                🔥
                            </motion.span>
                        ))}
                        {state.streak === 0 && <span style={{ fontSize: '2rem' }}>🔥</span>}
                    </div>
                    <div className="streak-info">
                        <span className="streak-count">{state.streak}</span>
                        <span className="streak-label">Day Streak</span>
                    </div>
                    <p className="streak-msg">
                        {state.streak === 0
                            ? 'Start your streak by completing an action today!'
                            : state.streak < 3
                                ? 'Great start! Keep going!'
                                : state.streak < 7
                                    ? "You're on fire! Don't break the chain!"
                                    : 'Incredible dedication! You\'re a sustainability champion!'}
                    </p>
                </motion.div>

                {/* Challenge Cards */}
                <div className="challenges-list">
                    {DAILY_CHALLENGES.map((challenge, i) => {
                        const isCompleted = state.completedChallenges.includes(challenge.id);

                        return (
                            <motion.div
                                key={challenge.id}
                                className={`challenge-card-full ${isCompleted ? 'completed' : ''}`}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.08 }}
                                whileHover={!isCompleted ? { scale: 1.01, borderColor: 'rgba(74, 222, 128, 0.3)' } : {}}
                            >
                                <div className="challenge-left">
                                    <span className="challenge-icon-lg">{challenge.icon}</span>
                                </div>
                                <div className="challenge-center">
                                    <h3 className="challenge-title-full">{challenge.title}</h3>
                                    <p className="challenge-desc-full">{challenge.description}</p>
                                    <div className="challenge-reward-badge">
                                        <IoTrophy size={12} />
                                        <span>+{challenge.reward} 🍃</span>
                                    </div>
                                </div>
                                <div className="challenge-right">
                                    {isCompleted ? (
                                        <motion.div
                                            className="challenge-done"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring' }}
                                        >
                                            <IoCheckmarkCircle size={28} color="var(--accent-green)" />
                                            <span>Done!</span>
                                        </motion.div>
                                    ) : (
                                        <motion.button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleComplete(challenge)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Complete
                                        </motion.button>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bonus Info */}
                <motion.div
                    className="challenge-bonus-info"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <IoTimeOutline size={16} />
                    <span>Challenges reset daily at midnight. Come back tomorrow for new ones!</span>
                </motion.div>
            </motion.div>

            <style>{`
        .challenges-page { max-width: 100%; }

        .streak-card {
          text-align: center;
          padding: var(--space-xl);
          background: radial-gradient(ellipse at center, rgba(245, 158, 11, 0.08) 0%, transparent 70%);
          border: 1px solid rgba(245, 158, 11, 0.15);
          border-radius: var(--radius-xl);
          margin-bottom: var(--space-xl);
        }
        .streak-flames {
          display: flex; justify-content: center; gap: 4px;
          font-size: 1.5rem; margin-bottom: var(--space-sm);
        }
        .streak-info { display: flex; align-items: baseline; justify-content: center; gap: 8px; }
        .streak-count {
          font-size: var(--font-4xl); font-weight: 800;
          color: var(--accent-gold);
        }
        .streak-label {
          font-size: var(--font-lg); font-weight: 600;
          color: var(--text-secondary);
        }
        .streak-msg {
          font-size: var(--font-sm); color: var(--text-muted);
          margin-top: var(--space-sm);
        }

        .challenges-list { display: flex; flex-direction: column; gap: var(--space-sm); }
        .challenge-card-full {
          display: flex; align-items: center; gap: var(--space-md);
          padding: var(--space-lg);
          background: var(--gradient-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          transition: all var(--transition-normal);
        }
        .challenge-card-full.completed {
          opacity: 0.7;
          border-color: rgba(74, 222, 128, 0.2);
        }
        .challenge-left { flex-shrink: 0; }
        .challenge-icon-lg { font-size: 2.2rem; }
        .challenge-center { flex: 1; }
        .challenge-title-full {
          font-size: var(--font-md); font-weight: 700;
          color: var(--text-primary); margin-bottom: 2px;
        }
        .challenge-desc-full {
          font-size: var(--font-sm); color: var(--text-muted);
          margin-bottom: 6px;
        }
        .challenge-reward-badge {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 2px 10px;
          background: rgba(74, 222, 128, 0.1);
          border-radius: var(--radius-full);
          font-size: var(--font-xs);
          color: var(--accent-green); font-weight: 600;
        }
        .challenge-right { flex-shrink: 0; }
        .challenge-done {
          display: flex; flex-direction: column;
          align-items: center; gap: 2px;
          font-size: var(--font-xs);
          color: var(--accent-green); font-weight: 600;
        }

        .challenge-bonus-info {
          display: flex; align-items: center; gap: var(--space-sm);
          padding: var(--space-md);
          background: rgba(56, 189, 248, 0.05);
          border: 1px solid rgba(56, 189, 248, 0.1);
          border-radius: var(--radius-md);
          margin-top: var(--space-xl);
          font-size: var(--font-xs); color: var(--text-muted);
        }

        @media (max-width: 480px) {
          .challenge-card-full { flex-wrap: wrap; }
          .challenge-right { width: 100%; text-align: right; }
        }
      `}</style>
        </div>
    );
}
