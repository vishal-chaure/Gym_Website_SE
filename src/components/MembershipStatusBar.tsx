'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconAlertCircle } from '@tabler/icons-react';

export default function MembershipStatusBar({ username = "John Doe", expiryDate = "2023-12-31" }) {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
     if (showPopup) {
       // Set a timeout to hide the popup after 5 seconds
          setTimeout(() => setShowPopup(false), 5000)
     }
     return  // Clear the timer if the component unmounts or showPopup changes
   }, [showPopup])

  return (
    <motion.div 
      className="bg-neutral-900 shadow-md p-4 rounded-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div 
          className="text-lg font-semibold text-white"
          initial={{ opacity: 0, x: -20 }}
          exit={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {username}
        </motion.div>
        <div className="flex items-center space-x-2">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div 
              className="w-3 h-3 bg-green-500 rounded-full mr-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.3, type: 'spring' }}
            ></motion.div>
            <span className="text-sm text-gray-300">Membership is active</span>
          </motion.div>
          <div className="relative">
            <motion.button
              className=" rounded-full flex items-center justify-center "
              onClick={() => setShowPopup(!showPopup)}
              aria-label="Show membership expiry date"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconAlertCircle className="" />
            </motion.button>
            <AnimatePresence>
              {showPopup && (
                <motion.div 
                  className="absolute right-0 mt-4 py-2 px-4 w-32 bg-neutral-900 rounded-md shadow-xl z-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm text-gray-300">
                    Expires on: <span className="font-semibold text-white">{expiryDate}</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}