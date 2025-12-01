import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/7">

      {/* Animated Gradient Heading */}
      <motion.h1
        className="relative font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 max-w-4xl mx-auto md:text-[64px] text-[38px] leading-tight"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Empower your future with the courses designed to{" "}
        <span className="text-white bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
          fit your choice.
        </span>

        {/* Sketch animation */}
        <motion.img
          src={assets.sketch}
          alt="sketch"
          className="hidden md:block absolute -bottom-7 right-0 w-16 h-16"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </motion.h1>

      {/* Animated Paragraph */}
      <motion.p
        className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        We bring together world-class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.
      </motion.p>

      {/* SearchBar with small hover animation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        whileHover={{ scale: 1.02 }}
      >
        <SearchBar />
      </motion.div>
    </div>
  );
};

export default Hero;
