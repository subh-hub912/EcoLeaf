// ========================================
// EcoLeaf 🍃 — Mock Data
// ========================================

export const BADGE_TIERS = [
  // ── Tier 1-5: The Glow Up ──
  { id: 'raindrop', name: 'Raindrop', icon: '💧', requiredLeaves: 0, perk: 'Welcome — basic rewards unlocked', color: '#93c5fd', title: 'every drop counts fr' },
  { id: 'sprout', name: 'Sprout', icon: '🌱', requiredLeaves: 15, perk: '3% off any café drink', color: '#86efac', title: 'planted & growing' },
  { id: 'petal', name: 'Petal', icon: '🌸', requiredLeaves: 40, perk: '5% discount on dining', color: '#f9a8d4', title: 'soft but significant' },
  { id: 'bloom', name: 'Bloom', icon: '🌼', requiredLeaves: 75, perk: 'Free herbal tea at the lounge', color: '#fde68a', title: 'main character energy starting' },
  { id: 'wildflower', name: 'Wildflower', icon: '🌻', requiredLeaves: 120, perk: 'Complimentary welcome drink', color: '#fb923c', title: 'growing untamed, no filter needed' },

  // ── Tier 6-10: The Grind ──
  { id: 'root', name: 'Root', icon: '🌿', requiredLeaves: 175, perk: 'Priority pool access', color: '#34d399', title: 'grounded & growing deeper' },
  { id: 'canopy', name: 'Canopy', icon: '🍃', requiredLeaves: 250, perk: '10% off spa treatments', color: '#4ade80', title: 'spreading shade for the real ones' },
  { id: 'reef', name: 'Reef', icon: '🪸', requiredLeaves: 350, perk: 'Free dessert with any meal', color: '#fb7185', title: 'building an empire below the surface' },
  { id: 'evergreen', name: 'Evergreen', icon: '🌲', requiredLeaves: 475, perk: 'Late checkout (1 hour)', color: '#22c55e', title: 'consistency hits different' },
  { id: 'oasis', name: 'Oasis', icon: '🌴', requiredLeaves: 625, perk: 'Spa voucher + ₹300 dining credit', color: '#15803d', title: 'creating calm in the chaos' },

  // ── Tier 11-15: Main Character Era ──
  { id: 'tide', name: 'Tide', icon: '🌊', requiredLeaves: 800, perk: 'Room upgrade raffle entry', color: '#38bdf8', title: 'making waves, no cap' },
  { id: 'summit', name: 'Summit', icon: '🏔️', requiredLeaves: 1000, perk: '2-hour late checkout + lounge access', color: '#818cf8', title: 'peak performance unlocked' },
  { id: 'thunder', name: 'Thunder', icon: '⚡', requiredLeaves: 1250, perk: '20% off all activities', color: '#fbbf24', title: 'can\'t ignore this energy' },
  { id: 'frost', name: 'Frost', icon: '🧊', requiredLeaves: 1550, perk: 'Private pool cabana + drinks', color: '#22d3ee', title: 'cool under pressure, always' },
  { id: 'nova', name: 'Nova', icon: '🔮', requiredLeaves: 1900, perk: 'Complimentary couple spa session', color: '#a78bfa', title: 'a whole new star just dropped' },

  // ── Tier 16-20: The Ascent ──
  { id: 'shield', name: 'Shield', icon: '🛡️', requiredLeaves: 2300, perk: 'Guaranteed room upgrade', color: '#f59e0b', title: 'protector arc activated' },
  { id: 'solar', name: 'Solar', icon: '☀️', requiredLeaves: 2800, perk: 'VIP breakfast + sunset experience', color: '#fb923c', title: 'running on pure energy' },
  { id: 'breeze', name: 'Breeze', icon: '🌬️', requiredLeaves: 3400, perk: 'Full-day spa pass + ₹1000 credit', color: '#67e8f9', title: 'effortless but makes an impact' },
  { id: 'titan', name: 'Titan', icon: '🌳', requiredLeaves: 4100, perk: 'Suite upgrade + private dining', color: '#a3e635', title: 'built different, literally' },
  { id: 'ember', name: 'Ember', icon: '🌋', requiredLeaves: 5000, perk: 'Presidential suite + full board', color: '#ef4444', title: 'the spark that never dies' },

  // ── Tier 21-25: Legendary Arc ──
  { id: 'phoenix', name: 'Phoenix', icon: '🔥', requiredLeaves: 6000, perk: 'Annual eco-membership + partner resorts', color: '#f97316', title: 'reborn era — ate and left no crumbs' },
  { id: 'starlight', name: 'Starlight', icon: '⭐', requiredLeaves: 7500, perk: 'Lifetime priority booking + concierge', color: '#fde047', title: 'guiding the way for everyone' },
  { id: 'mythic', name: 'Mythic', icon: '🌿✨', requiredLeaves: 9500, perk: 'A real tree planted in your name', color: '#4ade80', title: 'legends never fade — they grow' },
  { id: 'cosmic', name: 'Cosmic', icon: '🌌', requiredLeaves: 12000, perk: 'Exclusive eco-retreat + VIP for life', color: '#c084fc', title: 'beyond this world, fr fr' },
  { id: 'gaia', name: 'Gaia', icon: '🌍👑', requiredLeaves: 15000, perk: 'Legend status — all perks unlocked forever', color: '#fbbf24', title: 'the chosen one — no cap' },
];

