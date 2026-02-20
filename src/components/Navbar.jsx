import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
    IoHomeOutline, IoHome,
    IoLeafOutline, IoLeaf,
    IoGiftOutline, IoGift,
    IoTrophyOutline, IoTrophy,
    IoPersonOutline, IoPerson,
    IoFlameOutline, IoFlame,
    IoRibbonOutline, IoRibbon,
    IoPodiumOutline, IoPodium,
    IoEarthOutline, IoEarth,
    IoMenuOutline, IoCloseOutline,
    IoChevronForward,
} from 'react-icons/io5';
import { RiCoinLine, RiCoinFill } from 'react-icons/ri';
import './Navbar.css';

const navItems = [
    { path: '/home', label: 'Home', Icon: IoHomeOutline, ActiveIcon: IoHome },
    { path: '/actions', label: 'Actions', Icon: IoLeafOutline, ActiveIcon: IoLeaf },
    { path: '/rewards', label: 'Rewards', Icon: IoGiftOutline, ActiveIcon: IoGift },
    { path: '/leaderboard', label: 'Ranks', Icon: IoPodiumOutline, ActiveIcon: IoPodium },
    { path: '/profile', label: 'Profile', Icon: IoPersonOutline, ActiveIcon: IoPerson },
];

const sidebarItems = [
    { path: '/home', label: 'Dashboard', Icon: IoHomeOutline, ActiveIcon: IoHome },
    { path: '/actions', label: 'Eco Actions', Icon: IoLeafOutline, ActiveIcon: IoLeaf },
    { path: '/rewards', label: 'Rewards Store', Icon: IoGiftOutline, ActiveIcon: IoGift },
    { path: '/badges', label: 'Badges', Icon: IoRibbonOutline, ActiveIcon: IoRibbon },
    { path: '/leaderboard', label: 'Leaderboard', Icon: IoPodiumOutline, ActiveIcon: IoPodium },
    { path: '/impact', label: 'My Impact', Icon: IoEarthOutline, ActiveIcon: IoEarth },
    { path: '/challenges', label: 'Challenges', Icon: IoFlameOutline, ActiveIcon: IoFlame },
    { path: '/spin', label: 'Spin & Win', Icon: RiCoinLine, ActiveIcon: RiCoinFill },
    { path: '/profile', label: 'Profile', Icon: IoPersonOutline, ActiveIcon: IoPerson },
];

export default function Navbar() {
    const { state, currentBadge } = useApp();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <>
            {/* Desktop Sidebar Toggle Button */}
            <motion.button
                className="sidebar-toggle"
                onClick={toggleSidebar}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle sidebar"
            >
                {sidebarOpen ? <IoCloseOutline size={24} /> : <IoMenuOutline size={24} />}
            </motion.button>

            {/* Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        className="sidebar-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeSidebar}
                    />
                )}
            </AnimatePresence>

            {/* Desktop Sidebar — Slide in/out */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.aside
                        className="sidebar"
                        initial={{ x: '-100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '-100%', opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <div className="sidebar-header">
                            <span className="sidebar-logo">🍃</span>
                            <span className="sidebar-brand">EcoLeaf</span>
                            <button className="sidebar-close" onClick={closeSidebar}>
                                <IoCloseOutline size={22} />
                            </button>
                        </div>

                        <div className="sidebar-user">
                            <div className="sidebar-avatar">{state.user.avatar}</div>
                            <div className="sidebar-user-info">
                                <span className="sidebar-user-name">{state.user.name}</span>
                                <span className="sidebar-user-badge">{currentBadge.icon} {currentBadge.name}</span>
                            </div>
                        </div>

                        <div className="sidebar-balance">
                            <span className="leaf-icon">🍃</span>
                            <span className="balance-amount">{state.leaves}</span>
                            <span className="balance-label">EcoLeaves</span>
                        </div>

                        <nav className="sidebar-nav">
                            {sidebarItems.map((item, i) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <motion.div
                                        key={item.path}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 + i * 0.04, type: 'spring', stiffness: 300 }}
                                    >
                                        <NavLink
                                            to={item.path}
                                            className={`sidebar-link ${isActive ? 'active' : ''}`}
                                            onClick={closeSidebar}
                                        >
                                            {isActive ? <item.ActiveIcon size={20} /> : <item.Icon size={20} />}
                                            <span>{item.label}</span>
                                            <IoChevronForward size={14} className="sidebar-link-arrow" />
                                            {isActive && (
                                                <motion.div
                                                    className="sidebar-indicator"
                                                    layoutId="sidebar-indicator"
                                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                        </NavLink>
                                    </motion.div>
                                );
                            })}
                        </nav>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Mobile Bottom Nav */}
            <nav className="bottom-nav">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <NavLink key={item.path} to={item.path} className={`bottom-nav-item ${isActive ? 'active' : ''}`}>
                            {isActive ? (
                                <motion.div
                                    className="bottom-nav-icon active"
                                    layoutId="bottomNav"
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                >
                                    <item.ActiveIcon size={22} />
                                </motion.div>
                            ) : (
                                <div className="bottom-nav-icon">
                                    <item.Icon size={22} />
                                </div>
                            )}
                            <span className="bottom-nav-label">{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </>
    );
}
