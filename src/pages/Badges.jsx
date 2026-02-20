import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { BADGE_TIERS, getProgressToNextBadge } from '../data/mockData';
import { IoCheckmarkCircle } from 'react-icons/io5';

/* ── Badge node that pops in on scroll ── */
function BadgeNode({ badge, earned, isCurrent, isNext, side, progress, nextBadge, leavesEarned, nodeRef }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <div ref={ref} className={`bnode ${side}`}>
      <motion.div
        className="bnode-info"
        initial={{ opacity: 0, x: side === 'left' ? -50 : 50, y: 10 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="bnode-name" style={earned ? { color: badge.color } : {}}>{badge.name}</span>
        <span className="bnode-title">{badge.title}</span>
        <span className="bnode-leaves">{badge.requiredLeaves} 🍃</span>
        {(isCurrent || earned) && <span className="bnode-perk">{badge.perk}</span>}
        {isCurrent && <span className="bnode-you">✦ You are here</span>}
        {isNext && (
          <div className="bnode-prog">
            <div className="progress-bar"><motion.div className="progress-bar-fill" initial={{ width: 0 }}
              animate={inView ? { width: `${progress}%` } : {}} transition={{ delay: 0.5, duration: 0.8 }} /></div>
            <span className="bnode-prog-text">{leavesEarned}/{nextBadge.requiredLeaves}</span>
          </div>
        )}
      </motion.div>

      <motion.div
        ref={isCurrent ? nodeRef : null}
        className={`bnode-orb ${earned ? 'earned' : 'locked'} ${isCurrent ? 'current' : ''}`}
        style={{
          '--orb-color': badge.color,
          borderColor: earned ? badge.color : 'rgba(255,255,255,0.06)',
          background: earned
            ? `radial-gradient(circle at 35% 35%, ${badge.color}40, ${badge.color}12 60%, transparent)`
            : 'rgba(255,255,255,0.02)',
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.08, type: 'spring', stiffness: 200, damping: 15 }}
        whileHover={earned ? { scale: 1.15 } : {}}
      >
        <span className="bnode-emoji">{earned ? badge.icon : '🔒'}</span>
        {earned && <div className="bnode-glow" style={{ background: `radial-gradient(circle, ${badge.color}35, transparent 65%)` }} />}
        {isCurrent && (
          <motion.div className="bnode-ring" style={{ borderColor: badge.color }}
            animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} />
        )}
        {earned && !isCurrent && (
          <div className="bnode-check"><IoCheckmarkCircle size={18} /></div>
        )}
        {isNext && (
          <motion.div className="bnode-pulse" style={{ borderColor: badge.color }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }} />
        )}
      </motion.div>
    </div>
  );
}

