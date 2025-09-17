import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  LogOut, 
  Plus, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Trash2,
  ArrowLeft,
  UserPlus,
  BarChart3
} from 'lucide-react';
import { useAppContext, Parent } from '../context/AppContext';

interface AdminDashboardProps {
  onLogout: () => void;
  onBack: () => void;
}

interface Student {
  id: string;
  name: string;
  surname: string;
  schoolId: string;
  class: string;
  parentId: string; // Referencia al padre
  parent1Name: string;
  parent1Phone: string;
  parent2Name?: string;
  parent2Phone?: string;
  car1Type: string;
  car1Color: string;
  car1Plate: string;
  car2Type?: string;
  car2Color?: string;
  car2Plate?: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface CarType {
  emoji: string;
  name: string;
  value: string;
}

interface QueueStudent {
  id: string;
  studentName: string;
  studentClass: string;
  parentName: string;
  carType: string;
  carColor: string;
  carPlate: string;
  arrivalTime: string;
  position: number;
}

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #F9FAFB;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Header = styled.header`
  background: white;
  border-bottom: 1px solid #E5E7EB;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2563EB;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoutButton = styled.button`
  background: none;
  border: 1px solid #E5E7EB;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6B7280;
  transition: all 0.2s;
  
  &:hover {
    background: #F9FAFB;
    color: #DC2626;
    border-color: #DC2626;
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #E5E7EB;
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const StatIcon = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  background: ${props => props.color}15;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
`;

const StatTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: #6B7280;
  margin: 0;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
`;

const StatSubtitle = styled.p`
  font-size: 0.8rem;
  color: #9CA3AF;
  margin: 0;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #E5E7EB;
`;

const SectionHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const AddButton = styled.button`
  background: #2563EB;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  
  &:hover {
    background: #1D4ED8;
  }
`;

const SectionContent = styled.div`
  padding: 24px;
`;

const StudentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
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
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #2563EB;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: #10B981;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  
  &:hover {
    background: #059669;
  }
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
  type: button;
  
  &:focus {
    outline: none;
    border-color: #2563EB;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
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
  
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 8px 8px;
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

const QueueList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const QueueItem = styled.div<{ status: string }>`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: ${props => 
    props.status === 'waiting' ? '#FEF3C7' :
    props.status === 'processing' ? '#DBEAFE' :
    '#D1FAE5'
  };
`;

const QueueHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const StudentName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const TimeBadge = styled.span`
  background: #6B7280;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const QueueDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailRow = styled.div`
  font-size: 0.9rem;
  color: #6B7280;
`;

const QueueActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const ActionButton = styled.button<{ variant: 'success' | 'warning' | 'danger' }>`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
  
  ${props => props.variant === 'success' && `
    background: #10B981;
    color: white;
    &:hover { background: #059669; }
  `}
  
  ${props => props.variant === 'warning' && `
    background: #F59E0B;
    color: white;
    &:hover { background: #D97706; }
  `}
  
  ${props => props.variant === 'danger' && `
    background: #EF4444;
    color: white;
    &:hover { background: #DC2626; }
  `}
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #6B7280;
`;

const StudentCard = styled.div`
  padding: 12px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  margin-bottom: 8px;
  background: #F9FAFB;
  transition: all 0.2s;
  
  &:hover {
    background: #F3F4F6;
    border-color: #D1D5DB;
  }
`;

const StudentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const StudentInfo = styled.div`
  flex: 1;
`;

const StudentCardName = styled.div`
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
`;

const StudentCardDetails = styled.div`
  font-size: 0.9rem;
  color: #6B7280;
  margin-bottom: 4px;
`;

const StudentCardContact = styled.div`
  font-size: 0.8rem;
  color: #9CA3AF;
`;

const StudentActions = styled.div`
  display: flex;
  gap: 8px;
`;

const EditButton = styled.button`
  background: #3B82F6;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
  
  &:hover {
    background: #2563EB;
  }
`;

const DeleteButton = styled.button`
  background: #EF4444;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
  
  &:hover {
    background: #DC2626;
  }
`;

const ApproveButton = styled.button`
  background: #10B981;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
  
  &:hover {
    background: #059669;
  }
`;

const RejectButton = styled.button`
  background: #F59E0B;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
  
  &:hover {
    background: #D97706;
  }
`;

const PendingCard = styled.div`
  padding: 16px;
  border: 2px solid #F59E0B;
  border-radius: 12px;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
  transition: all 0.2s;
  
  &:hover {
    background: linear-gradient(135deg, #FDE68A 0%, #FCD34D 100%);
    border-color: #D97706;
  }
`;

const PendingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const PendingTitle = styled.div`
  font-weight: 700;
  color: #92400E;
  font-size: 1.1rem;
  margin-bottom: 4px;
`;

const PendingSubtitle = styled.div`
  font-size: 0.9rem;
  color: #A16207;
`;

const PendingActions = styled.div`
  display: flex;
  gap: 8px;
`;

const PendingDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  font-size: 0.85rem;
  color: #92400E;
  margin-bottom: 12px;
`;

const PendingDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

// Tipos de carros disponibles
const carTypes: CarType[] = [
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

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onBack }) => {
  const { 
    parents,
    activeParents,
    students, 
    pendingStudents, 
    approvedStudents, 
    queueStudents, 
    addParent,
    addStudent, 
    approveStudent, 
    rejectStudent 
  } = useAppContext();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddParentForm, setShowAddParentForm] = useState(false);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({});
  const [newParent, setNewParent] = useState<Partial<Parent>>({});
  const [car1PickerOpen, setCar1PickerOpen] = useState(false);
  const [car2PickerOpen, setCar2PickerOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Mock data para demonstração - apenas para mostrar alguns dados iniciais
  useEffect(() => {
    // Adicionar alguns pais de exemplo se não houver nenhum
    if (parents.length === 0) {
      addParent({
        username: 'joao.santos',
        password: 'demo123',
        name: 'João Santos',
        phone: '+244 900 000 001',
        email: 'joao.santos@email.com'
      });
      
      addParent({
        username: 'carlos.ferreira',
        password: 'demo123',
        name: 'Carlos Ferreira',
        phone: '+244 900 000 003',
        email: 'carlos.ferreira@email.com'
      });
    }
  }, [parents.length, addParent]);

  // Adicionar estudantes aprovados de exemplo após os pais serem criados
  useEffect(() => {
    if (parents.length > 0 && students.length === 0) {
      // Encontrar os pais criados
      const joaoParent = parents.find(p => p.username === 'joao.santos');
      const carlosParent = parents.find(p => p.username === 'carlos.ferreira');
      
      if (joaoParent) {
        addStudent({
          name: 'Maria',
          surname: 'Santos',
          schoolId: 'MS001',
          class: '5º A',
          parentId: joaoParent.id,
          parent1Name: 'João Santos',
          parent1Phone: '+244 900 000 001',
          parent2Name: 'Ana Santos',
          parent2Phone: '+244 900 000 002',
          car1Type: 'sedan',
          car1Color: 'Azul',
          car1Plate: 'LD-01-AB-23',
          car2Type: 'suv',
          car2Color: 'Branco',
          car2Plate: 'LD-02-CD-45'
        });
      }
      
      if (carlosParent) {
        addStudent({
          name: 'Pedro',
          surname: 'Ferreira',
          schoolId: 'PF002',
          class: '3º B',
          parentId: carlosParent.id,
          parent1Name: 'Carlos Ferreira',
          parent1Phone: '+244 900 000 003',
          car1Type: 'truck',
          car1Color: 'Preto',
          car1Plate: 'LD-03-EF-67'
        });
      }
    }
  }, [parents.length, students.length, addStudent]);

  // Aprovar automaticamente os estudantes de exemplo
  useEffect(() => {
    if (students.length > 0) {
      // Aprovar todos os estudantes de exemplo
      students.forEach(student => {
        if (student.status === 'pending') {
          approveStudent(student.id);
        }
      });
    }
  }, [students.length, approveStudent]);

  const handleAddParent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newParent.username && newParent.password && newParent.name) {
      addParent({
        username: newParent.username || '',
        password: newParent.password || '',
        name: newParent.name || '',
        phone: newParent.phone || '',
        email: newParent.email
      });
      
      setNewParent({});
      setShowAddParentForm(false);
    }
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStudent.name && newStudent.surname && newStudent.schoolId && newStudent.parentId) {
      if (editingStudent) {
        // Para edição, precisaríamos de uma função updateStudent no contexto
        // Por agora, vamos apenas limpar o formulário
        console.log('Edição de estudante - funcionalidade a implementar');
      } else {
        // Adicionar novo estudante usando o contexto
        addStudent({
          name: newStudent.name || '',
          surname: newStudent.surname || '',
          schoolId: newStudent.schoolId || '',
          class: newStudent.class || '',
          parentId: newStudent.parentId || '',
          parent1Name: newStudent.parent1Name || '',
          parent1Phone: newStudent.parent1Phone || '',
          parent2Name: newStudent.parent2Name,
          parent2Phone: newStudent.parent2Phone,
          car1Type: newStudent.car1Type || 'sedan',
          car1Color: newStudent.car1Color || '',
          car1Plate: newStudent.car1Plate || '',
          car2Type: newStudent.car2Type,
          car2Color: newStudent.car2Color,
          car2Plate: newStudent.car2Plate
        });
      }
      
      setNewStudent({});
      setShowAddForm(false);
      setEditingStudent(null);
      setCar1PickerOpen(false);
      setCar2PickerOpen(false);
    }
  };

