import { useState } from 'react';
import { Stethoscope, Lock, Building2, User, Phone, AlertTriangle, Clock, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface Patient {
  tokenNo: string;
  name: string;
  age: number;
  problem: string;
  waitTime: number;
  priority: 'urgent' | 'regular' | 'followup';
  checkInTime: string;
}

const queuePatients: Patient[] = [
  { tokenNo: 'T-101', name: 'Rajesh Kumar', age: 45, problem: 'High Fever & Headache', waitTime: 0, priority: 'urgent', checkInTime: '09:15 AM' },
  { tokenNo: 'T-102', name: 'Priya Sharma', age: 32, problem: 'Regular Checkup', waitTime: 15, priority: 'regular', checkInTime: '09:22 AM' },
  { tokenNo: 'T-103', name: 'Amit Patel', age: 58, problem: 'Follow-up Visit - Diabetes', waitTime: 30, priority: 'followup', checkInTime: '09:28 AM' },
  { tokenNo: 'T-104', name: 'Sneha Reddy', age: 28, problem: 'Chest Pain & Breathing Issues', waitTime: 45, priority: 'urgent', checkInTime: '09:35 AM' },
  { tokenNo: 'T-105', name: 'Vikram Singh', age: 41, problem: 'Back Pain', waitTime: 60, priority: 'regular', checkInTime: '09:42 AM' },
];

export function DoctorPortal({ onBack }: { onBack: () => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctorName, setDoctorName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [password, setPassword] = useState('');
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [queue, setQueue] = useState<Patient[]>(queuePatients);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (doctorName && hospitalName && password) {
      setIsLoggedIn(true);
      setCurrentPatient(queue[0]);
    }
  };

  const handleCallNext = () => {
    if (queue.length > 1) {
      const nextQueue = queue.slice(1);
      setQueue(nextQueue);
      setCurrentPatient(nextQueue[0]);
      // Simulate notification
      alert(`Calling ${nextQueue[0].name} - Token ${nextQueue[0].tokenNo}`);
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return { bg: 'bg-[#DC3545]/10', text: 'text-[#DC3545]', dot: 'bg-[#DC3545]', label: 'Urgent' };
      case 'regular':
        return { bg: 'bg-[#FFC107]/10', text: 'text-[#FFC107]', dot: 'bg-[#FFC107]', label: 'Regular' };
      case 'followup':
        return { bg: 'bg-[#28A745]/10', text: 'text-[#28A745]', dot: 'bg-[#28A745]', label: 'Follow-up' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400', label: 'Unknown' };
    }
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] to-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Button onClick={onBack} variant="outline" className="mb-6 rounded-full">
            ← Back to Home
          </Button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-8 border border-[rgba(0,45,98,0.08)]"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#002D62]/10 rounded-2xl mb-4">
                <Stethoscope className="w-12 h-12 text-[#002D62]" />
              </div>
              <h1 className="text-3xl font-bold text-[#002D62] mb-2">Doctor Login</h1>
              <p className="text-sm text-[#6C757D]">Access your clinic dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <Label>Doctor Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C757D]" />
                  <Input
                    type="text"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    placeholder="Enter your name"
                    className="h-12 pl-11 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Hospital Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C757D]" />
                  <Input
                    type="text"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    placeholder="Enter hospital name"
                    className="h-12 pl-11 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C757D]" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="h-12 pl-11 rounded-xl"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#002D62] hover:bg-[#001d42] text-white rounded-xl"
              >
                Login to Dashboard
              </Button>
            </form>

            <p className="text-center text-xs text-[#6C757D] mt-6">
              Demo: Use any credentials to login
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white border-b border-[rgba(0,45,98,0.1)] shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={onBack} variant="outline" className="rounded-full">
                ← Back
              </Button>
              <div>
                <h1 className="text-xl font-bold text-[#002D62]">Dr. {doctorName}</h1>
                <p className="text-sm text-[#6C757D]">{hospitalName}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-[#6C757D]">Patients in Queue</p>
                <p className="text-2xl font-bold text-[#002D62]">{queue.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#002D62] rounded-full flex items-center justify-center text-white font-bold">
                {doctorName[0]}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Now Treating Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#002D62] mb-4">Now Treating</h2>
            {currentPatient && (
              <motion.div
                key={currentPatient.tokenNo}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-br from-[#002D62] to-[#003d7a] rounded-3xl shadow-2xl p-8 text-white"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <User className="w-9 h-9 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-3xl font-bold">{currentPatient.name}</h3>
                        {(() => {
                          const badge = getPriorityBadge(currentPatient.priority);
                          return (
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${badge.bg} ${badge.text} flex items-center gap-2`}>
                              <span className={`w-2 h-2 rounded-full ${badge.dot} animate-pulse`}></span>
                              {badge.label}
                            </span>
                          );
                        })()}
                      </div>
                      <p className="text-white/80 text-lg">Token: {currentPatient.tokenNo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-sm mb-1">Check-in Time</p>
                    <p className="text-xl font-semibold">{currentPatient.checkInTime}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <p className="text-white/80 text-sm mb-1">Age</p>
                    <p className="text-2xl font-bold">{currentPatient.age} years</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <p className="text-white/80 text-sm mb-1">Problem</p>
                    <p className="text-lg font-semibold">{currentPatient.problem}</p>
                  </div>
                </div>

                <Button
                  onClick={handleCallNext}
                  disabled={queue.length <= 1}
                  className="w-full h-14 bg-white text-[#002D62] hover:bg-white/90 rounded-xl text-lg font-semibold"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Next Patient
                </Button>
              </motion.div>
            )}
          </div>

          {/* Queue List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#002D62] mb-4">Patient Queue</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[rgba(0,45,98,0.08)]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8F9FA]">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#002D62]">Priority</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#002D62]">Token No</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#002D62]">Patient Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#002D62]">Age</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#002D62]">Problem</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#002D62]">Wait Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(0,45,98,0.05)]">
                    {queue.map((patient, index) => {
                      const badge = getPriorityBadge(patient.priority);
                      const isCurrent = index === 0;
                      return (
                        <motion.tr
                          key={patient.tokenNo}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`${isCurrent ? 'bg-[#E8F4F8]' : 'hover:bg-[#F8F9FA]'} transition-colors`}
                        >
                          <td className="px-6 py-4">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${badge.bg}`}>
                              <span className={`w-2 h-2 rounded-full ${badge.dot} ${patient.priority === 'urgent' ? 'animate-pulse' : ''}`}></span>
                              <span className={`text-sm font-semibold ${badge.text}`}>{badge.label}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold text-[#002D62]">{patient.tokenNo}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {isCurrent && <span className="text-[#00A8A8] font-semibold text-xs">NOW</span>}
                              <span className="font-medium text-[#002D62]">{patient.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[#6C757D]">{patient.age}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-start gap-2">
                              <FileText className="w-4 h-4 text-[#6C757D] mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-[#002D62]">{patient.problem}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-[#6C757D]">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">{patient.waitTime} min</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[rgba(0,45,98,0.08)]">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-[#DC3545]" />
                <p className="text-sm text-[#6C757D]">Urgent Cases</p>
              </div>
              <p className="text-3xl font-bold text-[#002D62]">
                {queue.filter(p => p.priority === 'urgent').length}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[rgba(0,45,98,0.08)]">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-[#00A8A8]" />
                <p className="text-sm text-[#6C757D]">Avg. Wait Time</p>
              </div>
              <p className="text-3xl font-bold text-[#002D62]">
                {Math.round(queue.reduce((acc, p) => acc + p.waitTime, 0) / queue.length)} min
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
