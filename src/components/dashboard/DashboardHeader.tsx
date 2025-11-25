import { motion } from 'framer-motion';

export default function DashboardHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mb-10"
    >
      <h1 className="font-heading text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
        Dashboard
      </h1>
      <p className="text-muted-foreground text-lg">
        Welcome back! Here's your research overview.
      </p>
    </motion.div>
  );
}
