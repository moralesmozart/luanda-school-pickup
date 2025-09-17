import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Parent {
  id: string;
  username: string;
  password: string;
  name: string;
  phone: string;
  email?: string;
  status: 'active' | 'inactive';
}

export interface Student {
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

export interface QueueStudent {
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

interface AppContextType {
  // Parents management
  parents: Parent[];
  activeParents: Parent[];
  
  // Students management
  students: Student[];
  pendingStudents: Student[];
  approvedStudents: Student[];
  
  // Queue management
  queueStudents: QueueStudent[];
  
  // Parent actions
  addParent: (parent: Omit<Parent, 'id' | 'status'>) => void;
  updateParent: (id: string, updates: Partial<Parent>) => void;
  deleteParent: (id: string) => void;
  
  // Student actions
  addStudent: (student: Omit<Student, 'id' | 'status'>) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  approveStudent: (id: string) => void;
  rejectStudent: (id: string) => void;
  
  // Queue actions
  addToQueue: (student: Student) => void;
  removeFromQueue: (id: string) => void;
  updateQueuePosition: (id: string, position: number) => void;
  
  // Authentication
  authenticateParent: (username: string, password: string) => Parent | null;
  getStudentsByParent: (parentId: string) => Student[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Inicializar com dados de demo
  const [parents, setParents] = useState<Parent[]>([
    {
      id: 'demo-parent-1',
      username: 'joao.santos',
      password: 'demo123',
      name: 'João Santos',
      phone: '+244 900 000 001',
      email: 'joao.santos@email.com',
      status: 'active'
    },
    {
      id: 'demo-parent-2',
      username: 'carlos.ferreira',
      password: 'demo123',
      name: 'Carlos Ferreira',
      phone: '+244 900 000 003',
      email: 'carlos.ferreira@email.com',
      status: 'active'
    }
  ]);
  
  const [students, setStudents] = useState<Student[]>([
    {
      id: 'demo-student-1',
      name: 'Maria',
      surname: 'Santos',
      schoolId: 'MS001',
      class: '5º A',
      parentId: 'demo-parent-1',
      parent1Name: 'João Santos',
      parent1Phone: '+244 900 000 001',
      parent2Name: 'Ana Santos',
      parent2Phone: '+244 900 000 002',
      car1Type: 'sedan',
      car1Color: 'Azul',
      car1Plate: 'LD-01-AB-23',
      car2Type: 'suv',
      car2Color: 'Branco',
      car2Plate: 'LD-02-CD-45',
      status: 'approved'
    },
    {
      id: 'demo-student-2',
      name: 'Pedro',
      surname: 'Ferreira',
      schoolId: 'PF002',
      class: '3º B',
      parentId: 'demo-parent-2',
      parent1Name: 'Carlos Ferreira',
      parent1Phone: '+244 900 000 003',
      car1Type: 'truck',
      car1Color: 'Preto',
      car1Plate: 'LD-03-EF-67',
      status: 'approved'
    }
  ]);
  
  const [queueStudents, setQueueStudents] = useState<QueueStudent[]>([]);

  const activeParents = parents.filter(p => p.status === 'active');
  const pendingStudents = students.filter(s => s.status === 'pending');
  const approvedStudents = students.filter(s => s.status === 'approved');

  // Parent management functions
  const addParent = (parentData: Omit<Parent, 'id' | 'status'>) => {
    const newParent: Parent = {
      ...parentData,
      id: Date.now().toString(),
      status: 'active'
    };
    setParents(prev => [...prev, newParent]);
  };

  const updateParent = (id: string, updates: Partial<Parent>) => {
    setParents(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteParent = (id: string) => {
    setParents(prev => prev.filter(p => p.id !== id));
    // Also delete all students of this parent
    setStudents(prev => prev.filter(s => s.parentId !== id));
  };

  // Student management functions
  const addStudent = (studentData: Omit<Student, 'id' | 'status'>) => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString(),
      status: 'pending'
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    // Also remove from queue if present
    setQueueStudents(prev => prev.filter(q => q.id !== id));
  };

  const approveStudent = (id: string) => {
    setStudents(prev => prev.map(s => 
      s.id === id ? { ...s, status: 'approved' as const } : s
    ));
  };

  const rejectStudent = (id: string) => {
    setStudents(prev => prev.map(s => 
      s.id === id ? { ...s, status: 'rejected' as const } : s
    ));
  };

  const addToQueue = (student: Student) => {
    const queueStudent: QueueStudent = {
      id: student.id,
      studentName: `${student.name} ${student.surname}`,
      studentClass: student.class,
      parentName: student.parent1Name,
      carType: student.car1Type,
      carColor: student.car1Color,
      carPlate: student.car1Plate,
      arrivalTime: new Date().toLocaleTimeString('pt-PT', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      position: queueStudents.length + 1
    };
    
    setQueueStudents(prev => [...prev, queueStudent]);
  };

  const removeFromQueue = (id: string) => {
    setQueueStudents(prev => {
      const updated = prev.filter(s => s.id !== id);
      // Update positions
      return updated.map((s, index) => ({ ...s, position: index + 1 }));
    });
  };

  const updateQueuePosition = (id: string, position: number) => {
    setQueueStudents(prev => prev.map(s => 
      s.id === id ? { ...s, position } : s
    ));
  };

  const authenticateParent = (username: string, password: string): Parent | null => {
    return activeParents.find(p => 
      p.username === username && p.password === password
    ) || null;
  };

  const getStudentsByParent = (parentId: string): Student[] => {
    return students.filter(s => s.parentId === parentId);
  };

  const value: AppContextType = {
    parents,
    activeParents,
    students,
    pendingStudents,
    approvedStudents,
    queueStudents,
    addParent,
    updateParent,
    deleteParent,
    addStudent,
    updateStudent,
    deleteStudent,
    approveStudent,
    rejectStudent,
    addToQueue,
    removeFromQueue,
    updateQueuePosition,
    authenticateParent,
    getStudentsByParent
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