export const SUSTAINABLE_ACTIONS = [
  {
    id: 'reuse-towels',
    title: 'Keep Your Towels',
    description: 'Keep your personal towels fresh for another day',
    nudge: '92% of guests at this resort chose this',
    leaves: 5,
    icon: '🧴',
    category: 'Room',
    impact: { water: 70, co2: 0.2 },
    cooldown: 24, // hours
  },
  {
    id: 'skip-cleaning',
    title: 'Enjoy Privacy',
    description: 'Enjoy uninterrupted privacy — no housekeeping today',
    nudge: 'Most popular choice among returning guests',
    leaves: 10,
    icon: '🚪',
    category: 'Room',
    impact: { water: 40, co2: 0.5 },
    cooldown: 24,
  },
  {
    id: 'local-cuisine',
    title: 'Taste Local Flavors',
    description: 'Taste authentic regional flavors curated by our chef',
    nudge: 'Chef\'s recommendation for today',
    leaves: 8,
    icon: '🍽️',
    category: 'Dining',
    impact: { water: 0, co2: 1.2 },
    cooldown: 12,
  },
  {
    id: 'refill-water',
    title: 'Premium Refill',
    description: 'Stay hydrated at our premium refill stations',
    nudge: 'Filtered mountain spring water available',
    leaves: 3,
    icon: '💧',
    category: 'Dining',
    impact: { water: 1, co2: 0.1 },
    cooldown: 4,
  },
  {
    id: 'digital-checkout',
    title: 'Swift Departure',
    description: 'Swift, paperless digital checkout',
    nudge: 'Save 10 minutes — skip the front desk queue',
    leaves: 5,
    icon: '📱',
    category: 'General',
    impact: { water: 0, co2: 0.05 },
    cooldown: 0,
  },
  {
    id: 'eco-transport',
    title: 'Explore Like a Local',
    description: 'Explore the area on our complimentary cycles',
    nudge: 'Discover hidden spots most tourists miss',
    leaves: 15,
    icon: '🚲',
    category: 'Activity',
    impact: { water: 0, co2: 2.5 },
    cooldown: 8,
  },
  {
    id: 'plant-meal',
    title: 'Chef\'s Green Creation',
    description: 'Try the chef\'s signature plant-based creation',
    nudge: 'Award-winning dish — most reviewed on our menu',
    leaves: 10,
    icon: '🥗',
    category: 'Dining',
    impact: { water: 50, co2: 1.8 },
    cooldown: 12,
  },
  {
    id: 'ac-comfort',
    title: 'Optimal Comfort',
    description: 'Set AC to the optimal comfort temperature (24°C)',
    nudge: 'Recommended by sleep experts for best rest',
    leaves: 5,
    icon: '❄️',
    category: 'Room',
    impact: { water: 0, co2: 0.8 },
    cooldown: 12,
  },
  {
    id: 'natural-light',
    title: 'Sunrise Wake-Up',
    description: 'Wake up with natural sunshine and fresh morning air',
    nudge: 'Guests who choose this report better morning energy',
    leaves: 3,
    icon: '☀️',
    category: 'Room',
    impact: { water: 0, co2: 0.3 },
    cooldown: 24,
  },
  {
    id: 'shorter-shower',
    title: 'Quick Refresh',
    description: 'Quick refresh, maximum energy — the power shower',
    nudge: 'Challenge yourself: can you beat 5 minutes?',
    leaves: 7,
    icon: '🚿',
    category: 'Room',
    impact: { water: 40, co2: 0.4 },
    cooldown: 12,
  },
];

