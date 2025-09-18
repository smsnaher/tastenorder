// ...existing code...
import './App.css';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/tastenorder/login" element={<Login onSwitchToRegister={() => window.location.href = '/tastenorder/register'} />} />
          <Route path="/tastenorder/register" element={<Register onSwitchToLogin={() => window.location.href = '/tastenorder/login'} />} />
          {/* Default route: redirect to /login */}
          <Route path="*" element={<Navigate to="/tastenorder/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
