import { motion } from "framer-motion";

const PageNotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-[#171723] text-[#847FAD]">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-9xl font-extrabold text-[#3E3A59] mb-4"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-2xl mb-6"
      >
        Page Not Found
      </motion.p>

      <motion.a
        href="/"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 rounded-xl bg-[#3E3A59] text-white shadow-lg hover:bg-[#847FAD] transition-colors"
      >
        Go Home
      </motion.a>
    </section>
  );
};

export default PageNotFound;
