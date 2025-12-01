import { assets, dummyTestimonial } from "../../assets/assets";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120 } },
};

const hoverAnim = {
  scale: 1.03,
  y: -6,
  border: "1px solid rgba(255,255,255,0.28)",
  boxShadow: "0px 12px 30px rgba(0,0,0,0.6)",
  transition: { type: "spring", stiffness: 300, damping: 20 },
};

const Testimonials = () => {
  return (
    <section className=" px-6 md:px-24">
      <div className="max-w-6xl mx-auto">
        {/* animated, responsive header */}
        <motion.h2
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-3 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400
                     text-3xl md:text-5xl lg:text-6xl"
        >
          What learners say
        </motion.h2>

        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-8">
          Hear from our learners as they share their journey of transformation, success, and how our
          platform has made a difference in their lives.
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {dummyTestimonial.map((testimonial, index) => (
            <motion.article
              key={index}
              variants={cardVariants}
              whileHover={hoverAnim}
              whileTap={{ scale: 0.995 }}
              className="relative overflow-hidden rounded-2xl p-6 backdrop-blur-md bg-white/6 border border-white/6 shadow-md transition-all"
            >
              {/* floating accent */}
              <span className="absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-tr from-indigo-500/20 via-pink-400/10 to-yellow-300/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover ring-1 ring-white/20"
                />
                <div>
                  <h3 className="text-white font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-300">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                    alt={i < Math.floor(testimonial.rating) ? "filled star" : "empty star"}
                    className="w-4 h-4"
                  />
                ))}

                <span className="ml-3 text-sm text-gray-300">({testimonial.rating.toFixed(1)})</span>
              </div>

              <p className="text-gray-200 leading-relaxed">{testimonial.feedback}</p>

              <div className="absolute bottom-4 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-30 rounded" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
