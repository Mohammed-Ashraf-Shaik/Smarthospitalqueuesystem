import { useState } from 'react';
import { Shield, Lock, Building2, Users, Clock, DollarSign, FileText, TrendingUp, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const todayTrend = [
  { time: '8 AM', today: 12, yesterday: 8 },
  { time: '9 AM', today: 24, yesterday: 18 },
  { time: '10 AM', today: 38, yesterday: 32 },
  { time: '11 AM', today: 52, yesterday: 45 },
  { time: '12 PM', today: 45, yesterday: 50 },
  { time: '1 PM', today: 35, yesterday: 38 },
  { time: '2 PM', today: 28, yesterday: 30 },
];

const busiestHours = [
  { hour: '8-9', patients: 24, revenue: 12000 },
  { hour: '9-10', patients: 38, revenue: 19000 },
  { hour: '10-11', patients: 52, revenue: 26000 },
  { hour: '11-12', patients: 45, revenue: 22500 },
  { hour: '12-1', patients: 35, revenue: 17500 },
  { hour: '1-2', patients: 28, revenue: 14000 },
  { hour: '2-3', patients: 32, revenue: 16000 },
];

const doctorStats = [
  { name: 'Dr. Sharma', specialty: 'Cardiology', patientsWaiting: 5, avgConsultation: '12 min', todayTotal: 18 },
  { name: 'Dr. Patel', specialty: 'General Medicine', patientsWaiting: 8, avgConsultation: '10 min', todayTotal: 24 },
  { name: 'Dr. Kumar', specialty: 'Pediatrics', patientsWaiting: 3, avgConsultation: '15 min', todayTotal: 12 },
  { name: 'Dr. Singh', specialty: 'Orthopedics', patientsWaiting: 6, avgConsultation: '18 min', todayTotal: 15 },
];

export function StaffPortal({ onBack }: { onBack: () => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
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
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#6C3483]/10 rounded-2xl mb-4">
                <Shield className="w-12 h-12 text-[#6C3483]" />
              </div>
              <h1 className="text-3xl font-bold text-[#002D62] mb-2">Staff/Admin Login</h1>
              <p className="text-sm text-[#6C757D]">Access hospital analytics dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <Label>Username</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C757D]" />
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
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
                className="w-full h-12 bg-[#6C3483] hover:bg-[#5a2d6f] text-white rounded-xl"
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
      <div className="bg-gradient-to-r from-[#002D62] to-[#003d7a] text-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={onBack} variant="outline" className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                ← Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Staff Analytics Dashboard</h1>
                <p className="text-white/80 text-sm">Real-time Hospital Insights</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-white/80">Logged in as</p>
                <p className="font-semibold">{username}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm font-bold">
                {username[0]?.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#002D62] mb-4">Today's Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-[rgba(0,45,98,0.08)]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#00A8A8]/10 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#00A8A8]" />
                </div>
                <TrendingUp className="w-5 h-5 text-[#28A745]" />
              </div>
              <p className="text-sm text-[#6C757D] mb-1">Total Patients Today</p>
              <p className="text-4xl font-bold text-[#002D62]">186</p>
              <p className="text-sm text-[#28A745] mt-2">+12% from yesterday</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-[rgba(0,45,98,0.08)]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#FFC107]/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#FFC107]" />
                </div>
              </div>
              <p className="text-sm text-[#6C757D] mb-1">Average Wait Time</p>
              <p className="text-4xl font-bold text-[#002D62]">18m</p>
              <p className="text-sm text-[#6C757D] mt-2">Across all departments</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-[rgba(0,45,98,0.08)]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#28A745]/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#28A745]" />
                </div>
                <TrendingUp className="w-5 h-5 text-[#28A745]" />
              </div>
              <p className="text-sm text-[#6C757D] mb-1">Revenue Collected</p>
              <p className="text-4xl font-bold text-[#002D62]">₹93k</p>
              <p className="text-sm text-[#28A745] mt-2">+8% from yesterday</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-[rgba(0,45,98,0.08)]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#DC3545]/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#DC3545]" />
                </div>
              </div>
              <p className="text-sm text-[#6C757D] mb-1">Pending Cases</p>
              <p className="text-4xl font-bold text-[#002D62]">22</p>
              <p className="text-sm text-[#6C757D] mt-2">Currently in queue</p>
            </motion.div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Patient Trends */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-[rgba(0,45,98,0.08)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6 text-[#002D62]" />
              <h3 className="text-xl font-bold text-[#002D62]">Patient Trends</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={todayTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="time" stroke="#6C757D" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6C757D" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E0E0E0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line
                  type="monotone"
                  dataKey="today"
                  stroke="#002D62"
                  strokeWidth={3}
                  name="Today"
                  dot={{ fill: '#002D62', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="yesterday"
                  stroke="#00A8A8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Yesterday"
                  dot={{ fill: '#00A8A8', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Revenue Forecast */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-[rgba(0,45,98,0.08)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-6 h-6 text-[#28A745]" />
              <h3 className="text-xl font-bold text-[#002D62]">Revenue Forecast by Hour</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={busiestHours}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="hour" stroke="#6C757D" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6C757D" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E0E0E0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => `₹${value}`}
                />
                <Bar dataKey="revenue" fill="#28A745" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 bg-[#E8F8F1] rounded-xl p-4 border border-[#28A745]/20">
              <p className="text-sm text-[#002D62]">
                <strong>Peak Revenue Hour:</strong> 10-11 AM with ₹26,000 estimated
              </p>
            </div>
          </motion.div>
        </div>

        {/* Busiest Hours Heat Map */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-[rgba(0,45,98,0.08)] mb-8"
        >
          <h3 className="text-xl font-bold text-[#002D62] mb-4">Busiest Hours (Heat Map)</h3>
          <div className="grid grid-cols-7 gap-2">
            {busiestHours.map((hour) => {
              const intensity = hour.patients / 52; // normalize to highest value
              const bgColor = intensity > 0.8 ? 'bg-[#DC3545]' :
                             intensity > 0.6 ? 'bg-[#FFC107]' :
                             intensity > 0.4 ? 'bg-[#00A8A8]' : 'bg-[#28A745]';
              return (
                <div key={hour.hour} className={`${bgColor} rounded-xl p-4 text-white text-center`}>
                  <p className="text-xs mb-1 opacity-90">{hour.hour}</p>
                  <p className="text-2xl font-bold">{hour.patients}</p>
                  <p className="text-xs opacity-90">patients</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Real-time Doctor Monitor */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[rgba(0,45,98,0.08)]"
        >
          <div className="bg-gradient-to-r from-[#002D62] to-[#003d7a] text-white p-6">
            <h3 className="text-xl font-bold">Real-time Doctor Monitor</h3>
            <p className="text-white/80 text-sm">Active doctors and their queue status</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F9FA]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#002D62]">Doctor Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#002D62]">Specialty</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#002D62]">Patients Waiting</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#002D62]">Avg. Consultation</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#002D62]">Today's Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#002D62]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(0,45,98,0.05)]">
                {doctorStats.map((doctor, index) => (
                  <motion.tr
                    key={doctor.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.05 }}
                    className="hover:bg-[#F8F9FA] transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-[#002D62]">{doctor.name}</td>
                    <td className="px-6 py-4 text-[#6C757D]">{doctor.specialty}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                        doctor.patientsWaiting > 6 ? 'bg-[#DC3545]/10 text-[#DC3545]' :
                        doctor.patientsWaiting > 3 ? 'bg-[#FFC107]/10 text-[#FFC107]' :
                        'bg-[#28A745]/10 text-[#28A745]'
                      }`}>
                        {doctor.patientsWaiting}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#002D62]">{doctor.avgConsultation}</td>
                    <td className="px-6 py-4 font-semibold text-[#002D62]">{doctor.todayTotal}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#28A745] rounded-full animate-pulse"></div>
                        <span className="text-sm text-[#28A745] font-medium">Active</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
