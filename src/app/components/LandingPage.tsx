import { UserCircle, Stethoscope, BarChart4, Heart, Clock, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onSelectPortal: (portal: 'patient' | 'doctor' | 'staff') => void;
}

export function LandingPage({ onSelectPortal }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-white to-[#F0F8FF]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#002D62] to-[#004080] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-3xl mb-6"
          >
            <Heart className="w-14 h-14 text-white fill-white" />
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Welcome to SmartCare
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            Hospital Queue Management System
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 text-sm md:text-base"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Save Time</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Secure & Trusted</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span>Better Care</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Portal Selection Cards */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold text-[#002D62] text-center mb-12"
        >
          Select Your Portal
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Patient Portal */}
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => onSelectPortal('patient')}
            className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl p-8 border-2 border-transparent hover:border-[#00A8A8] transition-all duration-300 hover:scale-105 text-left overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00A8A8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative">
              <div className="w-20 h-20 bg-[#00A8A8]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#00A8A8] transition-all duration-300">
                <UserCircle className="w-12 h-12 text-[#00A8A8] group-hover:text-white transition-colors" />
              </div>
              
              <h3 className="text-2xl font-bold text-[#002D62] mb-3">
                Patient Portal
              </h3>
              
              <p className="text-base text-[#6C757D] mb-6 leading-relaxed">
                Book your visit & check fees
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00A8A8] rounded-full mt-2"></div>
                  <span className="text-sm text-[#002D62]">Find nearby hospitals</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00A8A8] rounded-full mt-2"></div>
                  <span className="text-sm text-[#002D62]">Get instant fee estimates</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00A8A8] rounded-full mt-2"></div>
                  <span className="text-sm text-[#002D62]">Track live wait times</span>
                </li>
              </ul>

              <div className="flex items-center gap-2 text-[#00A8A8] font-semibold">
                <span>Get Started</span>
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.button>

          {/* Doctor Login */}
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            onClick={() => onSelectPortal('doctor')}
            className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl p-8 border-2 border-transparent hover:border-[#002D62] transition-all duration-300 hover:scale-105 text-left overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#002D62]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative">
              <div className="w-20 h-20 bg-[#002D62]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#002D62] transition-all duration-300">
                <Stethoscope className="w-12 h-12 text-[#002D62] group-hover:text-white transition-colors" />
              </div>
              
              <h3 className="text-2xl font-bold text-[#002D62] mb-3">
                Doctor Login
              </h3>
              
              <p className="text-base text-[#6C757D] mb-6 leading-relaxed">
                Manage your clinic & patients
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#002D62] rounded-full mt-2"></div>
                  <span className="text-sm text-[#002D62]">View patient queue</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#002D62] rounded-full mt-2"></div>
                  <span className="text-sm text-[#002D62]">Manage appointments</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#002D62] rounded-full mt-2"></div>
                  <span className="text-sm text-[#002D62]">Call next patient</span>
                </li>
              </ul>

              <div className="flex items-center gap-2 text-[#002D62] font-semibold">
                <span>Login Now</span>
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.button>

          {/* Staff/Admin */}
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={() => onSelectPortal('staff')}
            className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl p-8 border-2 border-transparent hover:border-[#6C3483] transition-all duration-300 hover:scale-105 text-left overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#6C3483]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative">
              <div className="w-20 h-20 bg-[#6C3483]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#6C3483] transition-all duration-300">
                <BarChart4 className="w-12 h-12 text-[#6C3483] group-hover:text-white transition-colors" />
              </div>
              
              <h3 className="text-2xl font-bold text-[#002D62] mb-3">
                Staff/Admin
              </h3>
              
              <p className="text-base text-[#6C757D] mb-6 leading-relaxed">
                Hospital insights & analytics
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#6C3483] rounded-full mt-2"></div>
                  <span className="text-sm text-[#002D62]">Real-time analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#6C3483] rounded-full mt-2"></div>
                  <span className="text-sm text-[#002D62]">Revenue tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#6C3483] rounded-full mt-2"></div>
                  <span className="text-sm text-[#002D62]">Monitor all doctors</span>
                </li>
              </ul>

              <div className="flex items-center gap-2 text-[#6C3483] font-semibold">
                <span>Access Dashboard</span>
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[rgba(0,45,98,0.08)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#002D62] mb-1">50+</div>
              <div className="text-sm text-[#6C757D]">Hospitals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00A8A8] mb-1">200+</div>
              <div className="text-sm text-[#6C757D]">Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#002D62] mb-1">5,000+</div>
              <div className="text-sm text-[#6C757D]">Daily Patients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#28A745] mb-1">98%</div>
              <div className="text-sm text-[#6C757D]">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
