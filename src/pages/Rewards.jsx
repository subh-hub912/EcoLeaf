import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { REWARDS } from '../data/mockData';
import { IoGift, IoCheckmarkCircle, IoCartOutline } from 'react-icons/io5';

const rewardCategories = ['All', 'Dining', 'Wellness', 'Stay', 'Activity', 'Gift'];

export default function Rewards() {
    const { state, dispatch } = useApp();
    const [category, setCategory] = useState('All');
    const [redeemingId, setRedeemingId] = useState(null);

    const filtered = category === 'All' ? REWARDS : REWARDS.filter((r) => r.category === category);

    const handleRedeem = (reward) => {
        if (state.leaves < reward.cost) return;
        setRedeemingId(reward.id);
        setTimeout(() => {
            dispatch({ type: 'REDEEM_REWARD', payload: { rewardId: reward.id, cost: reward.cost } });
            setRedeemingId(null);
        }, 800);
    };

    const isRedeemed = (rewardId) => state.redeemedRewards.some((r) => r.rewardId === rewardId);

    return (
        <div className="page rewards-page">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="rewards-header">
                    <div>
                        <h1 className="page-title">Rewards Store</h1>
                        <p className="page-subtitle">Redeem your EcoLeaves for exclusive perks ✨</p>
                    </div>
                    <div className="rewards-balance">
                        <span className="rewards-balance-amount">{state.leaves}</span>
                        <span className="rewards-balance-label">🍃 Available</span>
                    </div>
                </div>

                <div className="actions-filter">
                    {rewardCategories.map((cat) => (
                        <motion.button
                            key={cat}
                            className={`filter-chip ${category === cat ? 'active' : ''}`}
                            onClick={() => setCategory(cat)}
                            whileTap={{ scale: 0.95 }}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                <div className="rewards-grid">
                    {filtered.map((reward, i) => {
                        const canAfford = state.leaves >= reward.cost;
                        const redeemed = isRedeemed(reward.id);
                        const isRedeeming = redeemingId === reward.id;

                        return (
                            <motion.div
                                key={reward.id}
                                className={`reward-card ${redeemed ? 'redeemed' : ''} ${!canAfford && !redeemed ? 'locked' : ''}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                                whileHover={!redeemed ? { scale: 1.02, borderColor: 'rgba(251, 191, 36, 0.3)' } : {}}
                            >
                                <div className="reward-icon-wrap">
                                    <span className="reward-icon">{reward.icon}</span>
                                </div>
                                <div className="reward-info">
                                    <h3 className="reward-title">{reward.title}</h3>
                                    <p className="reward-desc">{reward.description}</p>
                                    <div className="reward-cost">
                                        <span className="cost-amount">{reward.cost}</span>
                                        <span className="cost-label">🍃 EcoLeaves</span>
                                    </div>
                                </div>
                                <div className="reward-action">
                                    {redeemed ? (
                                        <div className="reward-redeemed">
                                            <IoCheckmarkCircle size={22} color="var(--accent-gold)" />
                                            <span>Claimed</span>
                                        </div>
                                    ) : (
                                        <motion.button
                                            className={`btn ${canAfford ? 'btn-gold' : 'btn-secondary'} btn-sm`}
                                            onClick={() => handleRedeem(reward)}
                                            disabled={!canAfford || isRedeeming}
                                            whileHover={canAfford ? { scale: 1.05 } : {}}
                                            whileTap={canAfford ? { scale: 0.95 } : {}}
                                        >
                                            {isRedeeming ? '...' : canAfford ? (
                                                <><IoCartOutline size={14} /> Redeem</>
                                            ) : (
                                                `Need ${reward.cost - state.leaves} more`
                                            )}
                                        </motion.button>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

            <style>{`
        .rewards-page { max-width: 100%; }
        .rewards-header {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: var(--space-lg);
        }
        .rewards-balance {
          text-align: right;
          background: rgba(74, 222, 128, 0.08);
          padding: var(--space-sm) var(--space-md);
          border-radius: var(--radius-md);
          border: 1px solid rgba(74, 222, 128, 0.15);
        }
        .rewards-balance-amount {
          font-size: var(--font-2xl); font-weight: 800;
          color: var(--accent-green); display: block;
        }
        .rewards-balance-label {
          font-size: var(--font-xs); color: var(--text-muted);
        }
        .rewards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: var(--space-md);
        }
        .reward-card {
          background: var(--gradient-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          display: flex; flex-direction: column;
          gap: var(--space-md);
          transition: all var(--transition-normal);
        }
        .reward-card.redeemed {
          border-color: rgba(251, 191, 36, 0.2);
          opacity: 0.7;
        }
        .reward-card.locked { opacity: 0.6; }
        .reward-icon-wrap {
          width: 56px; height: 56px;
          border-radius: var(--radius-md);
          background: rgba(251, 191, 36, 0.1);
          display: flex; align-items: center; justify-content: center;
        }
        .reward-icon { font-size: 1.8rem; }
        .reward-info { flex: 1; }
        .reward-title {
          font-size: var(--font-md); font-weight: 700;
          color: var(--text-primary); margin-bottom: 4px;
        }
        .reward-desc {
          font-size: var(--font-sm); color: var(--text-muted);
          margin-bottom: var(--space-sm); line-height: 1.4;
        }
        .reward-cost { display: flex; align-items: baseline; gap: 6px; }
        .cost-amount {
          font-size: var(--font-xl); font-weight: 800;
          color: var(--accent-gold);
        }
        .cost-label { font-size: var(--font-xs); color: var(--text-muted); }
        .reward-action { display: flex; justify-content: flex-end; }
        .reward-redeemed {
          display: flex; align-items: center; gap: 6px;
          font-size: var(--font-sm); color: var(--accent-gold);
          font-weight: 600;
        }
      `}</style>
        </div>
    );
}
