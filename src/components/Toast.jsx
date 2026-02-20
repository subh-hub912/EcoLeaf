import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { IoCheckmarkCircle, IoInformationCircle, IoClose } from 'react-icons/io5';

export default function Toast() {
    const { state, dispatch } = useApp();

    useEffect(() => {
        if (state.notifications.length > 0) {
            const latest = state.notifications[state.notifications.length - 1];
            const timer = setTimeout(() => {
                dispatch({ type: 'DISMISS_NOTIFICATION', payload: latest.id });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [state.notifications, dispatch]);

    return (
        <div className="toast-container">
            <AnimatePresence>
                {state.notifications.slice(-3).map((notification) => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 100, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        style={{
                            background: 'rgba(16, 36, 22, 0.95)',
                            backdropFilter: 'blur(16px)',
                            border: notification.type === 'success'
                                ? '1px solid rgba(74, 222, 128, 0.3)'
                                : '1px solid rgba(56, 189, 248, 0.3)',
                            borderRadius: 'var(--radius-md)',
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            minWidth: '250px',
                            maxWidth: '350px',
                            boxShadow: notification.type === 'success'
                                ? '0 4px 20px rgba(74, 222, 128, 0.15)'
                                : '0 4px 20px rgba(56, 189, 248, 0.15)',
                        }}
                    >
                        {notification.type === 'success' ? (
                            <IoCheckmarkCircle size={22} color="#4ade80" />
                        ) : (
                            <IoInformationCircle size={22} color="#38bdf8" />
                        )}
                        <span style={{ flex: 1, fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                            {notification.message}
                        </span>
                        <button
                            onClick={() => dispatch({ type: 'DISMISS_NOTIFICATION', payload: notification.id })}
                            style={{
                                background: 'none',
                                color: 'var(--text-muted)',
                                padding: '2px',
                                display: 'flex',
                            }}
                        >
                            <IoClose size={16} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
