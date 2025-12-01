import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';


export default function CallToAction() {
  const navigate = useNavigate();
  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-20 bg-black text-white text-center flex flex-col justify-center items-center">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
      >
        Learn Anything,<br /> Anywhere, Anytime
      </motion.h1>

      {/* Sub text */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-gray-300 max-w-xl mb-10 text-center"
      >
        Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id
        veniam aliqua proident excepteur commodo do ea.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex gap-4"
      >
        {/* Get Started */}
        <button
          className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition"
          onClick={()=> navigate('/course-list')}
        >
          Get Started
        </button>

        {/* Learn More */}
        <button
          className="px-6 py-3 rounded-xl font-semibold border border-gray-600 hover:border-white transition"
        >
          Learn More
        </button>
      </motion.div>
    </section>
  );
}