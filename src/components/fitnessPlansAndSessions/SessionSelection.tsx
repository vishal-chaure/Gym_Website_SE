'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner';

const trainers = [
  { name: 'John Doe', id: 'trainer1' },
  { name: 'Jane Smith', id: 'trainer2' },
  { name: 'Mike Johnson', id: 'trainer3' }
]

const timeSlots = [
  '6:00 AM - 7:00 AM', 
  '7:00 AM - 8:00 AM', 
  '8:00 AM - 9:00 AM', 
  '5:00 PM - 6:00 PM', 
  '6:00 PM - 7:00 PM'
]

const sessionTypes = [
  'Personal Training',
  'Group Session',
  'Yoga',
  'HIIT',
]

interface CustomDropdownProps {
     value: string | number;
     onChange: (value: string | number) => void;
     options: { label: string; value: string | number }[];
   }

function CustomDropdown({ value, onChange, options }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className="w-full bg-neutral-800 text-white rounded-md p-2 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{options.find(o => o.value === value)?.label || 'Select Option'}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 bg-neutral-800 rounded-md shadow-lg"
          >
            {options.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 cursor-pointer hover:bg-neutral-700 transition-colors"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

interface SessionBookingCardProps {
  onBook: (date: string, trainer: string, time: string, sessionType: string) => void;
}

function SessionBookingCard({ onBook }: SessionBookingCardProps) {
     const [selectedDate, setSelectedDate] = useState<string>('')
     const [selectedTrainer, setSelectedTrainer] = useState<string | number>('trainer1')
     const [selectedTime, setSelectedTime] = useState<string | number>('6:00 AM - 7:00 AM')
     const [selectedSessionType, setSelectedSessionType] = useState<string | number>('Personal Training')
   
     const handleBookSession = () => {
       onBook(selectedDate, String(selectedTrainer), String(selectedTime), String(selectedSessionType)) // Explicitly convert to string
     }
   
     return (
       <motion.div
         className="bg-neutral-900 rounded-lg p-6 shadow-lg flex flex-col justify-between"
         whileHover={{ y: -5 }}
         transition={{ type: "spring", stiffness: 300 }}
       >
         <h2 className="text-2xl font-bold text-neutral-300 mb-6">Book Your Session</h2>
         
         <input 
           type="date" 
           value={selectedDate}
           onChange={(e) => setSelectedDate(e.target.value)}
           className="w-full bg-neutral-800 text-white rounded-md p-2 mb-4"
         />
   
         <CustomDropdown 
           value={selectedTrainer}
           onChange={setSelectedTrainer}
           options={trainers.map(trainer => ({ label: trainer.name, value: trainer.id }))}
         />
         
         <CustomDropdown 
           value={selectedTime}
           onChange={setSelectedTime}
           options={timeSlots.map(slot => ({ label: slot, value: slot }))}
         />
         
         <CustomDropdown 
           value={selectedSessionType}
           onChange={setSelectedSessionType}
           options={sessionTypes.map(type => ({ label: type, value: type }))}
         />
   
         <button
           className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-4"
           onClick={handleBookSession}
         >
           Book Session
         </button>
       </motion.div>
     )
   }

interface UpcomingSessionProps {
  date: string;
  trainer: string;
  time: string;
  sessionType: string;
}

function UpcomingSessions({ sessions }: { sessions: UpcomingSessionProps[] }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-neutral-300 mb-6">Upcoming Sessions</h2>
      <div className="space-y-4">
        {sessions.map((session, index) => (
          <div key={index} className="bg-neutral-800 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="text-xl font-semibold text-white">{session.sessionType} with {session.trainer}</p>
              <p className="text-gray-300">{session.date} - {session.time}</p>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md">Details</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SessionBooking1() {
  const [sessions, setSessions] = useState<UpcomingSessionProps[]>([]);

  const handleBookSession = (date: string, trainer: string, time: string, sessionType: string) => {
    const newSession: UpcomingSessionProps = { date, trainer, time, sessionType };
    setSessions([newSession, ...sessions]);

    toast.success('Session Booked!');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="text-3xl font-serif text-center text-white mb-12"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Book Your Gym Session 1
      </motion.h1>

      <SessionBookingCard onBook={handleBookSession} />
      <UpcomingSessions sessions={sessions} />
    </div>
  )
}