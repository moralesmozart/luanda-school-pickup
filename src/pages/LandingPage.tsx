import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const ChallengeCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #E8E8E8;
  text-align: center;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const CardIcon = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 12px;
`;

const CardDescription = styled.p`
  font-size: 16px;
  color: #6B7280;
  line-height: 1.5;
`;

// Como Funciona Components
const HowItWorksCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 48px 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin: 0 auto;
  max-width: 900px;
`;

const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
`;

const StepIcon = styled.div<{ color: string }>`
  width: 80px;
  height: 80px;
  background-color: ${props => props.color};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const StepText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  line-height: 1.4;
`;

const Arrow = styled.div`
  color: #6B7280;
  font-size: 24px;
  font-weight: bold;
  margin: 0 16px;
`;

// Tab Navigation Components
const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0;
  margin: 60px auto 0 auto;
  max-width: 600px;
  background: #F3F4F6;
  border-radius: 12px;
  padding: 4px;
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 16px 24px;
  border: none;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#2563EB' : '#6B7280'};
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: ${props => props.active ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none'};
  
  &:hover {
    background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  }
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 48px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin: 32px auto 0 auto;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
`;

const ContentLeft = styled.div`
  text-align: left;
`;

const AppIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: #2563EB;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const AppTitle = styled.h3`
  font-size: 32px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 8px;
`;

const AppSubtitle = styled.p`
  font-size: 18px;
  color: #2563EB;
  font-weight: 600;
  margin-bottom: 24px;
`;

const AppDescription = styled.p`
  font-size: 18px;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 32px;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: #374151;
`;

const CheckIcon = styled.div`
  color: #22C55E;
  font-size: 20px;
`;

const PhoneMockup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Phone = styled.div`
  width: 280px;
  height: 560px;
  background: #1F2937;
  border-radius: 40px;
  padding: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const PhoneScreen = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 30px;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const PhoneHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
`;

const SchoolIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: #2563EB;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

const SchoolInfo = styled.div`
  flex: 1;
`;

const SchoolName = styled.h4`
  font-size: 18px;
  font-weight: bold;
  color: #111827;
  margin: 0;
`;

const SystemName = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`;

const StudentCard = styled.div`
  background: #F9FAFB;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StudentIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: #2563EB;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const StudentInfo = styled.div`
  flex: 1;
`;

const StudentName = styled.h5`
  font-size: 16px;
  font-weight: bold;
  color: #111827;
  margin: 0 0 4px 0;
`;

const StudentClass = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`;

const ActionButton = styled.button`
  width: 100%;
  background-color: #2563EB;
  color: white;
  border: none;
  border-radius: 16px;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #1D4ED8;
  }
`;

const InstructionText = styled.p`
  font-size: 14px;
  color: #6B7280;
  text-align: center;
  margin-bottom: 24px;
`;

const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #22C55E;
  font-size: 16px;
  font-weight: 600;
`;

// Painel de Controlo Components
const PanelMockup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Panel = styled.div`
  width: 400px;
  height: 500px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const PanelHeader = styled.div`
  background: #1E293B;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PanelTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const PanelDateTime = styled.p`
  font-size: 14px;
  color: #94A3B8;
  margin: 0;
`;

const WaitingBadge = styled.div`
  background: #3B82F6;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`;

const StudentsList = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StudentRow = styled.div<{ status: 'waiting' | 'ready' | 'arrived' }>`
  padding: 16px;
  border-radius: 12px;
  background: ${props => {
    switch (props.status) {
      case 'waiting': return '#F3F4F6';
      case 'ready': return '#DCFCE7';
      case 'arrived': return '#DBEAFE';
      default: return '#F3F4F6';
    }
  }};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PanelStudentInfo = styled.div`
  flex: 1;
`;

const PanelStudentName = styled.h6`
  font-size: 16px;
  font-weight: bold;
  color: #111827;
  margin: 0 0 4px 0;
`;

const PanelStudentDetails = styled.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #6B7280;
`;

const PanelStudentTime = styled.div`
  font-size: 14px;
  color: #6B7280;
  margin-right: 12px;
`;

