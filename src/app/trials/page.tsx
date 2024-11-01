'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GymProfileCard() {
  const [isEditing, setIsEditing] = useState(false)

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  return (
     <div className="relative w-full h-screen bg-green-900 flex items-center justify-center">
     <div className="absolute inset-0  bg-opacity-80 mask-[radial-gradient(ellipse_at_center,white,rgba(52, 235, 94))]"></div>
     <div className="relative z-10 text-white text-center">
       <h1 className="text-3xl font-bold">Content in the Ellipse</h1>
       <p className="mt-2 text-lg">This content is visible in the white ellipse area.</p>
       <h1 className="text-3xl font-bold">Content in the Ellipse</h1>
       <p className="mt-2 text-lg">This content is visible in the white ellipse area.</p>
       <h1 className="text-3xl font-bold">Content in the Ellipse</h1>
       <p className="mt-2 text-lg">This content is visible in the white ellipse area.</p>
       <h1 className="text-3xl font-bold">Content in the Ellipse</h1>
       <p className="mt-2 text-lg">This content is visible in the white ellipse area.</p>
       <h1 className="text-3xl font-bold">Content in the Ellipse</h1>
       <p className="mt-2 text-lg">This content is visible in the white ellipse area.</p>
       <h1 className="text-3xl font-bold">Content in the Ellipse</h1>
       <p className="mt-2 text-lg">This content is visible in the white ellipse area.</p>
       <h1 className="text-3xl font-bold">Content in the Ellipse</h1>
       <p className="mt-2 text-lg">This content is visible in the white ellipse area.</p>
       <h1 className="text-3xl font-bold">Content in the Ellipse</h1>
       <p className="mt-2 text-lg">This content is visible in the white ellipse area.</p>
       <h1 className="text-3xl font-bold">Content in the Ellipse</h1>
       <p className="mt-2 text-lg">This content is visible in the white ellipse area.</p>
     </div>
   </div>
  )
}