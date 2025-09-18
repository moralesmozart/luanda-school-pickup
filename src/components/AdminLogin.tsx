import React, { useState } from 'react';
import styled from 'styled-components';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (email: string, password: string) => void;
  onBack: () => void;
  error?: string;
}

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 32px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    padding: 24px;
    border-radius: 16px;
  }
`;

const LoginHeader = styled.div`
  margin-bottom: 30px;
`;

const LoginIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  
  svg {
    color: white;
    width: 24px;
    height: 24px;
  }
`;

const LoginTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const LoginSubtitle = styled.p`
  color: #6B7280;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #E5E7EB;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #F9FAFB;
  
  &:focus {
    outline: none;
    border-color: #2563EB;
    background: white;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  
  &::placeholder {
    color: #9CA3AF;
  }

  @media (max-width: 768px) {
    padding: 14px 18px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 0.85rem;
    border-radius: 10px;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #6B7280;
  padding: 4px;
  
  &:hover {
    color: #2563EB;
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #2563EB;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 20px;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(37, 99, 235, 0.1);
  }
`;

const ErrorMessage = styled.div`
  background: #FEF2F2;
  color: #DC2626;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const DemoCredentials = styled.div`
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 16px;
  margin-top: 20px;
  font-size: 0.8rem;
  color: #6B7280;
  
  strong {
    color: #111827;
  }
`;

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular delay de autenticación
    setTimeout(() => {
      onLogin(email, password);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <LoginIcon>
            <Lock size={24} />
          </LoginIcon>
          <LoginTitle>Área Administrativa</LoginTitle>
          <LoginSubtitle>Gestão do Sistema de Recolha Escolar</LoginSubtitle>
        </LoginHeader>

        {error && (
          <ErrorMessage>
            <AlertCircle size={16} />
            {error}
          </ErrorMessage>
        )}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              type="email"
              placeholder="Email de administrador"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Palavra-passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </PasswordToggle>
          </InputGroup>

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? 'A iniciar sessão...' : 'Iniciar Sessão'}
          </LoginButton>
        </Form>

        <DemoCredentials>
          <strong>Credenciais de demonstração:</strong><br />
          Email: admin@escola.ao<br />
          Palavra-passe: admin123
        </DemoCredentials>

        <BackButton onClick={onBack}>
          ← Voltar ao site principal
        </BackButton>
      </LoginCard>
    </LoginContainer>
  );
};

export default AdminLogin;