  const handleCarTypeSelect = (carType: CarType, carNumber: 1 | 2, e?: React.MouseEvent) => {
    // Prevenir el submit del formulario
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

  const getCarTypeByValue = (value: string): CarType | undefined => {
    return carTypes.find(car => car.value === value);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setNewStudent(student);
    setShowAddForm(true);
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este aluno?')) {
      // Para deletar, precisaríamos de uma função deleteStudent no contexto
      // Por agora, vamos apenas mostrar um console.log
      console.log('Deletar estudante - funcionalidade a implementar:', id);
    }
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    setNewStudent({});
    setShowAddForm(false);
    setCar1PickerOpen(false);
    setCar2PickerOpen(false);
  };

  const handleQueueAction = (id: string, action: 'complete' | 'wait' | 'remove') => {
    // Usar a função do contexto para remover da fila
    console.log('Ação na fila:', action, 'para estudante:', id);
    // Aqui poderíamos implementar lógica específica para cada ação
  };

  return (
    <DashboardContainer>
      <Header>
        <HeaderLeft>
          <Logo>🏫 Sistema de Recolha</Logo>
        </HeaderLeft>
        <HeaderRight>
          <LogoutButton onClick={onBack}>
            <ArrowLeft size={16} />
            Voltar
          </LogoutButton>
          <LogoutButton onClick={onLogout}>
            <LogOut size={16} />
            Sair
          </LogoutButton>
        </HeaderRight>
      </Header>

      <MainContent>
        <StatsGrid>
            <StatCard>
              <StatHeader>
                <StatIcon color="#2563EB">
                  <Users size={20} />
                </StatIcon>
                <StatTitle>Total de Pais</StatTitle>
              </StatHeader>
              <StatValue>{parents.length}</StatValue>
              <StatSubtitle>Pais registados</StatSubtitle>
            </StatCard>

            <StatCard>
              <StatHeader>
                <StatIcon color="#8B5CF6">
                  <Users size={20} />
                </StatIcon>
                <StatTitle>Total de Alunos</StatTitle>
              </StatHeader>
              <StatValue>{students.length}</StatValue>
              <StatSubtitle>Alunos registados</StatSubtitle>
            </StatCard>

            <StatCard>
              <StatHeader>
                <StatIcon color="#F59E0B">
                  <Clock size={20} />
                </StatIcon>
                <StatTitle>Pendentes</StatTitle>
              </StatHeader>
              <StatValue>{pendingStudents.length}</StatValue>
              <StatSubtitle>Aguardando aprovação</StatSubtitle>
            </StatCard>

            <StatCard>
              <StatHeader>
                <StatIcon color="#10B981">
                  <CheckCircle size={20} />
                </StatIcon>
                <StatTitle>Aprovados</StatTitle>
              </StatHeader>
              <StatValue>{approvedStudents.length}</StatValue>
              <StatSubtitle>Alunos aprovados</StatSubtitle>
            </StatCard>

            <StatCard>
              <StatHeader>
                <StatIcon color="#8B5CF6">
                  <Clock size={20} />
                </StatIcon>
                <StatTitle>Em Fila</StatTitle>
              </StatHeader>
              <StatValue>{queueStudents.length}</StatValue>
              <StatSubtitle>Aguardando recolha</StatSubtitle>
            </StatCard>

          <StatCard>
            <StatHeader>
              <StatIcon color="#F59E0B">
                <BarChart3 size={20} />
              </StatIcon>
              <StatTitle>Tempo Médio</StatTitle>
            </StatHeader>
            <StatValue>2.5min</StatValue>
            <StatSubtitle>Por recolha</StatSubtitle>
          </StatCard>

          <StatCard>
            <StatHeader>
              <StatIcon color="#8B5CF6">
                <CheckCircle size={20} />
              </StatIcon>
              <StatTitle>Recolhas Hoje</StatTitle>
            </StatHeader>
            <StatValue>156</StatValue>
            <StatSubtitle>Concluídas</StatSubtitle>
          </StatCard>
        </StatsGrid>

        <ContentGrid>
          <Section>
              <SectionHeader>
                <SectionTitle>Gestão de Pais</SectionTitle>
                <AddButton onClick={() => setShowAddParentForm(!showAddParentForm)}>
                  <Plus size={16} />
                  Adicionar Pai
                </AddButton>
              </SectionHeader>
              <SectionContent>
                {showAddParentForm && (
                  <StudentForm onSubmit={handleAddParent}>
                    <FormRow>
                      <FormGroup>
                        <Label>Nome do Pai</Label>
                        <Input
                          value={newParent.name || ''}
                          onChange={(e) => setNewParent({...newParent, name: e.target.value})}
                          placeholder="Nome completo do pai"
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Telefone</Label>
                        <Input
                          value={newParent.phone || ''}
                          onChange={(e) => setNewParent({...newParent, phone: e.target.value})}
                          placeholder="+244 900 000 000"
                        />
                      </FormGroup>
                    </FormRow>

                    <FormRow>
                      <FormGroup>
                        <Label>Email (Opcional)</Label>
                        <Input
                          type="email"
                          value={newParent.email || ''}
                          onChange={(e) => setNewParent({...newParent, email: e.target.value})}
                          placeholder="email@exemplo.com"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Utilizador</Label>
                        <Input
                          value={newParent.username || ''}
                          onChange={(e) => setNewParent({...newParent, username: e.target.value})}
                          placeholder="utilizador.para.login"
                          required
                        />
                      </FormGroup>
                    </FormRow>

                    <FormGroup>
                      <Label>Palavra-passe</Label>
                      <Input
                        type="password"
                        value={newParent.password || ''}
                        onChange={(e) => setNewParent({...newParent, password: e.target.value})}
                        placeholder="Palavra-passe para login"
                        required
                      />
                    </FormGroup>

                    <SubmitButton type="submit">
                      <UserPlus size={16} />
                      Adicionar Pai
                    </SubmitButton>
                  </StudentForm>
                )}

                <div style={{ marginTop: '20px' }}>
                  <h4 style={{ marginBottom: '12px', color: '#374151' }}>Pais Registados ({parents.length})</h4>
                  {parents.map(parent => (
                    <StudentCard key={parent.id}>
                      <StudentHeader>
                        <StudentInfo>
                          <StudentCardName>
                            {parent.name}
                          </StudentCardName>
                          <StudentCardDetails>
                            {parent.phone} • {parent.email || 'Sem email'}
                          </StudentCardDetails>
                          <StudentCardContact>
                            Utilizador: {parent.username}
                          </StudentCardContact>
                        </StudentInfo>
                        <StudentActions>
                          <EditButton onClick={() => console.log('Editar pai:', parent.id)}>
                            <Edit size={14} />
                            Editar
                          </EditButton>
                          <DeleteButton onClick={() => console.log('Deletar pai:', parent.id)}>
                            <Trash2 size={14} />
                            Remover
                          </DeleteButton>
                        </StudentActions>
                      </StudentHeader>
                    </StudentCard>
                  ))}
                </div>
              </SectionContent>
            </Section>

          <Section>
              <SectionHeader>
                <SectionTitle>Alunos Pendentes de Aprovação</SectionTitle>
              </SectionHeader>
              <SectionContent>
                {pendingStudents.length === 0 ? (
                  <EmptyState>
                    <Clock size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                    <p>Nenhum aluno pendente de aprovação</p>
                  </EmptyState>
                ) : (
                  <div>
                    {pendingStudents.map(student => (
                      <PendingCard key={student.id}>
                        <PendingHeader>
                          <div>
                            <PendingTitle>
                              {student.name} {student.surname}
                            </PendingTitle>
                            <PendingSubtitle>
                              {student.class} • {student.schoolId}
                            </PendingSubtitle>
                          </div>
                          <PendingActions>
                            <ApproveButton onClick={() => approveStudent(student.id)}>
                              <CheckCircle size={14} />
                              Aprovar
                            </ApproveButton>
                            <RejectButton onClick={() => rejectStudent(student.id)}>
                              <XCircle size={14} />
                              Rejeitar
                            </RejectButton>
                          </PendingActions>
                        </PendingHeader>
                        
                        <PendingDetails>
                          <PendingDetail>
                            <span>👤</span>
                            <span><strong>Responsável:</strong> {student.parent1Name}</span>
                          </PendingDetail>
                          <PendingDetail>
                            <span>📞</span>
                            <span><strong>Telefone:</strong> {student.parent1Phone}</span>
                          </PendingDetail>
                          <PendingDetail>
                            <span>🚗</span>
                            <span><strong>Veículo:</strong> {getCarTypeByValue(student.car1Type)?.emoji} {student.car1Color} - {student.car1Plate}</span>
                          </PendingDetail>
                          <PendingDetail>
                            <span>👤</span>
                            <span><strong>Pai:</strong> {student.parent1Name}</span>
                          </PendingDetail>
                        </PendingDetails>
                      </PendingCard>
                    ))}
                  </div>
                )}
              </SectionContent>
            </Section>

          <Section>
              <SectionHeader>
                <SectionTitle>Gestão de Alunos</SectionTitle>
                {!editingStudent && (
                  <AddButton onClick={() => setShowAddForm(!showAddForm)}>
                    <Plus size={16} />
                    Adicionar
                  </AddButton>
                )}
              </SectionHeader>
            <SectionContent>
              {showAddForm && (
                <StudentForm onSubmit={handleAddStudent}>
                  <FormGroup>
                    <Label>Pai Responsável</Label>
                    <Input
                      as="select"
                      value={newStudent.parentId || ''}
                      onChange={(e) => setNewStudent({...newStudent, parentId: e.target.value})}
                      required
                    >
                      <option value="">Selecionar pai</option>
                      {parents.map(parent => (
                        <option key={parent.id} value={parent.id}>
                          {parent.name} ({parent.username})
                        </option>
                      ))}
                    </Input>
                  </FormGroup>

                  <FormRow>
                    <FormGroup>
                      <Label>Nome</Label>
                      <Input
                        value={newStudent.name || ''}
                        onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                        placeholder="Nome do aluno"
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Apelido</Label>
                      <Input
                        value={newStudent.surname || ''}
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
                        value={newStudent.schoolId || ''}
                        onChange={(e) => setNewStudent({...newStudent, schoolId: e.target.value})}
                        placeholder="Ex: MS001"
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Turma</Label>
                      <Input
                        value={newStudent.class || ''}
                        onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                        placeholder="Ex: 5º A"
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>Responsável 1 - Nome</Label>
                      <Input
                        value={newStudent.parent1Name || ''}
                        onChange={(e) => setNewStudent({...newStudent, parent1Name: e.target.value})}
                        placeholder="Nome do responsável"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Responsável 1 - Telefone</Label>
                      <Input
                        value={newStudent.parent1Phone || ''}
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
                        value={newStudent.car1Color || ''}
                        onChange={(e) => setNewStudent({...newStudent, car1Color: e.target.value})}
                        placeholder="Ex: Azul"
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>Carro 1 - Matrícula</Label>
                      <Input
                        value={newStudent.car1Plate || ''}
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
                        value={newStudent.car2Color || ''}
                        onChange={(e) => setNewStudent({...newStudent, car2Color: e.target.value})}
                        placeholder="Ex: Branco"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Carro 2 - Matrícula (Opcional)</Label>
                      <Input
                        value={newStudent.car2Plate || ''}
                        onChange={(e) => setNewStudent({...newStudent, car2Plate: e.target.value})}
                        placeholder="Ex: LD-02-CD-45"
                      />
                    </FormGroup>
                  </FormRow>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <SubmitButton type="submit">
                      <UserPlus size={16} />
                      {editingStudent ? 'Atualizar Aluno' : 'Adicionar Aluno'}
                    </SubmitButton>
                    {editingStudent && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        style={{
                          background: '#6B7280',
                          color: 'white',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </StudentForm>
              )}

                <div style={{ marginTop: '20px' }}>
                  <h4 style={{ marginBottom: '12px', color: '#374151' }}>Alunos Aprovados ({approvedStudents.length})</h4>
                  {approvedStudents.map(student => (
                    <StudentCard key={student.id}>
                      <StudentHeader>
                        <StudentInfo>
                          <StudentCardName>
                            {student.name} {student.surname}
                          </StudentCardName>
                          <StudentCardDetails>
                            {student.class} • {student.schoolId}
                          </StudentCardDetails>
                          <StudentCardContact>
                            {student.parent1Name} • {getCarTypeByValue(student.car1Type)?.emoji} {student.car1Color} - {student.car1Plate}
                          </StudentCardContact>
                        </StudentInfo>
                        <StudentActions>
                          <EditButton onClick={() => handleEditStudent(student)}>
                            <Edit size={14} />
                            Editar
                          </EditButton>
                          <DeleteButton onClick={() => handleDeleteStudent(student.id)}>
                            <Trash2 size={14} />
                            Remover
                          </DeleteButton>
                        </StudentActions>
                      </StudentHeader>
                    </StudentCard>
                  ))}
                </div>
            </SectionContent>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>Fila de Recolha</SectionTitle>
            </SectionHeader>
            <SectionContent>
                {queueStudents.length === 0 ? (
                  <EmptyState>
                    <Clock size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                    <p>Nenhum aluno em fila no momento</p>
                  </EmptyState>
                ) : (
                  <QueueList>
                    {queueStudents.map(student => (
                      <QueueItem key={student.id} status="waiting">
                        <QueueHeader>
                          <StudentName>{student.studentName}</StudentName>
                          <TimeBadge>#{student.position} - {student.arrivalTime}</TimeBadge>
                        </QueueHeader>
                        <QueueDetails>
                          <DetailRow><strong>Turma:</strong> {student.studentClass}</DetailRow>
                          <DetailRow><strong>Responsável:</strong> {student.parentName}</DetailRow>
                          <DetailRow><strong>Veículo:</strong> {getCarTypeByValue(student.carType)?.emoji} {student.carColor} - {student.carPlate}</DetailRow>
                        </QueueDetails>
                        <QueueActions>
                          <ActionButton 
                            variant="success" 
                            onClick={() => handleQueueAction(student.id, 'complete')}
                          >
                            <CheckCircle size={14} />
                            Entregar
                          </ActionButton>
                          <ActionButton 
                            variant="warning" 
                            onClick={() => handleQueueAction(student.id, 'wait')}
                          >
                            <Clock size={14} />
                            Aguardar
                          </ActionButton>
                          <ActionButton 
                            variant="danger" 
                            onClick={() => handleQueueAction(student.id, 'remove')}
                          >
                            <XCircle size={14} />
                            Remover
                          </ActionButton>
                        </QueueActions>
                      </QueueItem>
                    ))}
                  </QueueList>
                )}
            </SectionContent>
          </Section>
        </ContentGrid>
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard;
