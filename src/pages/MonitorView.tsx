import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, User, Car, Phone, MapPin, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

interface PickupRequest {
  id: string;
  studentName: string;
  grade: string;
  parentName: string;
  parentPhone: string;
  carColor: string;
  carPlate: string;
  timestamp: Date;
  status: 'waiting' | 'delivered';
}

const MonitorView: React.FC = () => {
  const [pickupRequests, setPickupRequests] = useState<PickupRequest[]>([
    {
      id: '1',
      studentName: 'María Silva',
      grade: '3º A',
      parentName: 'João Silva',
      parentPhone: '+244 923 456 789',
      carColor: 'Azul',
      carPlate: 'LU-123-AB',
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      status: 'waiting'
    },
    {
      id: '2',
      studentName: 'Pedro Santos',
      grade: '5º B',
      parentName: 'Ana Santos',
      parentPhone: '+244 924 567 890',
      carColor: 'Blanco',
      carPlate: 'LU-456-CD',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      status: 'waiting'
    },
    {
      id: '3',
      studentName: 'Isabel Costa',
      grade: '2º C',
      parentName: 'Carlos Costa',
      parentPhone: '+244 925 678 901',
      carColor: 'Rojo',
      carPlate: 'LU-789-EF',
      timestamp: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
      status: 'waiting'
    }
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDeliver = (id: string) => {
    setPickupRequests(prev => 
      prev.map(request => 
        request.id === id 
          ? { ...request, status: 'delivered' as const }
          : request
      )
    );

    // Remove delivered request after animation
    setTimeout(() => {
      setPickupRequests(prev => prev.filter(request => request.id !== id));
    }, 1000);
  };

  const handleWait = (id: string) => {
    // In a real app, this might update the status or send a notification
    console.log(`Student ${id} is waiting longer`);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-PT', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getTimeAgo = (timestamp: Date) => {
    const diff = Math.floor((currentTime.getTime() - timestamp.getTime()) / 1000 / 60);
    if (diff < 1) return 'Agora mesmo';
    if (diff === 1) return 'Há 1 minuto';
    return `Há ${diff} minutos`;
  };

  const waitingRequests = pickupRequests.filter(req => req.status === 'waiting');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white p-4">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">Monitor de Recogida</h1>
            <p className="text-xl text-blue-200">Escola Internacional de Luanda</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono font-bold">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm text-blue-200">
              {waitingRequests.length} solicitudes pendientes
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {waitingRequests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="bg-green-500/20 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto">
              <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">¡Todo al día!</h2>
              <p className="text-xl text-green-200">
                No hay solicitudes de recogida pendientes.
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {waitingRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  layout
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl text-white">
                          {request.studentName}
                        </CardTitle>
                        <div className="flex items-center space-x-1 text-yellow-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-mono">
                            {getTimeAgo(request.timestamp)}
                          </span>
                        </div>
                      </div>
                      <div className="text-lg text-blue-200 font-semibold">
                        {request.grade}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Parent Info */}
                      <div className="bg-white/10 rounded-2xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="w-5 h-5 text-blue-300" />
                          <span className="font-semibold text-white">
                            {request.parentName}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-green-300" />
                          <span className="text-sm text-blue-200">
                            {request.parentPhone}
                          </span>
                        </div>
                      </div>

                      {/* Car Info */}
                      <div className="bg-white/10 rounded-2xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Car className="w-5 h-5 text-purple-300" />
                          <span className="font-semibold text-white">
                            Vehículo
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-orange-300" />
                          <span className="text-sm text-blue-200">
                            {request.carColor} - {request.carPlate}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 pt-2">
                        <Button
                          onClick={() => handleDeliver(request.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Entregar
                        </Button>
                        <Button
                          onClick={() => handleWait(request.id)}
                          variant="outline"
                          className="flex-1 border-white/30 text-white hover:bg-white/10 font-semibold py-3 rounded-2xl"
                        >
                          <Clock className="w-5 h-5 mr-2" />
                          Esperar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Refresh Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Button
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-2xl"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Actualizar
          </Button>
        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold mb-2">Instrucciones para el Personal</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-200">
            <div>
              <strong>1. Verificar Identidad:</strong> Confirma que el padre/madre es quien dice ser
            </div>
            <div>
              <strong>2. Revisar Vehículo:</strong> Verifica que el coche coincide con los datos
            </div>
            <div>
              <strong>3. Entregar Estudiante:</strong> Solo después de confirmar todo correctamente
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MonitorView;
