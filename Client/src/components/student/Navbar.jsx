import { Link, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const { navigate, isEducator } = useContext(AppContext);
  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <>
      <div
        className={`
          ${isCourseListPage ? "bg-gradient-to-r from-[#3ab4ab] via-[#1f4c6c] to-[#070514]" :"bg-gradient-to-r from-[#7638c6] via-[#1f4c6c] to-[#070514]"

}
          w-full flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 border-b 
          ${isCourseListPage ? "border-gray-300" : "border-transparent"}
          py-4
          backdrop-blur-sm
          transition-colors duration-350 shadow-[0_5px_25px_rgba(255,255,255,0.6)]
         `}
      >
        {/* Logo (clickable) */}
        <motion.img
          src={assets.logo}
          alt="Logo"
          height="100px"
          width="100px"
          className="w-28 lg:w-32 cursor-pointer rounded-md p-1 hover:scale-105 transition-transform duration-300"
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Go to home"
        />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm md:text-base">
            {user && (
              <>
                <button
                  className="px-3 py-2 rounded-md text-slate-200 hover:text-white hover:underline hover:underline-offset-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                  aria-label="Educator or Become educator"
                  onClick={()=> navigate('/educator')}
                >
                  {isEducator ? "Educator Dashboard" : "Become Educator"}
                </button>
                <span className="text-slate-500">|</span>
                <Link
                  to="/my-enrollment"
                  className="px-3 py-2 rounded-md text-slate-200 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                  aria-label="My Enrollments"
                >
                  My Enrollment
                </Link>
              </>
            )}
          </nav>

          {/* CTA / User */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="rounded-full p-0.5 bg-gradient-to-br from-cyan-400/30 to-blue-500/20">
                <UserButton />
              </div>
            ) : (
              <motion.button
                onClick={() => openSignIn()}
                className="
                  bg-gradient-to-r from-cyan-500 to-blue-600 text-white 
                  px-5 py-2 rounded-full shadow-lg hover:shadow-2xl
                  transform-gpu hover:-translate-y-0.5 transition-all duration-250
                  text-sm md:text-base font-medium
                  focus:outline-none focus:ring-4 focus:ring-cyan-400/40
                "
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Create account"
              >
                Create Account
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3 sm:gap-5">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            {user && (
              <>
                <button
                  className="px-2 py-1 rounded-md text-slate-200 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                  aria-label="Mobile educator action"
                >
                  {isEducator ? "Educator" : "Become Educator"}
                </button>
                <span className="text-slate-500">|</span>
                <Link
                  to="/my-enrollment"
                  className="px-2 py-1 rounded-md text-slate-200 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                >
                  My Enrollment
                </Link>
              </>
            )}
          </div>

          <div>
            {user ? (
              <div className="rounded-full p-0.5 bg-gradient-to-br from-cyan-400/30 to-blue-500/20">
                <UserButton />
              </div>
            ) : (
              <motion.button
                className="bg-white/10 p-2 rounded-full shadow-inner hover:backdrop-brightness-110 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-cyan-400/25"
                onClick={() => openSignIn()}
                aria-label="Open sign in"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src={assets.user_icon} alt="user" className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
