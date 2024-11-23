import { motion } from 'framer-motion';

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: '0vw' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '0vw' }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;