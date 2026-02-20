import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import CursorGlow from './components/CursorGlow';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Home from './pages/Home';
import Actions from './pages/Actions';
import Rewards from './pages/Rewards';
import Badges from './pages/Badges';
import Leaderboard from './pages/Leaderboard';
import Impact from './pages/Impact';
import Challenges from './pages/Challenges';
import SpinWheel from './pages/SpinWheel';
import Profile from './pages/Profile';

function ProtectedRoute({ children }) {
  const { state } = useApp();
  if (!state.isLoggedIn) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const { state } = useApp();

  return (
    <>
      <div className="bg-pattern" />
      <CursorGlow />
      {state.isLoggedIn && <Navbar />}
      <Toast />
      <Routes>
        <Route path="/" element={state.isLoggedIn ? <Navigate to="/home" replace /> : <Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/actions" element={<ProtectedRoute><Actions /></ProtectedRoute>} />
        <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
        <Route path="/badges" element={<ProtectedRoute><Badges /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/impact" element={<ProtectedRoute><Impact /></ProtectedRoute>} />
        <Route path="/challenges" element={<ProtectedRoute><Challenges /></ProtectedRoute>} />
        <Route path="/spin" element={<ProtectedRoute><SpinWheel /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
