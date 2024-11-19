import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';

interface SessionData {
  id: number;
  sessionDate: string;
  trainerName: string;
  trainerSpecialization: string;
  price: string;
  sessionType: string;
  timing: string;
}

const trainers = [
  {
    name: 'John Doe',
    specialization: 'Strength & Conditioning',
    price: '$60',
    work: 'Certified Strength Trainer with 5 years of experience.',
  },
  {
    name: 'Jane Smith',
    specialization: 'Yoga & Pilates',
    price: '$50',
    work: 'Yoga Expert with a focus on mindfulness and flexibility.',
  },
  {
    name: 'Mike Johnson',
    specialization: 'Zumba & Dance',
    price: '$40',
    work: 'Zumba Instructor bringing fun and energy to every session.',
  },
];

const timingOptions = [
  'Morning 7:00 AM - 9:00 AM',
  'Morning 10:00 AM - 12:00 PM',
  'Evening 4:00 PM - 6:00 PM',
  'Evening 7:00 PM - 9:00 PM',
];

export default function SessionBooking() {
  const [sessionData, setSessionData] = useState<Omit<SessionData, 'id' | 'trainerSpecialization'>>({
    sessionDate: '',
    trainerName: '',
    price: '',
    sessionType: '',
    timing: '',
  });

  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [upcomingSessions, setUpcomingSessions] = useState<SessionData[]>([]);
  const [showTrainerDropdown, setShowTrainerDropdown] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSessionData({ ...sessionData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trainerInfo = trainers.find((trainer) => trainer.name === selectedTrainer);

    const newSession: SessionData = {
      ...sessionData,
      id: upcomingSessions.length + 1,
      trainerName: trainerInfo ? trainerInfo.name : '',
      trainerSpecialization: trainerInfo ? trainerInfo.specialization : '',
      price: trainerInfo ? trainerInfo.price : '',
    };

    setUpcomingSessions([...upcomingSessions, newSession]);

    setSessionData({
      sessionDate: '',
      trainerName: '',
      price: '',
      sessionType: '',
      timing: '',
    });

    setSelectedTrainer('');
    setShowTrainerDropdown(false);
  };

  return (
    <div className="flex flex-col lg:flex-row  gap-3 mx-1 ">
      {/* Session Booking Form */}
      <motion.section
        className="bg-neutral-900 rounded-lg p-6 shadow-sm w-full lg:w-1/2"
        whileHover={{ x: 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <motion.h2
          className="text-l text-white mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Book a New Session
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            type="date"
            name="sessionDate"
            value={sessionData.sessionDate}
            onChange={handleInputChange}
            className="w-full bg-neutral-800 text-white p-2 rounded"
            required
            transition={{ delay: 0.2, duration: 0.5 }}
          />

          {/* Trainer Dropdown */}
          <div>
            <button
              type="button"
              onClick={() => setShowTrainerDropdown(!showTrainerDropdown)}
              className="w-full bg-neutral-800 text-white p-2 rounded"
            >
              {selectedTrainer || 'Select Trainer'}
            </button>
            {showTrainerDropdown && (
              <div className="bg-neutral-800 mt-2 p-2 rounded">
                {trainers.map((trainer) => (
                  <div
                    key={trainer.name}
                    onClick={() => {
                      setSelectedTrainer(trainer.name);
                      setSessionData({ ...sessionData, price: trainer.price });
                      setShowTrainerDropdown(false);
                    }}
                    className="cursor-pointer p-2 hover:bg-neutral-700 rounded"
                  >
                    <p className="text-white font-semibold">{trainer.name}</p>
                    <p className="text-neutral-400 text-sm">{trainer.specialization}</p>
                    <p className="text-neutral-500 text-xs">{trainer.work}</p>
                    <p className="text-blue-400 text-sm">{trainer.price}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Session Type Dropdown */}
          <select
            name="sessionType"
            value={sessionData.sessionType}
            onChange={handleInputChange}
            className="w-full bg-neutral-800 text-white p-2 rounded"
            required
          >
            <option value="">Select Session Type</option>
            <option value="Personal Training">Personal Training</option>
            <option value="Group Session">Group Session</option>
            <option value="Yoga">Yoga</option>
            <option value="Pilates">Pilates</option>
            <option value="Zumba">Zumba</option>
          </select>

          {/* Timing Dropdown */}
          <select
            name="timing"
            value={sessionData.timing}
            onChange={handleInputChange}
            className="w-full bg-neutral-800 text-white p-2 rounded"
            required
          >
            <option value="">Select Timing</option>
            {timingOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded shadow-sm"
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Book Session
          </motion.button>
        </form>
      </motion.section>

      {/* Upcoming Sessions */}
      <motion.section
        className="bg-neutral-900 rounded-lg p-6 shadow-sm w-full lg:w-1/2"
        whileHover={{ x: 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <motion.h2
          className="text-l text-white mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Upcoming Sessions
        </motion.h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-neutral-400">
            <thead>
              <tr className="bg-neutral-800 text-left text-neutral-100">
                <th className="p-2">Date</th>
                <th className="p-2">Trainer</th>
                <th className="p-2">Type</th>
                <th className="p-2">Timing</th>
                <th className="p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {upcomingSessions.map((session) => (
                <tr key={session.id} className="border-b border-neutral-700">
                  <td className="p-2">{session.sessionDate}</td>
                  <td className="p-2">{session.trainerName}</td>
                  <td className="p-2">{session.sessionType}</td>
                  <td className="p-2">{session.timing}</td>
                  <td className="p-2">{session.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
}