export const REWARDS = [
  {
    id: 'welcome-drink',
    title: 'Complimentary Welcome Drink',
    description: 'Choose any signature cocktail or mocktail',
    cost: 15,
    icon: '🍹',
    category: 'Dining',
    available: true,
  },
  {
    id: 'spa-discount',
    title: '20% Off Spa Session',
    description: 'Relax with a discounted premium spa experience',
    cost: 40,
    icon: '💆',
    category: 'Wellness',
    available: true,
  },
  {
    id: 'late-checkout',
    title: 'Late Checkout (2 hrs)',
    description: 'Extend your stay — checkout at 2 PM instead of noon',
    cost: 35,
    icon: '🕐',
    category: 'Stay',
    available: true,
  },
  {
    id: 'room-upgrade',
    title: 'Room Upgrade Chance',
    description: 'Enter the draw for a complimentary room upgrade',
    cost: 60,
    icon: '🏨',
    category: 'Stay',
    available: true,
  },
  {
    id: 'meal-voucher',
    title: '₹500 Dining Voucher',
    description: 'Use at any hotel restaurant or bar',
    cost: 50,
    icon: '🎫',
    category: 'Dining',
    available: true,
  },
  {
    id: 'pool-cabana',
    title: 'Private Pool Cabana (1hr)',
    description: 'Exclusive poolside cabana with refreshments',
    cost: 80,
    icon: '🏖️',
    category: 'Activity',
    available: true,
  },
  {
    id: 'eco-souvenir',
    title: 'Eco Souvenir Kit',
    description: 'Handcrafted local souvenir made from recycled materials',
    cost: 25,
    icon: '🎁',
    category: 'Gift',
    available: true,
  },
  {
    id: 'breakfast-buffet',
    title: 'Free Breakfast Buffet',
    description: 'Complimentary breakfast for two at the grand dining hall',
    cost: 45,
    icon: '🥐',
    category: 'Dining',
    available: true,
  },
];

export const DAILY_CHALLENGES = [
  {
    id: 'challenge-1',
    title: 'Green Morning',
    description: 'Complete 3 sustainable actions before noon',
    reward: 20,
    icon: '🌅',
    target: 3,
    type: 'actions',
  },
  {
    id: 'challenge-2',
    title: 'Water Warrior',
    description: 'Save 100L of water through your choices today',
    reward: 25,
    icon: '💧',
    target: 100,
    type: 'water',
  },
  {
    id: 'challenge-3',
    title: 'Local Explorer',
    description: 'Choose local cuisine for both lunch and dinner',
    reward: 15,
    icon: '🍛',
    target: 2,
    type: 'local-cuisine',
  },
  {
    id: 'challenge-4',
    title: 'Carbon Cutter',
    description: 'Reduce 2kg of CO₂ emissions through your choices',
    reward: 30,
    icon: '🌿',
    target: 2,
    type: 'co2',
  },
  {
    id: 'challenge-5',
    title: 'Eco Champion',
    description: 'Complete 5 different sustainable actions today',
    reward: 40,
    icon: '🏆',
    target: 5,
    type: 'unique-actions',
  },
];

