import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Clock, Car, User, ArrowLeft } from 'lucide-react';

interface QueueStudent {
  id: string;
  studentName: string;
  studentClass: string;
  parentName: string;
  carType: string;
  carColor: string;
  carPlate: string;
  arrivalTime: string;
}

interface DeliveredStudent {
  id: string;
  studentName: string;
  studentClass: string;
  parentName: string;
  carType: string;
  carColor: string;
  carPlate: string;
  arrivalTime: string;
  deliveredTime: string;
}

const ViewDashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1E293B 0%, #334155 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px 32px;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    padding: 16px 24px;
    margin-bottom: 24px;
    flex-direction: column;
    gap: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    margin-bottom: 20px;
    border-radius: 12px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    gap: 8px;
  }
`;

const HeaderInfo = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 0.8rem;
    border-radius: 8px;
  }
`;

const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  @media (max-width: 768px) {
    gap: 20px;
  }

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const DashboardTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: white;
  text-align: center;
  margin-bottom: 16px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const DashboardSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 48px;
`;

const QueueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const QueueCard = styled.div`
  background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 2px solid #F59E0B;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: #F59E0B;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const StudentInfo = styled.div`
  flex: 1;
`;

const StudentName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 8px 0;
`;

const StudentClass = styled.p`
  font-size: 1rem;
  color: #6B7280;
  margin: 0;
  font-weight: 500;
`;

const TimeBadge = styled.div`
  background: rgba(31, 41, 55, 0.1);
  color: #374151;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const InfoIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(31, 41, 55, 0.1);
  color: #374151;
`;

const InfoText = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-size: 0.8rem;
  color: #6B7280;
  font-weight: 500;
  margin-bottom: 2px;
`;

const InfoValue = styled.div`
  font-size: 1rem;
  color: #1F2937;
  font-weight: 600;
`;

const CarDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  border: 2px solid rgba(31, 41, 55, 0.1);
`;

const CarEmoji = styled.div`
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
`;

const CarInfo = styled.div`
  flex: 1;
`;

const CarColor = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 4px;
`;

const CarPlate = styled.div`
  font-size: 1rem;
  color: #6B7280;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: #FEF3C7;
  color: #92400E;
  border: 1px solid #F59E0B;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const ActionButton = styled.button<{ variant: 'success' | 'danger' }>`
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'success' && `
    background: #10B981;
    color: white;
    &:hover {
      background: #059669;
      transform: translateY(-2px);
    }
  `}
  
  ${props => props.variant === 'danger' && `
    background: #EF4444;
    color: white;
    &:hover {
      background: #DC2626;
      transform: translateY(-2px);
    }
  `}
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 24px;
  opacity: 0.6;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 12px;
`;

const EmptySubtitle = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`;

const DeliveredSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  height: fit-content;
`;

const DeliveredTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DeliveredList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 600px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
`;

const DeliveredCard = styled.div`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(16, 185, 129, 0.15);
    border-color: rgba(16, 185, 129, 0.5);
  }
`;

const DeliveredHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const DeliveredStudentName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin: 0;
`;

const DeliveredTime = styled.div`
  background: rgba(16, 185, 129, 0.2);
  color: #10B981;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const DeliveredDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const DeliveredDetailRow = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DeliveredCarInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const DeliveredCarEmoji = styled.span`
  font-size: 1.2rem;
`;

const DeliveredCarText = styled.span`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
`;

const DeliveredStats = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const StatLabel = styled.span`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const StatValue = styled.span`
  font-size: 0.9rem;
  color: white;
  font-weight: 600;
`;

// Función para obtener emoji de carro basado en tipo
const getCarEmoji = (carType: string): string => {
  const carTypeMap: { [key: string]: string } = {
    'sedan': '🚗',
    'suv': '🚙',
    'van': '🚐',
    'truck': '🚚',
    'big-truck': '🚛',
    'taxi': '🚕',
    'police': '🚓',
    'police-2': '🚔',
    'ambulance': '🚑',
    'fire-truck': '🚒',
    'tractor': '🚜',
    'motorcycle': '🏍️',
    'scooter': '🛵',
    'bicycle': '🚲',
    'scooter-2': '🛴'
  };
  
  return carTypeMap[carType] || '🚗'; // Default
};

