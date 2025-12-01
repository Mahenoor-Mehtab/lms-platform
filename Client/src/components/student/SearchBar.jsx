import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  const onSearchHandler = (e) => {
    e.preventDefault();
    if (input.trim() !== "") navigate("/course-list/" + input);
  };

  return (
    <motion.form
      onSubmit={onSearchHandler}
      className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-[0_8px_30px_rgba(255,255,255,0.15)] px-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.02 }}
    >
      <img
        src={assets.search_icon}
        alt="search_icon"
        className="md:w-auto w-8 h-8 object-contain mr-2"
      />
      <input
        type="text"
        placeholder="Search for courses"
        className="h-full w-full outline-none text-white/80 bg-transparent placeholder:text-white/50 px-2"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <motion.button
        type="submit"
        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-full md:px-10 px-6 md:py-2 py-1 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        whileTap={{ scale: 0.97 }}
      >
        Search
      </motion.button>
    </motion.form>
  );
};

export default SearchBar;