const PanelStatusBadge = styled.div<{ status: 'waiting' | 'ready' | 'arrived' }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch (props.status) {
      case 'waiting': return '#E5E7EB';
      case 'ready': return '#BBF7D0';
      case 'arrived': return '#BFDBFE';
      default: return '#E5E7EB';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'waiting': return '#374151';
      case 'ready': return '#166534';
      case 'arrived': return '#1E40AF';
      default: return '#374151';
    }
  }};
`;

// Área Administrativa Components
const AdminDashboard = styled.div`
  width: 400px;
  height: 500px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const AdminHeader = styled.div`
  background: #1E293B;
  color: white;
  padding: 20px;
`;

const AdminTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 4px 0;
`;

const AdminSubtitle = styled.p`
  font-size: 14px;
  color: #94A3B8;
  margin: 0;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 20px;
`;

const MetricCard = styled.div<{ color: string }>`
  background: ${props => props.color};
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`;

const MetricNumber = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 8px;
`;

const MetricLabel = styled.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`;

const ActionButtons = styled.div`
  padding: 0 20px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AdminActionButton = styled.button`
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }
`;

const AdminActionButtonLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AdminActionIcon = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  background: ${props => props.color};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const AdminActionText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const AdminActionArrow = styled.div`
  color: #6B7280;
  font-size: 16px;
`;

// Resultados Comprovados Components
const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 60px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const ResultCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const ResultIcon = styled.div<{ color: string }>`
  width: 60px;
  height: 60px;
  background: ${props => props.color};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
`;

const ResultPercentage = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 12px;
`;

const ResultTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 8px;
`;

const ResultDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
`;

// O Que Dizem as Escolas Components
const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-top: 60px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const TestimonialCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: left;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const TestimonialQuote = styled.p`
  font-size: 18px;
  color: #374151;
  line-height: 1.6;
  margin-bottom: 24px;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AuthorName = styled.h4`
  font-size: 16px;
  font-weight: bold;
  color: #111827;
  margin: 0;
`;

const AuthorTitle = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`;

const AuthorSchool = styled.p`
  font-size: 14px;
  color: #2563EB;
  font-weight: 600;
  margin: 0;
`;

// Transforme a Sua Escola Components
const CTAHero = styled.div`
  background: white;
  padding: 80px 60px;
  text-align: center;
`;

const CTAHeroTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: #1E293B;
  margin-bottom: 8px;
  line-height: 1.1;
`;

const CTAHeroTitleBlue = styled.span`
  color: #2563EB;
`;

const CTAHeroDescription = styled.p`
  font-size: 20px;
  color: #6B7280;
  max-width: 600px;
  margin: 0 auto 60px auto;
  line-height: 1.6;
`;

const ImplementationCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 48px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin: 0 auto 48px auto;
  max-width: 800px;
`;

const ImplementationTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #374151;
  margin-bottom: 32px;
  text-align: center;
`;

const CTAStepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 32px;
`;

const CTAStep = styled.div`
  text-align: center;
`;

const CTAStepNumber = styled.div<{ color: string }>`
  width: 60px;
  height: 60px;
  background: ${props => props.color};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const CTAStepTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
  color: #374151;
  margin-bottom: 8px;
`;

const CTAStepDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
`;

const InvestmentSection = styled.div`
  background: #F0F9FF;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
`;

const InvestmentTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
  color: #374151;
  margin-bottom: 8px;
`;

const InvestmentDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-bottom: 60px;
`;

const PrimaryCTAButton = styled.button`
  background: #2563EB;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #1D4ED8;
    transform: translateY(-2px);
  }
`;

const SecondaryCTAButton = styled.button`
  background: white;
  color: #374151;
  border: 2px solid #D1D5DB;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #F9FAFB;
    border-color: #9CA3AF;
    transform: translateY(-2px);
  }
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 800px;
  margin: 0 auto;
`;

const ContactItem = styled.div`
  text-align: center;
`;