const ViewDashboard: React.FC = () => {
  const [queueStudents, setQueueStudents] = useState<QueueStudent[]>([]);
  const [deliveredStudents, setDeliveredStudents] = useState<DeliveredStudent[]>([]);

  // Mock data para demonstração
  useEffect(() => {
    setQueueStudents([
      {
        id: 'q1',
        studentName: 'Maria Santos',
        studentClass: '5º A',
        parentName: 'João Santos',
        carType: 'sedan',
        carColor: 'Azul',
        carPlate: 'LD-01-AB-23',
        arrivalTime: '14:30'
      },
      {
        id: 'q2',
        studentName: 'Pedro Ferreira',
        studentClass: '3º B',
        parentName: 'Carlos Ferreira',
        carType: 'truck',
        carColor: 'Preto',
        carPlate: 'LD-03-EF-67',
        arrivalTime: '14:35'
      },
      {
        id: 'q3',
        studentName: 'Ana Costa',
        studentClass: '4º C',
        parentName: 'Sofia Costa',
        carType: 'suv',
        carColor: 'Branco',
        carPlate: 'LD-05-GH-89',
        arrivalTime: '14:40'
      },
      {
        id: 'q4',
        studentName: 'Lucas Silva',
        studentClass: '6º A',
        parentName: 'Miguel Silva',
        carType: 'taxi',
        carColor: 'Vermelho',
        carPlate: 'LD-07-IJ-12',
        arrivalTime: '14:42'
      },
      {
        id: 'q5',
        studentName: 'Isabel Mendes',
        studentClass: '2º B',
        parentName: 'Rita Mendes',
        carType: 'van',
        carColor: 'Verde',
        carPlate: 'LD-09-KL-34',
        arrivalTime: '14:45'
      },
      {
        id: 'q6',
        studentName: 'Tiago Alves',
        studentClass: '7º A',
        parentName: 'Paulo Alves',
        carType: 'motorcycle',
        carColor: 'Cinza',
        carPlate: 'LD-11-MN-56',
        arrivalTime: '14:48'
      }
    ]);

    // Mock data para estudiantes entregados
    setDeliveredStudents([
      {
        id: 'd1',
        studentName: 'Sofia Rodrigues',
        studentClass: '4º A',
        parentName: 'Miguel Rodrigues',
        carType: 'sedan',
        carColor: 'Prata',
        carPlate: 'LD-13-OP-78',
        arrivalTime: '14:15',
        deliveredTime: '14:18'
      },
      {
        id: 'd2',
        studentName: 'João Silva',
        studentClass: '6º B',
        parentName: 'Carla Silva',
        carType: 'suv',
        carColor: 'Azul',
        carPlate: 'LD-15-QR-90',
        arrivalTime: '14:20',
        deliveredTime: '14:25'
      },
      {
        id: 'd3',
        studentName: 'Beatriz Costa',
        studentClass: '3º C',
        parentName: 'Ricardo Costa',
        carType: 'van',
        carColor: 'Branco',
        carPlate: 'LD-17-ST-12',
        arrivalTime: '14:10',
        deliveredTime: '14:12'
      },
      {
        id: 'd4',
        studentName: 'Gabriel Alves',
        studentClass: '5º B',
        parentName: 'Patrícia Alves',
        carType: 'taxi',
        carColor: 'Amarelo',
        carPlate: 'LD-19-UV-34',
        arrivalTime: '14:05',
        deliveredTime: '14:08'
      },
      {
        id: 'd5',
        studentName: 'Inês Mendes',
        studentClass: '2º A',
        parentName: 'Fernando Mendes',
        carType: 'motorcycle',
        carColor: 'Vermelho',
        carPlate: 'LD-21-WX-56',
        arrivalTime: '14:00',
        deliveredTime: '14:03'
      }
    ]);
  }, []);

  const handleBack = () => {
    window.location.href = '/';
  };

  const handleDeliver = (id: string) => {
    // Encontrar el estudiante en la fila
    const studentToDeliver = queueStudents.find(student => student.id === id);
    
    if (studentToDeliver) {
      // Crear el estudiante entregado con tiempo de entrega
      const deliveredStudent: DeliveredStudent = {
        ...studentToDeliver,
        deliveredTime: new Date().toLocaleTimeString('pt-PT', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      
      // Agregar a la lista de entregados (al principio)
      setDeliveredStudents(prev => [deliveredStudent, ...prev]);
      
      // Remover de la fila
      setQueueStudents(prev => prev.filter(student => student.id !== id));
      
      console.log(`Estudiante ${id} entregado`);
    }
  };

  const handleRemove = (id: string) => {
    // Remover estudiante de la fila (cancelado)
    setQueueStudents(prev => prev.filter(student => student.id !== id));
    console.log(`Estudiante ${id} removido`);
  };

  const calculateWaitTime = (arrivalTime: string, deliveredTime: string): string => {
    const [arrivalHour, arrivalMin] = arrivalTime.split(':').map(Number);
    const [deliveredHour, deliveredMin] = deliveredTime.split(':').map(Number);
    
    const arrivalMinutes = arrivalHour * 60 + arrivalMin;
    const deliveredMinutes = deliveredHour * 60 + deliveredMin;
    
    const waitMinutes = deliveredMinutes - arrivalMinutes;
    
    if (waitMinutes < 1) return '< 1min';
    if (waitMinutes < 60) return `${waitMinutes}min`;
    
    const hours = Math.floor(waitMinutes / 60);
    const minutes = waitMinutes % 60;
    return `${hours}h ${minutes}min`;
  };

  return (
    <ViewDashboardContainer>
      <Header>
        <HeaderLeft>
          <Logo>
            🏫 Sistema de Recolha
          </Logo>
          <HeaderInfo>
            Painel de Monitorização
          </HeaderInfo>
        </HeaderLeft>
        <BackButton onClick={handleBack}>
          <ArrowLeft size={20} />
          Voltar
        </BackButton>
      </Header>

        <MainContent>
          <LeftSection>
            <DashboardTitle>Fila de Recolha</DashboardTitle>
            <DashboardSubtitle>
              Acompanhe em tempo real a fila de recolha dos alunos
            </DashboardSubtitle>

            {queueStudents.length === 0 ? (
              <EmptyState>
                <EmptyIcon>🚗</EmptyIcon>
                <EmptyTitle>Nenhum aluno em fila</EmptyTitle>
                <EmptySubtitle>
                  A fila de recolha está vazia no momento
                </EmptySubtitle>
              </EmptyState>
            ) : (
              <QueueGrid>
                {queueStudents.map((student) => (
                  <QueueCard key={student.id}>
                    <StatusBadge>
                      Aguardando
                    </StatusBadge>
                    
                    <CardHeader>
                      <StudentInfo>
                        <StudentName>{student.studentName}</StudentName>
                        <StudentClass>{student.studentClass}</StudentClass>
                      </StudentInfo>
                      <TimeBadge>
                        <Clock size={16} />
                        {student.arrivalTime}
                      </TimeBadge>
                    </CardHeader>

                    <CardContent>
                      <InfoRow>
                        <InfoIcon>
                          <User size={18} />
                        </InfoIcon>
                        <InfoText>
                          <InfoLabel>Responsável</InfoLabel>
                          <InfoValue>{student.parentName}</InfoValue>
                        </InfoText>
                      </InfoRow>

                      <CarDisplay>
                        <CarEmoji>
                          {getCarEmoji(student.carType)}
                        </CarEmoji>
                        <CarInfo>
                          <CarColor>{student.carColor}</CarColor>
                          <CarPlate>{student.carPlate}</CarPlate>
                        </CarInfo>
                      </CarDisplay>

                      <ActionButtons>
                        <ActionButton 
                          variant="success" 
                          onClick={() => handleDeliver(student.id)}
                        >
                          ✅ Entregue
                        </ActionButton>
                        <ActionButton 
                          variant="danger" 
                          onClick={() => handleRemove(student.id)}
                        >
                          ❌ Removeit
                        </ActionButton>
                      </ActionButtons>
                    </CardContent>
                  </QueueCard>
                ))}
              </QueueGrid>
            )}
          </LeftSection>

          <RightSection>
            <DeliveredSection>
              <DeliveredTitle>
                ✅ Entregues Hoje
                <span style={{ fontSize: '1rem', opacity: 0.7 }}>
                  ({deliveredStudents.length})
                </span>
              </DeliveredTitle>
              
              {deliveredStudents.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px 20px', 
                  color: 'rgba(255, 255, 255, 0.6)' 
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📋</div>
                  <p>Nenhuma entrega ainda hoje</p>
                </div>
              ) : (
                <>
                  <DeliveredList>
                    {deliveredStudents.map((student) => (
                      <DeliveredCard key={student.id}>
                        <DeliveredHeader>
                          <DeliveredStudentName>{student.studentName}</DeliveredStudentName>
                          <DeliveredTime>{student.deliveredTime}</DeliveredTime>
                        </DeliveredHeader>
                        
                        <DeliveredDetails>
                          <DeliveredDetailRow>
                            <span>📚</span>
                            <span>{student.studentClass}</span>
                          </DeliveredDetailRow>
                          <DeliveredDetailRow>
                            <span>👤</span>
                            <span>{student.parentName}</span>
                          </DeliveredDetailRow>
                          <DeliveredDetailRow>
                            <span>⏰</span>
                            <span>Chegou: {student.arrivalTime}</span>
                          </DeliveredDetailRow>
                          <DeliveredDetailRow>
                            <span>⏱️</span>
                            <span>Esperou: {calculateWaitTime(student.arrivalTime, student.deliveredTime)}</span>
                          </DeliveredDetailRow>
                        </DeliveredDetails>
                        
                        <DeliveredCarInfo>
                          <DeliveredCarEmoji>
                            {getCarEmoji(student.carType)}
                          </DeliveredCarEmoji>
                          <DeliveredCarText>
                            {student.carColor} - {student.carPlate}
                          </DeliveredCarText>
                        </DeliveredCarInfo>
                      </DeliveredCard>
                    ))}
                  </DeliveredList>
                  
                  <DeliveredStats>
                    <StatRow>
                      <StatLabel>Total Entregues:</StatLabel>
                      <StatValue>{deliveredStudents.length}</StatValue>
                    </StatRow>
                    <StatRow>
                      <StatLabel>Tempo Médio:</StatLabel>
                      <StatValue>
                        {deliveredStudents.length > 0 
                          ? Math.round(
                              deliveredStudents.reduce((acc, student) => {
                                const [arrivalHour, arrivalMin] = student.arrivalTime.split(':').map(Number);
                                const [deliveredHour, deliveredMin] = student.deliveredTime.split(':').map(Number);
                                const waitMinutes = (deliveredHour * 60 + deliveredMin) - (arrivalHour * 60 + arrivalMin);
                                return acc + waitMinutes;
                              }, 0) / deliveredStudents.length
                            ) + 'min'
                          : '0min'
                        }
                      </StatValue>
                    </StatRow>
                    <StatRow>
                      <StatLabel>Em Fila:</StatLabel>
                      <StatValue>{queueStudents.length}</StatValue>
                    </StatRow>
                  </DeliveredStats>
                </>
              )}
            </DeliveredSection>
          </RightSection>
        </MainContent>
    </ViewDashboardContainer>
  );
};

export default ViewDashboard;
