import React, { useState } from 'react';
import styled from 'styled-components';
import { LogIn, User, Lock, Car, Clock, CheckCircle, XCircle, ArrowLeft, Home, UserPlus, Plus, Edit, Trash2, Users } from 'lucide-react';
import { useAppContext, Parent, Student } from '../context/AppContext';

// Tipos de carros disponibles (mismo que en AdminDashboard)
const carTypes = [
  { emoji: '🚗', name: 'Carro Sedan', value: 'sedan' },
  { emoji: '🚙', name: 'SUV', value: 'suv' },
  { emoji: '🚐', name: 'Van', value: 'van' },
  { emoji: '🚚', name: 'Camião', value: 'truck' },
  { emoji: '🚛', name: 'Camião Grande', value: 'big-truck' },
  { emoji: '🚕', name: 'Taxi', value: 'taxi' },
  { emoji: '🚓', name: 'Viatura Policial', value: 'police' },
  { emoji: '🚔', name: 'Viatura Policial 2', value: 'police-2' },
  { emoji: '🚑', name: 'Ambulância', value: 'ambulance' },
  { emoji: '🚒', name: 'Bombeiros', value: 'fire-truck' },
  { emoji: '🚜', name: 'Trator', value: 'tractor' },
  { emoji: '🏍️', name: 'Mota', value: 'motorcycle' },
  { emoji: '🛵', name: 'Scooter', value: 'scooter' },
  { emoji: '🚲', name: 'Bicicleta', value: 'bicycle' },
  { emoji: '🛴', name: 'Trotinete', value: 'scooter-2' }
];

const getCarEmoji = (carType: string): string => {
  const carTypeMap: { [key: string]: string } = {
    'sedan': '🚗', 'suv': '🚙', 'van': '🚐', 'truck': '🚚', 'big-truck': '🚛',
    'taxi': '🚕', 'police': '🚓', 'police-2': '🚔', 'ambulance': '🚑', 'fire-truck': '🚒',
    'tractor': '🚜', 'motorcycle': '🏍️', 'scooter': '🛵', 'bicycle': '🚲', 'scooter-2': '🛴'
  };
  return carTypeMap[carType] || '🚗';
};

const getCarTypeByValue = (value: string) => {
  return carTypes.find(car => car.value === value);
};

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
`;

const WideCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 30px;
`;

const Icon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
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

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #6B7280;
  font-size: 0.9rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
    border-color: #10B981;
    background: white;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  &::placeholder {
    color: #9CA3AF;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'success' | 'danger' }>`
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  ${props => props.variant === 'primary' && `
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    color: white;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background: #6B7280;
    color: white;
    &:hover {
      background: #4B5563;
    }
  `}
  
  ${props => props.variant === 'success' && `
    background: #10B981;
    color: white;
    &:hover {
      background: #059669;
    }
  `}
  
  ${props => props.variant === 'danger' && `
    background: #EF4444;
    color: white;
    &:hover {
      background: #DC2626;
    }
  `}
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 20px;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
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

const SuccessMessage = styled.div`
  background: #F0FDF4;
  color: #059669;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  text-align: left;
`;

const CarPickerContainer = styled.div`
  position: relative;
`;

const CarPickerButton = styled.button`
  width: 100%;
  padding: 12px;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #10B981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const CarPickerDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CarPickerDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const CarOption = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  transition: background-color 0.2s;
  
  &:hover {
    background: #F9FAFB;
  }
`;

const CarEmoji = styled.span`
  font-size: 1.5rem;
  width: 32px;
  text-align: center;
`;

const CarText = styled.span`
  font-size: 0.9rem;
  color: #374151;
`;

const DashboardContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const DashboardTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const DashboardSubtitle = styled.p`
  color: #6B7280;
  margin: 4px 0 0 0;
`;

const LogoutButton = styled.button`
  background: #EF4444;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #DC2626;
    transform: translateY(-2px);
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 30px;
  background: white;
  padding: 8px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  ${props => props.active ? `
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  ` : `
    background: #F9FAFB;
    color: #6B7280;
    &:hover {
      background: #F3F4F6;
      color: #374151;
    }
  `}
`;

const TabContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-height: 400px;
`;

const StudentCard = styled.div`
  background: #F9FAFB;
  border: 2px solid #E5E7EB;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #10B981;
    background: #F0FDF4;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.1);
  }
`;

const StudentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const StudentInfo = styled.div`
  flex: 1;
`;

const StudentName = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
`;

const StudentDetails = styled.div`
  font-size: 0.9rem;
  color: #6B7280;
  margin-bottom: 4px;
`;

const StudentActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ variant: 'primary' | 'success' | 'danger' }>`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  
  ${props => props.variant === 'primary' && `
    background: #3B82F6;
    color: white;
    &:hover { background: #2563EB; }
  `}
  
  ${props => props.variant === 'success' && `
    background: #10B981;
    color: white;
    &:hover { background: #059669; }
  `}
  
  ${props => props.variant === 'danger' && `
    background: #EF4444;
    color: white;
    &:hover { background: #DC2626; }
  `}
`;

const QueueCard = styled.div<{ isCurrentUser?: boolean }>`
  background: ${props => props.isCurrentUser ? 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)' : '#F9FAFB'};
  border: 2px solid ${props => props.isCurrentUser ? '#F59E0B' : '#E5E7EB'};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const QueueHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const PositionBadge = styled.div<{ isCurrentUser?: boolean }>`
  background: ${props => props.isCurrentUser ? '#F59E0B' : '#6B7280'};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const StudentQueueInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CarInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
`;

const ParentApp: React.FC = () => {
  const { 
    authenticateParent, 
    getStudentsByParent, 
    addStudent, 
    addToQueue, 
    queueStudents 
  } = useAppContext();
  
  // Estados del flujo
  const [currentStep, setCurrentStep] = useState<'login' | 'dashboard'>('login');
  const [currentUser, setCurrentUser] = useState<Parent | null>(null);
  const [activeTab, setActiveTab] = useState<'add-kid' | 'see-kids' | 'estou-aqui' | 'see-queue'>('add-kid');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  
  // Estados del login
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  
  // Estados del formulario de estudiante
  const [newStudent, setNewStudent] = useState({
    name: '',
    surname: '',
    schoolId: '',
    class: '',
    parent1Name: '',
    parent1Phone: '',
    parent2Name: '',
    parent2Phone: '',
    car1Type: 'sedan',
    car1Color: '',
    car1Plate: '',
    car2Type: '',
    car2Color: '',
    car2Plate: ''
  });
  
  const [car1PickerOpen, setCar1PickerOpen] = useState(false);
  const [car2PickerOpen, setCar2PickerOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const parent = authenticateParent(loginData.username, loginData.password);
    if (parent) {
      setCurrentUser(parent);
      setCurrentStep('dashboard');
    } else {
      setError('Credenciais inválidas. Verifique o utilizador e palavra-passe.');
    }
  };

  const handleDemoLogin = (username: string) => {
    setError('');
    
    const parent = authenticateParent(username, 'demo123');
    if (parent) {
      setCurrentUser(parent);
      setCurrentStep('dashboard');
      setSuccess(`Bem-vindo, ${parent.name}! Login de demonstração realizado com sucesso.`);
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError('Erro ao fazer login de demonstração.');
    }
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!newStudent.name || !newStudent.surname || !newStudent.schoolId) {
      setError('Por favor, preencha pelo menos o nome, apelido e ID da escola.');
      return;
    }
    
    if (!currentUser) return;
    
    addStudent({
      name: newStudent.name,
      surname: newStudent.surname,
      schoolId: newStudent.schoolId,
      class: newStudent.class,
      parentId: currentUser.id,
      parent1Name: newStudent.parent1Name || currentUser.name,
      parent1Phone: newStudent.parent1Phone || currentUser.phone,
      parent2Name: newStudent.parent2Name,
      parent2Phone: newStudent.parent2Phone,
      car1Type: newStudent.car1Type,
      car1Color: newStudent.car1Color,
      car1Plate: newStudent.car1Plate,
      car2Type: newStudent.car2Type,
      car2Color: newStudent.car2Color,
      car2Plate: newStudent.car2Plate
    });
    
    setSuccess('Aluno adicionado com sucesso! Aguarde aprovação da escola.');
    setNewStudent({
      name: '', surname: '', schoolId: '', class: '', parent1Name: '', parent1Phone: '',
      parent2Name: '', parent2Phone: '', car1Type: 'sedan', car1Color: '', car1Plate: '',
      car2Type: '', car2Color: '', car2Plate: ''
    });
    
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCarTypeSelect = (carType: any, carNumber: 1 | 2, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (carNumber === 1) {
      setNewStudent({...newStudent, car1Type: carType.value});
      setCar1PickerOpen(false);
    } else {
      setNewStudent({...newStudent, car2Type: carType.value});
      setCar2PickerOpen(false);
    }
  };

  const handleEstouAqui = (student: Student) => {
    addToQueue(student);
    setSuccess(`Pedido de recolha enviado para ${student.name} ${student.surname}!`);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentStep('login');
    setLoginData({ username: '', password: '' });
    setActiveTab('add-kid');
  };

  const userStudents = currentUser ? getStudentsByParent(currentUser.id) : [];
  const approvedStudents = userStudents.filter(s => s.status === 'approved');

  // Renderizar baseado no step atual
  if (currentStep === 'login') {
    return (
      <Container>
        <Card>
          <Header>
            <Icon>
              <LogIn size={24} />
            </Icon>
            <Title>Acesso para Pais</Title>
            <Subtitle>Inicie sessão para aceder à aplicação</Subtitle>
          </Header>

          {error && (
            <ErrorMessage>
              <XCircle size={16} />
              {error}
            </ErrorMessage>
          )}

          <Form onSubmit={handleLogin}>
            <InputGroup>
              <Input
                type="text"
                placeholder="Utilizador"
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                required
              />
            </InputGroup>

            <InputGroup>
              <Input
                type="password"
                placeholder="Palavra-passe"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
            </InputGroup>

            <Button type="submit" variant="primary">
              <LogIn size={16} />
              Iniciar Sessão
            </Button>
          </Form>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '16px' }}>
              Ou experimente com dados de demonstração:
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                type="button" 
                variant="secondary"
                onClick={() => handleDemoLogin('joao.santos')}
                style={{ fontSize: '0.9rem', padding: '12px 20px' }}
              >
                <User size={16} />
                Demo: João Santos
              </Button>
              <Button 
                type="button" 
                variant="secondary"
                onClick={() => handleDemoLogin('carlos.ferreira')}
                style={{ fontSize: '0.9rem', padding: '12px 20px' }}
              >
                <User size={16} />
                Demo: Carlos Ferreira
              </Button>
            </div>
          </div>

          <BackButton onClick={handleBack}>
            <ArrowLeft size={16} />
            Voltar ao site principal
          </BackButton>
        </Card>
      </Container>
    );
  }

  if (currentStep === 'dashboard') {
    return (
      <Container>
        <DashboardContainer>
          <DashboardHeader>
            <div>
              <DashboardTitle>Bem-vindo, {currentUser?.name}!</DashboardTitle>
              <DashboardSubtitle>Gerencie os seus filhos e acompanhe a recolha</DashboardSubtitle>
            </div>
            <LogoutButton onClick={handleLogout}>
              <XCircle size={16} />
              Sair
            </LogoutButton>
          </DashboardHeader>

          {success && (
            <SuccessMessage style={{ marginBottom: '20px' }}>
              <CheckCircle size={16} />
              {success}
            </SuccessMessage>
          )}

          <TabsContainer>
            <Tab 
              active={activeTab === 'add-kid'} 
              onClick={() => setActiveTab('add-kid')}
            >
              <Plus size={16} />
              Adicionar Filho
            </Tab>
            <Tab 
              active={activeTab === 'see-kids'} 
              onClick={() => setActiveTab('see-kids')}
            >
              <Users size={16} />
              Ver Filhos ({userStudents.length})
            </Tab>
            <Tab 
              active={activeTab === 'estou-aqui'} 
              onClick={() => setActiveTab('estou-aqui')}
            >
              <Car size={16} />
              Estou Aqui
            </Tab>
            <Tab 
              active={activeTab === 'see-queue'} 
              onClick={() => setActiveTab('see-queue')}
            >
              <Clock size={16} />
              Ver Fila
            </Tab>
          </TabsContainer>

          <TabContent>
            {activeTab === 'add-kid' && (
              <div>
                <Header>
                  <Icon>
                    <UserPlus size={24} />
                  </Icon>
                  <Title>Adicionar Novo Filho</Title>
                  <Subtitle>Preencha os dados do seu filho para solicitar aprovação</Subtitle>
                </Header>

                {error && (
                  <ErrorMessage>
                    <XCircle size={16} />
                    {error}
                  </ErrorMessage>
                )}

                <Form onSubmit={handleAddStudent}>
                  <FormRow>
                    <FormGroup>
                      <Label>Nome</Label>
                      <Input
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                        placeholder="Nome do aluno"
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Apelido</Label>
                      <Input
                        value={newStudent.surname}
                        onChange={(e) => setNewStudent({...newStudent, surname: e.target.value})}
                        placeholder="Apelido do aluno"
                        required
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>ID da Escola</Label>
                      <Input
                        value={newStudent.schoolId}
                        onChange={(e) => setNewStudent({...newStudent, schoolId: e.target.value})}
                        placeholder="Ex: MS001"
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Turma</Label>
                      <Input
                        value={newStudent.class}
                        onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                        placeholder="Ex: 5º A"
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>Responsável 1 - Nome</Label>
                      <Input
                        value={newStudent.parent1Name}
                        onChange={(e) => setNewStudent({...newStudent, parent1Name: e.target.value})}
                        placeholder="Nome do responsável"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Responsável 1 - Telefone</Label>
                      <Input
                        value={newStudent.parent1Phone}
                        onChange={(e) => setNewStudent({...newStudent, parent1Phone: e.target.value})}
                        placeholder="+244 900 000 000"
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>Tipo de Veículo 1</Label>
                      <CarPickerContainer>
                        <CarPickerButton
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCar1PickerOpen(!car1PickerOpen);
                          }}
                        >
                          <CarPickerDisplay>
                            {newStudent.car1Type ? (
                              <>
                                <span style={{ fontSize: '1.2rem' }}>
                                  {getCarTypeByValue(newStudent.car1Type)?.emoji}
                                </span>
                                <span>{getCarTypeByValue(newStudent.car1Type)?.name}</span>
                              </>
                            ) : (
                              <span style={{ color: '#9CA3AF' }}>Selecionar veículo</span>
                            )}
                          </CarPickerDisplay>
                          <span style={{ color: '#6B7280' }}>▼</span>
                        </CarPickerButton>
                        <CarPickerDropdown isOpen={car1PickerOpen}>
                          {carTypes.map((carType) => (
                            <CarOption
                              key={carType.value}
                              onClick={(e) => handleCarTypeSelect(carType, 1, e)}
                            >
                              <CarEmoji>{carType.emoji}</CarEmoji>
                              <CarText>{carType.name}</CarText>
                            </CarOption>
                          ))}
                        </CarPickerDropdown>
                      </CarPickerContainer>
                    </FormGroup>
                    <FormGroup>
                      <Label>Carro 1 - Cor</Label>
                      <Input
                        value={newStudent.car1Color}
                        onChange={(e) => setNewStudent({...newStudent, car1Color: e.target.value})}
                        placeholder="Ex: Azul"
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>Carro 1 - Matrícula</Label>
                      <Input
                        value={newStudent.car1Plate}
                        onChange={(e) => setNewStudent({...newStudent, car1Plate: e.target.value})}
                        placeholder="Ex: LD-01-AB-23"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Tipo de Veículo 2 (Opcional)</Label>
                      <CarPickerContainer>
                        <CarPickerButton
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCar2PickerOpen(!car2PickerOpen);
                          }}
                        >
                          <CarPickerDisplay>
                            {newStudent.car2Type ? (
                              <>
                                <span style={{ fontSize: '1.2rem' }}>
                                  {getCarTypeByValue(newStudent.car2Type)?.emoji}
                                </span>
                                <span>{getCarTypeByValue(newStudent.car2Type)?.name}</span>
                              </>
                            ) : (
                              <span style={{ color: '#9CA3AF' }}>Selecionar veículo</span>
                            )}
                          </CarPickerDisplay>
                          <span style={{ color: '#6B7280' }}>▼</span>
                        </CarPickerButton>
                        <CarPickerDropdown isOpen={car2PickerOpen}>
                          {carTypes.map((carType) => (
                            <CarOption
                              key={carType.value}
                              onClick={(e) => handleCarTypeSelect(carType, 2, e)}
                            >
                              <CarEmoji>{carType.emoji}</CarEmoji>
                              <CarText>{carType.name}</CarText>
                            </CarOption>
                          ))}
                        </CarPickerDropdown>
                      </CarPickerContainer>
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>Carro 2 - Cor (Opcional)</Label>
                      <Input
                        value={newStudent.car2Color}
                        onChange={(e) => setNewStudent({...newStudent, car2Color: e.target.value})}
                        placeholder="Ex: Branco"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Carro 2 - Matrícula (Opcional)</Label>
                      <Input
                        value={newStudent.car2Plate}
                        onChange={(e) => setNewStudent({...newStudent, car2Plate: e.target.value})}
                        placeholder="Ex: LD-02-CD-45"
                      />
                    </FormGroup>
                  </FormRow>

                  <Button type="submit" variant="primary">
                    <UserPlus size={16} />
                    Adicionar Filho
                  </Button>
                </Form>
              </div>
            )}

            {activeTab === 'see-kids' && (
              <div>
                <Header>
                  <Icon>
                    <Users size={24} />
                  </Icon>
                  <Title>Meus Filhos</Title>
                  <Subtitle>Gerencie os dados dos seus filhos</Subtitle>
                </Header>

                {userStudents.length === 0 ? (
                  <EmptyState>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>👶</div>
                    <h3>Nenhum filho registado</h3>
                    <p>Adicione o seu primeiro filho na aba "Adicionar Filho"</p>
                  </EmptyState>
                ) : (
                  <div>
                    {userStudents.map(student => (
                      <StudentCard key={student.id}>
                        <StudentHeader>
                          <StudentInfo>
                            <StudentName>
                              {student.name} {student.surname}
                            </StudentName>
                            <StudentDetails>
                              {student.class} • {student.schoolId}
                            </StudentDetails>
                            <StudentDetails>
                              {getCarTypeByValue(student.car1Type)?.emoji} {student.car1Color} - {student.car1Plate}
                            </StudentDetails>
                            <StudentDetails>
                              Status: <strong style={{ 
                                color: student.status === 'approved' ? '#10B981' : 
                                       student.status === 'pending' ? '#F59E0B' : '#EF4444'
                              }}>
                                {student.status === 'approved' ? 'Aprovado' :
                                 student.status === 'pending' ? 'Pendente' : 'Rejeitado'}
                              </strong>
                            </StudentDetails>
                          </StudentInfo>
                          <StudentActions>
                            <ActionButton variant="primary">
                              <Edit size={14} />
                              Editar
                            </ActionButton>
                            <ActionButton variant="danger">
                              <Trash2 size={14} />
                              Remover
                            </ActionButton>
                          </StudentActions>
                        </StudentHeader>
                      </StudentCard>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'estou-aqui' && (
              <div>
                <Header>
                  <Icon>
                    <Car size={24} />
                  </Icon>
                  <Title>Estou Aqui!</Title>
                  <Subtitle>Notifique a escola que chegou para recolher o seu filho</Subtitle>
                </Header>

                {approvedStudents.length === 0 ? (
                  <EmptyState>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⏳</div>
                    <h3>Nenhum filho aprovado</h3>
                    <p>Aguarde a aprovação da escola para poder notificar a sua chegada</p>
                  </EmptyState>
                ) : (
                  <div>
                    {approvedStudents.map(student => (
                      <StudentCard key={student.id}>
                        <StudentHeader>
                          <StudentInfo>
                            <StudentName>
                              {student.name} {student.surname}
                            </StudentName>
                            <StudentDetails>
                              {student.class} • {student.schoolId}
                            </StudentDetails>
                            <StudentDetails>
                              {getCarTypeByValue(student.car1Type)?.emoji} {student.car1Color} - {student.car1Plate}
                            </StudentDetails>
                          </StudentInfo>
                          <StudentActions>
                            <ActionButton 
                              variant="success"
                              onClick={() => handleEstouAqui(student)}
                            >
                              <Car size={14} />
                              🚗 Estou Aqui!
                            </ActionButton>
                          </StudentActions>
                        </StudentHeader>
                      </StudentCard>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'see-queue' && (
              <div>
                <Header>
                  <Icon>
                    <Clock size={24} />
                  </Icon>
                  <Title>Fila de Recolha</Title>
                  <Subtitle>Acompanhe a posição dos seus filhos na fila</Subtitle>
                </Header>

                {queueStudents.length === 0 ? (
                  <EmptyState>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚗</div>
                    <h3>Nenhum aluno em fila</h3>
                    <p>A fila de recolha está vazia no momento</p>
                  </EmptyState>
                ) : (
                  <div>
                    {queueStudents.map(student => {
                      const isMyStudent = userStudents.some(s => s.id === student.id);
                      return (
                        <QueueCard key={student.id} isCurrentUser={isMyStudent}>
                          <QueueHeader>
                            <PositionBadge isCurrentUser={isMyStudent}>
                              Posição #{student.position}
                            </PositionBadge>
                            <div style={{ fontSize: '0.9rem', color: '#6B7280' }}>
                              Chegou: {student.arrivalTime}
                            </div>
                          </QueueHeader>
                          
                          <StudentQueueInfo>
                            <CarInfo>
                              {getCarEmoji(student.carType)}
                            </CarInfo>
                            <div>
                              <StudentName>
                                {isMyStudent 
                                  ? `${student.studentName} (Seu filho)` 
                                  : 'Aluno em espera'
                                }
                              </StudentName>
                              <StudentDetails>
                                {isMyStudent 
                                  ? `${student.studentClass} • ${student.parentName}` 
                                  : 'Aguardando recolha'
                                }
                              </StudentDetails>
                            </div>
                          </StudentQueueInfo>
                        </QueueCard>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </TabContent>

          <BackButton onClick={handleBack} style={{ marginTop: '30px' }}>
            <ArrowLeft size={16} />
            Voltar ao site principal
          </BackButton>
        </DashboardContainer>
      </Container>
    );
  }

  return null;
};

export default ParentApp;