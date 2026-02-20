import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IoLeaf, IoSparkles, IoTrophy, IoEarth, IoArrowForward } from 'react-icons/io5';

const features = [
  { icon: <IoLeaf size={28} />, title: 'Earn EcoLeaves', desc: 'Make sustainable choices & earn rewards' },
  { icon: <IoTrophy size={28} />, title: 'Unlock Badges', desc: 'Rise through 6 tiers of green greatness' },
  { icon: <IoSparkles size={28} />, title: 'Exciting Offers', desc: 'Redeem leaves for spa, dining & more' },
  { icon: <IoEarth size={28} />, title: 'Track Impact', desc: 'See the real difference you\'re making' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Floating leaves background */}
      <div className="landing-leaves">
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="floating-leaf"
            animate={{
              y: [-20, -80, -20],
              x: [0, Math.random() * 40 - 20, 0],
              rotate: [0, 360],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${20 + Math.random() * 60}%`,
              fontSize: `${1 + Math.random() * 1.5}rem`,
            }}
          >
            🍃
          </motion.span>
        ))}
      </div>

      <div className="landing-content">
        <motion.div
          className="landing-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            className="landing-logo"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            🍃
          </motion.div>
          <h1 className="landing-title">
            Eco<span className="text-green">Leaf</span>
          </h1>
          <p className="landing-tagline">
            Your sustainable stay, <span className="text-green">rewarded</span>.
          </p>
          <p className="landing-desc">
            Make eco-friendly choices during your hotel stay and earn EcoLeaves —
            redeemable for exciting offers, exclusive badges, and premium perks.
          </p>
        </motion.div>

        <motion.div
          className="landing-features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="landing-feature-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, borderColor: 'rgba(74, 222, 128, 0.4)' }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="landing-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.button
            className="btn btn-primary btn-lg landing-btn"
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started <IoArrowForward size={20} />
          </motion.button>
          <p className="landing-note">Join 2,400+ guests making a difference 🌍</p>
        </motion.div>
      </div>

      <style>{`
        .landing-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-xl) var(--space-md);
          position: relative;
          overflow: hidden;
        }
        .landing-leaves {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .floating-leaf {
          position: absolute;
        }
        .landing-content {
          max-width: 520px;
          width: 100%;
          text-align: center;
        }
        .landing-logo {
          font-size: 4rem;
          margin-bottom: var(--space-md);
          display: inline-block;
          filter: drop-shadow(0 0 20px rgba(74, 222, 128, 0.3));
        }
        .landing-title {
          font-size: var(--font-5xl);
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: var(--space-sm);
          letter-spacing: -0.02em;
        }
        .text-green {
          background: var(--gradient-green);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .landing-tagline {
          font-size: var(--font-xl);
          color: var(--text-secondary);
          margin-bottom: var(--space-md);
          font-weight: 400;
        }
        .landing-desc {
          font-size: var(--font-sm);
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: var(--space-2xl);
        }
        .landing-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-sm);
          margin-bottom: var(--space-2xl);
        }
        .landing-feature-card {
          display: flex;
          align-items: flex-start;
          gap: var(--space-sm);
          padding: var(--space-md);
          background: var(--gradient-card);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          text-align: left;
          cursor: default;
          transition: all var(--transition-fast);
        }
        .feature-icon {
          color: var(--accent-green);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .feature-title {
          font-size: var(--font-sm);
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 2px;
        }
        .feature-desc {
          font-size: var(--font-xs);
          color: var(--text-muted);
          line-height: 1.4;
        }
        .landing-btn {
          width: 100%;
          max-width: 300px;
          padding: var(--space-md) var(--space-xl);
          font-size: var(--font-lg);
        }
        .landing-note {
          font-size: var(--font-xs);
          color: var(--text-muted);
          margin-top: var(--space-md);
        }
        @media (max-width: 480px) {
          .landing-features { grid-template-columns: 1fr; }
          .landing-logo { font-size: 3rem; }
        }
      `}</style>
    </div>
  );
}
