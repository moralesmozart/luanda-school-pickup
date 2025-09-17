import React, { useState } from 'react';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';

const AdminArea: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string>('');

  const handleLogin = (email: string, password: string) => {
    // Credenciais de demonstração
    if (email === 'admin@escola.ao' && password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Credenciais inválidas. Use admin@escola.ao / admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setError('');
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  if (isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} onBack={handleBack} />;
  }

  return (
    <AdminLogin 
      onLogin={handleLogin} 
      onBack={handleBack} 
      error={error}
    />
  );
};

export default AdminArea;