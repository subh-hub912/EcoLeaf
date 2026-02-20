import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { SPIN_WHEEL_PRIZES } from '../data/mockData';
import { IoSparkles, IoRefresh } from 'react-icons/io5';

const SEGMENT_ANGLE = 360 / SPIN_WHEEL_PRIZES.length;

export default function SpinWheel() {
    const { state, dispatch } = useApp();
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState(null);
    const wheelRef = useRef(null);

    const handleSpin = () => {
        if (isSpinning || !state.spinAvailable) return;
        setIsSpinning(true);
        setResult(null);

        // Weighted random selection
        const rand = Math.random();
        let cumProb = 0;
        let selectedIndex = 0;
        for (let i = 0; i < SPIN_WHEEL_PRIZES.length; i++) {
            cumProb += SPIN_WHEEL_PRIZES[i].probability;
            if (rand <= cumProb) {
                selectedIndex = i;
                break;
            }
        }

        const prize = SPIN_WHEEL_PRIZES[selectedIndex];
        const targetAngle = 360 - (selectedIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2);
        const fullSpins = 5 * 360;
        const finalRotation = rotation + fullSpins + targetAngle;

        setRotation(finalRotation);

        setTimeout(() => {
            setIsSpinning(false);
            setResult(prize);
            dispatch({ type: 'SPIN_WHEEL', payload: { prize } });
        }, 4000);
    };

    return (
        <div className="page spin-page">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="page-title">Spin & Win</h1>
                <p className="page-subtitle">Try your luck for bonus EcoLeaves! 🎰</p>

                {/* Wheel Container */}
                <div className="wheel-container">
                    {/* Pointer */}
                    <div className="wheel-pointer">▼</div>

                    {/* Wheel */}
                    <motion.div
                        className="wheel"
                        ref={wheelRef}
                        style={{ rotate: rotation }}
                        transition={{ duration: 4, ease: [0.17, 0.67, 0.12, 0.99] }}
                    >
                        {SPIN_WHEEL_PRIZES.map((prize, i) => {
                            const angle = i * SEGMENT_ANGLE;
                            return (
                                <div
                                    key={i}
                                    className="wheel-segment"
                                    style={{
                                        transform: `rotate(${angle}deg)`,
                                        background: `linear-gradient(${angle + 90}deg, ${prize.color}30, ${prize.color}10)`,
                                        borderColor: `${prize.color}40`,
                                    }}
                                >
                                    <span
                                        className="segment-label"
                                        style={{ transform: `rotate(${SEGMENT_ANGLE / 2}deg)` }}
                                    >
                                        {prize.label}
                                    </span>
                                </div>
                            );
                        })}
                        <div className="wheel-center">🍃</div>
                    </motion.div>

                    {/* Spin Button */}
                    <div className="wheel-action">
                        {state.spinAvailable ? (
                            <motion.button
                                className="btn btn-primary btn-lg spin-btn"
                                onClick={handleSpin}
                                disabled={isSpinning}
                                whileHover={!isSpinning ? { scale: 1.05 } : {}}
                                whileTap={!isSpinning ? { scale: 0.95 } : {}}
                                animate={isSpinning ? {} : { boxShadow: ['0 0 10px rgba(74, 222, 128, 0.3)', '0 0 25px rgba(74, 222, 128, 0.5)', '0 0 10px rgba(74, 222, 128, 0.3)'] }}
                                transition={isSpinning ? {} : { duration: 1.5, repeat: Infinity }}
                            >
                                {isSpinning ? (
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                    >
                                        🍃
                                    </motion.span>
                                ) : (
                                    <><IoSparkles size={20} /> SPIN!</>
                                )}
                            </motion.button>
                        ) : (
                            <div className="spin-used">
                                <p>You've used your daily spin! 🎲</p>
                                <p className="spin-timer">Come back tomorrow for another chance</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Result */}
                <AnimatePresence>
                    {result && (
                        <motion.div
                            className="spin-result"
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <motion.div
                                className="result-icon"
                                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6 }}
                            >
                                🎉
                            </motion.div>
                            <h3 className="result-title">Congratulations!</h3>
                            <p className="result-prize">You won: <strong>{result.label}</strong></p>
                            {result.isMultiplier && (
                                <p className="result-detail">Your next action will earn 2x EcoLeaves!</p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <style>{`
        .spin-page { max-width: 700px; margin: 0 auto; text-align: center; }

        .wheel-container {
          position: relative;
          display: flex; flex-direction: column;
          align-items: center; gap: var(--space-xl);
          margin: var(--space-xl) 0;
        }

        .wheel-pointer {
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2rem;
          color: var(--accent-green);
          z-index: 10;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
        }

        .wheel {
          width: 280px;
          height: 280px;
          border-radius: 50%;
          position: relative;
          border: 3px solid var(--border-card);
          box-shadow: 0 0 30px rgba(74, 222, 128, 0.1),
                      inset 0 0 30px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .wheel-segment {
          position: absolute;
          width: 50%;
          height: 50%;
          top: 0;
          left: 50%;
          transform-origin: 0% 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 10px;
          border-right: 1px solid;
          clip-path: polygon(0 0, 100% 0, 0 100%);
        }

        .segment-label {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-primary);
          white-space: nowrap;
          transform-origin: left center;
        }

        .wheel-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--bg-card-solid);
          border: 3px solid var(--accent-green);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          z-index: 5;
          box-shadow: 0 0 10px rgba(74, 222, 128, 0.3);
        }

        .spin-btn {
          padding: var(--space-md) var(--space-2xl);
          font-size: var(--font-lg);
        }

        .spin-used {
          padding: var(--space-lg);
          background: var(--gradient-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
        }
        .spin-used p { color: var(--text-secondary); font-weight: 600; }
        .spin-timer { font-size: var(--font-sm); color: var(--text-muted); margin-top: 4px; }

        .spin-result {
          padding: var(--space-xl);
          background: rgba(74, 222, 128, 0.05);
          border: 1px solid rgba(74, 222, 128, 0.2);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-glow-green);
        }
        .result-icon { font-size: 3rem; margin-bottom: var(--space-sm); }
        .result-title {
          font-size: var(--font-xl); font-weight: 800;
          background: var(--gradient-green);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .result-prize {
          font-size: var(--font-md); color: var(--text-secondary);
          margin-top: var(--space-xs);
        }
        .result-detail {
          font-size: var(--font-sm); color: var(--accent-gold);
          margin-top: var(--space-xs); font-weight: 600;
        }

        @media (max-width: 350px) {
          .wheel { width: 240px; height: 240px; }
        }
      `}</style>
        </div>
    );
}
