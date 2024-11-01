'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const membershipTypes = [
  {
    type: 'Premium',
    prices: {
      1: 30,
      3: 85,
      6: 160,
      9: 230,
      12: 290
    },
    features: [
      'Unlimited gym access',
      'Personal trainer sessions',
      'Diet consultation',
      '20% off merchandise',
      'Access to all classes'
    ]
  },
  {
    type: 'Standard',
    prices: {
      1: 20,
      3: 55,
      6: 100,
      9: 140,
      12: 175
    },
    features: [
      'Unlimited gym access',
      'Group fitness classes',
      '10% off merchandise',
      'Locker rental'
    ]
  },
  {
    type: 'Basic',
    prices: {
      1: 10,
      3: 27,
      6: 50,
      9: 70,
      12: 85
    },
    features: [
      'Gym access (off-peak hours)',
      'Limited equipment usage',
      'Online workout resources'
    ]
  }
]

const durations = [
  { value: 1, label: 'Monthly' },
  { value: 3, label: '3 Months' },
  { value: 6, label: '6 Months' },
  { value: 9, label: '9 Months' },
  { value: 12, label: '12 Months' }
]

interface CustomDropdownProps {
     value: number; // specify the type of value
     onChange: (value: number) => void; // specify the onChange type
   }

function CustomDropdown({ value, onChange }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className="w-full bg-neutral-800 text-white rounded-md p-2 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{durations.find(d => d.value === value)?.label || 'Select Duration'}</span>
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
            {durations.map((duration) => (
              <li
                key={duration.value}
                className="px-4 py-2 cursor-pointer hover:bg-neutral-700 transition-colors"
                onClick={() => {
                  onChange(duration.value)
                  setIsOpen(false)
                }}
              >
                {duration.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

interface MembershipCardProps {
     type: string;  // type of the membership
     prices: Record<number, number>; // object mapping duration to price
     features: string[]; // array of features
   }

export function MembershipCard({ type, prices, features }: MembershipCardProps) {
  const [duration, setDuration] = useState(1)
  const price = prices[duration]

  return (
    <motion.div
      className="bg-neutral-900 rounded-lg p-6 shadow-lg flex flex-col justify-between"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div>
        <h2 className="text-2xl font-bold text-neutral-300 mb-4">{type}</h2>
        <p className="text-3xl font-bold text-neutral-300 mb-6">${price}<span className="text-sm font-normal text-gray-400">/{duration === 1 ? 'month' : `${duration} months`}</span></p>
        <ul className="text-gray-300 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center mb-2">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <CustomDropdown
          value={duration}
          onChange={(value) => setDuration(value)}
        />
        <button className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-4">
          Pay
        </button>
      </div>
    </motion.div>
  )
}

export default function MembershipSelection() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
      className="text-3xl font-serif text-center text-white mb-12"
          initial={{ opacity: 0, x: -20 }}
          exit={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
      >Choose Your Membership Plan</motion.h1>
      <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial={{ opacity: 0, x: -20 }}
          exit={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
      >
        {membershipTypes.map((membership) => (
          <MembershipCard
            key={membership.type}
            type={membership.type}
            prices={membership.prices}
            features={membership.features}
          />
        ))}
      </motion.div>
      <motion.section
        className="bg-neutral-900 rounded-lg p-6 shadow-sm my-3"
        initial={{ opacity: 0, x: -20 }}
          exit={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: 2 }}
        transition={{type: "spring", stiffness: 400, damping: 10, delay: 0.2, duration: 0.5 }}
      >
        <motion.h2
          className="text-l text-white mb-4"
          initial={{ opacity: 0, x: -20 }}
          exit={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Payment History
        </motion.h2>
        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0, x: -20 }}
          exit={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <table className="w-full text-sm text-neutral-400">
            <thead>
              <tr className="bg-neutral-800 text-left text-neutral-100">
                <th className="p-2 rounded-tl-md">Date</th>
                <th className="p-2">Transaction ID</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
                <th className="p-2 rounded-tr-md">Action</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((transaction) => (
                <motion.tr
                  key={transaction}
                  className="border-b border-neutral-700"
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <td className="p-2">April {transaction}, 2023</td>
                  <td className="p-2">TRX-{1000 + transaction}</td>
                  <td className="p-2">$99.99</td>
                  <td className="p-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Paid</span>
                  </td>
                  <td className="p-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-neutral-700 text-white text-xs px-2 py-1 rounded shadow-sm transition duration-200 ease-in-out hover:bg-neutral-600"
                    >
                      View
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.section>
    </div>
  )
}