const ContactIcon = styled.div<{ color: string }>`
  width: 48px;
  height: 48px;
  background: ${props => props.color};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  color: white;
`;

const ContactLabel = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 4px;
`;

const ContactValue = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

// Hero Image Component
const HeroImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
  border-radius: 20px;
  padding: 40px;
`;

const SystemFlowCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const SchoolCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  text-align: center;
  margin-bottom: 24px;
`;

const HeroSchoolIcon = styled.div`
  width: 60px;
  height: 60px;
  background: #2563EB;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
`;

const HeroSchoolName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #111827;
  margin: 0 0 8px 0;
`;

const HeroSchoolSubtitle = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`;

const HeroBottomCards = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const HeroAppCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  text-align: center;
  flex: 1;
`;

const HeroAppIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #F97316;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
`;

const HeroDeliveryIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #22C55E;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
`;

const HeroCardTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const FlowLine = styled.div`
  position: relative;
  height: 2px;
  background: #E5E7EB;
  margin: 0 8px;
  flex: 1;
  
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background: #2563EB;
    border-radius: 50%;
  }
`;

const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mobile' | 'panel' | 'admin'>('mobile');

  const handleCTAClick = () => {
    window.open('http://wa.me/+244947589401', '_blank');
  };

  const renderAdminContent = () => (
    <ContentCard>
      <ContentLeft>
        <AppIcon>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
          </svg>
        </AppIcon>
        <AppTitle>Área Administrativa</AppTitle>
        <AppSubtitle>Para a gestão</AppSubtitle>
        <AppDescription>
          Painel completo para gerir alunos, responsáveis e acompanhar estatísticas.
          <br /><br />
          Controlo total do sistema.
        </AppDescription>
        <FeatureList>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            <span>Gestão de utilizadores</span>
          </FeatureItem>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            <span>Relatórios detalhados</span>
          </FeatureItem>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            <span>Estatísticas em tempo real</span>
          </FeatureItem>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            <span>Configurações avançadas</span>
          </FeatureItem>
        </FeatureList>
      </ContentLeft>
      
      <PanelMockup>
        <AdminDashboard>
          <AdminHeader>
            <AdminTitle>Dashboard Administrativo</AdminTitle>
            <AdminSubtitle>Visão geral do sistema</AdminSubtitle>
          </AdminHeader>
          
          <MetricsGrid>
            <MetricCard color="#DBEAFE">
              <MetricNumber>245</MetricNumber>
              <MetricLabel>Alunos</MetricLabel>
            </MetricCard>
            
            <MetricCard color="#DCFCE7">
              <MetricNumber>198</MetricNumber>
              <MetricLabel>Responsáveis</MetricLabel>
            </MetricCard>
            
            <MetricCard color="#FED7AA">
              <MetricNumber>156</MetricNumber>
              <MetricLabel>Recolhas Hoje</MetricLabel>
            </MetricCard>
            
            <MetricCard color="#E9D5FF">
              <MetricNumber>2.5min</MetricNumber>
              <MetricLabel>Tempo Médio</MetricLabel>
            </MetricCard>
          </MetricsGrid>
          
          <ActionButtons>
            <AdminActionButton>
              <AdminActionButtonLeft>
                <AdminActionIcon color="#3B82F6">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="m22 21-3-3m0 0a2 2 0 1 0-2.828-2.828A2 2 0 0 0 19 18Z"></path>
                  </svg>
                </AdminActionIcon>
                <AdminActionText>Gerir Alunos</AdminActionText>
              </AdminActionButtonLeft>
              <AdminActionArrow>→</AdminActionArrow>
            </AdminActionButton>
            
            <AdminActionButton>
              <AdminActionButtonLeft>
                <AdminActionIcon color="#22C55E">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M3 3v18h18"></path>
                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
                  </svg>
                </AdminActionIcon>
                <AdminActionText>Relatórios</AdminActionText>
              </AdminActionButtonLeft>
              <AdminActionArrow>→</AdminActionArrow>
            </AdminActionButton>
            
            <AdminActionButton>
              <AdminActionButtonLeft>
                <AdminActionIcon color="#F97316">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
                  </svg>
                </AdminActionIcon>
                <AdminActionText>Configurações</AdminActionText>
              </AdminActionButtonLeft>
              <AdminActionArrow>→</AdminActionArrow>
            </AdminActionButton>
          </ActionButtons>
        </AdminDashboard>
      </PanelMockup>
    </ContentCard>
  );

  const renderPanelContent = () => (
    <ContentCard>
      <ContentLeft>
        <AppIcon>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </AppIcon>
        <AppTitle>Painel de Controlo</AppTitle>
        <AppSubtitle>Para a equipa</AppSubtitle>
        <AppDescription>
          Monitor em tempo real mostra quem chegou. A equipa vê tudo organizado numa única tela.
        </AppDescription>
        <FeatureList>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            <span>Atualizações em tempo real</span>
          </FeatureItem>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            <span>Informação completa do aluno</span>
          </FeatureItem>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            <span>Códigos de cores intuitivos</span>
          </FeatureItem>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            <span>Interface limpa e funcional</span>
          </FeatureItem>
        </FeatureList>
      </ContentLeft>
      
      <PanelMockup>
        <Panel>
          <PanelHeader>
            <div>
              <PanelTitle>Painel de Recolhas</PanelTitle>
              <PanelDateTime>Hoje • 15:45</PanelDateTime>
            </div>
            <WaitingBadge>3 aguardam</WaitingBadge>
          </PanelHeader>
          
          <StudentsList>
            <StudentRow status="waiting">
              <PanelStudentInfo>
                <PanelStudentName>Maria Silva</PanelStudentName>
                <PanelStudentDetails>
                  <span>2º B</span>
                  <span>•</span>
                  <span>Ana Silva</span>
                </PanelStudentDetails>
              </PanelStudentInfo>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PanelStudentTime>15:43</PanelStudentTime>
                <PanelStatusBadge status="waiting">Aguarda</PanelStatusBadge>
              </div>
            </StudentRow>
            
            <StudentRow status="ready">
              <PanelStudentInfo>
                <PanelStudentName>Pedro Santos</PanelStudentName>
                <PanelStudentDetails>
                  <span>3º A</span>
                  <span>•</span>
                  <span>João Santos</span>
                </PanelStudentDetails>
              </PanelStudentInfo>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PanelStudentTime>15:44</PanelStudentTime>
                <PanelStatusBadge status="ready">Pronto</PanelStatusBadge>
              </div>
            </StudentRow>
            
            <StudentRow status="arrived">
              <PanelStudentInfo>
                <PanelStudentName>Lucas Costa</PanelStudentName>
                <PanelStudentDetails>
                  <span>1º A</span>
                  <span>•</span>
                  <span>Maria Costa</span>
                </PanelStudentDetails>
              </PanelStudentInfo>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PanelStudentTime>15:45</PanelStudentTime>
                <PanelStatusBadge status="arrived">Chegou</PanelStatusBadge>
              </div>
            </StudentRow>
          </StudentsList>
        </Panel>
      </PanelMockup>
    </ContentCard>
  );

  const renderMobileAppContent = () => (
    <ContentCard>
      <ContentLeft>
        <AppIcon>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
          </svg>
        </AppIcon>
        <AppTitle>Aplicação Móvel</AppTitle>
        <AppSubtitle>Para os pais</AppSubtitle>
        <AppDescription>
          Interface simples e intuitiva. Os pais chegam à escola e tocam em 'Estou Aqui' - é só isso.
        </AppDescription>
        <FeatureList>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            <span>Um botão, uma ação</span>
          </FeatureItem>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            <span>Notificações em tempo real</span>
          </FeatureItem>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            <span>Histórico completo</span>
          </FeatureItem>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            <span>Design intuitivo</span>
          </FeatureItem>
        </FeatureList>
      </ContentLeft>
      
      <PhoneMockup>
        <Phone>
          <PhoneScreen>
            <PhoneHeader>
              <SchoolIcon>ES</SchoolIcon>
              <SchoolInfo>
                <SchoolName>Escola Exemplo</SchoolName>
                <SystemName>Sistema de Recolha</SystemName>
              </SchoolInfo>
            </PhoneHeader>
            
            <StudentCard>
              <StudentIcon>JP</StudentIcon>
              <StudentInfo>
                <StudentName>João Pedro Silva</StudentName>
                <StudentClass>3º Ano • Turma A</StudentClass>
              </StudentInfo>
            </StudentCard>
            
            <ActionButton>Estou Aqui!</ActionButton>
            <InstructionText>
              Toque para notificar a escola da sua chegada
            </InstructionText>
            
            <StatusMessage>
              <CheckIcon>✓</CheckIcon>
              <span>Escola notificada</span>
            </StatusMessage>
          </PhoneScreen>
        </Phone>
      </PhoneMockup>
    </ContentCard>
  );

  return (
    <div>
      
      {/* HERO SECTION - Horizontal split */}
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        backgroundColor: 'white' 
      }}>
        
        {/* Left Side - Text and CTAs */}
        <div style={{ 
          width: '50%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          padding: '80px 60px',
          backgroundColor: 'white'
        }}>
          {/* Location Badge */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            marginBottom: '32px',
            color: '#6B7280',
            fontSize: '14px'
          }}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Luanda, Angola</span>
          </div>

          {/* Main Title */}
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            lineHeight: '1.1', 
            marginBottom: '24px',
            color: '#111827'
          }}>
            Revolucione a{' '}
            <span style={{ color: '#2563EB' }}>Recolha Escolar</span>{' '}
            na sua escola
          </h1>

          {/* Subtitle */}
          <p style={{ 
            fontSize: '20px', 
            lineHeight: '1.6', 
            marginBottom: '40px',
            color: '#6B7280'
          }}>
            Elimine as filas, reduza o stress e torne a recolha das crianças mais{' '}
            <span style={{ fontWeight: '600' }}>segura e eficiente</span>.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <button style={{
              backgroundColor: '#2563EB',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Ver Como Funciona
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
            
            <button style={{
              backgroundColor: 'white',
              color: '#374151',
              padding: '16px 32px',
              borderRadius: '12px',
              border: '2px solid #D1D5DB',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>▶</span>
              Ver Demonstração
            </button>
          </div>
        </div>

        {/* Right Side - System Flow Image */}
        <div style={{ 
          width: '50%', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <HeroImageContainer>
            <SystemFlowCard>
              {/* School Card */}
              <SchoolCard>
                <HeroSchoolIcon>
                  <svg 
                    width="32" 
                    height="32" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9,22 9,12 15,12 15,22"></polyline>
                  </svg>
                </HeroSchoolIcon>
                <HeroSchoolName>Escola Exemplo</HeroSchoolName>
                <HeroSchoolSubtitle>Sistema de Recolha</HeroSchoolSubtitle>
              </SchoolCard>

              {/* Bottom Cards with Flow */}
              <HeroBottomCards>
                <HeroAppCard>
                  <HeroAppIcon>
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </HeroAppIcon>
                  <HeroCardTitle>App Pais</HeroCardTitle>
                </HeroAppCard>

                <FlowLine />

                <HeroAppCard>
                  <HeroDeliveryIcon>
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </HeroDeliveryIcon>
                  <HeroCardTitle>Entrega</HeroCardTitle>
                </HeroAppCard>
              </HeroBottomCards>
            </SystemFlowCard>
          </HeroImageContainer>
        </div>

      </div>

      {/* OS DESAFIOS ATUAIS SECTION */}
      <div style={{ 
        padding: '80px 60px',
        backgroundColor: '#F9FAFB'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '40px', 
            fontWeight: 'bold', 
            color: '#111827',
            marginBottom: '16px'
          }}>
            Os Desafios Atuais
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: '#6B7280',
            maxWidth: '600px',
            margin: '0 auto 60px auto',
            lineHeight: '1.6'
          }}>
            A recolha escolar tradicional gera problemas diários para toda a comunidade educativa.
          </p>

          {/* Cards Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '24px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            
            {/* Card 1: Tempo Desperdiçado */}
            <ChallengeCard>
              <CardIcon>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#EF4444" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12,6 12,12 16,14"></polyline>
                </svg>
              </CardIcon>
              <CardTitle>Tempo Desperdiçado</CardTitle>
              <CardDescription>
                Pais perdem até 45 minutos por dia em filas desnecessárias.
              </CardDescription>
            </ChallengeCard>

            {/* Card 2: Falhas de Segurança */}
            <ChallengeCard>
              <CardIcon>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#F97316" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </CardIcon>
              <CardTitle>Falhas de Segurança</CardTitle>
              <CardDescription>
                Risco de entregar a criança à pessoa errada devido à desorganização.
              </CardDescription>
            </ChallengeCard>

            {/* Card 3: Equipa Sobrecarregada */}
            <ChallengeCard>
              <CardIcon>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#EAB308" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="m22 21-3-3m0 0a2 2 0 1 0-2.828-2.828A2 2 0 0 0 19 18Z"></path>
                </svg>
              </CardIcon>
              <CardTitle>Equipa Sobrecarregada</CardTitle>
              <CardDescription>
                Funcionários stressados a gerir dezenas de entregas em simultâneo.
              </CardDescription>
            </ChallengeCard>

            {/* Card 4: Congestionamento */}
            <ChallengeCard>
              <CardIcon>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#8B5CF6" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18.4 10c-.1-.3-.3-.6-.6-.8L16.5 7.5c-.3-.3-.7-.5-1.1-.5H8.6c-.4 0-.8.2-1.1.5L5.2 9.2c-.3.2-.5.5-.6.8L3.5 11.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2"></path>
                  <circle cx="7" cy="17" r="2"></circle>
                  <circle cx="17" cy="17" r="2"></circle>
                </svg>
              </CardIcon>
              <CardTitle>Congestionamento</CardTitle>
              <CardDescription>
                Filas de carros criam trânsito caótico à volta da escola.
              </CardDescription>
            </ChallengeCard>

          </div>
        </div>
      </div>

      {/* COMO FUNCIONA SECTION */}
      <div style={{ 
        padding: '80px 60px',
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '40px', 
            fontWeight: 'bold', 
            color: '#111827',
            marginBottom: '16px'
          }}>
            Como Funciona
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: '#6B7280',
            maxWidth: '600px',
            margin: '0 auto 60px auto',
            lineHeight: '1.6'
          }}>
            Sistema integrado com três interfaces que trabalham em perfeita harmonia.
          </p>

          <HowItWorksCard>
            <StepsContainer>
              {/* Step 1 */}
              <Step>
                <StepIcon color="#2563EB">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="40" 
                    height="40" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                </StepIcon>
                <StepText>
                  Pais tocam<br />
                  "Estou Aqui"
                </StepText>
              </Step>

              <Arrow>→</Arrow>

              {/* Step 2 */}
              <Step>
                <StepIcon color="#F97316">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="40" 
                    height="40" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </StepIcon>
                <StepText>
                  Equipa vê<br />
                  no painel
                </StepText>
              </Step>

              <Arrow>→</Arrow>

              {/* Step 3 */}
              <Step>
                <StepIcon color="#22C55E">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="40" 
                    height="40" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="20,6 9,17 4,12"></polyline>
                  </svg>
                </StepIcon>
                <StepText>
                  Criança<br />
                  entregue
                </StepText>
              </Step>
            </StepsContainer>
          </HowItWorksCard>

          {/* Tab Navigation */}
          <TabContainer>
            <TabButton 
              active={activeTab === 'mobile'} 
              onClick={() => setActiveTab('mobile')}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
              Aplicação Móvel
            </TabButton>
            
            <TabButton 
              active={activeTab === 'panel'} 
              onClick={() => setActiveTab('panel')}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              Painel de Controlo
            </TabButton>
            
            <TabButton 
              active={activeTab === 'admin'} 
              onClick={() => setActiveTab('admin')}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
              </svg>
              Área Administrativa
            </TabButton>
          </TabContainer>

          {/* Tab Content */}
          {activeTab === 'mobile' && renderMobileAppContent()}
          {activeTab === 'panel' && renderPanelContent()}
          {activeTab === 'admin' && renderAdminContent()}
        </div>
      </div>

      {/* RESULTADOS COMPROVADOS SECTION */}
      <div style={{ 
        padding: '80px 60px',
        backgroundColor: '#F9FAFB'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '40px', 
            fontWeight: 'bold', 
            color: '#111827',
            marginBottom: '16px'
          }}>
            Resultados Comprovados
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: '#6B7280',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Dados reais de escolas que já implementaram o sistema.
          </p>

          <ResultsGrid>
            {/* Card 1: Menos tempo de espera */}
            <ResultCard>
              <ResultIcon color="#DBEAFE">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#2563EB" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12,6 12,12 16,14"></polyline>
                </svg>
              </ResultIcon>
              <ResultPercentage>90%</ResultPercentage>
              <ResultTitle>Menos tempo de espera</ResultTitle>
              <ResultDescription>
                Redução drástica no tempo perdido
              </ResultDescription>
            </ResultCard>

            {/* Card 2: Segurança garantida */}
            <ResultCard>
              <ResultIcon color="#DCFCE7">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#22C55E" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </ResultIcon>
              <ResultPercentage>100%</ResultPercentage>
              <ResultTitle>Segurança garantida</ResultTitle>
              <ResultDescription>
                Entregas sempre à pessoa certa
              </ResultDescription>
            </ResultCard>

            {/* Card 3: Menos congestionamento */}
            <ResultCard>
              <ResultIcon color="#FED7AA">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#F97316" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18.4 10c-.1-.3-.3-.6-.6-.8L16.5 7.5c-.3-.3-.7-.5-1.1-.5H8.6c-.4 0-.8.2-1.1.5L5.2 9.2c-.3.2-.5.5-.6.8L3.5 11.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2"></path>
                  <circle cx="7" cy="17" r="2"></circle>
                  <circle cx="17" cy="17" r="2"></circle>
                </svg>
              </ResultIcon>
              <ResultPercentage>85%</ResultPercentage>
              <ResultTitle>Menos congestionamento</ResultTitle>
              <ResultDescription>
                Redução significativa no trânsito
              </ResultDescription>
            </ResultCard>

            {/* Card 4: Satisfação dos pais */}
            <ResultCard>
              <ResultIcon color="#E9D5FF">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#8B5CF6" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M3 3v18h18"></path>
                  <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
                </svg>
              </ResultIcon>
              <ResultPercentage>95%</ResultPercentage>
              <ResultTitle>Satisfação dos pais</ResultTitle>
              <ResultDescription>
                Aprovação da nova solução
              </ResultDescription>
            </ResultCard>
          </ResultsGrid>
        </div>
      </div>

      {/* O QUE DIZEM AS ESCOLAS SECTION */}
      <div style={{ 
        padding: '80px 60px',
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '40px', 
            fontWeight: 'bold', 
            color: '#111827',
            marginBottom: '16px'
          }}>
            O Que Dizem as Escolas
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: '#6B7280',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Depoimentos reais de quem já usa o sistema.
          </p>

          <TestimonialsGrid>
            {/* Testimonial 1 */}
            <TestimonialCard>
              <TestimonialQuote>
                "Transformou completamente a nossa rotina diária. Os pais adoram a simplicidade."
              </TestimonialQuote>
              <TestimonialAuthor>
                <AuthorName>Maria Santos</AuthorName>
                <AuthorTitle>Diretora</AuthorTitle>
                <AuthorSchool>Escola Bom Pastor</AuthorSchool>
              </TestimonialAuthor>
            </TestimonialCard>

            {/* Testimonial 2 */}
            <TestimonialCard>
              <TestimonialQuote>
                "Acabaram as filas e a confusão. Agora tudo funciona perfeitamente."
              </TestimonialQuote>
              <TestimonialAuthor>
                <AuthorName>João Ferreira</AuthorName>
                <AuthorTitle>Coordenador</AuthorTitle>
                <AuthorSchool>Colégio Moderno</AuthorSchool>
              </TestimonialAuthor>
            </TestimonialCard>

            {/* Testimonial 3 */}
            <TestimonialCard>
              <TestimonialQuote>
                "A equipa pode focar-se no essencial: cuidar bem das crianças."
              </TestimonialQuote>
              <TestimonialAuthor>
                <AuthorName>Ana Costa</AuthorName>
                <AuthorTitle>Administradora</AuthorTitle>
                <AuthorSchool>Escola Internacional</AuthorSchool>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialsGrid>
        </div>
      </div>

      {/* TRANSFORME A SUA ESCOLA SECTION */}
      <CTAHero>
        <CTAHeroTitle>
          Transforme a Sua Escola{' '}
          <CTAHeroTitleBlue>Hoje Mesmo</CTAHeroTitleBlue>
        </CTAHeroTitle>
        <CTAHeroDescription>
          Implemente o sistema de recolha mais moderno de Luanda e{' '}
          <strong>transforme a experiência</strong> de toda a comunidade escolar.
        </CTAHeroDescription>

        <ImplementationCard>
          <ImplementationTitle>Processo de Implementação</ImplementationTitle>
          
          <CTAStepsContainer>
            <CTAStep>
              <CTAStepNumber color="#DBEAFE">
                <span style={{ color: '#2563EB', fontSize: '24px', fontWeight: 'bold' }}>1</span>
              </CTAStepNumber>
              <CTAStepTitle>Configuração</CTAStepTitle>
              <CTAStepDescription>
                Configuramos o sistema com os dados da escola
              </CTAStepDescription>
            </CTAStep>
            
            <CTAStep>
              <CTAStepNumber color="#FED7AA">
                <span style={{ color: '#F97316', fontSize: '24px', fontWeight: 'bold' }}>2</span>
              </CTAStepNumber>
              <CTAStepTitle>Formação</CTAStepTitle>
              <CTAStepDescription>
                Formamos a equipa para usar o sistema
              </CTAStepDescription>
            </CTAStep>
            
            <CTAStep>
              <CTAStepNumber color="#DCFCE7">
                <span style={{ color: '#22C55E', fontSize: '24px', fontWeight: 'bold' }}>3</span>
              </CTAStepNumber>
              <CTAStepTitle>Ativação</CTAStepTitle>
              <CTAStepDescription>
                Sistema pronto a funcionar
              </CTAStepDescription>
            </CTAStep>
          </CTAStepsContainer>

          <InvestmentSection>
            <InvestmentTitle>Investimento: A partir de 450.000 Kz/mês</InvestmentTitle>
            <InvestmentDescription>
              Retorno garantido através da melhoria na satisfação e eficiência operacional.
            </InvestmentDescription>
          </InvestmentSection>
        </ImplementationCard>

        <CTAButtons>
          <PrimaryCTAButton onClick={handleCTAClick}>
            Solicitar Demonstração
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </PrimaryCTAButton>
          
          <SecondaryCTAButton onClick={handleCTAClick}>
            Falar com Consultor
          </SecondaryCTAButton>
        </CTAButtons>

        <ContactInfo>
          <ContactItem>
            <ContactIcon color="#DBEAFE">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#2563EB" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </ContactIcon>
            <ContactLabel>Telefone</ContactLabel>
            <ContactValue>+244 900 000 000</ContactValue>
          </ContactItem>

          <ContactItem>
            <ContactIcon color="#FED7AA">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#F97316" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </ContactIcon>
            <ContactLabel>Email</ContactLabel>
            <ContactValue>info@recolhaescolar.ao</ContactValue>
          </ContactItem>

          <ContactItem>
            <ContactIcon color="#DCFCE7">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#22C55E" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </ContactIcon>
            <ContactLabel>Localização</ContactLabel>
            <ContactValue>Luanda, Angola</ContactValue>
          </ContactItem>
        </ContactInfo>
      </CTAHero>

    </div>
  );
};

export default LandingPage;
