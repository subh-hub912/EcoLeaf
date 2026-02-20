import { createContext, useContext, useReducer, useEffect } from 'react';
import { getCurrentBadge, getNextBadge, LEADERBOARD_USERS } from '../data/mockData';

const AppContext = createContext(null);

const STORAGE_KEY = 'ecoleaf_state';

const defaultState = {
    user: {
        name: 'Guest',
        email: '',
        avatar: '🧑',
        hotel: 'Green Valley Resort',
        checkIn: '2026-02-20',
        checkOut: '2026-02-25',
        roomNumber: '204',
    },
    isLoggedIn: false,
    leaves: 0,
    totalLeavesEarned: 0,
    completedActions: [],
    actionTimestamps: {},
    redeemedRewards: [],
    streak: 0,
    lastActiveDate: null,
    completedChallenges: [],
    dailyChallengeProgress: {},
    spinAvailable: true,
    lastSpinDate: null,
    notifications: [],
    multiplier: 1,
};

function loadState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return { ...defaultState, ...JSON.parse(saved) };
        }
    } catch (e) {
        console.warn('Failed to load state:', e);
    }
    return defaultState;
}

function saveState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.warn('Failed to save state:', e);
    }
}

function appReducer(state, action) {
    switch (action.type) {
        case 'LOGIN': {
            return {
                ...state,
                isLoggedIn: true,
                user: { ...state.user, ...action.payload },
            };
        }
        case 'LOGOUT': {
            localStorage.removeItem(STORAGE_KEY);
            return { ...defaultState };
        }
        case 'COMPLETE_ACTION': {
            const { actionId, leaves, impact } = action.payload;
            const earnedLeaves = leaves * state.multiplier;
            const now = Date.now();
            return {
                ...state,
                leaves: state.leaves + earnedLeaves,
                totalLeavesEarned: state.totalLeavesEarned + earnedLeaves,
                completedActions: [...state.completedActions, { actionId, timestamp: now, leaves: earnedLeaves }],
                actionTimestamps: { ...state.actionTimestamps, [actionId]: now },
                multiplier: 1,
                notifications: [
                    ...state.notifications,
                    {
                        id: now,
                        message: `+${earnedLeaves} 🍃 earned!`,
                        type: 'success',
                        timestamp: now,
                    },
                ],
            };
        }
        case 'REDEEM_REWARD': {
            const { rewardId, cost } = action.payload;
            if (state.leaves < cost) return state;
            return {
                ...state,
                leaves: state.leaves - cost,
                redeemedRewards: [...state.redeemedRewards, { rewardId, timestamp: Date.now() }],
                notifications: [
                    ...state.notifications,
                    {
                        id: Date.now(),
                        message: `Reward redeemed! 🎉`,
                        type: 'success',
                        timestamp: Date.now(),
                    },
                ],
            };
        }
        case 'SPIN_WHEEL': {
            const { prize } = action.payload;
            const today = new Date().toDateString();
            let newState = {
                ...state,
                spinAvailable: false,
                lastSpinDate: today,
            };
            if (prize.isMultiplier) {
                newState.multiplier = 2;
                newState.notifications = [
                    ...state.notifications,
                    { id: Date.now(), message: '2x multiplier activated! 🔥', type: 'info', timestamp: Date.now() },
                ];
            } else if (prize.value > 0) {
                newState.leaves = state.leaves + prize.value;
                newState.totalLeavesEarned = state.totalLeavesEarned + prize.value;
                newState.notifications = [
                    ...state.notifications,
                    { id: Date.now(), message: `+${prize.value} 🍃 from the spin!`, type: 'success', timestamp: Date.now() },
                ];
            } else if (prize.isReward) {
                newState.redeemedRewards = [...state.redeemedRewards, { rewardId: prize.rewardId, timestamp: Date.now() }];
                newState.notifications = [
                    ...state.notifications,
                    { id: Date.now(), message: `You won: ${prize.label}! 🎉`, type: 'success', timestamp: Date.now() },
                ];
            }
            return newState;
        }
        case 'UPDATE_STREAK': {
            const today = new Date().toDateString();
            if (state.lastActiveDate === today) return state;
            const yesterday = new Date(Date.now() - 86400000).toDateString();
            const newStreak = state.lastActiveDate === yesterday ? state.streak + 1 : 1;
            return {
                ...state,
                streak: newStreak,
                lastActiveDate: today,
            };
        }
        case 'COMPLETE_CHALLENGE': {
            const { challengeId, reward } = action.payload;
            if (state.completedChallenges.includes(challengeId)) return state;
            return {
                ...state,
                leaves: state.leaves + reward,
                totalLeavesEarned: state.totalLeavesEarned + reward,
                completedChallenges: [...state.completedChallenges, challengeId],
                notifications: [
                    ...state.notifications,
                    { id: Date.now(), message: `Challenge complete! +${reward} 🍃`, type: 'success', timestamp: Date.now() },
                ],
            };
        }
        case 'DISMISS_NOTIFICATION': {
            return {
                ...state,
                notifications: state.notifications.filter((n) => n.id !== action.payload),
            };
        }
        case 'RESET_DAILY': {
            const today = new Date().toDateString();
            if (state.lastSpinDate !== today) {
                return { ...state, spinAvailable: true, completedChallenges: [], dailyChallengeProgress: {} };
            }
            return state;
        }
        default:
            return state;
    }
}

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, null, loadState);

    useEffect(() => {
        saveState(state);
    }, [state]);

    useEffect(() => {
        dispatch({ type: 'UPDATE_STREAK' });
        dispatch({ type: 'RESET_DAILY' });
    }, []);

    const currentBadge = getCurrentBadge(state.totalLeavesEarned);
    const nextBadge = getNextBadge(state.totalLeavesEarned);

    const leaderboard = [...LEADERBOARD_USERS];
    if (state.isLoggedIn) {
        leaderboard.push({
            id: 'user',
            name: state.user.name || 'You',
            avatar: state.user.avatar,
            leaves: state.totalLeavesEarned,
            badge: currentBadge.id,
            hotel: state.user.hotel,
            isUser: true,
        });
    }
    leaderboard.sort((a, b) => b.leaves - a.leaves);

    const value = {
        state,
        dispatch,
        currentBadge,
        nextBadge,
        leaderboard,
        isActionOnCooldown: (actionId, cooldownHours) => {
            const lastDone = state.actionTimestamps[actionId];
            if (!lastDone) return false;
            const hoursSince = (Date.now() - lastDone) / (1000 * 60 * 60);
            return hoursSince < cooldownHours;
        },
        getTotalImpact: () => {
            let water = 0;
            let co2 = 0;
            state.completedActions.forEach((a) => {
                // simplified
                water += 30;
                co2 += 0.5;
            });
            return { water, co2, trees: Math.floor(co2 / 21), actions: state.completedActions.length };
        },
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
}
