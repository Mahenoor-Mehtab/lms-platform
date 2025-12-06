import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
return ( <footer className="bg-gray-800 w-full text-gray-300 py-7 relative"> <div className="container mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between gap-10">

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex-1"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-blue-600 w-10 h-10 flex items-center justify-center rounded-full">
          ⚡
        </div>
        <h2 className="text-white font-bold text-lg">Edemy</h2>
      </div>
      <p className="text-gray-400 text-sm md:text-base">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
      </p>
    </motion.div>
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex-1"
    >
      <h3 className="text-white font-semibold mb-4">Company</h3>
      <ul className="space-y-2">
        {['Home', 'About us', 'Contact us', 'Privacy policy'].map((item, index) => (
          <li key={index} className="hover:text-blue-500 cursor-pointer transition-colors">
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="flex-1"
    >
      <h3 className="text-white font-semibold mb-4">Subscribe to our newsletter</h3>
      <p className="text-gray-400 text-sm mb-4">
        The latest news, articles, and resources, sent to your inbox weekly.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
        />
        <button className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-md text-white font-semibold transition-colors">
          Subscribe
        </button>
      </div>
    </motion.div>
  </div>
  <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
    Copyright 2024 © GreatStack. All Right Reserved.
  </div>
</footer>


);
};

export default Footer;