export const SPIN_WHEEL_PRIZES = [
  { label: '5 🍃', value: 5, color: '#22c55e', probability: 0.25 },
  { label: '10 🍃', value: 10, color: '#16a34a', probability: 0.2 },
  { label: '20 🍃', value: 20, color: '#15803d', probability: 0.15 },
  { label: '50 🍃', value: 50, color: '#fbbf24', probability: 0.05 },
  { label: 'Free Drink 🍹', value: 0, color: '#f59e0b', probability: 0.1, isReward: true, rewardId: 'welcome-drink' },
  { label: '2x Next', value: 0, color: '#38bdf8', probability: 0.1, isMultiplier: true },
  { label: '3 🍃', value: 3, color: '#4ade80', probability: 0.1 },
  { label: '15 🍃', value: 15, color: '#059669', probability: 0.05 },
];

export const LEADERBOARD_USERS = [
  { id: 1, name: 'Aarav Sharma', avatar: '👨‍💼', leaves: 342, badge: 'tree', hotel: 'Taj Lakefront' },
  { id: 2, name: 'Priya Patel', avatar: '👩‍💻', leaves: 298, badge: 'sapling', hotel: 'Marriott Green' },
  { id: 3, name: 'Rahul Mehra', avatar: '🧑‍🎨', leaves: 256, badge: 'sapling', hotel: 'Taj Lakefront' },
  { id: 4, name: 'Sneha Reddy', avatar: '👩‍🔬', leaves: 231, badge: 'sapling', hotel: 'ITC Grand' },
  { id: 5, name: 'Vikram Singh', avatar: '👨‍✈️', leaves: 198, badge: 'sapling', hotel: 'Oberoi Eco' },
  { id: 6, name: 'Aishwarya Nair', avatar: '👩‍🎤', leaves: 176, badge: 'sapling', hotel: 'Taj Lakefront' },
  { id: 7, name: 'Karthik Iyer', avatar: '👨‍🏫', leaves: 145, badge: 'sprout', hotel: 'Marriott Green' },
  { id: 8, name: 'Diya Kapoor', avatar: '👩‍⚕️', leaves: 122, badge: 'sprout', hotel: 'ITC Grand' },
  { id: 9, name: 'Arjun Das', avatar: '👨‍🍳', leaves: 98, badge: 'sprout', hotel: 'Oberoi Eco' },
  { id: 10, name: 'Meera Joshi', avatar: '👩‍🎓', leaves: 76, badge: 'sprout', hotel: 'Taj Lakefront' },
];

export const IMPACT_FACTS = [
  'Every towel reuse saves enough water to fill a bathtub 🛁',
  'Choosing local food reduces transport emissions by 80% 🚛',
  'A 5-minute shorter shower saves 45 litres of water 💧',
  'Cycling instead of cab saves 2.5 kg of CO₂ per trip 🚲',
  'Skipping room cleaning prevents 3+ chemical products from entering waterways 🧪',
  'Plant-based meals use 75% less water than meat-based ones 🌱',
];

export const getCurrentBadge = (totalLeaves) => {
  let currentBadge = BADGE_TIERS[0];
  for (const badge of BADGE_TIERS) {
    if (totalLeaves >= badge.requiredLeaves) {
      currentBadge = badge;
    }
  }
  return currentBadge;
};

export const getNextBadge = (totalLeaves) => {
  for (const badge of BADGE_TIERS) {
    if (totalLeaves < badge.requiredLeaves) {
      return badge;
    }
  }
  return null; // max level reached
};

export const getProgressToNextBadge = (totalLeaves) => {
  const current = getCurrentBadge(totalLeaves);
  const next = getNextBadge(totalLeaves);
  if (!next) return 100;
  const range = next.requiredLeaves - current.requiredLeaves;
  const progress = totalLeaves - current.requiredLeaves;
  return Math.min(100, Math.round((progress / range) * 100));
};
