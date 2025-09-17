# 🚗 Luanda School Pickup Platform

Uma plataforma moderna para gestão de recolha de alunos nas escolas de Luanda, Angola. Esta solução elimina as filas intermináveis e melhora a segurança e eficiência do processo de recolha escolar.

## 🌟 Características Principais

### 👨‍💼 **Área Administrativa**
- Gestão completa de pais e alunos
- Sistema de aprovação de registos
- Painel de controlo em tempo real
- Estatísticas e métricas de utilização

### 👨‍👩‍👧‍👦 **Aplicação para Pais**
- Login seguro com credenciais fornecidas pela escola
- Gestão de múltiplos filhos
- Notificação de chegada ("Estou Aqui!")
- Acompanhamento da posição na fila em tempo real

### 📱 **Painel de Monitorização**
- Vista em tempo real da fila de recolha
- Interface tipo "painel McDonald's"
- Gestão de entregas e remoções
- Histórico de recolhas concluídas

## 🚀 Tecnologias Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Styled Components** - Estilização moderna
- **React Router** - Navegação
- **Lucide React** - Ícones
- **Framer Motion** - Animações (preparado)

## 📋 Pré-requisitos

- Node.js 16+ 
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/[SEU-USERNAME]/luanda-school-pickup.git
cd luanda-school-pickup
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute o projeto:**
```bash
npm start
```

4. **Aceda à aplicação:**
```
http://localhost:3000
```

## 🎯 Como Usar

### **📖 Guia Completo de URLs**
Para instruções detalhadas sobre cada página e como usar, consulte o **[Guia de URLs](URLS-GUIDE.md)**.

### **🚀 Acesso Rápido**

**🏠 Página Principal:** https://moralesmozart.github.io/luanda-school-pickup/#/

**👨‍💼 Admin:** https://moralesmozart.github.io/luanda-school-pickup/#/admin
- Credenciais: `admin@escola.ao` / `admin123`

**👨‍👩‍👧‍👦 Pais:** https://moralesmozart.github.io/luanda-school-pickup/#/parent
- Demo: Click "Demo: João Santos" ou "Demo: Carlos Ferreira"

**📊 Monitor:** https://moralesmozart.github.io/luanda-school-pickup/#/viewdashboard
- Vista em tempo real da fila

### **🎮 Demonstração Rápida**
1. Vá para `/#/parent`
2. Click "Demo: João Santos"
3. Explore as 4 secções do dashboard
4. Teste "Estou Aqui!" e "Ver Fila"

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── AdminLogin.tsx   # Login administrativo
│   └── AdminDashboard.tsx # Dashboard administrativo
├── pages/              # Páginas principais
│   ├── LandingPage.tsx # Página inicial
│   ├── ParentApp.tsx   # Aplicação para pais
│   ├── MonitorView.tsx # Vista de monitorização
│   └── ViewDashboard.tsx # Painel de fila
├── context/            # Gestão de estado global
│   └── AppContext.tsx  # Contexto principal
└── App.tsx            # Componente raiz
```

## 🔄 Fluxo de Funcionamento

1. **Admin cria credenciais** para pais
2. **Pais fazem login** e registam filhos
3. **Admin aprova** os registos
4. **Pais notificam chegada** ("Estou Aqui!")
5. **Sistema adiciona à fila** automaticamente
6. **Pais acompanham posição** em tempo real
7. **Escola gere entregas** no painel

## 🎨 Design e UX

- **Interface moderna** com gradientes e animações
- **Design responsivo** para mobile e desktop
- **Cores inspiradas** no verde (crescimento, segurança)
- **Tipografia clara** e hierarquia visual
- **Feedback visual** em todas as ações

## 🔒 Segurança e Privacidade

- **Dados sensíveis** não são expostos na fila
- **Autenticação** obrigatória para todas as áreas
- **Separação de dados** por utilizador
- **Gestão de sessões** segura

## 📊 Dados de Demonstração

O sistema inclui dados de demonstração para teste:

### **Pais:**
- João Santos (joao.santos / demo123)
- Carlos Ferreira (carlos.ferreira / demo123)

### **Alunos:**
- Maria Santos (5º A) - Aprovado
- Pedro Ferreira (3º B) - Aprovado

## 🚀 Deploy

### **GitHub Pages:**
O projeto está configurado para deploy automático no GitHub Pages.

### **Deploy Manual:**
```bash
npm run build
npm run deploy
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para a sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit as suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contacto

- **Email**: [seu-email@exemplo.com]
- **Telefone**: +244 XXX XXX XXX
- **Localização**: Luanda, Angola

## 🙏 Agradecimentos

- Comunidade React
- Escolas de Luanda pela inspiração
- Desenvolvedores que contribuíram para este projeto

---

**Desenvolvido com ❤️ para as escolas de Luanda**