export default function Badges() {
  const { state, currentBadge, nextBadge } = useApp();
  const progress = getProgressToNextBadge(state.totalLeavesEarned);
  const currentRef = useRef(null);

  useEffect(() => {
    if (currentRef.current) {
      setTimeout(() => currentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }), 800);
    }
  }, []);

  const phases = [
    { label: 'The Glow Up', range: [0, 5] },
    { label: 'The Grind', range: [5, 10] },
    { label: 'Main Character Era', range: [10, 15] },
    { label: 'The Ascent', range: [15, 20] },
    { label: 'Legendary Arc', range: [20, 25] },
  ];

  const GOLD1 = '#fbbf24', GOLD2 = '#f59e0b', GOLD3 = '#facc15';

  // Build a NATURAL winding river with varying random-like curves
  // Uses a seeded pattern so it looks organic but is deterministic
  const buildRiver = (count, phaseIndex) => {
    const segH = 200;
    const totalH = count * segH + 30;
    const W = 800;
    const cx = W / 2;
    // Vary amplitudes to feel organic — different per phase
    const amps = [
      [180, 140, 220, 160, 200],   // phase 0
      [150, 210, 170, 230, 145],   // phase 1
      [200, 160, 240, 130, 190],   // phase 2
      [170, 220, 150, 200, 180],   // phase 3
      [210, 140, 190, 230, 160],   // phase 4
    ];
    const pa = amps[phaseIndex % 5];

    let d = `M ${cx} 15`;
    for (let i = 0; i < count; i++) {
      const y0 = i * segH + 15;
      const y1 = (i + 1) * segH + 15;
      // Use cubic bezier for more natural S-curves
      const dir = i % 2 === 0 ? 1 : -1;
      const amp = pa[i % pa.length];
      // Two control points for a smooth S-like segment
      const cp1x = cx + dir * amp;
      const cp1y = y0 + segH * 0.3;
      const cp2x = cx + dir * (amp * 0.6);
      const cp2y = y1 - segH * 0.2;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${cx} ${y1}`;
    }
    return { d, totalH, W, segH };
  };

  return (
    <div className="page badges-page">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="page-title">Your Journey</h1>
        <p className="page-subtitle">Scroll through your path — from dewdrop to legendary guardian 🌍</p>

        {/* Hero Banner */}
        <motion.div className="bhero" initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}>
          <motion.div className="bhero-icon" animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}>
            {currentBadge.icon}
          </motion.div>
          <div className="bhero-body">
            <h2>{currentBadge.name}</h2>
            <p className="bhero-title">{currentBadge.title}</p>
            <p className="bhero-perk">{currentBadge.perk}</p>
          </div>
          {nextBadge && (
            <div className="bhero-progress">
              <div className="bhero-pbar-head">
                <span>{state.totalLeavesEarned} / {nextBadge.requiredLeaves} 🍃</span>
                <span>{progress}%</span>
              </div>
              <div className="progress-bar">
                <motion.div className="progress-bar-fill" initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }} transition={{ delay: 0.4, duration: 1 }} />
              </div>
              <span className="bhero-next">Next: {nextBadge.icon} {nextBadge.name}</span>
            </div>
          )}
          {!nextBadge && <div className="bhero-maxed">🌟 Maximum tier reached! 🌟</div>}
        </motion.div>

        {/* Phases */}
        {phases.map((phase, pi) => {
          const tiers = BADGE_TIERS.slice(phase.range[0], phase.range[1]);
          const globalStart = phase.range[0];
          const river = buildRiver(tiers.length, pi);

          return (
            <div key={phase.label} className="bphase">
              <motion.div className="bphase-label" initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                {phase.label}
              </motion.div>

              <div className="bphase-body" style={{ height: river.totalH }}>
                {/* Golden winding river SVG — no center line */}
                <svg className="river-svg" viewBox={`0 0 ${river.W} ${river.totalH}`}
                  preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id={`rg${pi}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={GOLD1} stopOpacity="0.45" />
                      <stop offset="50%" stopColor={GOLD2} stopOpacity="0.7" />
                      <stop offset="100%" stopColor={GOLD3} stopOpacity="0.45" />
                    </linearGradient>
                    <filter id={`gl${pi}`}>
                      <feGaussianBlur stdDeviation="12" result="b" />
                      <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  {/* Wide ambient glow */}
                  <path d={river.d} fill="none" stroke={GOLD1} strokeWidth="80"
                    strokeLinecap="round" strokeLinejoin="round" opacity="0.05" filter={`url(#gl${pi})`} />
                  {/* Outer soft edge */}
                  <path d={river.d} fill="none" stroke={GOLD2} strokeWidth="50"
                    strokeLinecap="round" strokeLinejoin="round" opacity="0.07" />
                  {/* Main river body — bright golden */}
                  <path d={river.d} fill="none" stroke={`url(#rg${pi})`} strokeWidth="28"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                {/* Badge nodes */}
                <div className="bnodes-col">
                  {tiers.map((badge, i) => {
                    const earned = state.totalLeavesEarned >= badge.requiredLeaves;
                    const isCurrent = currentBadge.id === badge.id;
                    const isNext = nextBadge && nextBadge.id === badge.id;
                    const side = i % 2 === 0 ? 'left' : 'right';
                    return (
                      <BadgeNode key={badge.id} badge={badge} earned={earned}
                        isCurrent={isCurrent} isNext={isNext} side={side}
                        progress={progress} nextBadge={nextBadge}
                        leavesEarned={state.totalLeavesEarned} nodeRef={currentRef} />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        <motion.div className="bpath-end" initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <span>🌟</span>
          <p>The journey continues with every sustainable choice you make...</p>
        </motion.div>
      </motion.div>

      <style>{`
        .badges-page { max-width: 100%; }

        .bhero {
          text-align: center;
          padding: var(--space-2xl) var(--space-xl);
          background: radial-gradient(ellipse at center, rgba(251,191,36,0.06) 0%, transparent 70%);
          border: 1px solid rgba(251,191,36,0.15);
          border-radius: var(--radius-xl);
          margin-bottom: var(--space-3xl);
        }
        .bhero-icon { font-size: 4.5rem; margin-bottom: var(--space-sm); display: block; }
        .bhero-body h2 { font-size: var(--font-3xl); font-weight: 900; color: var(--text-primary); }
        .bhero-title { font-size: var(--font-lg); color: #fbbf24; font-style: italic; margin-bottom: var(--space-xs); }
        .bhero-perk { font-size: var(--font-sm); color: var(--text-muted); margin-bottom: var(--space-lg); }
        .bhero-progress { max-width: 360px; margin: 0 auto; }
        .bhero-pbar-head { display: flex; justify-content: space-between; font-size: var(--font-xs); color: var(--text-muted); margin-bottom: 6px; }
        .bhero-next { font-size: var(--font-sm); color: var(--text-secondary); margin-top: 10px; display: block; }
        .bhero-maxed { font-size: var(--font-lg); color: #fbbf24; font-weight: 800; }

        .bphase { position: relative; margin-bottom: var(--space-xl); }
        .bphase-label {
          font-size: var(--font-xl); font-weight: 900;
          color: var(--text-secondary); text-transform: uppercase;
          letter-spacing: 2.5px; text-align: center;
          margin-bottom: var(--space-lg);
        }

        .bphase-body { position: relative; width: 100%; max-width: 800px; margin: 0 auto; }
        .river-svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }

        .bnodes-col { position: relative; z-index: 2; display: flex; flex-direction: column; }

        .bnode { display: flex; align-items: center; height: 200px; position: relative; }
        .bnode.left { flex-direction: row; padding-right: 54%; justify-content: flex-end; gap: var(--space-xl); }
        .bnode.right { flex-direction: row-reverse; padding-left: 54%; justify-content: flex-end; gap: var(--space-xl); }
        .bnode.right .bnode-info { align-items: flex-end; text-align: right; }

        .bnode-orb {
          width: 82px; height: 82px;
          border-radius: 50%; border: 3px solid;
          display: flex; align-items: center; justify-content: center;
          position: relative; flex-shrink: 0;
          transition: all 0.2s ease-out;
        }
        .bnode-orb.locked { opacity: 0.2; }
        .bnode-orb.current {
          animation: currentPulse 3s ease-in-out infinite;
        }
        @keyframes currentPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .bnode-orb.earned:not(.current) {
          box-shadow:
            0 0 18px color-mix(in srgb, var(--orb-color) 30%, transparent),
            0 0 40px color-mix(in srgb, var(--orb-color) 10%, transparent) !important;
        }
        .bnode-emoji { font-size: 2.2rem; z-index: 3; position: relative; }
        .bnode-glow { position: absolute; inset: -35px; border-radius: 50%; z-index: 0; pointer-events: none; }

        .bnode-ring { position: absolute; inset: -9px; border-radius: 50%; border: 2px dashed; opacity: 0.4; }
        .bnode-check { position: absolute; bottom: -4px; right: -4px; color: var(--accent-green); background: var(--bg-primary); border-radius: 50%; z-index: 5; line-height: 0; }
        .bnode-pulse { position: absolute; inset: -6px; border-radius: 50%; border: 2px solid; }

        .bnode-info { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .bnode-name { font-size: var(--font-xl); font-weight: 800; color: var(--text-primary); }
        .bnode-title { font-size: var(--font-sm); color: var(--text-muted); font-style: italic; }
        .bnode-leaves { font-size: var(--font-sm); color: var(--text-muted); font-weight: 600; }
        .bnode-perk { font-size: var(--font-xs); color: var(--text-muted); opacity: 0.7; max-width: 220px; }
        .bnode-you { font-size: var(--font-sm); color: #fbbf24; font-weight: 800; }
        .bnode-prog { display: flex; flex-direction: column; gap: 4px; max-width: 150px; }
        .bnode-prog-text { font-size: var(--font-xs); color: var(--text-muted); }

        .bpath-end { text-align: center; padding: var(--space-3xl) 0; color: var(--text-muted); }
        .bpath-end span { font-size: 3.5rem; display: block; margin-bottom: var(--space-sm); }
        .bpath-end p { font-size: var(--font-md); font-style: italic; }

        @media (min-width: 1200px) {
          .bphase-body { max-width: 900px; }
          .bnode { height: 220px; }
          .bnode-orb { width: 92px; height: 92px; }
          .bnode-emoji { font-size: 2.6rem; }
        }
        @media (max-width: 768px) {
          .bphase-body { max-width: 100%; }
          .bnode { height: 180px; }
          .bnode-orb { width: 68px; height: 68px; }
          .bnode-emoji { font-size: 1.8rem; }
          .bnode.left { padding-right: 50%; gap: var(--space-md); }
          .bnode.right { padding-left: 50%; gap: var(--space-md); }
        }
        @media (max-width: 500px) {
          .bnode { height: 155px; }
          .bnode-orb { width: 56px; height: 56px; }
          .bnode-emoji { font-size: 1.5rem; }
          .bnode.left { padding-right: 46%; gap: var(--space-sm); }
          .bnode.right { padding-left: 46%; gap: var(--space-sm); }
          .bnode-perk, .bnode-title { display: none; }
          .bnode-name { font-size: var(--font-md); }
          .bhero-icon { font-size: 3rem; }
          .bhero-body h2 { font-size: var(--font-2xl); }
        }
      `}</style>
    </div>
  );
}
