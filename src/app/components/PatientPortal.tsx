import { useState } from 'react';
import { MapPin, Building2, FileText, DollarSign, Ticket, Star, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

type Step = 'location' | 'hospital' | 'details' | 'quote' | 'token';

interface Hospital {
  id: string;
  name: string;
  rating: number;
  waitTime: number; // in minutes
  distance: string;
  specialties: string[];
  baseFee: number;
}

const villages = ['Downtown', 'Riverside', 'Hilltop', 'Lakeside'];
const areas = {
  'Downtown': ['Central Square', 'Market District', 'Business Hub'],
  'Riverside': ['Waterfront', 'Harbor View', 'Riverside Park'],
  'Hilltop': ['Summit Road', 'Mountain View', 'Hillside'],
  'Lakeside': ['Lake Shore', 'Marina', 'Beach Road'],
};

const hospitals: Hospital[] = [
  { id: '1', name: 'City General Hospital', rating: 4.8, waitTime: 8, distance: '1.2 km', specialties: ['General', 'Emergency'], baseFee: 500 },
  { id: '2', name: 'Medicare Plus Clinic', rating: 4.5, waitTime: 25, distance: '2.5 km', specialties: ['General', 'Pediatrics'], baseFee: 400 },
  { id: '3', name: 'HealthCare Central', rating: 4.9, waitTime: 45, distance: '0.8 km', specialties: ['Cardiology', 'General'], baseFee: 600 },
  { id: '4', name: 'Wellness Hospital', rating: 4.6, waitTime: 70, distance: '3.1 km', specialties: ['General', 'Orthopedics'], baseFee: 550 },
];

const problemFees: Record<string, number> = {
  'fever': 300,
  'cold': 200,
  'cough': 200,
  'injury': 500,
  'checkup': 400,
  'emergency': 800,
};

export function PatientPortal({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<Step>('location');
  const [village, setVillage] = useState('');
  const [area, setArea] = useState('');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [problem, setProblem] = useState('');
  const [age, setAge] = useState('');
  const [tokenNumber, setTokenNumber] = useState('');

  const calculateFee = () => {
    if (!selectedHospital || !problem) return 0;
    
    let fee = selectedHospital.baseFee;
    
    // Add problem-specific fee
    const problemLower = problem.toLowerCase();
    for (const [key, value] of Object.entries(problemFees)) {
      if (problemLower.includes(key)) {
        fee += value;
        break;
      }
    }
    
    // Age factor
    const ageNum = parseInt(age);
    if (ageNum > 60) fee += 100;
    if (ageNum < 12) fee += 50;
    
    return fee;
  };

  const getTrafficLight = (waitTime: number) => {
    if (waitTime < 10) return { color: 'bg-[#28A745]', label: 'Low Wait', textColor: 'text-[#28A745]' };
    if (waitTime < 60) return { color: 'bg-[#FFC107]', label: 'Moderate', textColor: 'text-[#FFC107]' };
    return { color: 'bg-[#DC3545]', label: 'Very Busy', textColor: 'text-[#DC3545]' };
  };

  const handleLocationNext = () => {
    if (village && area) setStep('hospital');
  };

  const handleHospitalSelect = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setStep('details');
  };

  const handleDetailsNext = () => {
    if (problem && age) setStep('quote');
  };

  const handleConfirmBooking = () => {
    const token = `T-${Math.floor(Math.random() * 900 + 100)}`;
    setTokenNumber(token);
    setStep('token');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] to-white">
      {/* Header */}
      <div className="bg-white border-b border-[rgba(0,45,98,0.1)] shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button onClick={onBack} variant="outline" className="rounded-full">
              ← Back
            </Button>
            <h1 className="text-xl font-bold text-[#002D62]">Patient Portal</h1>
          </div>
          
          {/* Progress Indicator */}
          <div className="hidden md:flex items-center gap-2">
            {['Location', 'Hospital', 'Details', 'Quote', 'Token'].map((label, idx) => {
              const steps: Step[] = ['location', 'hospital', 'details', 'quote', 'token'];
              const currentIdx = steps.indexOf(step);
              const isActive = idx === currentIdx;
              const isCompleted = idx < currentIdx;
              
              return (
                <div key={label} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                    isCompleted ? 'bg-[#28A745] text-white' :
                    isActive ? 'bg-[#002D62] text-white' :
                    'bg-[#E0E0E0] text-[#9E9E9E]'
                  }`}>
                    {isCompleted ? '✓' : idx + 1}
                  </div>
                  {idx < 4 && <div className={`w-8 h-0.5 ${isCompleted ? 'bg-[#28A745]' : 'bg-[#E0E0E0]'}`}></div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Location */}
          {step === 'location' && (
            <motion.div
              key="location"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-[rgba(0,45,98,0.08)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-[#00A8A8]/10 rounded-2xl flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-[#00A8A8]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#002D62]">Select Location</h2>
                    <p className="text-sm text-[#6C757D]">Step 1 of 5</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <Label>Select Village</Label>
                    <Select value={village} onValueChange={(val) => { setVillage(val); setArea(''); }}>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Choose your village" />
                      </SelectTrigger>
                      <SelectContent>
                        {villages.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  {village && (
                    <div>
                      <Label>Select Area</Label>
                      <Select value={area} onValueChange={setArea}>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder="Choose your area" />
                        </SelectTrigger>
                        <SelectContent>
                          {areas[village as keyof typeof areas]?.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <Button
                    onClick={handleLocationNext}
                    disabled={!village || !area}
                    className="w-full h-12 bg-[#002D62] hover:bg-[#001d42] text-white rounded-xl"
                  >
                    Continue to Hospitals →
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Hospital Selection */}
          {step === 'hospital' && (
            <motion.div
              key="hospital"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-[rgba(0,45,98,0.08)] mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-[#00A8A8]/10 rounded-2xl flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-[#00A8A8]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#002D62]">Select Hospital</h2>
                    <p className="text-sm text-[#6C757D]">Step 2 of 5 • {village} - {area}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {hospitals.map(hospital => {
                    const traffic = getTrafficLight(hospital.waitTime);
                    return (
                      <button
                        key={hospital.id}
                        onClick={() => handleHospitalSelect(hospital)}
                        className="w-full bg-[#F8F9FA] hover:bg-[#E8F4F8] border-2 border-transparent hover:border-[#00A8A8] rounded-2xl p-5 transition-all text-left"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-[#002D62]">{hospital.name}</h3>
                              <div className={`w-3 h-3 rounded-full ${traffic.color} animate-pulse`}></div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-[#6C757D]">
                              <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-[#FFC107] fill-[#FFC107]" />
                                {hospital.rating}
                              </span>
                              <span>{hospital.distance}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm font-semibold ${traffic.textColor} mb-1`}>
                              {traffic.label}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-[#6C757D]">
                              <Clock className="w-3 h-3" />
                              ~{hospital.waitTime} min
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {hospital.specialties.map(s => (
                            <span key={s} className="px-2 py-1 bg-white rounded-lg text-xs text-[#002D62]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Details */}
          {step === 'details' && selectedHospital && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-[rgba(0,45,98,0.08)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-[#00A8A8]/10 rounded-2xl flex items-center justify-center">
                    <FileText className="w-8 h-8 text-[#00A8A8]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#002D62]">Patient Details</h2>
                    <p className="text-sm text-[#6C757D]">Step 3 of 5 • {selectedHospital.name}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <Label>Problem / Symptoms</Label>
                    <Textarea
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      placeholder="Describe your symptoms (e.g., High fever, headache)"
                      className="h-24 rounded-xl resize-none"
                    />
                  </div>

                  <div>
                    <Label>Age</Label>
                    <Input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter your age"
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <Button
                    onClick={handleDetailsNext}
                    disabled={!problem || !age}
                    className="w-full h-12 bg-[#002D62] hover:bg-[#001d42] text-white rounded-xl"
                  >
                    Continue to Quote →
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Quote */}
          {step === 'quote' && selectedHospital && (
            <motion.div
              key="quote"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-[rgba(0,45,98,0.08)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-[#00A8A8]/10 rounded-2xl flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-[#00A8A8]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#002D62]">Treatment Fee Summary</h2>
                    <p className="text-sm text-[#6C757D]">Step 4 of 5</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#002D62] to-[#003d7a] rounded-2xl p-6 text-white mb-6">
                  <p className="text-white/80 text-sm mb-2">Estimated Total Cost</p>
                  <p className="text-5xl font-bold mb-4">₹{calculateFee()}</p>
                  <div className="h-px bg-white/20 my-4"></div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/80">Base Consultation</span>
                      <span>₹{selectedHospital.baseFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Treatment Fee</span>
                      <span>₹{calculateFee() - selectedHospital.baseFee}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFF4E6] border border-[#FFC107]/30 rounded-xl p-4 mb-6">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-[#FFC107] flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-[#002D62]">
                      <p className="font-semibold mb-1">Note:</p>
                      <p>This is an estimated cost. Actual charges may vary based on diagnosis and treatment required.</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleConfirmBooking}
                  className="w-full h-12 bg-[#28A745] hover:bg-[#218838] text-white rounded-xl"
                >
                  Confirm & Get Token →
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Live Token */}
          {step === 'token' && selectedHospital && (
            <motion.div
              key="token"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-[#28A745]">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-[#28A745]/10 rounded-full mb-4">
                    <CheckCircle className="w-12 h-12 text-[#28A745]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#002D62] mb-2">Booking Confirmed!</h2>
                  <p className="text-sm text-[#6C757D]">{selectedHospital.name}</p>
                </div>

                <div className="bg-gradient-to-br from-[#002D62] to-[#003d7a] rounded-2xl p-8 text-center mb-6">
                  <p className="text-white/80 text-sm mb-3">Your Token Number</p>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl font-bold text-white mb-4"
                  >
                    {tokenNumber}
                  </motion.div>
                  <div className="flex items-center justify-center gap-2 text-white/90">
                    <Ticket className="w-5 h-5" />
                    <span>Digital Queue Ticket</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#F8F9FA] rounded-xl p-4 text-center">
                    <Clock className="w-6 h-6 text-[#00A8A8] mx-auto mb-2" />
                    <p className="text-sm text-[#6C757D] mb-1">Estimated Wait</p>
                    <p className="text-2xl font-bold text-[#002D62]">~{selectedHospital.waitTime}m</p>
                  </div>
                  <div className="bg-[#F8F9FA] rounded-xl p-4 text-center">
                    <DollarSign className="w-6 h-6 text-[#00A8A8] mx-auto mb-2" />
                    <p className="text-sm text-[#6C757D] mb-1">Estimated Fee</p>
                    <p className="text-2xl font-bold text-[#002D62]">₹{calculateFee()}</p>
                  </div>
                </div>

                <div className="bg-[#E8F4F8] rounded-xl p-4 border border-[#00A8A8]/20">
                  <p className="text-sm text-[#002D62] text-center">
                    Please arrive at the hospital and show this token at the reception desk.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
